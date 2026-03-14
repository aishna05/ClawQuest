import { useState } from "react";
import { AttackIcon, DefendIcon, RageIcon, SkullIcon } from "./ClawIcons";

interface BeastCardProps {
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
}

const rarityStyles = {
  common: { border: "border-static-gray-light", tag: "text-muted-foreground bg-secondary", label: "COMMON" },
  rare: { border: "border-glitch-cyan/50", tag: "text-glitch-cyan bg-glitch-cyan/10", label: "RARE" },
  legendary: { border: "border-rust-gold/50", tag: "text-rust-gold bg-rust-gold/10", label: "LEGENDARY" },
};

const BeastCard = ({ name, type, rarity, hp, maxHp, atk, def, spd, personality, mood, moodColor, image, gen }: BeastCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const r = rarityStyles[rarity];
  const hpPercent = (hp / maxHp) * 100;

  return (
    <div
      className={`chamfer noise relative border ${r.border} bg-card transition-all duration-300 ${isHovered ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? "perspective(1000px) rotateY(-2deg) rotateX(1deg) scale(1.02)" : "perspective(1000px) rotateY(0) rotateX(0)",
      }}
    >
      {/* Holo shimmer on hover */}
      {isHovered && (
        <div className="pointer-events-none absolute inset-0 z-20 animate-holo opacity-20"
          style={{ background: "linear-gradient(135deg, transparent 30%, hsl(var(--glitch-cyan) / 0.3) 50%, transparent 70%)" }}
        />
      )}

      {/* Image area */}
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="h-full w-full object-cover" style={{
          filter: isHovered ? "none" : "saturate(0.8) contrast(1.1)",
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />

        {/* Rarity tag */}
        <span className={`absolute right-2 top-2 -rotate-2 px-2 py-0.5 font-marker text-xs ${r.tag}`}>
          {r.label}
        </span>

        {/* Generation */}
        <span className="absolute bottom-2 left-3 font-data text-[10px] text-muted-foreground">
          GEN:{gen}
        </span>
      </div>

      {/* Data area */}
      <div className="p-4">
        {/* Name + type */}
        <div className="mb-1 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold uppercase text-foreground">{name}</h3>
          <div className="h-3 w-3 rounded-full" style={{ background: moodColor, boxShadow: `0 0 8px ${moodColor}` }} title={mood} />
        </div>
        <p className="mb-3 font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{type}</p>

        {/* HP Bar */}
        <div className="mb-3">
          <div className="mb-1 flex items-center justify-between font-data text-[10px]">
            <span className="text-muted-foreground">HP</span>
            <span className="text-foreground">{hp}/{maxHp}</span>
          </div>
          <div className="relative h-2 w-full overflow-hidden bg-secondary">
            <div
              className="hp-segment absolute inset-y-0 left-0 transition-all duration-500"
              style={{
                width: `${hpPercent}%`,
                background: hpPercent > 50
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
            { icon: <AttackIcon size={14} />, label: "ATK", value: atk },
            { icon: <DefendIcon size={14} />, label: "DEF", value: def },
            { icon: <RageIcon size={14} />, label: "SPD", value: spd },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-1.5 font-data text-[11px]">
              <span className="text-muted-foreground">{stat.icon}</span>
              <span className="text-muted-foreground">{stat.label}:</span>
              <span className="text-foreground">{stat.value}</span>
            </div>
          ))}
        </div>

        {/* Personality */}
        <div className="flex items-center gap-2 border-t border-border pt-2">
          <SkullIcon size={12} className="text-muted-foreground" />
          <span className="font-mono text-[10px] text-muted-foreground">{personality}</span>
        </div>
      </div>
    </div>
  );
};

export default BeastCard;
