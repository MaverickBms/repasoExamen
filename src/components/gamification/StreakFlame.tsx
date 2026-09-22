import { cn } from "../../utils/cn";

interface StreakFlameProps {
  days: number;
  className?: string;
}

export function StreakFlame({ days, className }: StreakFlameProps) {
  return (
    <span className={cn("streak", className)} title={`Racha de ${days} días`}>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          d="M13 2 4.5 13H11l-.8 9L19 10h-6.2L13 2z"
          fill="var(--gold)"
          stroke="var(--gold)"
          strokeWidth="0.6"
          strokeLinejoin="round"
        />
      </svg>
      <span>{days}</span>
    </span>
  );
}