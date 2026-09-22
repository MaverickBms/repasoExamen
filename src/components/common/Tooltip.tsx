import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

interface TooltipProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function Tooltip({ label, children, className }: TooltipProps) {
  return (
    <span className={cn("tip", className)} tabIndex={0}>
      {children}
      <span className="tip-bubble" role="tooltip">
        {label}
      </span>
    </span>
  );
}