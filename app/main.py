from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.agents import create_agent, seed_demo_agents
from app.battle import BattleEngine
from app.models import (
    Agent,
    BalanceResponse,
    BattleStartRequest,
    CreateAgentRequest,
    Lobby,
    LobbyCreateRequest,
    LobbyJoinRequest,
)
from app.rewards import create_lobby, join_lobby, lock_stakes
from app.storage import store

seed_demo_agents(store)

app = FastAPI(
    title="ClawQuest AI Esports Arena",
    description="Hackathon-ready AI arena with event-driven battles, staking, commentary, and replay feeds.",
    version="0.2.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def healthcheck() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/agent/create", response_model=Agent)
def create_agent_endpoint(payload: CreateAgentRequest) -> Agent:
    agent = create_agent(payload, existing_count=len(store.agents))
    store.save_agent(agent)
    return agent


@app.get("/agents", response_model=list[Agent])
def list_agents() -> list[Agent]:
    return store.list_agents()


@app.get("/agent/{agent_id}", response_model=Agent)
def get_agent(agent_id: str) -> Agent:
    agent = store.get_agent(agent_id)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    return agent


@app.post("/lobby/create", response_model=Lobby)
def create_lobby_endpoint(payload: LobbyCreateRequest) -> Lobby:
    agent_a = store.get_agent(payload.agentA)
    if not agent_a:
        raise HTTPException(status_code=404, detail="Agent A not found")
    agent_b = store.get_agent(payload.agentB) if payload.agentB else None
    lobby = create_lobby(agent_a, agent_b, payload.arena, payload.mode, payload.entry_fee)
    store.save_lobby(lobby)
    return lobby


@app.post("/lobby/{lobby_id}/join", response_model=Lobby)
def join_lobby_endpoint(lobby_id: str, payload: LobbyJoinRequest) -> Lobby:
    lobby = store.get_lobby(lobby_id)
    agent = store.get_agent(payload.agent_id)
    if not lobby or not agent:
        raise HTTPException(status_code=404, detail="Lobby or agent not found")
    lobby = join_lobby(lobby, agent)
    store.save_lobby(lobby)
    return lobby


@app.get("/lobby/{lobby_id}", response_model=Lobby)
def get_lobby(lobby_id: str) -> Lobby:
    lobby = store.get_lobby(lobby_id)
    if not lobby:
        raise HTTPException(status_code=404, detail="Lobby not found")
    return lobby


@app.post("/battle/start")
def start_battle(payload: BattleStartRequest) -> dict:
    agent_a = store.get_agent(payload.agentA)
    agent_b = store.get_agent(payload.agentB)
    if not agent_a or not agent_b:
        raise HTTPException(status_code=404, detail="One or both agents not found")
    if agent_a.agent_id == agent_b.agent_id:
        raise HTTPException(status_code=400, detail="Agents must be different")

    lobby = store.get_lobby(payload.lobby_id) if payload.lobby_id else None
    if lobby is None:
        lobby = create_lobby(agent_a, agent_b, payload.arena, payload.mode, payload.entry_fee)
    lobby = lock_stakes(store, lobby, [agent_a, agent_b])
    store.save_lobby(lobby)

    replay = BattleEngine(store=store).simulate(agent_a, agent_b, lobby)
    store.save_battle(replay)
    store.save_lobby(lobby)
    return replay.model_dump()


@app.get("/battle/{battle_id}")
def get_battle(battle_id: str) -> dict:
    battle = store.get_battle(battle_id)
    if not battle:
        raise HTTPException(status_code=404, detail="Battle not found")
    return battle.model_dump()


@app.get("/battle/{battle_id}/timeline")
def get_battle_timeline(battle_id: str) -> dict:
    battle = store.get_battle(battle_id)
    if not battle:
        raise HTTPException(status_code=404, detail="Battle not found")
    return {
        "battle_id": battle.battle_id,
        "lobby": battle.lobby.model_dump(),
        "agents": [battle.agent_a, battle.agent_b],
        "initial_hp": battle.initial_hp,
        "winner": battle.winner,
        "events": [event.model_dump() for event in battle.events],
        "rewards": battle.rewards.model_dump() if battle.rewards else None,
    }


@app.get("/wallet/{wallet}/balance", response_model=BalanceResponse)
def wallet_balance(wallet: str) -> BalanceResponse:
    return BalanceResponse(wallet=wallet, balance=store.get_balance(wallet))
