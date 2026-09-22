import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  children?: ReactNode;
  label?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function ProgressRing({
  value,
  max = 100,
  size = 64,
  strokeWidth = 6,
  className,
  children,
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = clamp(value / Math.max(1, max), 0, 1);
  const offset = circumference * (1 - ratio);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn("progress-ring", className)}
      style={{ "--rw": `${strokeWidth}px` } as CSSProperties}
    >
      <svg width={size} height={size}>
        <circle
          className="ring-track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
        />
        <circle
          className="ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          display: "grid",
          placeItems: "center",
          width: size,
          height: size,
        }}
      >
        {children}
      </div>
    </div>
  );
}