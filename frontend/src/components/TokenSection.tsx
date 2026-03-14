const tokens = [
  {
    symbol: "$CLAW",
    name: "Governance",
    color: "var(--neon-claw)",
    earned: "Staking, Tournament Wins",
    spent: "Breeding Fees, Land Purchase",
    desc: "Vote on game balance, new biomes, and the fate of the metaverse.",
  },
  {
    symbol: "$SHARD",
    name: "Utility",
    color: "var(--glitch-cyan)",
    earned: "Battling, Streaming, Daily Quests",
    spent: "Improv Boosts, Revive Potions",
    desc: "The lifeblood of daily operations. Every action costs shards.",
  },
  {
    symbol: "$BLOOD",
    name: "PvP",
    color: "var(--rust-gold)",
    earned: "Winning Ranked Matches",
    spent: "Championship League Entry",
    desc: "High-stakes currency. Earned in blood, spent in glory.",
  },
];

const TokenSection = () => (
  <section className="relative py-24">
    <div className="container mx-auto px-6 lg:px-12">
      <div className="mb-16">
        <p className="mb-2 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
          /// Economic Protocol
        </p>
        <h2 className="font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
          Triple-Token<br />
          <span className="text-muted-foreground">Ecosystem.</span>
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {tokens.map((token) => (
          <div key={token.symbol} className="group border border-border bg-card/50 p-6 transition-all hover:bg-card">
            <div className="absolute-top-line mb-4 font-data text-3xl font-bold" style={{ color: `hsl(${token.color})` }}>
              {token.symbol}
            </div>
            <div className="mb-1 font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {token.name}
            </div>
            <p className="mb-6 font-mono text-xs leading-relaxed text-muted-foreground">{token.desc}</p>

            <div className="space-y-3 border-t border-border pt-4">
              <div>
                <span className="font-data text-[9px] uppercase tracking-wider text-muted-foreground">Earned By</span>
                <p className="font-mono text-[11px] text-foreground">{token.earned}</p>
              </div>
              <div>
                <span className="font-data text-[9px] uppercase tracking-wider text-muted-foreground">Spent On</span>
                <p className="font-mono text-[11px] text-foreground">{token.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TokenSection;
