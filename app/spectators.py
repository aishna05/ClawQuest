from __future__ import annotations

import random
from typing import List

SPECTATOR_NAMES = [
    "ChainCaster",
    "ArenaRat",
    "ShardWhale",
    "VoidBookie",
    "ClawQuant",
    "PackOracle",
    "CryptoHandler",
]

SPECTATOR_REACTIONS = {
    "opening": [
        "Pot looks juicy tonight.",
        "This matchup is all gas.",
        "Crystal Spire is loud already.",
    ],
    "critical": [
        "Critical! Clip that.",
        "That one shook my wallet.",
        "The arena felt that hit.",
    ],
    "low_hp": [
        "One more clean strike ends it.",
        "Somebody is wobbling now.",
    ],
    "victory": [
        "Pay the winner.",
        "That beast earned every shard.",
        "Rematch this immediately.",
    ],
}


class SpectatorEngine:
    def __init__(self, seed: int | None = None) -> None:
        self.rng = random.Random(seed)

    def reaction(self, category: str) -> tuple[str, str]:
        name = self.rng.choice(SPECTATOR_NAMES)
        line = self.rng.choice(SPECTATOR_REACTIONS.get(category, ["The crowd is locked in."]))
        return name, line
