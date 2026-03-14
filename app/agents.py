from __future__ import annotations

import hashlib
import random
from typing import Iterable, Optional

from app.avatar import generate_avatar
from app.learning import _normalize
from app.models import Agent, CreateAgentRequest, StrategyWeights, TraitType
from app.storage import InMemoryStore

ADJECTIVES = ["iron", "null", "ember", "void", "storm", "hex", "lunar", "grim"]
CREATURES = ["maw", "wraith", "fang", "hydra", "drake", "tiger", "wyrm", "golem"]
TRAIT_SETS: list[list[TraitType]] = [
    ["Aggressive", "Loyal"],
    ["Calculated", "Vain"],
    ["Unstable", "Aggressive"],
    ["Calculated", "Loyal"],
    ["Vain", "Aggressive"],
]


def _wallet_rng(owner_wallet: str) -> random.Random:
    digest = hashlib.sha256(owner_wallet.encode("utf-8")).hexdigest()
    return random.Random(int(digest[:16], 16))


def _display_name_from_agent_id(agent_id: str) -> str:
    return agent_id.replace("_", " ").upper()


def create_agent(payload: CreateAgentRequest, existing_count: int) -> Agent:
    rng = _wallet_rng(f"{payload.owner_wallet}:{existing_count}")
    agent_id = payload.agent_id or f"{rng.choice(ADJECTIVES)}_{rng.choice(CREATURES)}_{existing_count + 1}"
    display_name = payload.display_name or _display_name_from_agent_id(agent_id)
    agent_wallet = "0xAGENT" + hashlib.sha256(agent_id.encode("utf-8")).hexdigest()[:12].upper()
    avatar = generate_avatar(agent_id)
    raw_weights = StrategyWeights(
        attack=round(rng.uniform(0.45, 0.7), 2),
        defend=round(rng.uniform(0.15, 0.35), 2),
        special=round(rng.uniform(0.05, 0.2), 2),
    )
    traits = rng.choice(TRAIT_SETS)

    return Agent(
        agent_id=agent_id,
        display_name=display_name,
        owner_wallet=payload.owner_wallet,
        agent_wallet=agent_wallet,
        avatar_url=avatar.image,
        avatar_features=avatar,
        personality_traits=traits,
        strategy_weights=_normalize(raw_weights.as_dict()),
    )


def create_preset_agent(
    *,
    agent_id: str,
    display_name: str,
    owner_wallet: str,
    traits: Iterable[TraitType],
    strategy_weights: StrategyWeights,
) -> Agent:
    avatar = generate_avatar(agent_id)
    agent_wallet = "0xAGENT" + hashlib.sha256(agent_id.encode("utf-8")).hexdigest()[:12].upper()
    return Agent(
        agent_id=agent_id,
        display_name=display_name,
        owner_wallet=owner_wallet,
        agent_wallet=agent_wallet,
        avatar_url=avatar.image,
        avatar_features=avatar,
        personality_traits=list(traits),
        strategy_weights=_normalize(strategy_weights.as_dict()),
    )


def seed_demo_agents(store: InMemoryStore) -> None:
    presets = [
        create_preset_agent(
            agent_id="iron_maw",
            display_name="IRON MAW",
            owner_wallet="0xIRON_OWNER",
            traits=["Aggressive", "Loyal"],
            strategy_weights=StrategyWeights(attack=0.62, defend=0.23, special=0.15),
        ),
        create_preset_agent(
            agent_id="prisma_dancer",
            display_name="PRISMA DANCER",
            owner_wallet="0xPRISMA_OWNER",
            traits=["Calculated", "Vain"],
            strategy_weights=StrategyWeights(attack=0.45, defend=0.3, special=0.25),
        ),
        create_preset_agent(
            agent_id="null_wraith",
            display_name="NULL WRAITH",
            owner_wallet="0xNULL_OWNER",
            traits=["Unstable", "Aggressive"],
            strategy_weights=StrategyWeights(attack=0.48, defend=0.17, special=0.35),
        ),
    ]

    for agent in presets:
        if not store.get_agent(agent.agent_id):
            store.save_agent(agent)


def ensure_agent(store: InMemoryStore, agent_id: str) -> Optional[Agent]:
    return store.get_agent(agent_id)
