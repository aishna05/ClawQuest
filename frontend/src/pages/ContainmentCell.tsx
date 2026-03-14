import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  CrossedClawsIcon,
  DnaGearIcon,
  ChrysalisIcon,
  BladeTagIcon,
  CircuitLockIcon,
  BrokenChainIcon,
  DragHandIcon,
  BoltIcon,
} from "@/components/ContainmentIcons";
import { getBeastById, BEASTS, BeastData } from "@/data/beasts";

type TabKey = "BIOLOGY" | "COMBAT" | "LINEAGE" | "MEMORY";

const TABS: TabKey[] = ["BIOLOGY", "COMBAT", "LINEAGE", "MEMORY"];

const moodColors: Record<string, string> = {
  AGGRESSIVE: "hsl(var(--neon-claw))",
  CALM: "hsl(var(--glitch-cyan))",
  UNSTABLE: "hsl(var(--rust-gold))",
  PROUD: "hsl(var(--toxic-shard))",
  CONFIDENT: "hsl(var(--rust-gold))",
};

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-6 h-28 border border-static-gray bg-background overflow-hidden">
      <div
        className="absolute bottom-0 left-0 w-full stat-bar-fill liquid-fill"
        style={{ "--fill-height": `${value}%`, background: color } as React.CSSProperties}
      />
      <div className="absolute inset-0 hp-segment" />
    </div>
    <span className="font-data text-[8px] text-muted-foreground tracking-wider text-center w-12">{label}</span>
    <span className="font-data text-[10px] text-foreground">{value}%</span>
  </div>
);

const DnaHelix = () => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const rungs = 8;
  return (
    <svg viewBox="0 0 120 200" className="w-24 h-40 mx-auto dna-rotate">
      {Array.from({ length: rungs }).map((_, i) => {
        const y = 15 + i * 22;
        const offset = Math.sin((i / rungs) * Math.PI * 2) * 20;
        const isActive = activeSegment === i;
        return (
          <g key={i} onClick={() => setActiveSegment(i === activeSegment ? null : i)} className="cursor-pointer">
            <circle cx={40 + offset} cy={y} r="4" fill={isActive ? "hsl(var(--glitch-cyan))" : "hsl(var(--static-gray-light))"} />
            <circle cx={80 - offset} cy={y} r="4" fill={isActive ? "hsl(var(--glitch-cyan))" : "hsl(var(--static-gray-light))"} />
            <line x1={40 + offset} y1={y} x2={80 - offset} y2={y}
              stroke={isActive ? "hsl(var(--glitch-cyan))" : "hsl(var(--static-gray) / 0.5)"} strokeWidth={isActive ? 2 : 1} />
          </g>
        );
      })}
      <path d={Array.from({ length: rungs }).map((_, i) => {
        const y = 15 + i * 22; const offset = Math.sin((i / rungs) * Math.PI * 2) * 20;
        return `${i === 0 ? "M" : "L"}${40 + offset},${y}`;
      }).join(" ")} stroke="hsl(var(--neon-claw) / 0.4)" strokeWidth="1.5" fill="none" />
      <path d={Array.from({ length: rungs }).map((_, i) => {
        const y = 15 + i * 22; const offset = Math.sin((i / rungs) * Math.PI * 2) * 20;
        return `${i === 0 ? "M" : "L"}${80 - offset},${y}`;
      }).join(" ")} stroke="hsl(var(--glitch-cyan) / 0.4)" strokeWidth="1.5" fill="none" />
    </svg>
  );
};

