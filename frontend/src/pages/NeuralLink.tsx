import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuitIcon,
  HardDriveNeuralIcon,
  CircuitDisconnectEyeIcon,
  ClawCheckIcon,
  CableEndIcon,
  WalletIcon,
  SignalBarsIcon,
  AbortIcon,
} from "@/components/NeuralLinkIcons";

type Phase =
  | "CABLE_INSERT"
  | "SELECT_PROTOCOL"
  | "STANDARD_UPLINK"
  | "STANDARD_OTP"
  | "EXTERNAL_CORTEX"
  | "EXTERNAL_CONNECTING"
  | "GUEST_MODE"
  | "SUCCESS"
  | "ERROR";

const WALLETS = [
  { name: "METAMASK", strength: 4 },
  { name: "PHANTOM", strength: 3 },
  { name: "WALLETCONNECT", strength: 2 },
];

const MOCK_ADDRESS = "0x7F4e...D9a3";

const NeuralLink = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("CABLE_INSERT");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [showFlash, setShowFlash] = useState(false);
  const [showError, setShowError] = useState(false);
  const [connectionLog, setConnectionLog] = useState<string[]>([]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Cable insert auto-advance
  useEffect(() => {
    if (phase === "CABLE_INSERT") {
      const t = setTimeout(() => setPhase("SELECT_PROTOCOL"), 2000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // External cortex connecting simulation
  useEffect(() => {
    if (phase === "EXTERNAL_CONNECTING") {
      const logs = [
        "ESTABLISHING NEURAL BRIDGE...",
        "HANDSHAKE PROTOCOL INITIATED",
        "VERIFYING CORTEX SIGNATURE",
        "SYNCHRONIZING DATA STREAMS",
        "BRIDGE LOCKED",
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setConnectionLog((prev) => [...prev, logs[i]]);
          i++;
        } else {
          clearInterval(interval);
          triggerSuccess();
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [phase]);

  // Guest mode auto-redirect
  useEffect(() => {
    if (phase === "GUEST_MODE") {
      const t = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(t);
    }
  }, [phase, navigate]);

  const triggerSuccess = () => {
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      setPhase("SUCCESS");
    }, 400);
  };

  const triggerError = () => {
    setShowError(true);
    setPhase("ERROR");
    setTimeout(() => setShowError(false), 2000);
  };

  const handleEmailSubmit = () => {
    if (email.includes("@")) {
      setPhase("STANDARD_OTP");
    } else {
      triggerError();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
    if (newOtp.every((v) => v !== "")) {
      setTimeout(triggerSuccess, 500);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleWalletConnect = (wallet: string) => {
    setSelectedWallet(wallet);
    setConnectionLog([]);
    setPhase("EXTERNAL_CONNECTING");
  };

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Brain scan background */}
      <div className="brain-scan-lines" />

      {/* Battle background flash */}
      <div className="absolute inset-0 battle-bg-flash" />

      {/* Static noise on error */}
      {showError && <div className="static-noise" />}

      {/* Flash overlay on success */}
      {showFlash && (
        <div className="fixed inset-0 z-50 bg-white flash-overlay" />
      )}

      {/* Cable insert phase */}
      {phase === "CABLE_INSERT" && (
        <div className="absolute inset-0 flex items-center justify-center crt-startup">
          <svg
            width="200"
            height="400"
            viewBox="0 0 200 400"
            className="absolute top-0"
          >
            <path
              d="M100 0 L100 180 Q100 200 100 200"
              stroke="hsl(var(--glitch-cyan))"
              strokeWidth="3"
              fill="none"
              className="cable-line"
            />
            <g transform="translate(80, 180)">
              <rect
                x="4"
                y="0"
                width="32"
                height="30"
                stroke="hsl(var(--glitch-cyan))"
                strokeWidth="2"
                fill="none"
                className="cable-line"
                style={{ animationDelay: "0.8s" }}
              />
            </g>
          </svg>
          <div
            className="mt-40 text-center"
            style={{ animation: "text-glitch-in 0.5s ease-out 1s forwards", opacity: 0 }}
          >
            <CableEndIcon size={48} className="mx-auto mb-4 text-glitch-cyan" />
            <p className="font-display text-sm uppercase tracking-[0.3em] text-glitch-cyan">
              INITIATING NEURAL INTERFACE
            </p>
          </div>
        </div>
      )}

      {/* Select protocol phase */}
      {phase === "SELECT_PROTOCOL" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-lg crt-startup">
            <h2 className="font-display text-xl sm:text-2xl text-foreground text-center mb-2 tracking-[0.15em]">
              NEURAL UPLINK METHODS
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-8 tracking-[0.2em]">
              SELECT CONSCIOUSNESS TRANSFER PROTOCOL
            </p>

            <div className="space-y-4">
              {/* Standard Uplink */}
              <button
                onClick={() => setPhase("STANDARD_UPLINK")}
                className="group w-full border-2 border-static-gray hover:border-neon-claw bg-background/50 p-5 flex items-center gap-5 transition-all duration-200 hover:bg-neon-claw/5 port-activate"
              >
                <div className="hex-port bg-neon-claw/10 p-3 group-hover:bg-neon-claw/20 transition-colors">
                  <BrainCircuitIcon size={32} className="text-neon-claw" />
                </div>
                <div className="text-left">
                  <div className="font-display text-sm text-foreground tracking-[0.15em]">
                    STANDARD UPLINK
                  </div>
                  <div className="font-data text-[10px] text-muted-foreground tracking-wider mt-1">
                    EMAIL / SOCIAL CONSCIOUSNESS UPLOAD
                  </div>
                </div>
              </button>

              {/* External Cortex */}
              <button
                onClick={() => setPhase("EXTERNAL_CORTEX")}
                className="group w-full border-2 border-static-gray hover:border-glitch-cyan bg-background/50 p-5 flex items-center gap-5 transition-all duration-200 hover:bg-glitch-cyan/5 port-activate"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="hex-port bg-glitch-cyan/10 p-3 group-hover:bg-glitch-cyan/20 transition-colors">
                  <HardDriveNeuralIcon size={32} className="text-glitch-cyan" />
                </div>
                <div className="text-left">
                  <div className="font-display text-sm text-foreground tracking-[0.15em]">
                    EXTERNAL CORTEX
                  </div>
                  <div className="font-data text-[10px] text-muted-foreground tracking-wider mt-1">
                    METAMASK / PHANTOM / WALLETCONNECT
                  </div>
                </div>
              </button>

              {/* Guest Simulation */}
              <button
                onClick={() => setPhase("GUEST_MODE")}
                className="group w-full border-2 border-static-gray hover:border-rust-gold bg-background/50 p-5 flex items-center gap-5 transition-all duration-200 hover:bg-rust-gold/5 port-activate"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="hex-port bg-rust-gold/10 p-3 group-hover:bg-rust-gold/20 transition-colors">
                  <CircuitDisconnectEyeIcon size={32} className="text-rust-gold" />
                </div>
                <div className="text-left">
                  <div className="font-display text-sm text-foreground tracking-[0.15em]">
                    GUEST SIMULATION
                  </div>
                  <div className="font-data text-[10px] text-rust-gold tracking-wider mt-1">
                    LIMITED ACCESS — NO WALLET REQUIRED
                  </div>
                </div>
              </button>
            </div>

            {/* Abort */}
            <button
              onClick={() => navigate("/")}
              className="mt-8 mx-auto flex items-center gap-2 text-muted-foreground hover:text-neon-claw transition-colors group"
            >
              <AbortIcon size={16} className="group-hover:animate-screen-shake" />
              <span className="font-data text-[10px] tracking-[0.2em]">
                SEVER CONNECTION
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Standard Uplink - Email */}
      {phase === "STANDARD_UPLINK" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <h2 className="font-display text-lg text-neon-claw text-center mb-1 tracking-[0.15em]">
              STANDARD UPLINK
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-8 tracking-[0.2em]">
              CONSCIOUSNESS TRANSFER VIA IDENTIFIER
            </p>

            <div className="space-y-6">
              <div>
                <label className="block font-data text-[10px] text-muted-foreground tracking-[0.2em] mb-2">
                  CONSCIOUSNESS IDENTIFIER
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                    className="w-full bg-background border-2 border-static-gray px-4 py-3 font-mono text-sm text-glitch-cyan placeholder:text-muted-foreground/40 focus:border-neon-claw focus:outline-none transition-colors"
                    placeholder="operator@neural.link"
                    autoFocus
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-neon-claw animate-pulse">
                    _
                  </span>
                </div>
              </div>

              <button
                onClick={handleEmailSubmit}
                className="w-full border-2 border-neon-claw bg-neon-claw/10 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-claw transition-all hover:bg-neon-claw hover:text-primary-foreground"
              >
                INITIATE UPLOAD
              </button>

              <button
                onClick={() => setPhase("SELECT_PROTOCOL")}
                className="w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="font-data text-[10px] tracking-[0.2em]">
                  SWITCH PROTOCOL
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Standard Uplink - OTP */}
      {phase === "STANDARD_OTP" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <h2 className="font-display text-lg text-glitch-cyan text-center mb-1 tracking-[0.15em]">
              NEURAL HANDSHAKE
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-2 tracking-[0.2em]">
              VERIFICATION CODE TRANSMITTED TO
            </p>
            <p className="font-mono text-xs text-neon-claw text-center mb-8">
              {email}
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => { otpRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  className="otp-box"
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <p className="font-data text-[10px] text-muted-foreground text-center tracking-[0.2em]">
              ENTER HANDSHAKE SEQUENCE TO COMPLETE UPLOAD
            </p>
          </div>
        </div>
      )}

      {/* External Cortex - Wallet List */}
      {phase === "EXTERNAL_CORTEX" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <h2 className="font-display text-lg text-glitch-cyan text-center mb-1 tracking-[0.15em]">
              AVAILABLE CORTICES
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-8 tracking-[0.2em]">
              SELECT EXTERNAL NEURAL INTERFACE
            </p>

            <div className="space-y-3">
              {WALLETS.map((wallet) => (
                <button
                  key={wallet.name}
                  onClick={() => handleWalletConnect(wallet.name)}
                  className="group w-full border-2 border-static-gray hover:border-glitch-cyan bg-background/50 p-4 flex items-center justify-between transition-all duration-200 hover:bg-glitch-cyan/5"
                >
                  <div className="flex items-center gap-4">
                    <WalletIcon size={24} className="text-glitch-cyan" />
                    <span className="font-display text-sm text-foreground tracking-[0.15em]">
                      {wallet.name}
                    </span>
                  </div>
                  <SignalBarsIcon size={20} className="text-toxic-shard" strength={wallet.strength} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setPhase("SELECT_PROTOCOL")}
              className="mt-6 w-full flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="font-data text-[10px] tracking-[0.2em]">
                SWITCH PROTOCOL
              </span>
            </button>
          </div>
        </div>
      )}

      {/* External Cortex - Connecting */}
      {phase === "EXTERNAL_CONNECTING" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <h2 className="font-display text-lg text-glitch-cyan text-center mb-1 tracking-[0.15em]">
              ESTABLISHING NEURAL BRIDGE
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-8 tracking-[0.2em]">
              {selectedWallet} CORTEX INTERFACE
            </p>

            {/* Data stream particles */}
            <div className="relative h-32 mb-6 overflow-hidden border border-static-gray/30">
              <div className="data-particle" style={{ left: "10%" }} />
              <div className="data-particle" />
              <div className="data-particle" />
              <div className="data-particle" />
              <div className="data-particle" />
            </div>

            {/* Connection log */}
            <div className="bg-background border border-static-gray/30 p-4 font-mono text-xs space-y-1 max-h-40 overflow-y-auto">
              {connectionLog.map((log, i) => (
                <div key={i} className="text-toxic-shard text-glitch-in">
                  <span className="text-muted-foreground">[{String(i).padStart(3, "0")}]</span>{" "}
                  {log}
                </div>
              ))}
              <span className="inline-block w-2 h-4 bg-toxic-shard animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* Guest Mode */}
      {phase === "GUEST_MODE" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <CircuitDisconnectEyeIcon size={48} className="mx-auto mb-4 text-rust-gold" />
            <h2 className="font-display text-lg text-rust-gold text-center mb-4 tracking-[0.15em]">
              LIMITED SIMULATION ACCESS
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-4 tracking-[0.2em]">
              DEMO SPECIMENS ONLY — NO GENETIC OWNERSHIP
            </p>
            <p className="font-data text-[10px] text-muted-foreground text-center tracking-[0.2em]">
              REDIRECTING TO SIMULATION...
            </p>
            <div className="mt-6 h-1 bg-static-gray overflow-hidden">
              <div
                className="h-full bg-rust-gold transition-all duration-[3000ms] ease-linear"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Success */}
      {phase === "SUCCESS" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md crt-startup">
            <ClawCheckIcon size={56} className="mx-auto mb-4 text-toxic-shard circuit-trace" />

            <h2 className="font-marker text-3xl text-toxic-shard text-center mb-2 tracking-wider">
              UPLOAD COMPLETE
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-8 tracking-[0.2em]">
              NEURAL LINK ESTABLISHED — CONSCIOUSNESS SYNCED
            </p>

            {/* Wallet address as DNA-helix format */}
            <div className="bg-background border border-toxic-shard/30 p-4 mb-6">
              <p className="font-data text-[10px] text-muted-foreground tracking-[0.2em] mb-1">
                GENETIC SIGNATURE
              </p>
              <p className="font-mono text-lg text-toxic-shard tracking-widest">
                {MOCK_ADDRESS}
              </p>
            </div>

            {/* Token readouts */}
            <div className="flex justify-between border border-static-gray/30 divide-x divide-static-gray/30">
              {[
                { token: "$CLAW", amount: "0.00" },
                { token: "$SHARD", amount: "0.00" },
                { token: "$BLOOD", amount: "0.00" },
              ].map((t) => (
                <div key={t.token} className="flex-1 p-3 text-center">
                  <p className="font-data text-[9px] text-muted-foreground tracking-wider">
                    {t.token}
                  </p>
                  <p className="font-data text-sm text-foreground">{t.amount}</p>
                </div>
              ))}
            </div>

            {/* Neural link status */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full bg-toxic-shard animate-pulse" />
              <span className="font-data text-[10px] text-toxic-shard tracking-[0.3em]">
                NEURAL LINK: STABLE
              </span>
            </div>

            <button
              onClick={() => navigate("/")}
              className="mt-6 w-full border-2 border-glitch-cyan bg-glitch-cyan/10 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-glitch-cyan transition-all hover:bg-glitch-cyan hover:text-accent-foreground"
            >
              ENTER THE ARENA
            </button>
          </div>
        </div>
      )}

      {/* Error */}
      {phase === "ERROR" && (
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="chromatic-border bg-background/95 p-8 sm:p-12 w-full max-w-md severed-shake">
            <AbortIcon size={48} className="mx-auto mb-4 text-neon-claw" />
            <h2 className="font-display text-xl text-neon-claw text-center mb-2 tracking-[0.15em]">
              CONNECTION SEVERED
            </h2>
            <p className="font-data text-[10px] text-muted-foreground text-center mb-6 tracking-[0.2em]">
              NEURAL REJECTION DETECTED — INVALID IDENTIFIER
            </p>
            <button
              onClick={() => {
                setShowError(false);
                setPhase("SELECT_PROTOCOL");
              }}
              className="w-full border-2 border-neon-claw bg-neon-claw/10 px-6 py-3.5 font-display text-sm font-bold uppercase tracking-[0.2em] text-neon-claw transition-all hover:bg-neon-claw hover:text-primary-foreground"
            >
              RETRY UPLINK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NeuralLink;
