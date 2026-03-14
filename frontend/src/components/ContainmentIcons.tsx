interface IconProps {
  size?: number;
  className?: string;
}

export const CrossedClawsIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M8 8L20 24L8 40" stroke="currentColor" strokeWidth="3" strokeLinecap="square" fill="none" />
    <path d="M40 8L28 24L40 40" stroke="currentColor" strokeWidth="3" strokeLinecap="square" fill="none" />
    <path d="M6 6L12 10" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M42 6L36 10" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M6 42L12 38" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <path d="M42 42L36 38" stroke="currentColor" strokeWidth="2" opacity="0.5" />
  </svg>
);

export const DnaGearIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M16 4C16 4 32 12 32 24C32 36 16 44 16 44" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M32 4C32 4 16 12 16 24C16 36 32 44 32 44" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="18" y1="12" x2="30" y2="12" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="16" y1="20" x2="32" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="16" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <line x1="18" y1="36" x2="30" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
    <circle cx="38" cy="36" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="38" cy="36" r="3" fill="currentColor" opacity="0.4" />
    <path d="M38 26L40 28M38 46L36 44M46 34L44 36M30 38L32 36M46 38L44 36M30 34L32 36" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export const ChrysalisIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 4C18 4 14 14 14 24C14 34 18 44 24 44C30 44 34 34 34 24C34 14 30 4 24 4Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M20 16L28 16" stroke="currentColor" strokeWidth="1.5" />
    <path d="M18 24L30 24" stroke="currentColor" strokeWidth="1.5" />
    <path d="M20 32L28 32" stroke="currentColor" strokeWidth="1.5" />
    <path d="M24 4L20 0M24 4L28 0" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path d="M14 18L8 14" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M34 18L40 14" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M14 30L8 34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <path d="M34 30L40 34" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
  </svg>
);

export const BladeTagIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M4 8H32L44 24L32 40H4V8Z" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="24" r="3" fill="currentColor" opacity="0.5" />
    <line x1="44" y1="24" x2="36" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <line x1="44" y1="24" x2="36" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
    <line x1="18" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="18" y1="18" x2="26" y2="18" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const CircuitLockIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="10" y="22" width="28" height="22" stroke="currentColor" strokeWidth="2" fill="none" />
    <path d="M16 22V14C16 8 20 4 24 4C28 4 32 8 32 14V22" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="22" y="30" width="4" height="8" fill="currentColor" opacity="0.6" />
    <line x1="14" y1="26" x2="14" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="2 3" />
    <line x1="34" y1="26" x2="34" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.2" strokeDasharray="2 3" />
    <line x1="14" y1="34" x2="22" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="26" y1="34" x2="34" y2="34" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const BrokenChainIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <rect x="4" y="16" width="14" height="16" rx="0" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="30" y="16" width="14" height="16" rx="0" stroke="currentColor" strokeWidth="2" fill="none" />
    <line x1="18" y1="22" x2="22" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <line x1="26" y1="30" x2="30" y2="26" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
    <path d="M22 28L26 20" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" opacity="0.3" />
  </svg>
);

export const DragHandIcon = ({ size = 24, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <path d="M24 6V16" stroke="currentColor" strokeWidth="2" />
    <path d="M24 16C24 16 18 14 14 18C10 22 14 26 14 26" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="14" cy="30" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="20" cy="34" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="28" cy="34" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="34" cy="30" r="2" fill="currentColor" opacity="0.4" />
    <circle cx="24" cy="38" r="2" fill="currentColor" opacity="0.4" />
    <path d="M24 16C24 16 30 14 34 18C38 22 34 26 34 26" stroke="currentColor" strokeWidth="2" fill="none" />
  </svg>
);

export const EmotionOrbIcon = ({ size = 24, className = "", color = "currentColor" }: IconProps & { color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
    <circle cx="24" cy="24" r="16" stroke={color} strokeWidth="2" fill="none" opacity="0.3" />
    <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5" />
    <circle cx="24" cy="24" r="5" fill={color} opacity="0.8" />
  </svg>
);

export const BoltIcon = ({ size = 8, className = "" }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="8" cy="8" r="2" fill="currentColor" />
    <line x1="2" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="11" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1" />
    <line x1="8" y1="2" x2="8" y2="5" stroke="currentColor" strokeWidth="1" />
    <line x1="8" y1="11" x2="8" y2="14" stroke="currentColor" strokeWidth="1" />
  </svg>
);
