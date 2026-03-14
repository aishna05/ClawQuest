const biomes = [
  {
    name: "Scrap Heap Canyon",
    description: "Rusted metal wastes where mechanical beasts forge themselves from industrial decay. High defense, slow evolution.",
    natives: "Scrap-Claws",
    accent: "var(--rust-gold)",
    vibe: "Mad Max x Cyberpunk",
    stats: { danger: 7, loot: 6, mutation: 3 },
  },
  {
    name: "Crystal Spire Gardens",
    description: "Bioluminescent floating islands where glass-like beasts shatter and reform. Fast, fragile, beautiful killers.",
    natives: "Prisma-Claws",
    accent: "var(--glitch-cyan)",
    vibe: "Avatar x Dark Souls",
    stats: { danger: 5, loot: 8, mutation: 6 },
  },
  {
    name: "Void Nexus",
    description: "Reality-glitching hellscape of impossible geometry. Beasts here bend the rules. Nothing is certain.",
    natives: "Null-Claws",
    accent: "var(--neon-claw)",
    vibe: "Control x Elden Ring",
    stats: { danger: 10, loot: 10, mutation: 10 },
  },
];

const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-2">
    <span className="w-16 font-data text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    <div className="flex-1">
      <div className="relative h-1.5 w-full bg-secondary">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-700"
          style={{ width: `${value * 10}%`, background: `hsl(${color})` }}
        />
      </div>
    </div>
    <span className="font-data text-[10px] text-foreground">{value}</span>
  </div>
);

const BiomeSection = () => (
  <section className="relative py-24">
    <div className="container mx-auto px-6 lg:px-12">
      {/* Section header */}
      <div className="mb-16">
        <p className="mb-2 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
          /// Exploration Zones
        </p>
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
          Three Biomes.<br />
          <span className="text-muted-foreground">Infinite Pain.</span>
        </h2>
      </div>

      {/* Biome cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {biomes.map((biome) => (
          <div
            key={biome.name}
            className="group relative border border-border bg-card/50 p-6 transition-all duration-300 hover:border-opacity-100"
            style={{ borderColor: `hsl(${biome.accent} / 0.3)` }}
          >
            {/* Top accent line */}
            <div className="absolute left-0 top-0 h-[2px] w-full transition-all duration-300 group-hover:opacity-100 opacity-50"
              style={{ background: `hsl(${biome.accent})` }}
            />

            <div className="mb-1 font-marker text-[10px] uppercase tracking-widest" style={{ color: `hsl(${biome.accent})` }}>
              {biome.vibe}
            </div>
            <h3 className="mb-3 font-display text-xl font-bold uppercase text-foreground">{biome.name}</h3>
            <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">{biome.description}</p>

            <div className="mb-4 border-t border-border pt-3">
              <span className="font-data text-[10px] uppercase tracking-wider text-muted-foreground">
                Native: <span className="text-foreground">{biome.natives}</span>
              </span>
            </div>

            <div className="space-y-2">
              <StatBar label="Danger" value={biome.stats.danger} color={biome.accent} />
              <StatBar label="Loot" value={biome.stats.loot} color={biome.accent} />
              <StatBar label="Mutate" value={biome.stats.mutation} color={biome.accent} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BiomeSection;
