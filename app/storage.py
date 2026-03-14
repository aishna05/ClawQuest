from __future__ import annotations

from typing import Dict, List, Optional

from app.models import Agent, BattleExperience, Lobby


class InMemoryStore:
    def __init__(self) -> None:
        self.agents: Dict[str, Agent] = {}
        self.battles: Dict[str, BattleExperience] = {}
        self.lobbies: Dict[str, Lobby] = {}
        self.wallet_balances: Dict[str, int] = {}

    def save_agent(self, agent: Agent) -> Agent:
        self.agents[agent.agent_id] = agent
        self.wallet_balances.setdefault(agent.owner_wallet, 1000)
        self.wallet_balances.setdefault(agent.agent_wallet, 0)
        return agent

    def get_agent(self, agent_id: str) -> Optional[Agent]:
        return self.agents.get(agent_id)

    def list_agents(self) -> List[Agent]:
        return list(self.agents.values())

    def save_battle(self, battle: BattleExperience) -> BattleExperience:
        self.battles[battle.battle_id] = battle
        return battle

    def get_battle(self, battle_id: str) -> Optional[BattleExperience]:
        return self.battles.get(battle_id)

    def save_lobby(self, lobby: Lobby) -> Lobby:
        self.lobbies[lobby.lobby_id] = lobby
        return lobby

    def get_lobby(self, lobby_id: str) -> Optional[Lobby]:
        return self.lobbies.get(lobby_id)

    def get_balance(self, wallet: str) -> int:
        return self.wallet_balances.setdefault(wallet, 1000)

    def credit(self, wallet: str, amount: int) -> int:
        self.wallet_balances[wallet] = self.get_balance(wallet) + amount
        return self.wallet_balances[wallet]

    def debit(self, wallet: str, amount: int) -> int:
        current = self.get_balance(wallet)
        if current < amount:
            self.wallet_balances[wallet] = current + 1000
            current = self.wallet_balances[wallet]
        self.wallet_balances[wallet] = current - amount
        return self.wallet_balances[wallet]


store = InMemoryStore()
