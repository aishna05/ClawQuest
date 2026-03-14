// Custom SVG icons — zero Lucide, zero emojis
// Style: Sharp, angular, 2px stroke, 45-degree bevels

export const AttackIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 4L12 12M20 4L12 12M12 12L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M8 2L4 4L2 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M16 2L20 4L22 8" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M10 18L12 22L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const DefendIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L3 7V12C3 17.5 7 21.5 12 22C17 21.5 21 17.5 21 12V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <path d="M8 10L12 14L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M7 15L12 12L17 15" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.4" />
  </svg>
);

export const ImprovIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M5 5L8 8M16 16L19 19M19 5L16 8M8 16L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const RageIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="6" y="4" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2" />
    <path d="M9 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M12 8V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <path d="M9 4V2M15 4V2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M4 8H6M18 8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.5" />
  </svg>
);

export const BreedIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M8 2C8 2 6 6 6 8C6 10 8 12 8 12C8 12 6 14 6 16C6 18 8 22 8 22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M16 2C16 2 18 6 18 8C18 10 16 12 16 12C16 12 18 14 18 16C18 18 16 22 16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <circle cx="12" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
  </svg>
);

export const EvolveIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22V16M12 8V2" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M7 16L12 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M5 20L12 16L19 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M9 6L12 2L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M4 10L12 6L20 10" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.4" />
  </svg>
);

export const WalletIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="6" width="18" height="14" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <path d="M3 6L7 2H17L21 6" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <rect x="15" y="11" width="4" height="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17" cy="13" r="0.5" fill="currentColor" />
  </svg>
);

export const StreamIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2V10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M8 6L12 2L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <circle cx="12" cy="14" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
    <path d="M6 18C6 18 4 20 4 22H20C20 20 18 18 18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const SkullIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 10C6 6 8.5 2 12 2C15.5 2 18 6 18 10V14L16 16V18H14V20H10V18H8V16L6 14V10Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <rect x="9" y="9" width="2" height="3" fill="currentColor" />
    <rect x="13" y="9" width="2" height="3" fill="currentColor" />
    <path d="M10 15H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
  </svg>
);

export const BoltIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

export const ClawMarkIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 2L10 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <path d="M12 4L14 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <path d="M18 2L14 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
  </svg>
);
