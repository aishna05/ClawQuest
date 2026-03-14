interface IconProps {
  size?: number;
  className?: string;
}

export const BrainCircuitIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4C18 4 14 8 14 14c0 4 2 6 2 10s-2 6-2 10c0 6 4 10 10 10s10-4 10-10c0-4-2-6-2-10s2-6 2-10c0-6-4-10-10-10z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M18 14h4v4h-4zM26 14h4v4h-4zM22 22h4v4h-4zM18 30h4v4h-4zM26 30h4v4h-4z" fill="currentColor" opacity="0.6" />
    <line x1="20" y1="18" x2="22" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="28" y1="18" x2="26" y2="22" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="26" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" />
    <line x1="24" y1="26" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="10" cy="20" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="38" cy="20" r="2" fill="currentColor" opacity="0.4" />
    <line x1="12" y1="20" x2="14" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <line x1="36" y1="20" x2="34" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.4" />
  </svg>
);

export const HardDriveNeuralIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="6" y="12" width="36" height="24" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="6" y1="28" x2="42" y2="28" stroke="currentColor" strokeWidth="2" />
    <circle cx="36" cy="34" r="2" fill="currentColor" />
    <circle cx="30" cy="34" r="2" fill="currentColor" opacity="0.5" />
    <path d="M16 12V6M24 12V6M32 12V6" stroke="currentColor" strokeWidth="2" />
    <circle cx="16" cy="4" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="24" cy="4" r="2" fill="currentColor" opacity="0.6" />
    <circle cx="32" cy="4" r="2" fill="currentColor" opacity="0.6" />
    <rect x="10" y="16" width="20" height="8" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const CircuitDisconnectEyeIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M4 24s8-12 20-12 20 12 20 12-8 12-20 12S4 24 4 24z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="24" cy="24" r="2" fill="currentColor" />
    <line x1="8" y1="40" x2="40" y2="8" stroke="currentColor" strokeWidth="3" />
    <line x1="8" y1="40" x2="40" y2="8" stroke="hsl(349 100% 50%)" strokeWidth="2" opacity="0.6" />
    <path d="M14 24h-6M40 24h-6" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" opacity="0.4" />
  </svg>
);

export const ClawCheckIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 28L18 38L40 12" stroke="currentColor" strokeWidth="4" strokeLinecap="square" fill="none" />
    <path d="M6 30L16 40" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M10 26L20 36" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M38 10L42 14" stroke="currentColor" strokeWidth="2" opacity="0.5" />
  </svg>
);

export const CableEndIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="20" y="2" width="8" height="20" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="23" y1="6" x2="23" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <line x1="25" y1="6" x2="25" y2="14" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 22h12v4c0 2-2 4-6 4s-6-2-6-4v-4z" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="24" y1="30" x2="24" y2="46" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export const WalletIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="10" width="40" height="28" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="30" y="20" width="14" height="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="37" cy="24" r="2" fill="currentColor" />
    <path d="M4 10L10 4H38L44 10" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export const SignalBarsIcon = ({ size = 24, className = "", strength = 3 }: IconProps & { strength?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="34" width="6" height="10" fill="currentColor" opacity={strength >= 1 ? 1 : 0.2} />
    <rect x="14" y="26" width="6" height="18" fill="currentColor" opacity={strength >= 2 ? 1 : 0.2} />
    <rect x="24" y="18" width="6" height="26" fill="currentColor" opacity={strength >= 3 ? 1 : 0.2} />
    <rect x="34" y="10" width="6" height="34" fill="currentColor" opacity={strength >= 4 ? 1 : 0.2} />
  </svg>
);

export const AbortIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <line x1="8" y1="8" x2="40" y2="40" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
    <line x1="40" y1="8" x2="8" y2="40" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
    <line x1="6" y1="10" x2="10" y2="6" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    <line x1="38" y1="42" x2="42" y2="38" stroke="currentColor" strokeWidth="2" opacity="0.4" />
  </svg>
);
