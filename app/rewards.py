from __future__ import annotations

import uuid

from app.models import Agent, BattleRewards, Lobby
from app.storage import InMemoryStore

PROTOCOL_WALLET = "0xPROTOCOL"
ARENA_OWNER_WALLET = "0xARENA_OWNER"
TOKEN = "SHARD"


def create_lobby(agent_a: Agent, agent_b: Agent | None, arena: str, mode: str, entry_fee: int) -> Lobby:
    players = [agent_a.agent_id]
    if agent_b is not None:
        players.append(agent_b.agent_id)

    status = "waiting" if len(players) < 2 else "locked"
    pot_size = entry_fee * len(players)
    return Lobby(
        lobby_id=f"lobby_{uuid.uuid4().hex[:8]}",
        arena=arena,
        mode=mode,
        entry_fee=entry_fee,
        pot_size=pot_size,
        players=players,
        status=status,
    )


def join_lobby(lobby: Lobby, agent: Agent) -> Lobby:
    if agent.agent_id not in lobby.players:
        lobby.players.append(agent.agent_id)
    lobby.pot_size = lobby.entry_fee * len(lobby.players)
    lobby.status = "locked" if len(lobby.players) >= 2 else "waiting"
    return lobby


def lock_stakes(store: InMemoryStore, lobby: Lobby, agents: list[Agent]) -> Lobby:
    for agent in agents:
        store.debit(agent.owner_wallet, lobby.entry_fee)
    lobby.pot_size = lobby.entry_fee * len(agents)
    lobby.status = "in_battle"
    return lobby


def distribute_pot(store: InMemoryStore, winner: Agent, pot: int) -> BattleRewards:
    winner_reward = int(pot * 0.9)
    protocol_fee = int(pot * 0.05)
    arena_owner_fee = pot - winner_reward - protocol_fee

    store.credit(winner.owner_wallet, winner_reward)
    store.credit(PROTOCOL_WALLET, protocol_fee)
    store.credit(ARENA_OWNER_WALLET, arena_owner_fee)

    return BattleRewards(
        token=TOKEN,
        pot=pot,
        winner_reward=winner_reward,
        protocol_fee=protocol_fee,
        arena_owner_fee=arena_owner_fee,
        winner_wallet=winner.owner_wallet,
        arena_wallet=ARENA_OWNER_WALLET,
        protocol_wallet=PROTOCOL_WALLET,
    )
