import { useState, useEffect } from "react";
import { AttackIcon, DefendIcon, ImprovIcon, BoltIcon } from "./ClawIcons";

const battleLog = [
  { time: "00:42", text: "IRON MAW uses HYDRAULIC CRUSH — 847 DMG", type: "attack" },
  { time: "00:41", text: "PRISMA DANCER evades! GLASS REFRACTION active", type: "defend" },
  { time: "00:39", text: "Player_0xDEAD sends improv: \"GO FOR THE EYES!\"", type: "improv" },
  { time: "00:37", text: "IRON MAW enters BERSERK MODE — frustration critical", type: "rage" },
  { time: "00:35", text: "CRITICAL HIT — 2,341 DMG — PRISMA DANCER at 12% HP", type: "attack" },
  { time: "00:33", text: "PRISMA DANCER activates EMERGENCY PROTOCOL", type: "defend" },
  { time: "00:31", text: "WARNING: RAGE QUIT PROBABILITY 78%", type: "rage" },
];

const typeColors: Record<string, string> = {
  attack: "text-neon-claw",
  defend: "text-glitch-cyan",
  improv: "text-toxic-shard",
  rage: "text-rust-gold",
};

const BattlePreview = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => (prev >= battleLog.length ? 0 : prev + 1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative border-y border-border bg-card/30 py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left: Battle description */}
          <div>
            <p className="mb-2 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
              /// Combat Protocol
            </p>
            <h2 className="mb-6 font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
              Tactical Chaos.<br />
              <span className="text-muted-foreground">Real-Time.</span>
            </h2>
            <p className="mb-8 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
              Beasts fight autonomously using learned behavior. You don't control them —
              you collaborate. Send improv commands. Adapt. Pray they don't rage-quit.
            </p>

            {/* Command types */}
            <div className="space-y-3">
              {[
                { icon: <AttackIcon size={16} />, name: "AGGRESSION", desc: "+30% ATK, -20% DEF. Beast may ignore if timid.", color: "text-neon-claw" },
                { icon: <DefendIcon size={16} />, name: "DEFENSE", desc: "Shield mode + counter window. Chat boos if boring.", color: "text-glitch-cyan" },
                { icon: <ImprovIcon size={16} />, name: "IMPROV", desc: "Free-form command. Beast interprets creatively.", color: "text-toxic-shard" },
                { icon: <BoltIcon size={16} />, name: "GAMBLE", desc: "Random high-impact. Could heal enemy or one-shot.", color: "text-rust-gold" },
              ].map((cmd) => (
                <div key={cmd.name} className="flex items-start gap-3 border border-border/50 bg-secondary/30 p-3 transition-colors hover:bg-secondary/50">
                  <span className={cmd.color}>{cmd.icon}</span>
                  <div>
                    <span className={`font-display text-xs font-bold uppercase ${cmd.color}`}>{cmd.name}</span>
                    <p className="font-mono text-[10px] text-muted-foreground">{cmd.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Live battle terminal */}
          <div className="relative">
            <div className="border border-border bg-background/80 p-1">
              {/* Terminal header */}
              <div className="flex items-center justify-between border-b border-border bg-secondary/50 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-neon-claw" />
                  <span className="font-data text-[10px] uppercase tracking-wider text-neon-claw">
                    LIVE BATTLE FEED
                  </span>
                </div>
                <span className="font-data text-[10px] text-muted-foreground">ARENA-07</span>
              </div>

              {/* HP Bars */}
              <div className="space-y-2 border-b border-border p-4">
                <div>
                  <div className="mb-1 flex justify-between font-data text-[10px]">
                    <span className="text-neon-claw">IRON MAW</span>
                    <span className="text-foreground">89/100</span>
                  </div>
                  <div className="h-3 w-full bg-secondary">
                    <div className="h-full bg-neon-claw transition-all" style={{ width: "89%" }} />
                  </div>
                </div>
                <div className="text-center font-display text-xs text-muted-foreground">VS</div>
                <div>
                  <div className="mb-1 flex justify-between font-data text-[10px]">
                    <span className="text-glitch-cyan">PRISMA DANCER</span>
                    <span className="text-foreground">12/100</span>
                  </div>
                  <div className="h-3 w-full bg-secondary">
                    <div className="h-full bg-glitch-cyan transition-all" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>

              {/* Battle log */}
              <div className="h-64 overflow-hidden p-4">
                <div className="space-y-1.5">
                  {battleLog.slice(0, visibleLines).map((line, i) => (
                    <div key={i} className="flex gap-2 font-mono text-[11px] animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                      <span className="text-muted-foreground">[{line.time}]</span>
                      <span className={typeColors[line.type]}>{line.text}</span>
                    </div>
                  ))}
                  <span className="inline-block h-3 w-1.5 animate-pulse bg-toxic-shard" />
                </div>
              </div>

              {/* Input */}
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2 bg-secondary/30 px-3 py-2">
                  <span className="font-data text-[10px] text-toxic-shard">&gt;</span>
                  <span className="font-mono text-xs text-muted-foreground">Type improv command...</span>
                  <span className="ml-auto inline-block h-3 w-1 animate-pulse bg-toxic-shard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BattlePreview;
