import { BEASTS } from "@/data/beasts";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export type ActionType = "attack" | "defend" | "special";
export type BattleEventType =
  | "LOBBY_READY"
  | "POT_LOCKED"
  | "BATTLE_START"
  | "ATTACK"
  | "CRITICAL_HIT"
  | "HP_LOW"
  | "ABILITY_USED"
  | "DIALOGUE"
  | "COMMENTARY"
  | "SPECTATOR_REACTION"
  | "MATCH_END"
  | "POT_DISTRIBUTED"
  | "LEARNING_UPDATE"
  | "POST_MATCH";

export interface ArenaAgent {
  agent_id: string;
  display_name: string;
  owner_wallet: string;
  agent_wallet: string;
  avatar_url: string;
  personality_traits: string[];
  wins: number;
  losses: number;
  rivalry_memory: Record<string, { wins: number; losses: number }>;
}

export interface LobbyState {
  lobby_id: string;
  arena: string;
  mode: string;
  entry_fee: number;
  pot_size: number;
  players: string[];
  status: "waiting" | "locked" | "in_battle" | "completed";
}

export interface BattleEvent {
  seq: number;
  type: BattleEventType;
  timestamp: number;
  actor?: string | null;
  target?: string | null;
  action?: ActionType | null;
  damage?: number | null;
  line?: string | null;
  animation: Record<string, number>;
  payload: Record<string, unknown>;
}

export interface BattleRewards {
  token: string;
  pot: number;
  winner_reward: number;
  protocol_fee: number;
  arena_owner_fee: number;
  winner_wallet: string;
  arena_wallet: string;
  protocol_wallet: string;
}

export interface BattleExperience {
  battle_id: string;
  lobby: LobbyState;
  agent_a: string;
  agent_b: string;
  initial_hp: Record<string, number>;
  events: BattleEvent[];
  winner: string | null;
  rewards: BattleRewards | null;
  strategy_before: Record<string, Record<string, number>>;
  strategy_after: Record<string, Record<string, number>>;
}

