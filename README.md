# ClawQuest — AI Pet Battle Arena on Starknet

> **Hackathon Category: Arcade**

A P2P arcade platform where players mint AI-powered pets, stake SHARD tokens, and watch their beasts fight it out in real-time. Built on Starknet using the Starkzap SDK for wallet management, gasless transactions, and on-chain token flows.

---

## What is ClawQuest?

ClawQuest lets you:

- **Create AI pets** — each beast has a procedurally generated avatar, personality traits, and a learning strategy that evolves after every fight
- **Stake and bet** — create lobbies with entry fees, lock stakes, and winner takes 90% of the pot
- **Watch live battles** — event-driven battle engine streams a full timeline with animations, commentary, and spectator reactions
- **Earn while playing** — SHARD token rewards flow automatically to the winner's wallet via Starkzap

---

## Tech Stack

| Layer | Tech |
|---|---|
| Blockchain | Starknet (via Starkzap SDK) |
| Backend | FastAPI (Python) |
| Frontend | React + Vite + TypeScript + Tailwind |
| AI / Learning | In-process strategy weight updates per battle |
| Wallet | Starkzap `StarkSigner`, wallet-owned agents |

---

## Architecture

```
ClawQuest
├── app/                      # FastAPI backend
│   ├── main.py               # API routes
│   ├── agents.py             # Agent creation and seeding
│   ├── battle.py             # Turn-based battle engine
│   ├── models.py             # Pydantic data models
│   ├── rewards.py            # Stake locking and pot distribution
│   ├── learning.py           # Post-battle AI weight updates
│   ├── avatar.py             # Deterministic avatar generation
│   ├── commentary_engine.py  # Live commentary lines
│   ├── dialogue.py           # Agent dialogue / personality
│   ├── spectators.py         # Spectator reaction events
│   ├── event_stream.py       # Battle event sequencing
│   └── storage.py            # In-memory store
└── src/                      # React + Vite frontend
```

---

## How It Works

### 1. Create your AI pet
```bash
POST /agent/create
{ "owner_wallet": "0xYOUR_WALLET" }
```
Returns an agent with a unique avatar, personality traits (`Aggressive`, `Calculated`, `Unstable`, `Loyal`, `Vain`), and starting strategy weights.

### 2. Open a lobby
```bash
POST /lobby/create
{ "agentA": "iron_maw_1", "arena": "Crystal Spire Gardens", "entry_fee": 50 }
```

### 3. Start the battle
```bash
POST /battle/start
{ "agentA": "iron_maw_1", "agentB": "null_wraith_2", "entry_fee": 50 }
```
Stakes are locked, the battle runs, and rewards are distributed instantly.

### 4. Replay the fight
```bash
GET /battle/{battle_id}/timeline
```
Returns a full event stream with per-frame animation timestamps for the frontend to replay.

---

## Reward Flow

```
Entry fees  →  Pot
Winner      →  90% of pot
Protocol    →  5%  of pot
Arena owner →  5%  of pot
```

All flows are tracked via Starkzap wallet credits and debits, ready to wire to on-chain STRK/custom token transfers.

---

## AI Learning

After every battle, each agent's strategy weights update:

- **Win** — boost weights of moves that landed
- **Loss** — reduce confidence in used moves, nudge others up
- **Low HP** — bias toward defense mid-battle
- **Low enemy HP** — bias toward special moves

Weights normalize after every update so the agent keeps improving over time.

---

## Battle Events

Every battle emits a structured event stream:

| Event | Description |
|---|---|
| `LOBBY_READY` | Both players joined |
| `POT_LOCKED` | Stakes deducted from wallets |
| `BATTLE_START` | Fight begins |
| `ATTACK` / `CRITICAL_HIT` | Turn actions |
| `HP_LOW` | Beast in danger |
| `ABILITY_USED` | Special move triggered |
| `DIALOGUE` | Agent trash talk |
| `COMMENTARY` | Live commentator line |
| `SPECTATOR_REACTION` | Crowd response |
| `MATCH_END` | Winner declared |
| `POT_DISTRIBUTED` | Rewards sent |
| `LEARNING_UPDATE` | AI weights updated |

---

## Run Locally

**Backend**
```bash
cd app
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API docs at `http://localhost:8000/docs`

**Frontend**
```bash
npm install
npm run dev
```
App at `http://localhost:5173`

---

## Starkzap Integration

ClawQuest uses the Starkzap SDK for:

- Wallet onboarding with `StarkSigner`
- Wallet-owned agent accounts (each beast has its own `agent_wallet`)
- Token balance queries via `wallet.balanceOf()`
- Gasless SHARD token reward transfers via AVNU paymaster

---

## License

MIT
