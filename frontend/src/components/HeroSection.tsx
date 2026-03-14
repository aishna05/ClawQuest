import { useNavigate } from "react-router-dom";
import heroBeast from "@/assets/hero-beast.png";
import { ClawMarkIcon } from "./ClawIcons";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlays */}
      <div className="absolute inset-0">
        <img
          src={heroBeast}
          alt="Claw Beast emerging from the arena"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/50" />
      </div>

      {/* Scan line sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 h-[2px] w-full opacity-20"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(var(--neon-claw)), transparent)",
            animation: "scan-line 4s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Tag */}
          <div className="mb-6 inline-flex items-center gap-2 border border-neon-claw/30 bg-neon-claw/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-neon-claw" />
            <span className="font-data text-[10px] uppercase tracking-[0.3em] text-neon-claw">
              Neural Link Active /// Season 0
            </span>
          </div>

          {/* Title */}
          <h1
            className="glitch-text chromatic mb-6 font-display text-6xl font-bold leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl"
            data-text="CLAWQUEST"
          >
            CLAW<span className="text-neon-claw">QUEST</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-2 font-display text-lg uppercase tracking-wider text-glitch-cyan sm:text-xl">
            Open-World AI Pet Battles in the Metaverse
          </p>

          {/* Description */}
          <p className="mb-10 max-w-xl font-mono text-sm leading-relaxed text-muted-foreground">
            Breed. Train. Battle. Your Claw Beasts learn, evolve, and develop
            real personality — including rage-quits. Own their DNA on-chain.
            Fork their neural networks. Stream for tokens. Welcome to the arena.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate("/crucible")} className="group relative overflow-hidden border-2 border-neon-claw bg-neon-claw/10 px-8 py-3.5 font-display text-sm font-bold uppercase tracking-widest text-neon-claw transition-all hover:bg-neon-claw hover:text-primary-foreground animate-breathe">
              <span className="relative z-10 flex items-center gap-3">
                <ClawMarkIcon size={18} />
                Enter the Arena
              </span>
              <div className="absolute inset-0 bg-neon-claw/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <button onClick={() => navigate("/neural-link")} className="group relative overflow-hidden border border-glitch-cyan/40 bg-transparent px-8 py-3.5 font-display text-sm font-bold uppercase tracking-widest text-glitch-cyan transition-all hover:border-glitch-cyan hover:bg-glitch-cyan/10">
              <span className="relative z-10">Sync Neural Link</span>
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap gap-8 border-t border-border/50 pt-8">
            {[
              { label: "Beasts Spawned", value: "47,291" },
              { label: "Battles Fought", value: "1.2M" },
              { label: "Rage Quits", value: "23,847" },
              { label: "Tokens Earned", value: "$2.4M" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-data text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
