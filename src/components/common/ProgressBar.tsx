import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";
import { Badge, type BadgeTone } from "./Badge";

type ProgressTone = "default" | "accent" | "success" | "info" | "gold";

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  tone?: ProgressTone;
  thin?: boolean;
  className?: string;
  valueFormatter?: (current: number, total: number) => string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue,
  tone = "default",
  thin,
  className,
  valueFormatter,
}: ProgressBarProps) {
  const total = Math.max(1, max);
  const pct = clamp((value / total) * 100, 0, 100);

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="row-between" style={{ marginBottom: "var(--sp-2)" }}>
          {label && <span style={{ fontSize: "var(--text-xs)", fontWeight: 650 }}>{label}</span>}
          {showValue && (
            <Badge tone="neutral" size="xs">
              {valueFormatter ? valueFormatter(value, max) : `${Math.round(value)} / ${max}`}
            </Badge>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
        className={cn(
          "progress",
          thin && "progress-thin",
          tone === "accent" && "progress-tone-accent",
          tone === "success" && "progress-tone-success",
          tone === "info" && "progress-tone-info",
          tone === "gold" && "progress-tone-gold",
        )}
      >
        <div className="progress-fill" style={{ "--pval": `${pct}%` } as CSSProperties} />
      </div>
    </div>
  );
}