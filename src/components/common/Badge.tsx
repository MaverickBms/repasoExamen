import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

export type BadgeTone =
  | "neutral"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "gold";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  dot?: boolean;
  size?: "sm" | "xs";
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  tone = "neutral",
  dot,
  size = "sm",
  icon,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "badge",
        `badge-${tone}`,
        dot && "badge-dot",
        size === "xs" && "badge-xs",
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}