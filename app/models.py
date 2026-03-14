from __future__ import annotations

from typing import Any, Dict, List, Literal, Optional

from pydantic import BaseModel, Field

ActionType = Literal["attack", "defend", "special"]
TraitType = Literal["Aggressive", "Calculated", "Unstable", "Loyal", "Vain"]
BattleEventType = Literal[
    "LOBBY_READY",
    "POT_LOCKED",
    "BATTLE_START",
    "ATTACK",
    "CRITICAL_HIT",
    "HP_LOW",
    "ABILITY_USED",
    "DIALOGUE",
    "COMMENTARY",
    "SPECTATOR_REACTION",
    "MATCH_END",
    "POT_DISTRIBUTED",
    "LEARNING_UPDATE",
    "POST_MATCH",
]


class StrategyWeights(BaseModel):
    attack: float = 0.6
    defend: float = 0.3
    special: float = 0.1

    def as_dict(self) -> Dict[ActionType, float]:
        return {
            "attack": self.attack,
            "defend": self.defend,
            "special": self.special,
        }


class AvatarFeatures(BaseModel):
    horn_type: str
    eye_type: str
    armor_style: str
    color: str
    sigil: str
    image: str


class BattleMoveRecord(BaseModel):
    turn: int
    action: ActionType
    damage_dealt: int = 0
    damage_taken: int = 0


class BattleHistoryEntry(BaseModel):
    battle_id: str
    opponent_id: str
    result: Literal["win", "loss"]
    turns_survived: int
    moves_used: List[BattleMoveRecord] = Field(default_factory=list)


class Agent(BaseModel):
    agent_id: str
    display_name: str
    owner_wallet: str
    agent_wallet: str
    avatar_url: str
    avatar_features: AvatarFeatures
    personality_traits: List[TraitType] = Field(default_factory=list)
    strategy_weights: StrategyWeights = Field(default_factory=StrategyWeights)
    experience: int = 0
    wins: int = 0
    losses: int = 0
    battle_history: List[BattleHistoryEntry] = Field(default_factory=list)
    learning_memory: List[str] = Field(default_factory=list)
    rivalry_memory: Dict[str, Dict[str, int]] = Field(default_factory=dict)


class BattleEvent(BaseModel):
    seq: int
    type: BattleEventType
    timestamp: float
    actor: Optional[str] = None
    target: Optional[str] = None
    action: Optional[ActionType] = None
    damage: Optional[int] = None
    line: Optional[str] = None
    animation: Dict[str, float] = Field(default_factory=dict)
    payload: Dict[str, Any] = Field(default_factory=dict)


class BattleRewards(BaseModel):
    token: str = "SHARD"
    pot: int
    winner_reward: int
    protocol_fee: int
    arena_owner_fee: int
    winner_wallet: str
    arena_wallet: str
    protocol_wallet: str


class Lobby(BaseModel):
    lobby_id: str
    arena: str
    mode: str
    entry_fee: int
    pot_size: int
    players: List[str]
    status: Literal["waiting", "locked", "in_battle", "completed"]


class BattleExperience(BaseModel):
    battle_id: str
    lobby: Lobby
    agent_a: str
    agent_b: str
    initial_hp: Dict[str, int]
    events: List[BattleEvent]
    winner: Optional[str]
    rewards: Optional[BattleRewards] = None
    strategy_before: Dict[str, StrategyWeights]
    strategy_after: Dict[str, StrategyWeights]


class CreateAgentRequest(BaseModel):
    owner_wallet: str
    agent_id: Optional[str] = None
    display_name: Optional[str] = None


class BattleStartRequest(BaseModel):
    agentA: str
    agentB: str
    lobby_id: Optional[str] = None
    arena: str = "Crystal Spire Gardens"
    mode: str = "Duel"
    entry_fee: int = 50


class LobbyCreateRequest(BaseModel):
    agentA: str
    agentB: Optional[str] = None
    arena: str = "Crystal Spire Gardens"
    mode: str = "Duel"
    entry_fee: int = 50


class LobbyJoinRequest(BaseModel):
    agent_id: str


class BalanceResponse(BaseModel):
    wallet: str
    balance: int
