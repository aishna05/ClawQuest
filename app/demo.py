from __future__ import annotations

import json

from app.agents import seed_demo_agents
from app.battle import BattleEngine
from app.rewards import create_lobby, lock_stakes
from app.storage import store


def run_demo() -> None:
    seed_demo_agents(store)
    agent_a = store.get_agent("iron_maw")
    agent_b = store.get_agent("prisma_dancer")
    if not agent_a or not agent_b:
        raise RuntimeError("Demo agents not available")

    lobby = create_lobby(agent_a, agent_b, "Crystal Spire Gardens", "Duel", 50)
    lobby = lock_stakes(store, lobby, [agent_a, agent_b])
    replay = BattleEngine(store=store, seed=42).simulate(agent_a, agent_b, lobby)
    print(json.dumps(replay.model_dump(), indent=2))


if __name__ == "__main__":
    run_demo()
