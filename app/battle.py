from __future__ import annotations

import random
import uuid
from copy import deepcopy
from dataclasses import dataclass, field
from typing import Dict, List

from app.commentary_engine import NarratorEngine
from app.dialogue import DialogueEngine
from app.event_stream import EventStreamBuilder
from app.learning import update_strategy
from app.models import (
    ActionType,
    Agent,
    BattleExperience,
    BattleHistoryEntry,
    BattleMoveRecord,
    Lobby,
)
from app.rewards import distribute_pot
from app.spectators import SpectatorEngine
from app.storage import InMemoryStore


@dataclass
class Combatant:
    agent: Agent
    hp: int = 100
    defending: bool = False
    special_cooldown: int = 0
    actions_used: List[ActionType] = field(default_factory=list)
    move_records: List[BattleMoveRecord] = field(default_factory=list)


class BattleEngine:
    def __init__(self, store: InMemoryStore, seed: int | None = None) -> None:
        self.store = store
        self.rng = random.Random(seed)
        self.dialogue = DialogueEngine(seed=seed)
        self.narrator = NarratorEngine(seed=seed)
        self.spectators = SpectatorEngine(seed=seed)

    def choose_action(self, combatant: Combatant, opponent: Combatant) -> ActionType:
        weights = combatant.agent.strategy_weights.as_dict().copy()

        if combatant.hp < 30:
            weights["defend"] += 0.2
        if opponent.hp < 25:
            weights["special"] += 0.15
        if combatant.special_cooldown > 0:
            weights["special"] = 0.0

        actions = list(weights.keys())
        total = sum(weights.values())
        normalized = [value / total for value in weights.values()]
        return self.rng.choices(actions, weights=normalized, k=1)[0]  # type: ignore[return-value]

    def _roll_damage(self, action: ActionType) -> int:
        if action == "attack":
            return self.rng.randint(10, 15)
        if action == "special":
            return self.rng.randint(20, 25)
        return 0

    def _emit_dialogue(self, stream: EventStreamBuilder, agent: Agent, trigger: str, opponent: Agent) -> None:
        line = self.dialogue.generate(agent, trigger, stream.current_time, opponent)
        if line:
            stream.emit("DIALOGUE", actor=agent.agent_id, line=line, payload={"speaker": agent.display_name}, gap=1.0)

    def _emit_commentary(self, stream: EventStreamBuilder, event_type: str, **values: str | int) -> None:
        stream.emit("COMMENTARY", line=self.narrator.line(event_type, **values), gap=1.0)

    def _emit_reaction(self, stream: EventStreamBuilder, category: str) -> None:
        name, line = self.spectators.reaction(category)
        stream.emit("SPECTATOR_REACTION", line=line, payload={"speaker": name}, gap=0.8)

    def _resolve_action(
        self,
        stream: EventStreamBuilder,
        actor: Combatant,
        target: Combatant,
        action: ActionType,
        turn_number: int,
        first_hit_done: bool,
    ) -> bool:
        actor.defending = action == "defend"
        damage = 0
        critical = False

        if action != "defend":
            damage = self._roll_damage(action)
            if target.defending:
                damage = max(1, damage // 2)
            critical = damage >= 22 or (action == "special" and self.rng.random() > 0.55)
            target.hp = max(0, target.hp - damage)
        if actor.special_cooldown > 0:
            actor.special_cooldown -= 1
        if action == "special":
            actor.special_cooldown = 2

        actor.actions_used.append(action)
        actor.move_records.append(
            BattleMoveRecord(
                turn=turn_number,
                action=action,
                damage_dealt=damage,
                damage_taken=0,
            )
        )
        if target.move_records:
            target.move_records[-1].damage_taken += damage

        event_type = "ABILITY_USED" if action in {"defend", "special"} else "ATTACK"
        action_line = (
            f"{actor.agent.display_name} braces behind plated armor."
            if action == "defend"
            else f"{actor.agent.display_name} uses {action.upper()} for {damage} damage."
        )
        stream.emit(
            event_type,
            actor=actor.agent.agent_id,
            target=target.agent.agent_id,
            action=action,
            damage=damage,
            line=action_line,
            payload={
                "turn": turn_number,
                "actor_hp": actor.hp,
                "target_hp": target.hp,
                "actor_name": actor.agent.display_name,
                "target_name": target.agent.display_name,
            },
        )
        self._emit_commentary(
            stream,
            event_type,
            attacker=actor.agent.display_name,
            target=target.agent.display_name,
            damage=damage,
        )

        if damage > 0 and not first_hit_done:
            self._emit_dialogue(stream, actor.agent, "first_hit", target.agent)
            first_hit_done = True
        if critical:
            stream.emit(
                "CRITICAL_HIT",
                actor=actor.agent.agent_id,
                target=target.agent.agent_id,
                damage=damage,
                line=f"CRITICAL HIT by {actor.agent.display_name}!",
                payload={"target_hp": target.hp},
                gap=1.0,
            )
            self._emit_commentary(stream, "CRITICAL_HIT")
            self._emit_dialogue(stream, actor.agent, "critical_hit", target.agent)
            self._emit_reaction(stream, "critical")

        if target.hp <= 30 and target.hp > 0:
            stream.emit(
                "HP_LOW",
                actor=target.agent.agent_id,
                target=target.agent.agent_id,
                line=f"{target.agent.display_name} drops into the danger zone.",
                payload={"target_hp": target.hp},
                gap=1.0,
            )
            self._emit_commentary(stream, "HP_LOW", target=target.agent.display_name)
            self._emit_dialogue(stream, target.agent, "low_hp", actor.agent)
            self._emit_reaction(stream, "low_hp")

        return first_hit_done

    def simulate(self, agent_a: Agent, agent_b: Agent, lobby: Lobby) -> BattleExperience:
        battle_id = f"battle_{uuid.uuid4().hex[:10]}"
        stream = EventStreamBuilder()
        combatants = {
            agent_a.agent_id: Combatant(agent=agent_a),
            agent_b.agent_id: Combatant(agent=agent_b),
        }
        actor_order = [combatants[agent_a.agent_id], combatants[agent_b.agent_id]]
        strategy_before = {
            agent_a.agent_id: deepcopy(agent_a.strategy_weights),
            agent_b.agent_id: deepcopy(agent_b.strategy_weights),
        }

        stream.emit(
            "LOBBY_READY",
            actor=agent_a.agent_id,
            target=agent_b.agent_id,
            line=f"ARENA: {lobby.arena} | MODE: {lobby.mode} | ENTRY FEE: {lobby.entry_fee} SHARD",
            payload=lobby.model_dump(),
            gap=1.0,
        )
        stream.emit(
            "POT_LOCKED",
            line=f"Pot locked at {lobby.pot_size} SHARD.",
            payload={"pot_size": lobby.pot_size, "entry_fee": lobby.entry_fee},
            gap=1.0,
        )
        stream.emit("BATTLE_START", line="Combat feed live.", payload={"battle_id": battle_id}, gap=1.0)
        self._emit_commentary(stream, "BATTLE_START")
        self._emit_dialogue(stream, agent_a, "battle_start", agent_b)
        self._emit_dialogue(stream, agent_b, "battle_start", agent_a)
        self._emit_reaction(stream, "opening")

        turn_number = 1
        first_hit_done = False
        while all(combatant.hp > 0 for combatant in actor_order) and turn_number <= 40:
            for actor, target in ((actor_order[0], actor_order[1]), (actor_order[1], actor_order[0])):
                if actor.hp <= 0 or target.hp <= 0:
                    break
                action = self.choose_action(actor, target)
                first_hit_done = self._resolve_action(stream, actor, target, action, turn_number, first_hit_done)
                turn_number += 1
                if target.hp <= 0:
                    break
            for combatant in actor_order:
                combatant.defending = False

        winner_combatant = max(actor_order, key=lambda combatant: (combatant.hp, combatant.agent.experience))
        winner = winner_combatant.agent.agent_id
        loser_combatant = actor_order[1] if winner_combatant is actor_order[0] else actor_order[0]

        rewards = distribute_pot(self.store, winner_combatant.agent, lobby.pot_size)
        lobby.status = "completed"

        for combatant in actor_order:
            did_win = combatant.agent.agent_id == winner
            update_strategy(combatant.agent, combatant.actions_used, did_win)
            combatant.agent.experience += 25 if did_win else 10
            combatant.agent.wins += 1 if did_win else 0
            combatant.agent.losses += 0 if did_win else 1
            opponent = actor_order[1] if combatant is actor_order[0] else actor_order[0]
            rivalry = combatant.agent.rivalry_memory.setdefault(opponent.agent.agent_id, {"wins": 0, "losses": 0})
            rivalry["wins" if did_win else "losses"] += 1
            combatant.agent.battle_history.append(
                BattleHistoryEntry(
                    battle_id=battle_id,
                    opponent_id=opponent.agent.agent_id,
                    result="win" if did_win else "loss",
                    turns_survived=len(stream.events),
                    moves_used=combatant.move_records,
                )
            )
            combatant.agent.battle_history = combatant.agent.battle_history[-10:]
            self.store.save_agent(combatant.agent)

        stream.emit(
            "MATCH_END",
            actor=winner,
            target=loser_combatant.agent.agent_id,
            line=f"WINNER: {winner_combatant.agent.display_name}",
            payload={"winner": winner, "winner_name": winner_combatant.agent.display_name},
            gap=1.2,
        )
        self._emit_commentary(stream, "MATCH_END", winner=winner_combatant.agent.display_name)
        self._emit_dialogue(stream, winner_combatant.agent, "victory", loser_combatant.agent)
        self._emit_dialogue(stream, loser_combatant.agent, "defeat", winner_combatant.agent)
        self._emit_reaction(stream, "victory")
        stream.emit(
            "POT_DISTRIBUTED",
            actor=winner,
            line=f"{winner_combatant.agent.display_name} wins {rewards.winner_reward} SHARD from a {rewards.pot} SHARD pot.",
            payload=rewards.model_dump(),
            gap=1.2,
        )
        self._emit_commentary(stream, "POT_DISTRIBUTED")

        for combatant in actor_order:
            before = strategy_before[combatant.agent.agent_id]
            after = combatant.agent.strategy_weights
            stream.emit(
                "LEARNING_UPDATE",
                actor=combatant.agent.agent_id,
                line=(
                    f"{combatant.agent.display_name} learning shift: "
                    f"ATTACK {before.attack:.2f}->{after.attack:.2f}, "
                    f"DEFEND {before.defend:.2f}->{after.defend:.2f}, "
                    f"SPECIAL {before.special:.2f}->{after.special:.2f}"
                ),
                payload={
                    "before": before.model_dump(),
                    "after": after.model_dump(),
                    "memory": combatant.agent.learning_memory[-1] if combatant.agent.learning_memory else "",
                },
                gap=1.0,
            )

        stream.emit(
            "POST_MATCH",
            actor=winner,
            line=f"WINNER: {winner_combatant.agent.display_name} | POT WON: {rewards.winner_reward} SHARD",
            payload={
                "winner": winner,
                "winner_name": winner_combatant.agent.display_name,
                "pot_won": rewards.winner_reward,
                "learning_summary": [event.payload for event in stream.events if event.type == "LEARNING_UPDATE"],
            },
            gap=1.0,
        )

        return BattleExperience(
            battle_id=battle_id,
            lobby=lobby,
            agent_a=agent_a.agent_id,
            agent_b=agent_b.agent_id,
            initial_hp={agent_a.agent_id: 100, agent_b.agent_id: 100},
            events=stream.events,
            winner=winner,
            rewards=rewards,
            strategy_before=strategy_before,
            strategy_after={
                agent_a.agent_id: agent_a.strategy_weights,
                agent_b.agent_id: agent_b.strategy_weights,
            },
        )
