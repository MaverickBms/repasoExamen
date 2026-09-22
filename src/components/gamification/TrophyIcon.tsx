import { cn } from "../../utils/cn";

interface TrophyIconProps {
  size?: number;
  className?: string;
  gold?: boolean;
}

export function TrophyIcon({ size = 40, className, gold }: TrophyIconProps) {
  const color = gold ? "var(--gold)" : "var(--text-3)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={cn("trophy", className)}
      style={{ color }}
    >
      <g fill="currentColor">
        <path d="M16 10h16v7a8 8 0 0 1-16 0v-7z" opacity="0.92" />
        <path d="M13 11h-3a6 6 0 0 0 6 6.6V15.5A5.5 5.5 0 0 0 13 11z" opacity="0.82" />
        <path d="M35 11h3a6 6 0 0 1-6 6.6V15.5A5.5 5.5 0 0 1 35 11z" opacity="0.82" />
        <rect x="22" y="25" width="4" height="6" rx="1" opacity="0.9" />
        <rect x="16" y="33" width="16" height="3.2" rx="1.6" opacity="0.85" />
        <rect x="19" y="36" width="10" height="3" rx="1.5" opacity="0.7" />
      </g>
    </svg>
  );
}