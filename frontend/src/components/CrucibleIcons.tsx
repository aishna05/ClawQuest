// Custom SVG icons for The Crucible — zero Lucide, zero emojis

export const PressureGaugeIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    {/* Tick marks */}
    <path d="M12 4V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M12 18V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M4 12H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M18 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    {/* Needle */}
    <path d="M12 12L8 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

export const SteamVentIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 14H20" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M6 18H18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M8 22H16" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    {/* Steam particles */}
    <path d="M8 10C8 8 9 6 9 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.6" />
    <path d="M12 10C12 8 12 6 12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.8" />
    <path d="M16 10C16 8 15 6 15 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.6" />
  </svg>
);

export const AbortIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    {/* Two crossed hydraulic lines */}
    <path d="M4 4L20 20" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
    <path d="M20 4L4 20" stroke="currentColor" strokeWidth="3" strokeLinecap="square" />
    {/* Hydraulic joints */}
    <rect x="2" y="2" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
    <rect x="18" y="2" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
    <rect x="2" y="18" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
    <rect x="18" y="18" width="4" height="4" fill="currentColor" fillOpacity="0.3" />
  </svg>
);

export const RadarScanIcon = ({ className = "", size = 200 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" className={className}>
    <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" opacity="0.15" />
    <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="1" opacity="0.1" />
    <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="1" opacity="0.08" />
    <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="1" opacity="0.05" />
    {/* Cross hairs */}
    <path d="M100 10V190" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
    <path d="M10 100H190" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
  </svg>
);

export const WarningTriangleIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L2 20H22L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="bevel" />
    <path d="M12 9V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
    <rect x="11" y="16" width="2" height="2" fill="currentColor" />
  </svg>
);

export const HydraulicPistonIcon = ({ className = "", size = 24, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <rect x="8" y="2" width="8" height="6" stroke="currentColor" strokeWidth="2" />
    <rect x="10" y="8" width="4" height="10" stroke="currentColor" strokeWidth="2" />
    <rect x="6" y="18" width="12" height="4" stroke="currentColor" strokeWidth="2" />
    <path d="M10 5H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" opacity="0.5" />
  </svg>
);
