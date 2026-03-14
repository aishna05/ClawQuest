import beastIronmaw from "@/assets/beast-ironmaw.png";
import beastPrisma from "@/assets/beast-prisma.png";
import beastNull from "@/assets/beast-null.png";

export interface BeastData {
  id: string;
  name: string;
  type: string;
  rarity: "common" | "rare" | "legendary";
  hp: number;
  maxHp: number;
  atk: number;
  def: number;
  spd: number;
  personality: string;
  mood: string;
  moodColor: string;
  image: string;
  gen: number;
  rageQuitProb: number;
  stats: Record<string, number>;
  record: { wins: number; losses: number; draws: number };
  xp: number;
  xpNext: number;
  battles: { id: string; opponent: string; outcome: string; time: string }[];
  grudges: { name: string; reason: string }[];
  lineage: {
    parent1: string;
    parent2: string;
    mutations: string[];
  };
  memories: { event: string; battle: string; outcome: string; emotion: string; learning: number }[];
  learningProgress: number;
}

export const BEASTS: BeastData[] = [
  {
    id: "iron-maw",
    name: "IRON MAW",
    type: "Scrap-Claw /// Berserker Tank",
    rarity: "rare",
    hp: 89,
    maxHp: 100,
    atk: 847,
    def: 623,
    spd: 210,
    personality: "Aggressive / Stubborn / Rage-Prone",
    mood: "AGGRESSIVE",
    moodColor: "#ff0040",
    image: beastIronmaw,
    gen: 3,
    rageQuitProb: 34,
    stats: { aggression: 82, calculated: 45, unstable: 68, loyal: 30, vain: 91 },
    record: { wins: 47, losses: 12, draws: 3 },
    xp: 2340,
    xpNext: 3000,
    battles: [
      { id: "#4492", opponent: "PRISMA FANG", outcome: "DEFEAT", time: "2h AGO" },
      { id: "#4488", opponent: "NULL WRAITH", outcome: "VICTORY", time: "5h AGO" },
      { id: "#4481", opponent: "CHROME BEAST", outcome: "VICTORY", time: "1d AGO" },
      { id: "#4470", opponent: "VENOM SHARD", outcome: "VICTORY", time: "2d AGO" },
    ],
    grudges: [
      { name: "PRISMA FANG", reason: "3 CONSECUTIVE DEFEATS" },
      { name: "BONE CRUSHER", reason: "STOLE EVOLUTION TOKEN" },
    ],
    lineage: {
      parent1: "STEEL CLAW (GEN 2)",
      parent2: "TOXIC FANG (GEN 2)",
      mutations: ["GEN 1: BASE GENOME INITIALIZED", "GEN 2: ACQUIRED TOXIC RESISTANCE", "GEN 3: NEURAL AGGRESSION AMPLIFIED"],
    },
    memories: [
      { event: "IRON MAW VS PRISMA FANG", battle: "#4492", outcome: "DEFEAT", emotion: "RAGE", learning: 78 },
      { event: "IRON MAW VS NULL WRAITH", battle: "#4488", outcome: "VICTORY", emotion: "PRIDE", learning: 92 },
      { event: "IRON MAW VS CHROME BEAST", battle: "#4481", outcome: "VICTORY", emotion: "CALM", learning: 85 },
    ],
    learningProgress: 67,
  },
  {
    id: "prisma-dancer",
    name: "PRISMA DANCER",
    type: "Crystal-Claw /// Tactical Speed",
    rarity: "legendary",
    hp: 34,
    maxHp: 100,
    atk: 412,
    def: 189,
    spd: 943,
    personality: "Graceful / Calculated / Vain",
    mood: "CONFIDENT",
    moodColor: "#ff8c00",
    image: beastPrisma,
    gen: 7,
    rageQuitProb: 8,
    stats: { aggression: 25, calculated: 92, unstable: 15, loyal: 60, vain: 98 },
    record: { wins: 83, losses: 4, draws: 1 },
    xp: 4200,
    xpNext: 5000,
    battles: [
      { id: "#4501", opponent: "IRON MAW", outcome: "VICTORY", time: "2h AGO" },
      { id: "#4495", opponent: "BONE CRUSHER", outcome: "VICTORY", time: "6h AGO" },
      { id: "#4490", opponent: "VENOM SHARD", outcome: "VICTORY", time: "1d AGO" },
    ],
    grudges: [{ name: "NULL WRAITH", reason: "REALITY GLITCH EXPLOIT" }],
    lineage: {
      parent1: "CRYSTAL FANG (GEN 6)",
      parent2: "LIGHT SHARD (GEN 5)",
      mutations: [
        "GEN 1: BASE GENOME INITIALIZED",
        "GEN 3: REFRACTION PATTERN ENHANCED",
        "GEN 5: SPEED NEURAL BOOST",
        "GEN 7: PRISMATIC CAMOUFLAGE",
      ],
    },
    memories: [
      { event: "PRISMA DANCER VS IRON MAW", battle: "#4501", outcome: "VICTORY", emotion: "PRIDE", learning: 95 },
      { event: "PRISMA DANCER VS BONE CRUSHER", battle: "#4495", outcome: "VICTORY", emotion: "CALM", learning: 88 },
    ],
    learningProgress: 89,
  },
  {
    id: "null-wraith",
    name: "NULL WRAITH",
    type: "Void-Claw /// Reality Warper",
    rarity: "legendary",
    hp: 66,
    maxHp: 100,
    atk: 666,
    def: 444,
    spd: 777,
    personality: "Unstable / Cryptic / Glitch-Prone",
    mood: "UNSTABLE",
    moodColor: "#39ff14",
    image: beastNull,
    gen: 1,
    rageQuitProb: 72,
    stats: { aggression: 60, calculated: 30, unstable: 95, loyal: 10, vain: 55 },
    record: { wins: 31, losses: 29, draws: 8 },
    xp: 1100,
    xpNext: 2000,
    battles: [
      { id: "#4489", opponent: "IRON MAW", outcome: "DEFEAT", time: "5h AGO" },
      { id: "#4480", opponent: "CHROME BEAST", outcome: "VICTORY", time: "1d AGO" },
      { id: "#4475", opponent: "VENOM SHARD", outcome: "DEFEAT", time: "2d AGO" },
    ],
    grudges: [
      { name: "IRON MAW", reason: "2 CONSECUTIVE DEFEATS" },
      { name: "PRISMA DANCER", reason: "HUMILIATED IN RANKED" },
    ],
    lineage: {
      parent1: "VOID SPARK (GEN 0)",
      parent2: "UNKNOWN ORIGIN",
      mutations: ["GEN 0: ANOMALOUS GENESIS", "GEN 1: REALITY FRACTURE MUTATION"],
    },
    memories: [
      { event: "NULL WRAITH VS IRON MAW", battle: "#4489", outcome: "DEFEAT", emotion: "RAGE", learning: 45 },
      { event: "NULL WRAITH VS CHROME BEAST", battle: "#4480", outcome: "VICTORY", emotion: "UNSTABLE", learning: 60 },
    ],
    learningProgress: 34,
  },
];

export const getBeastById = (id: string): BeastData | undefined => BEASTS.find((b) => b.id === id);
