import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import beastIronmaw from "@/assets/beast-ironmaw.png";
import beastPrisma from "@/assets/beast-prisma.png";
import {
  AbortIcon,
  RadarScanIcon,
  WarningTriangleIcon,
  HydraulicPistonIcon,
} from "@/components/CrucibleIcons";

const SCAN_MESSAGES = [
  "SCANNING OPPONENTS...",
  "ANALYZING DNA...",
  "CALIBRATING AGGRESSION...",
  "CROSS-REFERENCING KILL RECORDS...",
  "EVALUATING THREAT LEVEL...",
];

const MATCH_TIME = 12000; // ms to find a match

const Crucible = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [scanIndex, setScanIndex] = useState(0);
  const [matchFound, setMatchFound] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [shaking, setShaking] = useState(false);
  const [opponentRevealed, setOpponentRevealed] = useState(false);
  const [abortHover, setAbortHover] = useState(false);

  // Progress fill
  useEffect(() => {
    if (matchFound) return;
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        // Non-linear fill: slows near end
        const increment = p < 60 ? 1.2 : p < 85 ? 0.6 : 0.3;
        return Math.min(100, p + increment);
      });
    }, MATCH_TIME / 100);
    return () => clearInterval(interval);
  }, [matchFound]);

  // Scan text cycling
  useEffect(() => {
    if (matchFound) return;
    const interval = setInterval(() => {
      setScanIndex((i) => (i + 1) % SCAN_MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [matchFound]);

  // Trigger match found
  useEffect(() => {
    if (progress >= 100 && !matchFound) {
      setShaking(true);
      setTimeout(() => {
        setShaking(false);
        setMatchFound(true);
        // Reveal opponent with delay
        setTimeout(() => setOpponentRevealed(true), 600);
      }, 450);
    }
  }, [progress, matchFound]);

  // Countdown after match found
  useEffect(() => {
    if (!matchFound) return;
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [matchFound, countdown]);

  const handleAbort = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleEngage = useCallback(() => {
    navigate("/battle");
  }, [navigate]);

  // Liquid sloshing transform based on progress
  const sloshAngle = Math.sin(Date.now() / 300) * 2;

  return (
    <div
      className={`crucible-page scanlines vignette min-h-screen bg-[hsl(240_25%_3%)] overflow-hidden relative ${
        shaking ? "animate-screen-shake" : ""
      }`}
    >
      {/* Pulsing red grid */}
      <div className="crucible-grid absolute inset-0 pointer-events-none" />

      {/* Steam particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="steam-particle absolute"
            style={{
              left: `${30 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Main layout */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        {/* Header status */}
        <div className="mb-8 text-center">
          <p className="font-data text-[10px] uppercase tracking-[0.5em] text-neon-claw/60 mb-2">
            /// Combat Protocol Initiated
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight text-foreground">
            THE <span className="text-neon-claw">CRUCIBLE</span>
          </h1>
        </div>

        {/* Three-column layout */}
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-4">
          {/* Left: Player's beast */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative border border-neon-claw/30 bg-card/50 p-4 w-full max-w-[280px]">
              {/* Hydraulic pistons */}
              <div className="absolute -left-3 top-1/4">
                <HydraulicPistonIcon size={20} className="text-neon-claw/40 piston-animate" />
              </div>
              <div className="absolute -left-3 top-3/4">
                <HydraulicPistonIcon size={20} className="text-neon-claw/40 piston-animate" style={{ animationDelay: "0.5s" }} />
              </div>
              <div className="absolute -right-3 top-1/4">
                <HydraulicPistonIcon size={20} className="text-neon-claw/40 piston-animate" style={{ animationDelay: "0.25s" }} />
              </div>
              <div className="absolute -right-3 top-3/4">
                <HydraulicPistonIcon size={20} className="text-neon-claw/40 piston-animate" style={{ animationDelay: "0.75s" }} />
              </div>

              <p className="font-data text-[9px] uppercase tracking-[0.3em] text-neon-claw/50 mb-2">
                /// Your Specimen
              </p>
              <div className="relative aspect-square bg-void-black/50 border border-static-gray/30 overflow-hidden mb-3">
                <img
                  src={beastIronmaw}
                  alt="Iron Maw — player beast"
                  className="w-full h-full object-cover"
                />
                {/* Containment frame overlay */}
                <div className="absolute inset-0 border-2 border-neon-claw/20" />
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-claw/60" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-claw/60" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-claw/60" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-claw/60" />
              </div>
              <p className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                IRON MAW
              </p>
              <p className="font-data text-[9px] uppercase tracking-wider text-muted-foreground">
                Gen 3 /// Scrap-Claw /// Berserker
              </p>
              <div className="mt-2 flex gap-3">
                <span className="font-data text-[10px] text-neon-claw">ATK 847</span>
                <span className="font-data text-[10px] text-glitch-cyan">DEF 623</span>
                <span className="font-data text-[10px] text-rust-gold">SPD 210</span>
              </div>
            </div>
          </div>

          {/* Center: Pressure gauge */}
          <div className="flex-1 flex flex-col items-center justify-center max-w-[360px]">
            {/* Gauge */}
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px]">
              {/* Outer ring with ticks */}
              <svg
                viewBox="0 0 280 280"
                className="w-full h-full"
                style={{ filter: `drop-shadow(0 0 20px hsl(349 100% 50% / 0.3))` }}
              >
                {/* Background circle */}
                <circle cx="140" cy="140" r="130" fill="none" stroke="hsl(240 12% 18%)" strokeWidth="4" />
                <circle cx="140" cy="140" r="115" fill="none" stroke="hsl(240 12% 18% / 0.5)" strokeWidth="1" />

                {/* Tick marks */}
                {Array.from({ length: 40 }).map((_, i) => {
                  const angle = (i * 360) / 40 - 90;
                  const rad = (angle * Math.PI) / 180;
                  const isMajor = i % 5 === 0;
                  const r1 = isMajor ? 118 : 122;
                  const r2 = 130;
                  return (
                    <line
                      key={i}
                      x1={140 + r1 * Math.cos(rad)}
                      y1={140 + r1 * Math.sin(rad)}
                      x2={140 + r2 * Math.cos(rad)}
                      y2={140 + r2 * Math.sin(rad)}
                      stroke={
                        (i / 40) * 100 <= progress
                          ? "hsl(349 100% 50%)"
                          : "hsl(240 12% 30%)"
                      }
                      strokeWidth={isMajor ? 3 : 1}
                    />
                  );
                })}

                {/* Progress arc */}
                <circle
                  cx="140"
                  cy="140"
                  r="105"
                  fill="none"
                  stroke="hsl(349 100% 50%)"
                  strokeWidth="8"
                  strokeDasharray={`${(progress / 100) * 2 * Math.PI * 105} ${2 * Math.PI * 105}`}
                  strokeLinecap="square"
                  transform="rotate(-90 140 140)"
                  style={{
                    filter: "drop-shadow(0 0 6px hsl(349 100% 50% / 0.6))",
                    transition: "stroke-dasharray 0.3s ease",
                  }}
                />

                {/* Inner liquid fill */}
                <defs>
                  <clipPath id="gaugeClip">
                    <circle cx="140" cy="140" r="95" />
                  </clipPath>
                </defs>
                <g clipPath="url(#gaugeClip)">
                  <rect
                    x="0"
                    y={280 - (progress / 100) * 190 - 45}
                    width="280"
                    height="280"
                    fill="hsl(349 100% 50% / 0.15)"
                    style={{
                      transform: `skewY(${sloshAngle}deg)`,
                      transformOrigin: "center",
                    }}
                  />
                  <rect
                    x="0"
                    y={280 - (progress / 100) * 190 - 40}
                    width="280"
                    height="4"
                    fill="hsl(349 100% 50% / 0.4)"
                    style={{
                      transform: `skewY(${-sloshAngle}deg)`,
                      transformOrigin: "center",
                    }}
                  />
                </g>

                {/* Center text */}
                <text
                  x="140"
                  y="130"
                  textAnchor="middle"
                  fill="hsl(0 0% 92%)"
                  fontFamily="'Chakra Petch', sans-serif"
                  fontSize="48"
                  fontWeight="700"
                >
                  {matchFound ? "100" : Math.floor(progress)}
                </text>
                <text
                  x="140"
                  y="155"
                  textAnchor="middle"
                  fill="hsl(349 100% 50%)"
                  fontFamily="'Share Tech Mono', monospace"
                  fontSize="12"
                  letterSpacing="3"
                >
                  PRESSURE
                </text>
              </svg>

              {/* Steam vents at top */}
              {matchFound && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 bg-foreground/30 steam-burst"
                      style={{
                        height: `${12 + i * 4}px`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Scan status text */}
            <div className="mt-6 text-center min-h-[40px]">
              {!matchFound ? (
                <p className="font-mono text-xs uppercase tracking-wider text-neon-claw scan-text">
                  {SCAN_MESSAGES[scanIndex]}
                  <span className="blinking-cursor">_</span>
                </p>
              ) : (
                <div className="animate-fade-in">
                  <p className="font-display text-lg font-bold uppercase tracking-wider text-neon-claw chromatic glitch-text" data-text="MATCH FOUND">
                    MATCH FOUND
                  </p>
                </div>
              )}
            </div>

            {/* Spectators */}
            {matchFound && (
              <p className="mt-2 font-data text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-fade-in">
                SPECTATORS: {Math.floor(Math.random() * 80 + 20)} watching
              </p>
            )}
          </div>

          {/* Right: Opponent slot */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative border border-static-gray/30 bg-card/30 p-4 w-full max-w-[280px]">
              <p className="font-data text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 mb-2">
                /// Opponent
              </p>
              <div className="relative aspect-square bg-void-black/80 border border-static-gray/20 overflow-hidden mb-3">
                {!matchFound ? (
                  /* Scanning state */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <RadarScanIcon size={160} className="text-neon-claw/20 radar-sweep" />
                    <p className="absolute font-mono text-xs uppercase tracking-wider text-static-gray-light glitch-scan">
                      SCANNING<span className="blinking-cursor">_</span>
                    </p>
                  </div>
                ) : (
                  /* Opponent revealed */
                  <div className={`w-full h-full ${opponentRevealed ? "opponent-reveal" : "opacity-0"}`}>
                    <img
                      src={beastPrisma}
                      alt="Prisma Dancer — opponent beast"
                      className="w-full h-full object-cover"
                    />
                    {/* RGB split overlay */}
                    <div className="absolute inset-0 border-2 border-glitch-cyan/30" />
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-glitch-cyan/60" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-glitch-cyan/60" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-glitch-cyan/60" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-glitch-cyan/60" />
                  </div>
                )}
              </div>
              {matchFound && opponentRevealed ? (
                <div className="animate-fade-in">
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    PRISMA DANCER
                  </p>
                  <p className="font-data text-[9px] uppercase tracking-wider text-muted-foreground">
                    Gen 7 /// Crystal-Claw /// Tactical
                  </p>
                  <div className="mt-2 flex gap-3">
                    <span className="font-data text-[10px] text-neon-claw">ATK 412</span>
                    <span className="font-data text-[10px] text-glitch-cyan">DEF 189</span>
                    <span className="font-data text-[10px] text-rust-gold">SPD 943</span>
                  </div>
                  <div className="mt-2 font-data text-[9px] text-muted-foreground/60">
                    W/L: 34-12 /// STREAK: 5W
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-display text-sm font-bold uppercase tracking-wider text-static-gray-light/40">
                    ???
                  </p>
                  <p className="font-data text-[9px] uppercase tracking-wider text-static-gray-light/20">
                    Awaiting target lock...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="mt-10 flex flex-col items-center gap-4">
          {matchFound && opponentRevealed ? (
            <>
              {/* Countdown */}
              <div className="flex items-center gap-3 mb-2">
                <div className="countdown-gear" />
                <p className="font-data text-sm uppercase tracking-wider text-foreground">
                  ENGAGE IN: <span className="text-neon-claw font-bold text-lg">{countdown}s</span>
                </p>
                <div className="countdown-gear" />
              </div>

              {/* Engage button */}
              <button
                onClick={handleEngage}
                className="group relative overflow-hidden border-2 border-glitch-cyan bg-glitch-cyan/10 px-12 py-4 font-display text-sm font-bold uppercase tracking-[0.3em] text-glitch-cyan transition-all hover:bg-glitch-cyan hover:text-accent-foreground"
                style={{
                  boxShadow: "0 0 30px hsl(187 100% 50% / 0.3), inset 0 0 30px hsl(187 100% 50% / 0.05)",
                }}
              >
                <span className="relative z-10">ENGAGE</span>
              </button>
            </>
          ) : (
            /* Abort button */
            <button
              onClick={handleAbort}
              onMouseEnter={() => setAbortHover(true)}
              onMouseLeave={() => setAbortHover(false)}
              className={`group relative overflow-hidden border-2 border-rust-gold/60 bg-rust-gold/5 px-10 py-3.5 font-display text-xs font-bold uppercase tracking-[0.3em] text-rust-gold transition-all hover:border-rust-gold hover:bg-rust-gold/15 ${
                abortHover ? "abort-shake" : ""
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                <AbortIcon size={16} />
                ABORT SEQUENCE
              </span>
              {/* Warning flash on hover */}
              {abortHover && (
                <div className="absolute inset-0 warning-flash" />
              )}
            </button>
          )}

          {/* Warning indicator */}
          {!matchFound && (
            <div className="flex items-center gap-2 mt-2">
              <WarningTriangleIcon size={12} className="text-rust-gold/40" />
              <p className="font-data text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                Leaving the queue forfeits position
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Crucible;