const RadarChart = ({ stats }: { stats: Record<string, number> }) => {
  const keys = Object.keys(stats);
  const cx = 80, cy = 80, r = 60;
  const angles = keys.map((_, i) => (i / keys.length) * Math.PI * 2 - Math.PI / 2);
  const points = keys.map((k, i) => {
    const val = stats[k] / 100;
    return `${cx + Math.cos(angles[i]) * r * val},${cy + Math.sin(angles[i]) * r * val}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 160 160" className="w-full max-w-[200px] mx-auto">
      {[0.25, 0.5, 0.75, 1].map((ring) => (
        <polygon key={ring}
          points={angles.map((a) => `${cx + Math.cos(a) * r * ring},${cy + Math.sin(a) * r * ring}`).join(" ")}
          fill="none" stroke="hsl(var(--static-gray) / 0.3)" strokeWidth="1" />
      ))}
      {angles.map((a, i) => (
        <g key={i}>
          <line x1={cx} y1={cy} x2={cx + Math.cos(a) * r} y2={cy + Math.sin(a) * r}
            stroke="hsl(var(--static-gray) / 0.2)" strokeWidth="1" />
          <text x={cx + Math.cos(a) * (r + 14)} y={cy + Math.sin(a) * (r + 14)}
            fill="hsl(var(--muted-foreground))" fontSize="6" textAnchor="middle" dominantBaseline="middle"
            fontFamily="'Share Tech Mono', monospace">
            {keys[i].slice(0, 4).toUpperCase()}
          </text>
        </g>
      ))}
      <polygon points={points} fill="hsl(var(--neon-claw) / 0.15)" stroke="hsl(var(--neon-claw))" strokeWidth="1.5" className="radar-line" />
      {keys.map((k, i) => {
        const val = stats[k] / 100;
        return <circle key={k} cx={cx + Math.cos(angles[i]) * r * val} cy={cy + Math.sin(angles[i]) * r * val} r="3" fill="hsl(var(--neon-claw))" />;
      })}
    </svg>
  );
};

const ContainmentCell = () => {
  const navigate = useNavigate();
  const { beastId } = useParams<{ beastId: string }>();
  const [activeTab, setActiveTab] = useState<TabKey>("BIOLOGY");
  const [tabGlitch, setTabGlitch] = useState(false);

  const beast: BeastData | undefined = beastId ? getBeastById(beastId) : BEASTS[0];

  if (!beast) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-neon-claw tracking-wider mb-4">SPECIMEN NOT FOUND</h1>
          <p className="font-data text-[10px] text-muted-foreground tracking-[0.2em] mb-6">CONTAINMENT CELL EMPTY</p>
          <button onClick={() => navigate("/registry")}
            className="border-2 border-neon-claw bg-neon-claw/10 px-6 py-3 font-display text-xs text-neon-claw tracking-[0.2em] hover:bg-neon-claw hover:text-primary-foreground transition-all">
            RETURN TO REGISTRY
          </button>
        </div>
      </div>
    );
  }

  const switchTab = (tab: TabKey) => {
    setTabGlitch(true);
    setTimeout(() => { setActiveTab(tab); setTabGlitch(false); }, 150);
  };

  const moodColor = moodColors[beast.mood] || "hsl(var(--muted-foreground))";
  const rarityLabel = beast.rarity.toUpperCase();

  return (
    <div className="min-h-screen bg-background containment-grid">
      {/* Top bar */}
      <div className="border-b border-border bg-card/80 px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("/registry")}
          className="font-data text-[10px] text-muted-foreground hover:text-neon-claw tracking-[0.2em] transition-colors">
          &lt; RETURN TO REGISTRY
        </button>
        <h1 className="font-display text-sm text-foreground tracking-[0.2em]">
          CONTAINMENT CELL — {beast.name}
        </h1>
        <div className="font-data text-[10px] text-muted-foreground tracking-wider">
          GEN: {beast.gen} | XP: {beast.xp}/{beast.xpNext}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-49px-61px)]">
        {/* LEFT — Beast Viewer (60%) */}
        <div className="lg:w-[60%] relative flex items-center justify-center p-6 beast-viewer">
          <div className="observation-frame relative w-full max-w-xl aspect-square bg-card/30 overflow-hidden stasis-scan">
            {/* Corner bolts */}
            <div className="absolute top-2 left-2"><BoltIcon size={10} className="text-static-gray-light" /></div>
            <div className="absolute top-2 right-2"><BoltIcon size={10} className="text-static-gray-light" /></div>
            <div className="absolute bottom-2 left-2"><BoltIcon size={10} className="text-static-gray-light" /></div>
            <div className="absolute bottom-2 right-2"><BoltIcon size={10} className="text-static-gray-light" /></div>

            <div className="frost-overlay" />

            {/* Ice particles */}
            <div className="ice-particle" style={{ top: "15%", left: "20%" }} />
            <div className="ice-particle" style={{ top: "30%", left: "70%" }} />
            <div className="ice-particle" style={{ top: "60%", left: "15%" }} />
            <div className="ice-particle" style={{ top: "45%", left: "80%" }} />
            <div className="ice-particle" style={{ top: "75%", left: "50%" }} />
            <div className="ice-particle" style={{ top: "20%", left: "55%" }} />

            <img src={beast.image} alt={`${beast.name} beast specimen`}
              className="relative z-10 w-full h-full object-contain p-8" />

            <div className="breath-fog" />

            <div className="absolute top-4 right-4 z-20 font-marker text-lg text-neon-claw tracking-wider px-3 py-1 border-2 border-neon-claw/60 bg-neon-claw/10"
              style={{ transform: "rotate(-5deg)" }}>
              {rarityLabel}
            </div>

            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 orb-pulse">
              <div className="w-4 h-4 rounded-full" style={{ background: moodColor, boxShadow: `0 0 12px ${moodColor}` }} />
              <span className="font-data text-[9px] tracking-[0.2em]" style={{ color: moodColor }}>{beast.mood}</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 text-muted-foreground/40">
              <DragHandIcon size={16} className="text-muted-foreground/40" />
              <span className="font-data text-[8px] tracking-wider">DRAG TO ROTATE</span>
            </div>

            <div className="absolute top-4 left-4 z-20">
              <span className="font-data text-[9px] text-glitch-cyan/60 tracking-[0.3em]">CRYOGENIC STASIS</span>
            </div>
          </div>
        </div>

        {/* RIGHT — Data Terminal (40%) */}
        <div className="lg:w-[40%] border-l border-border flex flex-col bg-card/20">
          <div className="flex border-b border-border">
            {TABS.map((tab) => (
              <button key={tab} onClick={() => switchTab(tab)}
                className={`flex-1 px-2 py-3 font-display text-[10px] tracking-[0.15em] transition-colors border-b-2 ${
                  activeTab === tab ? "text-neon-claw border-neon-claw bg-neon-claw/5" : "text-muted-foreground border-transparent hover:text-foreground hover:bg-secondary/30"
                }`}>
                {tab}
              </button>
            ))}
          </div>

          <div className={`flex-1 overflow-y-auto p-5 ${tabGlitch ? "tab-glitch" : ""}`}>
            {activeTab === "BIOLOGY" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">DNA STRUCTURE</h3>
                  <DnaHelix />
                  <p className="font-data text-[8px] text-muted-foreground/60 text-center mt-1 tracking-wider">CLICK SEGMENTS TO INSPECT</p>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">PERSONALITY MATRIX</h3>
                  <RadarChart stats={beast.stats} />
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">HYDRAULIC READOUTS</h3>
                  <div className="flex justify-between px-2">
                    {Object.entries(beast.stats).map(([key, val]) => (
                      <StatBar key={key} label={key.slice(0, 4).toUpperCase()} value={val}
                        color={key === "unstable" ? "hsl(var(--rust-gold))" : key === "loyal" ? "hsl(var(--toxic-shard))" : key === "calculated" ? "hsl(var(--glitch-cyan))" : "hsl(var(--neon-claw))"} />
                    ))}
                  </div>
                </div>
                <div className="border border-rust-gold/30 bg-rust-gold/5 p-3">
                  <span className="font-data text-[10px] text-rust-gold tracking-[0.2em]">RAGE QUIT PROBABILITY: {beast.rageQuitProb}%</span>
                  <div className="mt-2 h-1.5 bg-background overflow-hidden">
                    <div className="h-full bg-rust-gold stat-bar-fill"
                      style={{ "--fill-height": `${beast.rageQuitProb}%`, width: `${beast.rageQuitProb}%` } as React.CSSProperties} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "COMBAT" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">BATTLE SCARS</h3>
                  <div className="flex gap-4">
                    <div className="flex-1 border border-toxic-shard/30 bg-toxic-shard/5 p-3 text-center">
                      <div className="font-data text-2xl text-toxic-shard">{beast.record.wins}</div>
                      <div className="font-data text-[8px] text-muted-foreground tracking-wider">VICTORIES</div>
                    </div>
                    <div className="flex-1 border border-neon-claw/30 bg-neon-claw/5 p-3 text-center">
                      <div className="font-data text-2xl text-neon-claw">{beast.record.losses}</div>
                      <div className="font-data text-[8px] text-muted-foreground tracking-wider">DEFEATS</div>
                    </div>
                    <div className="flex-1 border border-static-gray/30 bg-secondary/20 p-3 text-center">
                      <div className="font-data text-2xl text-foreground">{beast.record.draws}</div>
                      <div className="font-data text-[8px] text-muted-foreground tracking-wider">DRAWS</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">RECENT ENGAGEMENTS</h3>
                  <div className="bg-background border border-border p-3 font-mono text-xs space-y-2 max-h-48 overflow-y-auto">
                    {beast.battles.map((b) => (
                      <div key={b.id} className="flex items-center justify-between">
                        <div>
                          <span className="text-muted-foreground">{b.id}</span>{" "}
                          <span className="text-foreground">VS {b.opponent}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={b.outcome === "VICTORY" ? "text-toxic-shard" : "text-neon-claw"}>{b.outcome}</span>
                          <span className="text-muted-foreground text-[9px]">{b.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3 flex items-center gap-2">
                    <BrokenChainIcon size={14} className="text-neon-claw" /> GRUDGES DETECTED
                  </h3>
                  <div className="space-y-2">
                    {beast.grudges.map((g) => (
                      <div key={g.name} className="grudge-item border border-neon-claw/20 bg-neon-claw/5 p-3 flex items-center justify-between">
                        <span className="font-display text-[10px] text-neon-claw tracking-wider">{g.name}</span>
                        <span className="font-data text-[8px] text-muted-foreground">{g.reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "LINEAGE" && (
              <div className="space-y-6">
                <div className="text-center border border-border p-4 bg-secondary/10">
                  <div className="font-display text-4xl text-foreground tracking-wider">GEN: {beast.gen}</div>
                  <div className="font-data text-[9px] text-muted-foreground tracking-[0.2em] mt-1">ITERATION DEPTH</div>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">GENETIC ORIGIN</h3>
                  <svg viewBox="0 0 300 120" className="w-full">
                    <rect x="10" y="10" width="120" height="30" stroke="hsl(var(--glitch-cyan))" strokeWidth="1" fill="hsl(var(--glitch-cyan) / 0.05)" />
                    <text x="70" y="29" fill="hsl(var(--glitch-cyan))" fontSize="8" textAnchor="middle" fontFamily="'Share Tech Mono', monospace">{beast.lineage.parent1}</text>
                    <rect x="170" y="10" width="120" height="30" stroke="hsl(var(--neon-claw))" strokeWidth="1" fill="hsl(var(--neon-claw) / 0.05)" />
                    <text x="230" y="29" fill="hsl(var(--neon-claw))" fontSize="8" textAnchor="middle" fontFamily="'Share Tech Mono', monospace">{beast.lineage.parent2}</text>
                    <path d="M70 40 L70 60 L150 60" stroke="hsl(var(--glitch-cyan) / 0.5)" strokeWidth="1.5" fill="none" className="circuit-trace" />
                    <path d="M230 40 L230 60 L150 60" stroke="hsl(var(--neon-claw) / 0.5)" strokeWidth="1.5" fill="none" className="circuit-trace" />
                    <rect x="90" y="80" width="120" height="30" stroke="hsl(var(--rust-gold))" strokeWidth="1.5" fill="hsl(var(--rust-gold) / 0.05)" />
                    <text x="150" y="99" fill="hsl(var(--rust-gold))" fontSize="9" textAnchor="middle" fontFamily="'Chakra Petch', sans-serif" fontWeight="bold">{beast.name}</text>
                    <line x1="150" y1="60" x2="150" y2="80" stroke="hsl(var(--rust-gold) / 0.5)" strokeWidth="1.5" className="circuit-trace" />
                    <circle cx="150" cy="60" r="3" fill="hsl(var(--toxic-shard))" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">MUTATION HISTORY</h3>
                  <div className="space-y-2">
                    {beast.lineage.mutations.map((m, i) => (
                      <div key={i} className="flex items-start gap-3 border-l-2 border-toxic-shard/30 pl-3 py-1">
                        <span className="font-data text-[9px] text-toxic-shard">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "MEMORY" && (
              <div className="space-y-6">
                <div className="border border-glitch-cyan/30 bg-glitch-cyan/5 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-data text-[10px] text-glitch-cyan tracking-[0.2em]">LEARNING PROGRESS</span>
                    <span className="font-data text-sm text-glitch-cyan">{beast.learningProgress}%</span>
                  </div>
                  <div className="h-2 bg-background overflow-hidden">
                    <div className="h-full bg-glitch-cyan stat-bar-fill"
                      style={{ "--fill-height": `${beast.learningProgress}%`, width: `${beast.learningProgress}%` } as React.CSSProperties} />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-[10px] text-muted-foreground tracking-[0.2em] mb-3">RECORDED MEMORIES</h3>
                  <div className="space-y-3">
                    {beast.memories.map((mem, i) => (
                      <div key={i} className="bg-background border border-border p-3">
                        <div className="font-mono text-[10px] text-foreground mb-1">{mem.event}</div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-data text-[8px] tracking-wider">
                          <span className="text-muted-foreground">BATTLE: <span className="text-foreground">{mem.battle}</span></span>
                          <span className="text-muted-foreground">OUTCOME: <span className={mem.outcome === "VICTORY" ? "text-toxic-shard" : "text-neon-claw"}>{mem.outcome}</span></span>
                          <span className="text-muted-foreground">EMOTION: <span className="text-rust-gold">{mem.emotion}</span></span>
                        </div>
                        <div className="mt-2 h-1 bg-secondary overflow-hidden">
                          <div className="h-full bg-toxic-shard/60" style={{ width: `${mem.learning}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ACTION DOCK */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/95 backdrop-blur-sm px-4 py-3 z-30">
        <div className="flex gap-3 max-w-5xl mx-auto">
          <button onClick={() => navigate("/crucible")}
            className="hydraulic-press flex-[2] border-2 border-neon-claw bg-neon-claw/10 py-3 font-display text-xs font-bold uppercase tracking-[0.15em] text-neon-claw transition-all hover:bg-neon-claw hover:text-primary-foreground animate-breathe flex items-center justify-center gap-2">
            <CrossedClawsIcon size={18} className="text-current" /> INITIATE COMBAT
          </button>
          <button className="hydraulic-press flex-1 border-2 border-toxic-shard bg-toxic-shard/10 py-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-toxic-shard transition-all hover:bg-toxic-shard hover:text-accent-foreground flex items-center justify-center gap-2">
            <DnaGearIcon size={16} className="text-current" /> BREEDING PROTOCOL
          </button>
          <button className="hydraulic-press flex-1 border-2 border-rust-gold/40 bg-rust-gold/5 py-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-rust-gold/50 cursor-not-allowed flex items-center justify-center gap-2">
            <CircuitLockIcon size={16} className="text-current" /> FORCE EVOLUTION
          </button>
          <button className="hydraulic-press flex-1 border-2 border-glitch-cyan bg-glitch-cyan/10 py-3 font-display text-[10px] font-bold uppercase tracking-[0.15em] text-glitch-cyan transition-all hover:bg-glitch-cyan hover:text-accent-foreground flex items-center justify-center gap-2">
            <BladeTagIcon size={16} className="text-current" /> LIST SPECIMEN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainmentCell;
