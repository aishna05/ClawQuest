const tokens = [
  { name: "$CLAW", price: "0.0847", change: "+12.4%", up: true },
  { name: "$SHARD", price: "0.0023", change: "+3.1%", up: true },
  { name: "$BLOOD", price: "1.247", change: "-5.7%", up: false },
  { name: "BEASTS ONLINE", price: "14,892", change: "", up: true },
  { name: "BATTLES/HR", price: "2,341", change: "", up: true },
  { name: "RAGE QUITS TODAY", price: "847", change: "+69%", up: true },
];

const TokenTicker = () => {
  const items = [...tokens, ...tokens]; // duplicate for seamless loop

  return (
    <div className="w-full overflow-hidden border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {items.map((token, i) => (
          <span key={i} className="mx-6 inline-flex items-center gap-2 font-data text-xs tracking-wider">
            <span className="text-muted-foreground">{token.name}</span>
            <span className="text-foreground">{token.price}</span>
            {token.change && (
              <span className={token.up ? "text-toxic-shard" : "text-neon-claw"}>
                {token.change}
              </span>
            )}
            <span className="ml-4 text-static-gray-light">///</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TokenTicker;
