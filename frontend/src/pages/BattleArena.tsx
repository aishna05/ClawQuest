import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import beastIronmaw from "@/assets/beast-ironmaw.png";
import beastPrisma from "@/assets/beast-prisma.png";
import beastNull from "@/assets/beast-null.png";
import { TransmitIcon, RageMeterIcon, SurrenderFlagIcon } from "@/components/BattleIcons";
import { prepareArenaBattle, type BattleArenaPayload, type BattleEvent } from "@/lib/battleApi";

interface LogEntry {
  id: number;
  text: string;
  type: "system" | "player" | "opponent" | "damage" | "critical" | "commentary" | "announcer";
  timestamp: string;
}

interface ChatMessage {
  id: number;
  name: string;
  text: string;
  color: string;
}

const VIEWER_COLORS = [
  "text-neon-claw",
  "text-glitch-cyan",
  "text-toxic-shard",
  "text-rust-gold",
  "text-foreground",
  "text-muted-foreground",
];

const DEFAULT_VIEWERS = 684;
const IMAGE_OVERRIDES: Record<string, string> = {
  iron_maw: beastIronmaw,
  prisma_dancer: beastPrisma,
  null_wraith: beastNull,
};

const getTimestamp = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

const BattleArena = () => {
  const navigate = useNavigate();
  const [arenaPayload, setArenaPayload] = useState<BattleArenaPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [playerHp, setPlayerHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);
  const [rage, setRage] = useState(0);
  const [round, setRound] = useState(1);
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<LogEntry[]>([]);
  const [timer, setTimer] = useState(0);
  const [playerDamageFlash, setPlayerDamageFlash] = useState(false);
  const [opponentDamageFlash, setOpponentDamageFlash] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [sloshing, setSloshing] = useState(false);
  const [berserk, setBerserk] = useState(false);
  const [battleOver, setBattleOver] = useState(false);
  const [ceremonyReady, setCeremonyReady] = useState(false);
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null);
  const [showPotIntro, setShowPotIntro] = useState(true);
  const [pot, setPot] = useState(100);
  const [viewerCount, setViewerCount] = useState(DEFAULT_VIEWERS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [learningUpdates, setLearningUpdates] = useState<string[]>([]);
  const [rewardText, setRewardText] = useState("");
  const [feedLocked, setFeedLocked] = useState(false);

  const logRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(0);
  const chatId = useRef(0);
  const replayTimeout = useRef<number | null>(null);

  const battle = arenaPayload?.battle ?? null;
  const agents = arenaPayload?.agents ?? {};
  const playerAgent = battle ? agents[battle.agent_a] : undefined;
  const opponentAgent = battle ? agents[battle.agent_b] : undefined;

  const playerImage = playerAgent ? IMAGE_OVERRIDES[playerAgent.agent_id] ?? playerAgent.avatar_url : beastIronmaw;
  const opponentImage = opponentAgent ? IMAGE_OVERRIDES[opponentAgent.agent_id] ?? opponentAgent.avatar_url : beastPrisma;

  const addLog = useCallback((text: string, type: LogEntry["type"], forcedTime?: number) => {
    setLog((prev) => [
      ...prev,
      {
        id: nextId.current++,
        text,
        type,
        timestamp: getTimestamp(forcedTime ?? timer),
      },
    ]);
  }, [timer]);

  const addChat = useCallback((name: string, text: string) => {
    const color = VIEWER_COLORS[chatId.current % VIEWER_COLORS.length];
    setChatMessages((prev) => [...prev.slice(-80), { id: chatId.current++, name, text, color }]);
  }, []);

  const resetArena = useCallback(() => {
    if (replayTimeout.current) {
      window.clearTimeout(replayTimeout.current);
    }
    nextId.current = 0;
    chatId.current = 0;
    setPlayerHp(100);
    setOpponentHp(100);
    setRage(0);
    setRound(1);
    setCommand("");
    setLog([]);
    setTimer(0);
    setPlayerDamageFlash(false);
    setOpponentDamageFlash(false);
    setShaking(false);
    setSloshing(false);
    setBerserk(false);
    setBattleOver(false);
    setCeremonyReady(false);
    setShowPotIntro(true);
    setPot(100);
    setViewerCount(DEFAULT_VIEWERS + Math.floor(Math.random() * 250));
    setChatMessages([]);
    setChatInput("");
    setLearningUpdates([]);
    setRewardText("");
    setFeedLocked(false);
  }, []);

  const loadBattle = useCallback(async () => {
    setLoading(true);
    resetArena();
    const payload = await prepareArenaBattle();
    setArenaPayload(payload);
    setPlayerHp(payload.battle.initial_hp[payload.battle.agent_a] ?? 100);
    setOpponentHp(payload.battle.initial_hp[payload.battle.agent_b] ?? 100);
    setPot(payload.battle.lobby.pot_size);
    setLoading(false);
  }, [resetArena]);

  useEffect(() => {
    void loadBattle();
  }, [loadBattle]);

  useEffect(() => {
    if (battleOver || loading) return;
    const interval = window.setInterval(() => {
      setViewerCount((value) => Math.max(50, value + Math.floor(Math.random() * 36) - 14));
    }, 3000);
    return () => window.clearInterval(interval);
  }, [battleOver, loading]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [log]);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [chatMessages]);

  const hpColor = (hp: number) => {
    if (hp > 60) return "hsl(var(--toxic-shard))";
    if (hp > 30) return "hsl(var(--rust-gold))";
    return "hsl(var(--neon-claw))";
  };

  const logColor = (type: LogEntry["type"]) => {
    switch (type) {
      case "system":
        return "text-muted-foreground";
      case "player":
        return "text-neon-claw";
      case "opponent":
        return "text-glitch-cyan";
      case "damage":
        return "text-rust-gold";
      case "critical":
        return "text-neon-claw font-bold";
      case "commentary":
        return "text-foreground/70 italic";
      case "announcer":
        return "text-rust-gold font-bold";
    }
  };

  const applyDamageToPlayer = useCallback((nextHp: number, damage: number) => {
    setPlayerDamageFlash(true);
    setShaking(true);
    setSloshing(true);
    setTimeout(() => setPlayerHp(nextHp), 700);
    setTimeout(() => setPlayerDamageFlash(false), 300);
    setTimeout(() => setShaking(false), 400);
    setTimeout(() => setSloshing(false), 1200);
    setRage((current) => {
      const next = Math.min(100, current + Math.max(6, Math.floor(damage / 2)));
      if (next >= 90) {
        setBerserk(true);
      }
      return next;
    });
  }, []);

  const applyDamageToOpponent = useCallback((nextHp: number) => {
    setOpponentDamageFlash(true);
    setSloshing(true);
    setTimeout(() => setOpponentHp(nextHp), 700);
    setTimeout(() => setOpponentDamageFlash(false), 300);
    setTimeout(() => setSloshing(false), 1200);
  }, []);

  const handleBattleEvent = useCallback((event: BattleEvent) => {
    setTimer(event.timestamp);

    switch (event.type) {
      case "LOBBY_READY":
        setShowPotIntro(true);
        addLog(event.line ?? "Lobby primed.", "system", event.timestamp);
        break;
      case "POT_LOCKED":
        setPot(Number(event.payload.pot_size ?? pot));
        addLog(event.line ?? "Pot locked.", "system", event.timestamp);
        break;
      case "BATTLE_START":
        setShowPotIntro(false);
        addLog(event.line ?? "Battle start.", "announcer", event.timestamp);
        inputRef.current?.focus();
        break;
      case "ATTACK":
      case "ABILITY_USED": {
        const isPlayerActor = event.actor === battle?.agent_a;
        const isPlayerTarget = event.target === battle?.agent_a;
        const turnValue = Number(event.payload.turn ?? round);
        setRound(Math.max(1, Math.ceil(turnValue / 2)));
        addLog(event.line ?? "Action executed.", isPlayerActor ? "player" : "opponent", event.timestamp);

        if ((event.damage ?? 0) > 0) {
          const nextHp = Number(event.payload.target_hp ?? (isPlayerTarget ? playerHp : opponentHp));
          if (isPlayerTarget) {
            applyDamageToPlayer(nextHp, Number(event.damage ?? 0));
          } else {
            applyDamageToOpponent(nextHp);
          }
          addLog(`-${event.damage} HP`, "damage", event.timestamp + 0.5);
        }
        break;
      }
      case "CRITICAL_HIT":
        addLog(event.line ?? "Critical hit!", "critical", event.timestamp);
        break;
      case "HP_LOW":
        addLog(event.line ?? "HP critical.", "announcer", event.timestamp);
        break;
      case "DIALOGUE": {
        const speaker = String(event.payload.speaker ?? event.actor ?? "BEAST");
        addLog(`${speaker}: "${event.line}"`, "commentary", event.timestamp);
        break;
      }
      case "COMMENTARY":
        addLog(event.line ?? "Arena commentary online.", "announcer", event.timestamp);
        break;
      case "SPECTATOR_REACTION":
        addChat(String(event.payload.speaker ?? "VIEWER"), event.line ?? "Crowd noise intensifies.");
        break;
      case "MATCH_END":
        setBattleOver(true);
        setWinner(event.actor === battle?.agent_a ? "player" : "opponent");
        addLog(event.line ?? "Match complete.", "critical", event.timestamp);
        break;
      case "POT_DISTRIBUTED":
        setRewardText(event.line ?? "Rewards distributed.");
        addLog(event.line ?? "Rewards distributed.", "critical", event.timestamp);
        break;
      case "LEARNING_UPDATE":
        if (event.line) {
          setLearningUpdates((prev) => [...prev, event.line]);
          addLog(event.line, "commentary", event.timestamp);
        }
        break;
      case "POST_MATCH":
        setCeremonyReady(true);
        addLog(event.line ?? "Post-match ceremony engaged.", "announcer", event.timestamp);
        break;
    }
  }, [addChat, addLog, applyDamageToOpponent, applyDamageToPlayer, battle?.agent_a, playerHp, opponentHp, pot, round]);

  useEffect(() => {
    if (!battle || loading || feedLocked) return;

    let index = 0;
    const playNext = () => {
      if (!battle.events[index]) return;
      const current = battle.events[index];
      handleBattleEvent(current);
      const next = battle.events[index + 1];
      index += 1;
      if (!next) return;
      const delay = Math.max(800, (next.timestamp - current.timestamp) * 1000);
      replayTimeout.current = window.setTimeout(playNext, delay);
    };

    playNext();
    return () => {
      if (replayTimeout.current) {
        window.clearTimeout(replayTimeout.current);
      }
    };
  }, [battle, handleBattleEvent, loading, feedLocked]);

  const handleCommand = useCallback(() => {
    const cmd = command.trim().toUpperCase();
    if (!cmd) return;

    if (cmd === "REMATCH" || cmd === "REPLAY" || cmd === "START") {
      void loadBattle();
      return;
    }

    addLog("AUTONOMOUS AGENTS CONTROL THE MATCH. USE REMATCH TO RUN ANOTHER SIMULATION.", "system", timer);
    setCommand("");
  }, [addLog, command, loadBattle, timer]);

  const handleAbortFeed = useCallback(() => {
    setFeedLocked(true);
    if (replayTimeout.current) {
      window.clearTimeout(replayTimeout.current);
    }
    navigate("/");
  }, [navigate]);

  const handleChatSend = useCallback(() => {
    if (!chatInput.trim()) return;
    addChat("YOU", chatInput.trim());
    setChatInput("");
  }, [addChat, chatInput]);

  const playerTitle = playerAgent?.display_name ?? "IRON MAW";
  const opponentTitle = opponentAgent?.display_name ?? "PRISMA DANCER";
  const playerTraits = useMemo(() => (playerAgent?.personality_traits ?? []).join(" / "), [playerAgent]);
  const opponentTraits = useMemo(() => (opponentAgent?.personality_traits ?? []).join(" / "), [opponentAgent]);
  const winnerReward = battle?.rewards?.winner_reward ?? 0;

  return (
    <div className={`min-h-screen bg-background overflow-hidden relative scanlines vignette arena-grid ${shaking ? "impact-shake" : ""}`}>
      {berserk && <div className="berserk-overlay" />}

      <div className="relative z-10 flex items-stretch justify-between border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex-1 p-3 flex items-center gap-3">
          <div className="relative w-12 h-12 border border-neon-claw/40 overflow-hidden flex-shrink-0">
            <img src={playerImage} alt={playerTitle} className="w-full h-full object-cover" />
            {playerDamageFlash && <div className="damage-overlay" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">{playerTitle}</span>
              <span className="font-data text-[10px] text-neon-claw">{playerHp}/100 HP</span>
            </div>
            <div className={`hp-tube h-5 bg-void-black relative ${sloshing ? "hp-sloshing" : ""}`}>
              <div className="hp-tube-liquid transition-all duration-700" style={{ height: `${playerHp}%`, background: `linear-gradient(0deg, ${hpColor(playerHp)}, ${hpColor(playerHp)}cc)` }} />
              <div className="hp-tube-segments" />
              <div className="hp-bolt top-0 left-0" /><div className="hp-bolt top-0 right-0" />
              <div className="hp-bolt bottom-0 left-0" /><div className="hp-bolt bottom-0 right-0" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 border-x border-border min-w-[190px]">
          <span className="font-data text-[9px] uppercase tracking-[0.3em] text-muted-foreground">ROUND</span>
          <span className="font-display text-2xl font-bold text-foreground">{round}</span>
          <span className="font-data text-[10px] text-muted-foreground">{getTimestamp(timer)}</span>
          <div className="mt-1 px-2 py-0.5 border border-rust-gold/40 bg-rust-gold/10">
            <span className="font-data text-[9px] text-rust-gold font-bold tracking-wider">POT: {pot} SHARD</span>
          </div>
          {battle && (
            <div className="mt-2 text-center">
              <p className="font-data text-[8px] uppercase tracking-[0.25em] text-muted-foreground">{battle.lobby.arena}</p>
              <p className="font-data text-[8px] uppercase tracking-[0.25em] text-muted-foreground">{battle.lobby.mode}</p>
            </div>
          )}
        </div>

        <div className="flex-1 p-3 flex items-center gap-3 flex-row-reverse">
          <div className="relative w-12 h-12 border border-glitch-cyan/40 overflow-hidden flex-shrink-0">
            <img src={opponentImage} alt={opponentTitle} className="w-full h-full object-cover" />
            {opponentDamageFlash && <div className="damage-overlay" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="font-data text-[10px] text-glitch-cyan">{opponentHp}/100 HP</span>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-foreground">{opponentTitle}</span>
            </div>
            <div className={`hp-tube h-5 bg-void-black relative ${sloshing ? "hp-sloshing" : ""}`}>
              <div className="hp-tube-liquid transition-all duration-700" style={{ height: `${opponentHp}%`, background: `linear-gradient(0deg, ${hpColor(opponentHp)}, ${hpColor(opponentHp)}cc)` }} />
              <div className="hp-tube-segments" />
              <div className="hp-bolt top-0 left-0" /><div className="hp-bolt top-0 right-0" />
              <div className="hp-bolt bottom-0 left-0" /><div className="hp-bolt bottom-0 right-0" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex" style={{ height: "calc(100vh - 76px - 56px)" }}>
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <div className="absolute left-[10%] bottom-[15%] w-[35%] max-w-[300px]">
            <div className="relative border border-neon-claw/20 bg-card/20 overflow-hidden">
              <img src={playerImage} alt={playerTitle} className="w-full aspect-square object-cover" />
              {playerDamageFlash && <div className="damage-overlay" />}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-neon-claw/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-claw/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-neon-claw/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-claw/50" />
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-neon-claw font-data text-[8px] uppercase tracking-wider text-primary-foreground turn-active">
                {loading ? "SYNCING" : showPotIntro ? "LOBBY" : battleOver ? "CEREMONY" : "LIVE FEED"}
              </div>
            </div>
            <p className="mt-2 font-data text-[9px] uppercase tracking-[0.2em] text-neon-claw/80">{playerTraits || "AGGRESSIVE / LOYAL"}</p>
          </div>

          <div className="absolute right-[10%] top-[10%] w-[30%] max-w-[260px]">
            <div className="relative border border-glitch-cyan/20 bg-card/20 overflow-hidden">
              <img src={opponentImage} alt={opponentTitle} className="w-full aspect-square object-cover" />
              {opponentDamageFlash && <div className="damage-overlay" />}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-glitch-cyan/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-glitch-cyan/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-glitch-cyan/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-glitch-cyan/50" />
            </div>
            <p className="mt-2 font-data text-[9px] uppercase tracking-[0.2em] text-glitch-cyan/80 text-right">{opponentTraits || "CALCULATED / VAIN"}</p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-marker text-4xl text-neon-claw/20 select-none">VS</span>
          </div>

          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 bg-card/80 border border-border backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-neon-claw animate-pulse" />
            <span className="font-data text-[9px] text-foreground uppercase tracking-wider">LIVE</span>
            <span className="font-data text-[9px] text-muted-foreground">{viewerCount.toLocaleString()} watching</span>
          </div>

          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/35 backdrop-blur-sm">
              <div className="border border-border bg-card/80 px-6 py-4 text-center">
                <p className="font-display text-lg uppercase tracking-[0.2em] text-foreground">Syncing Arena Feed</p>
                <p className="mt-2 font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Preparing lobby, staking pot, and event stream</p>
              </div>
            </div>
          )}
        </div>

        <div className="w-[340px] border-l border-border flex flex-col bg-card/50">
          <div className="p-3 border-b border-border">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <RageMeterIcon size={14} className="text-neon-claw" />
                <span className="font-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground">RAGE METER</span>
              </div>
              <span className={`font-data text-[10px] font-bold ${rage >= 90 ? "text-neon-claw" : rage >= 50 ? "text-rust-gold" : "text-muted-foreground"}`}>
                {rage}%
              </span>
            </div>
            <div className={`h-3 bg-void-black border border-static-gray relative overflow-hidden ${rage >= 90 ? "rage-active" : ""}`}>
              <div className="h-full transition-all duration-500" style={{ width: `${rage}%`, background: rage >= 90 ? `linear-gradient(90deg, hsl(var(--neon-claw)), hsl(var(--rust-gold)))` : rage >= 50 ? `hsl(var(--rust-gold))` : `hsl(var(--neon-claw) / 0.6)` }} />
              {[25, 50, 75].map((tick) => (
                <div key={tick} className="absolute top-0 bottom-0 w-px bg-static-gray-light/40" style={{ left: `${tick}%` }} />
              ))}
            </div>
            <p className="font-data text-[9px] text-muted-foreground mt-1 uppercase tracking-wider">
              {battle ? `${battle.lobby.arena} // ${battle.lobby.mode} // ${battle.lobby.entry_fee} SHARD ENTRY` : "Awaiting arena feed"}
            </p>
          </div>

          <div className="flex-1 flex flex-col min-h-0" style={{ maxHeight: "45%" }}>
            <div className="px-3 py-2 border-b border-border flex items-center gap-2">
              <div className="w-2 h-2 bg-toxic-shard" />
              <span className="font-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground">COMBAT LOG</span>
            </div>
            <div ref={logRef} className="battle-log flex-1 overflow-y-auto p-3 space-y-1">
              {log.map((entry) => (
                <div key={entry.id} className="log-entry flex gap-2">
                  <span className="font-data text-[9px] text-muted-foreground/50 flex-shrink-0 w-10">{entry.timestamp}</span>
                  <span className={`font-data text-[10px] ${logColor(entry.type)}`}>{entry.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col min-h-0 border-t border-border">
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-claw animate-pulse" />
                <span className="font-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground">LIVE CHAT</span>
              </div>
              <span className="font-data text-[8px] text-muted-foreground/50">{viewerCount} viewers</span>
            </div>
            <div ref={chatRef} className="spectator-chat flex-1 overflow-y-auto p-2 space-y-0.5">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="chat-entry flex gap-1.5 text-[10px]">
                  <span className={`font-data font-bold flex-shrink-0 ${msg.name === "YOU" ? "text-toxic-shard" : msg.color}`}>
                    {msg.name}:
                  </span>
                  <span className="font-data text-foreground/80">{msg.text}</span>
                </div>
              ))}
              {chatMessages.length === 0 && (
                <p className="font-data text-[9px] text-muted-foreground/40 text-center py-4">spectators connecting...</p>
              )}
            </div>
            <div className="p-2 border-t border-border flex gap-1.5">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value.slice(0, 80))}
                onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
                placeholder="Say something..."
                maxLength={80}
                className="flex-1 bg-void-black border border-static-gray px-2 py-1 font-data text-[10px] text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-toxic-shard/50"
              />
              <button
                onClick={handleChatSend}
                className="px-2 py-1 border border-toxic-shard/40 bg-toxic-shard/10 font-data text-[9px] text-toxic-shard uppercase tracking-wider hover:bg-toxic-shard/20 transition-colors"
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-border bg-card/90 backdrop-blur-sm">
        <div className="flex items-center gap-2 p-3">
          <button
            onClick={handleAbortFeed}
            className="flex items-center gap-1.5 px-3 py-2 border border-rust-gold/40 bg-rust-gold/5 font-data text-[10px] uppercase tracking-wider text-rust-gold hover:bg-rust-gold/15 transition-colors"
          >
            <SurrenderFlagIcon size={14} className="text-rust-gold" />
            ABORT FEED
          </button>
          <div className="flex-1 flex items-center gap-2 border border-toxic-shard/30 bg-void-black px-3 py-2">
            <TransmitIcon size={14} className="text-toxic-shard/60 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value.slice(0, 50))}
              onKeyDown={(e) => e.key === "Enter" && handleCommand()}
              placeholder={battleOver ? "TYPE REMATCH TO RUN ANOTHER BATTLE" : loading ? "SYNCING EVENT STREAM..." : "ARENA RUNS AUTONOMOUSLY"}
              maxLength={50}
              className="terminal-input flex-1 bg-transparent font-data text-xs text-toxic-shard placeholder:text-toxic-shard/30 outline-none border-none uppercase tracking-wider"
            />
            <span className="font-data text-[9px] text-muted-foreground/40">{command.length}/50</span>
          </div>
          <button
            onClick={handleCommand}
            className="px-4 py-2 border border-neon-claw bg-neon-claw/10 font-display text-xs font-bold uppercase tracking-wider text-neon-claw hover:bg-neon-claw hover:text-primary-foreground transition-colors"
          >
            {battleOver ? "REMATCH" : "TRANSMIT"}
          </button>
        </div>
      </div>

      {ceremonyReady && winner && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-void-black/80 backdrop-blur-sm">
          <div className="text-center max-w-xl px-6">
            <p className={`font-display text-3xl font-bold uppercase tracking-wider ${winner === "player" ? "text-toxic-shard" : "text-neon-claw"} chromatic`}>
              {winner === "player" ? "VICTORY" : "DEFEAT"}
            </p>
            <div className="mt-3 px-4 py-2 border border-rust-gold/50 bg-rust-gold/10 inline-block">
              <p className="font-data text-sm text-rust-gold font-bold">{rewardText || `POT WON: ${winnerReward} SHARD`}</p>
            </div>
            <p className="font-data text-[10px] text-muted-foreground mt-3 uppercase tracking-wider">
              {battle?.winner === battle?.agent_a ? `${playerTitle} takes the arena` : `${opponentTitle} takes the arena`}
            </p>
            <div className="mt-4 border border-border bg-card/80 p-4 text-left">
              <p className="font-data text-[10px] uppercase tracking-[0.2em] text-neon-claw mb-2">LEARNING UPDATE</p>
              <div className="space-y-1">
                {learningUpdates.map((update, index) => (
                  <p key={`${update}-${index}`} className="font-data text-[10px] text-foreground/80">{update}</p>
                ))}
              </div>
            </div>
            <button
              onClick={() => void loadBattle()}
              className="mt-4 px-6 py-2 border border-foreground/30 bg-card font-data text-[10px] uppercase tracking-wider text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              RUN REMATCH
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleArena;
