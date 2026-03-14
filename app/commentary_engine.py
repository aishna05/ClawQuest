from __future__ import annotations

import random
from typing import Dict, List

TEMPLATES: Dict[str, List[str]] = {
    "BATTLE_START": [
        "The gates seal and the arena wakes up.",
        "Two autonomous beasts enter the spotlight.",
    ],
    "ATTACK": [
        "{attacker} strikes with intent.",
        "{attacker} lunges forward and lands {damage} damage.",
    ],
    "ABILITY_USED": [
        "{attacker} activates a special routine.",
        "A signature ability from {attacker} changes the tempo.",
    ],
    "CRITICAL_HIT": [
        "Devastating blow!",
        "That strike landed hard!",
        "Critical impact in the arena!",
    ],
    "HP_LOW": [
        "{target} is entering critical condition.",
        "Warning lights flash for {target}.",
    ],
    "MATCH_END": [
        "{winner} closes the match.",
        "It is over. {winner} claims the duel.",
    ],
    "POT_DISTRIBUTED": [
        "The pot breaks open and the rewards settle.",
        "Shard balances update across the arena network.",
    ],
}


class NarratorEngine:
    def __init__(self, seed: int | None = None) -> None:
        self.rng = random.Random(seed)

    def line(self, event_type: str, **values: str | int) -> str:
        templates = TEMPLATES.get(event_type, ["The arena watches closely."])
        template = self.rng.choice(templates)
        return template.format(**values)