export interface BattleArenaPayload {
  battle: BattleExperience;
  agents: Record<string, ArenaAgent>;
}

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildMockArenaPayload(): BattleArenaPayload {
  const iron = BEASTS.find((beast) => beast.id === "iron-maw");
  const prisma = BEASTS.find((beast) => beast.id === "prisma-dancer");
  if (!iron || !prisma) {
    throw new Error("Mock beasts are unavailable");
  }

  const agents: Record<string, ArenaAgent> = {
    iron_maw: {
      agent_id: "iron_maw",
      display_name: iron.name,
      owner_wallet: "0xIRON_OWNER",
      agent_wallet: "0xAGENTIRON",
      avatar_url: iron.image,
      personality_traits: ["Aggressive", "Loyal"],
      wins: iron.record.wins,
      losses: iron.record.losses,
      rivalry_memory: { prisma_dancer: { wins: 1, losses: 2 } },
    },
    prisma_dancer: {
      agent_id: "prisma_dancer",
      display_name: prisma.name,
      owner_wallet: "0xPRISMA_OWNER",
      agent_wallet: "0xAGENTPRISMA",
      avatar_url: prisma.image,
      personality_traits: ["Calculated", "Vain"],
      wins: prisma.record.wins,
      losses: prisma.record.losses,
      rivalry_memory: { iron_maw: { wins: 2, losses: 1 } },
    },
  };

  const battle: BattleExperience = {
    battle_id: "mock_battle_001",
    lobby: {
      lobby_id: "mock_lobby_001",
      arena: "Crystal Spire Gardens",
      mode: "Duel",
      entry_fee: 50,
      pot_size: 100,
      players: ["iron_maw", "prisma_dancer"],
      status: "completed",
    },
    agent_a: "iron_maw",
    agent_b: "prisma_dancer",
    initial_hp: { iron_maw: 100, prisma_dancer: 100 },
    winner: "iron_maw",
    rewards: {
      token: "SHARD",
      pot: 100,
      winner_reward: 90,
      protocol_fee: 5,
      arena_owner_fee: 5,
      winner_wallet: "0xIRON_OWNER",
      arena_wallet: "0xARENA_OWNER",
      protocol_wallet: "0xPROTOCOL",
    },
    strategy_before: {
      iron_maw: { attack: 0.62, defend: 0.23, special: 0.15 },
      prisma_dancer: { attack: 0.45, defend: 0.3, special: 0.25 },
    },
    strategy_after: {
      iron_maw: { attack: 0.66, defend: 0.2, special: 0.14 },
      prisma_dancer: { attack: 0.41, defend: 0.34, special: 0.25 },
    },
    events: [
      { seq: 1, type: "LOBBY_READY", timestamp: 0, line: "ARENA: Crystal Spire Gardens | MODE: Duel | ENTRY FEE: 50 SHARD", animation: {}, payload: { pot_size: 100 }, actor: null, target: null, action: null, damage: null },
      { seq: 2, type: "POT_LOCKED", timestamp: 1, line: "Pot locked at 100 SHARD.", animation: {}, payload: { pot_size: 100 }, actor: null, target: null, action: null, damage: null },
      { seq: 3, type: "BATTLE_START", timestamp: 2, line: "Combat feed live.", animation: {}, payload: {}, actor: null, target: null, action: null, damage: null },
      { seq: 4, type: "DIALOGUE", timestamp: 3, line: "I smell weakness.", animation: {}, payload: { speaker: "IRON MAW" }, actor: "iron_maw", target: null, action: null, damage: null },
      { seq: 5, type: "COMMENTARY", timestamp: 4, line: "The gates seal and the arena wakes up.", animation: {}, payload: {}, actor: null, target: null, action: null, damage: null },
      { seq: 6, type: "ATTACK", timestamp: 5, line: "IRON MAW uses ATTACK for 13 damage.", animation: { hp_update_at: 0.7 }, payload: { turn: 1, actor_hp: 100, target_hp: 87, actor_name: "IRON MAW", target_name: "PRISMA DANCER" }, actor: "iron_maw", target: "prisma_dancer", action: "attack", damage: 13 },
      { seq: 7, type: "COMMENTARY", timestamp: 6.5, line: "IRON MAW lunges forward and lands 13 damage.", animation: {}, payload: {}, actor: null, target: null, action: null, damage: null },
      { seq: 8, type: "ATTACK", timestamp: 8, line: "PRISMA DANCER uses ATTACK for 12 damage.", animation: { hp_update_at: 0.7 }, payload: { turn: 2, actor_hp: 87, target_hp: 88, actor_name: "PRISMA DANCER", target_name: "IRON MAW" }, actor: "prisma_dancer", target: "iron_maw", action: "attack", damage: 12 },
      { seq: 9, type: "ABILITY_USED", timestamp: 9.5, line: "PRISMA DANCER uses SPECIAL for 23 damage.", animation: { hp_update_at: 0.7 }, payload: { turn: 3, actor_hp: 87, target_hp: 65, actor_name: "PRISMA DANCER", target_name: "IRON MAW" }, actor: "prisma_dancer", target: "iron_maw", action: "special", damage: 23 },
      { seq: 10, type: "CRITICAL_HIT", timestamp: 10.5, line: "CRITICAL HIT by PRISMA DANCER!", animation: {}, payload: { target_hp: 65 }, actor: "prisma_dancer", target: "iron_maw", action: null, damage: 23 },
      { seq: 11, type: "SPECTATOR_REACTION", timestamp: 11.3, line: "Critical! Clip that.", animation: {}, payload: { speaker: "ArenaRat" }, actor: null, target: null, action: null, damage: null },
      { seq: 12, type: "ABILITY_USED", timestamp: 12.2, line: "IRON MAW uses SPECIAL for 24 damage.", animation: { hp_update_at: 0.7 }, payload: { turn: 4, actor_hp: 65, target_hp: 63, actor_name: "IRON MAW", target_name: "PRISMA DANCER" }, actor: "iron_maw", target: "prisma_dancer", action: "special", damage: 24 },
      { seq: 13, type: "CRITICAL_HIT", timestamp: 13.2, line: "CRITICAL HIT by IRON MAW!", animation: {}, payload: { target_hp: 63 }, actor: "iron_maw", target: "prisma_dancer", action: null, damage: 24 },
      { seq: 14, type: "HP_LOW", timestamp: 14.2, line: "PRISMA DANCER drops into the danger zone.", animation: {}, payload: { target_hp: 23 }, actor: "prisma_dancer", target: "prisma_dancer", action: null, damage: null },
      { seq: 15, type: "DIALOGUE", timestamp: 15.2, line: "Systems failing? Good.", animation: {}, payload: { speaker: "IRON MAW" }, actor: "iron_maw", target: null, action: null, damage: null },
      { seq: 16, type: "MATCH_END", timestamp: 16.2, line: "WINNER: IRON MAW", animation: {}, payload: { winner: "iron_maw", winner_name: "IRON MAW" }, actor: "iron_maw", target: "prisma_dancer", action: null, damage: null },
      { seq: 17, type: "POT_DISTRIBUTED", timestamp: 17.4, line: "IRON MAW wins 90 SHARD from a 100 SHARD pot.", animation: {}, payload: { winner_reward: 90, pot: 100 }, actor: "iron_maw", target: null, action: null, damage: null },
      { seq: 18, type: "LEARNING_UPDATE", timestamp: 18.6, line: "IRON MAW learning shift: ATTACK 0.62->0.66, DEFEND 0.23->0.20, SPECIAL 0.15->0.14", animation: {}, payload: { before: { attack: 0.62, defend: 0.23, special: 0.15 }, after: { attack: 0.66, defend: 0.2, special: 0.14 } }, actor: "iron_maw", target: null, action: null, damage: null },
      { seq: 19, type: "LEARNING_UPDATE", timestamp: 19.6, line: "PRISMA DANCER learning shift: ATTACK 0.45->0.41, DEFEND 0.30->0.34, SPECIAL 0.25->0.25", animation: {}, payload: { before: { attack: 0.45, defend: 0.3, special: 0.25 }, after: { attack: 0.41, defend: 0.34, special: 0.25 } }, actor: "prisma_dancer", target: null, action: null, damage: null },
      { seq: 20, type: "POST_MATCH", timestamp: 20.6, line: "WINNER: IRON MAW | POT WON: 90 SHARD", animation: {}, payload: { winner: "iron_maw", winner_name: "IRON MAW", pot_won: 90 }, actor: "iron_maw", target: null, action: null, damage: null },
    ],
  };

  return { battle, agents };
}

export async function prepareArenaBattle(): Promise<BattleArenaPayload> {
  try {
    const agents = await fetchJson<ArenaAgent[]>("/agents");
    const selected = ["iron_maw", "prisma_dancer"]
      .map((id) => agents.find((agent) => agent.agent_id === id))
      .filter(Boolean) as ArenaAgent[];

    if (selected.length < 2) {
      return buildMockArenaPayload();
    }

    const lobby = await fetchJson<LobbyState>("/lobby/create", {
      method: "POST",
      body: JSON.stringify({
        agentA: selected[0].agent_id,
        agentB: selected[1].agent_id,
        arena: "Crystal Spire Gardens",
        mode: "Duel",
        entry_fee: 50,
      }),
    });

    const battle = await fetchJson<BattleExperience>("/battle/start", {
      method: "POST",
      body: JSON.stringify({
        agentA: selected[0].agent_id,
        agentB: selected[1].agent_id,
        lobby_id: lobby.lobby_id,
      }),
    });

    return {
      battle,
      agents: Object.fromEntries(selected.map((agent) => [agent.agent_id, agent])),
    };
  } catch (_error) {
    return buildMockArenaPayload();
  }
}
