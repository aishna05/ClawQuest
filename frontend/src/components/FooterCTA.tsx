import { ClawMarkIcon } from "./ClawIcons";

const FooterCTA = () => (
  <section className="relative border-t border-border py-24">
    <div className="container mx-auto px-6 text-center lg:px-12">
      <p className="mb-4 font-data text-[10px] uppercase tracking-[0.4em] text-neon-claw">
        /// Initialization Sequence
      </p>
      <h2 className="mx-auto mb-6 max-w-2xl font-display text-4xl font-bold uppercase tracking-tight text-foreground sm:text-5xl">
        The Arena Awaits.<br />
        <span className="text-muted-foreground">Your Beast is Hungry.</span>
      </h2>
      <p className="mx-auto mb-10 max-w-lg font-mono text-sm text-muted-foreground">
        No specimens in stasis. Breed or acquire to begin.
        Initiate combat protocol.
      </p>

      <button className="group relative mx-auto overflow-hidden border-2 border-neon-claw bg-neon-claw/10 px-12 py-4 font-display text-sm font-bold uppercase tracking-widest text-neon-claw transition-all hover:bg-neon-claw hover:text-primary-foreground animate-pulse-glow">
        <span className="relative z-10 flex items-center justify-center gap-3">
          <ClawMarkIcon size={20} />
          Initiate Genesis Protocol
        </span>
      </button>

      {/* Footer */}
      <div className="mt-24 border-t border-border pt-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            CLAW<span className="text-neon-claw">QUEST</span>
          </span>
          <div className="flex gap-6">
            {["Whitepaper", "Discord", "GitHub", "Docs"].map((link) => (
              <a key={link} href="#" className="font-data text-[10px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-glitch-cyan">
                {link}
              </a>
            ))}
          </div>
          <span className="font-data text-[10px] text-muted-foreground">
            HIVE MIND v0.1.0 /// ALL RIGHTS FORKED
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default FooterCTA;
