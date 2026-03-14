import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BEASTS, BeastData } from "@/data/beasts";
import { AttackIcon, DefendIcon, RageIcon, SkullIcon } from "@/components/ClawIcons";
import { CrossedClawsIcon } from "@/components/ContainmentIcons";

type RarityFilter = "ALL" | "common" | "rare" | "legendary";

const rarityStyles = {
  common: { border: "border-static-gray-light", tag: "text-muted-foreground bg-secondary", label: "COMMON" },
  rare: { border: "border-glitch-cyan/50", tag: "text-glitch-cyan bg-glitch-cyan/10", label: "RARE" },
  legendary: { border: "border-rust-gold/50", tag: "text-rust-gold bg-rust-gold/10", label: "LEGENDARY" },
};

const RegistryCard = ({ beast }: { beast: BeastData }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const r = rarityStyles[beast.rarity];
  const hpPercent = (beast.hp / beast.maxHp) * 100;

  return (
    <div
      onClick={() => navigate(`/containment/${beast.id}`)}
      className={`chamfer noise relative border ${r.border} bg-card transition-all duration-300 cursor-pointer group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered
          ? "perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.03)"
          : "perspective(1000px) rotateY(0) rotateX(0)",
      }}
    >
      {/* Holo shimmer on hover */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-20 animate-holo opacity-20"
          style={{
            background: "linear-gradient(135deg, transparent 30%, hsl(var(--glitch-cyan) / 0.3) 50%, transparent 70%)",
          }}
        />
      )}

      {/* "OPEN CONTAINMENT" overlay on hover */}
      {isHovered && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background/60 backdrop-blur-sm">
          <div className="flex items-center gap-2 border-2 border-neon-claw bg-neon-claw/10 px-5 py-2.5">
            <CrossedClawsIcon size={16} className="text-neon-claw" />
            <span className="font-display text-xs text-neon-claw tracking-[0.2em]">
              OPEN CONTAINMENT CELL
            </span>
          </div>
        </div>
      )}

      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={beast.image}
          alt={beast.name}
          className="h-full w-full object-cover transition-all duration-300"
          style={{ filter: isHovered ? "none" : "saturate(0.8) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <span className={`absolute right-2 top-2 -rotate-2 px-2 py-0.5 font-marker text-xs ${r.tag}`}>
          {r.label}
        </span>
        <span className="absolute bottom-2 left-3 font-data text-[10px] text-muted-foreground">
          GEN:{beast.gen}
        </span>
      </div>

      {/* Data */}
      <div className="p-4">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold uppercase text-foreground">{beast.name}</h3>
          <div
            className="h-3 w-3 rounded-full"
            style={{ background: beast.moodColor, boxShadow: `0 0 8px ${beast.moodColor}` }}
            title={beast.mood}
          />
        </div>
        <p className="mb-3 font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{beast.type}</p>

        {/* HP Bar */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between font-data text-[10px]">
            <span className="text-muted-foreground">HP</span>
            <span className="text-foreground">{beast.hp}/{beast.maxHp}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden bg-secondary">
            <div
              className="hp-segment absolute inset-y-0 left-0 transition-all duration-500"
              style={{
                width: `${hpPercent}%`,
                background:
                  hpPercent > 50
                    ? "hsl(var(--toxic-shard))"
                    : hpPercent > 25
                      ? "hsl(var(--rust-gold))"
                      : "hsl(var(--neon-claw))",
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mb-3 grid grid-cols-3 gap-2">
          {[
            { icon: <AttackIcon size={14} />, label: "ATK", value: beast.atk },
            { icon: <DefendIcon size={14} />, label: "DEF", value: beast.def },
            { icon: <RageIcon size={14} />, label: "SPD", value: beast.spd },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5 font-data text-[11px]">
              <span className="text-muted-foreground">{stat.icon}</span>
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Record summary */}
        <div className="flex items-center gap-3 border-t border-border pt-2 font-data text-[9px] tracking-wider">
          <span className="text-toxic-shard">{beast.record.wins}W</span>
          <span className="text-neon-claw">{beast.record.losses}L</span>
          <span className="text-muted-foreground">{beast.record.draws}D</span>
          <span className="ml-auto text-muted-foreground">RAGE: {beast.rageQuitProb}%</span>
        </div>

        <div className="flex items-center gap-2 border-t border-border pt-2 mt-2">
          <SkullIcon size={12} className="text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">{beast.personality}</span>
        </div>
      </div>
    </div>
  );
};

const Registry = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<RarityFilter>("ALL");

  const filtered = filter === "ALL" ? BEASTS : BEASTS.filter((b) => b.rarity === filter);

  return (
    <div className="min-h-screen bg-background containment-grid scanlines vignette">
      {/* Top bar */}
      <div className="border-b border-border bg-card/80 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="font-data text-[10px] text-muted-foreground hover:text-neon-claw tracking-[0.2em] transition-colors"
        >
          &lt; EXIT REGISTRY
        </button>
        <h1 className="font-display text-sm text-foreground tracking-[0.2em]">
          SPECIMEN REGISTRY
        </h1>
        <div className="font-data text-[10px] text-muted-foreground tracking-wider">
          {BEASTS.length} SPECIMENS CATALOGUED
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-8">
        {/* Header + filters */}
        <div className="mb-10">
          <p className="mb-2 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
            /// CONTAINMENT WING A
          </p>
          <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl mb-6">
            YOUR BEASTS.<br />
            <span className="text-muted-foreground">SELECT SPECIMEN.</span>
          </h2>

          {/* Filter bar */}
          <div className="flex gap-2">
            {(["ALL", "common", "rare", "legendary"] as RarityFilter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 font-display text-[10px] uppercase tracking-[0.15em] border-2 transition-all ${
                  filter === f
                    ? "border-neon-claw text-neon-claw bg-neon-claw/10"
                    : "border-static-gray text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {f === "ALL" ? "ALL SPECIMENS" : f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Beast grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
          {filtered.map((beast) => (
            <RegistryCard key={beast.id} beast={beast} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display text-lg text-muted-foreground tracking-wider">
              NO SPECIMENS MATCH FILTER
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registry;
