// Custom SVG icons for the Battle Arena — zero Lucide, zero emojis

export const HydraulicTubeIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="4" y="2" width="16" height="20" stroke="currentColor" strokeWidth="2" />
    <rect x="6" y="4" width="12" height="16" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <path d="M6 18H18" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M6 14H18" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <path d="M6 10H18" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <rect x="2" y="1" width="4" height="3" fill="currentColor" fillOpacity="0.4" />
    <rect x="18" y="1" width="4" height="3" fill="currentColor" fillOpacity="0.4" />
    <rect x="2" y="20" width="4" height="3" fill="currentColor" fillOpacity="0.4" />
    <rect x="18" y="20" width="4" height="3" fill="currentColor" fillOpacity="0.4" />
  </svg>
);

export const TransmitIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M2 12H8L10 8L14 16L16 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.5" />
  </svg>
);

export const RageMeterIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 8V16L12 22L20 16V8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <path d="M12 6L8 9V15L12 18L16 15V9L12 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="bevel" opacity="0.5" />
    <path d="M12 10V14" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
  </svg>
);

export const SkullCrossIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
    <circle cx="9" cy="9" r="1.5" fill="currentColor" />
    <circle cx="15" cy="9" r="1.5" fill="currentColor" />
    <path d="M9 14H15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 14V18" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 14V19" stroke="currentColor" strokeWidth="1.5" />
    <path d="M14 14V18" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ShieldBreakIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L4 6V12C4 17 8 20 12 22C16 20 20 17 20 12V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <path d="M10 8L14 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <path d="M14 8L10 16" stroke="currentColor" strokeWidth="1" strokeLinecap="square" opacity="0.4" />
  </svg>
);

export const SurrenderFlagIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 2V22" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M4 4H18L14 9L18 14H4" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" fill="currentColor" fillOpacity="0.15" />
  </svg>
);
