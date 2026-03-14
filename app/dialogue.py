from __future__ import annotations

import random
from typing import Dict, List, Optional

from app.models import Agent, TraitType

DIALOGUE_BANK: Dict[TraitType, Dict[str, List[str]]] = {
    "Aggressive": {
        "battle_start": [
            "I smell weakness.",
            "Come closer. I want to hear the metal split.",
            "Your armor cracks like cheap steel.",
        ],
        "first_hit": ["First blood.", "That is how a hunt begins."],
        "critical_hit": ["That must have hurt.", "Now break for me."],
        "low_hp": ["Systems failing? Good.", "You are finally within reach."],
        "victory": ["Another specimen dismantled.", "The arena remembers who owns it."],
        "defeat": ["I will remember this.", "This debt stays open."],
    },
    "Calculated": {
        "battle_start": [
            "I have already simulated your defeat.",
            "Every movement has an answer.",
        ],
        "first_hit": ["Opening pattern confirmed.", "Data acquired."],
        "critical_hit": ["Optimal strike.", "Probability spike confirmed."],
        "low_hp": ["Contingency protocol engaged.", "Efficiency remains acceptable."],
        "victory": ["Outcome aligned with prediction.", "A clean execution of the model."],
        "defeat": ["Unexpected result logged.", "I need another sample."],
    },
    "Unstable": {
        "battle_start": [
            "Which timeline are we fighting in?",
            "The static says your name in pieces.",
        ],
        "first_hit": ["Did you feel that across realities?", "The void liked that one."],
        "critical_hit": ["Everything flickers now.", "That was loud in my head."],
        "low_hp": ["Systems failing and opening doors.", "The noise gets brighter when I break."],
        "victory": ["Another echo collapses.", "The arena folds around me."],
        "defeat": ["I will respawn in your nightmares.", "This reality rejects me for now."],
    },
    "Loyal": {
        "battle_start": [
            "I fight for my handler and my line.",
            "No retreat. No hesitation.",
        ],
        "first_hit": ["For the pack.", "We do not miss twice."],
        "critical_hit": ["Hold the line.", "That one was earned."],
        "low_hp": ["Still standing.", "I can carry this a little longer."],
        "victory": ["The bond holds.", "Victory belongs to the den."],
        "defeat": ["I failed the pack.", "We learn and return."],
    },
    "Vain": {
        "battle_start": [
            "Try to keep up with perfection.",
            "The crowd deserves a beautiful victory.",
        ],
        "first_hit": ["Elegant, wasn't it?", "The arena gasps for me."],
        "critical_hit": ["That belongs on a highlight reel.", "Applause is appropriate."],
        "low_hp": ["Do not mistake damage for decline.", "Even worn, I outshine you."],
        "victory": ["Naturally, I prevailed.", "The spotlight returns to its owner."],
        "defeat": ["This arena failed to frame me properly.", "You stole a scene, not the story."],
    },
}


class DialogueEngine:
    def __init__(self, seed: int | None = None, cooldown_seconds: float = 8.0) -> None:
        self.rng = random.Random(seed)
        self.cooldown_seconds = cooldown_seconds
        self.last_trigger_at: Dict[str, float] = {}

    def generate(
        self,
        agent: Agent,
        trigger: str,
        battle_time: float,
        opponent: Optional[Agent] = None,
    ) -> Optional[str]:
        last_time = self.last_trigger_at.get(agent.agent_id, -999.0)
        if battle_time - last_time < self.cooldown_seconds:
            return None

        dominant_trait = agent.personality_traits[0] if agent.personality_traits else "Calculated"
        options = DIALOGUE_BANK.get(dominant_trait, {}).get(trigger, [])
        if trigger == "battle_start" and opponent is not None:
            rivalry = agent.rivalry_memory.get(opponent.agent_id)
            if rivalry and rivalry.get("losses", 0) > 0:
                options = [f"{opponent.display_name}... we are not finished."] + options
        if not options:
            return None

        self.last_trigger_at[agent.agent_id] = battle_time
        return self.rng.choice(options)
