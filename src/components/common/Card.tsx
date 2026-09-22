import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon, type IconName } from "./icons";

export type CardVariant = "elevated" | "flat" | "hover";
export type CardPadding = "sm" | "md" | "lg" | "none";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  padding?: CardPadding;
  title?: string;
  subtitle?: string;
  icon?: IconName;
  actions?: ReactNode;
  as?: "section" | "article" | "div";
  id?: string;
}

const PAD: Record<CardPadding, string> = {
  sm: "card-pad-sm",
  md: "card-pad-md",
  lg: "card-pad-lg",
  none: "",
};

export function Card({
  children,
  className,
  variant = "elevated",
  padding = "none",
  title,
  subtitle,
  icon,
  actions,
  as: Tag = "div",
  id,
}: CardProps) {
  const filled = title !== undefined || icon !== undefined;
  return (
    <Tag
      className={cn(
        "card",
        variant === "flat" && "card-flat",
        variant === "hover" && "card-hover",
        PAD[padding],
        className,
      )}
      id={id}
    >
      {filled && (
        <div className="card-head">
          {icon && <Icon name={icon} size={20} className="text-2" />}
          <div>
            {title && <div className="card-title">{title}</div>}
            {subtitle && <div className="card-sub">{subtitle}</div>}
          </div>
        </div>
      )}
      {children}
      {actions && <div className="card-actions">{actions}</div>}
    </Tag>
  );
}

interface CardStatProps {
  icon?: IconName;
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  className?: string;
}

export function CardStat({ icon, label, value, hint, className }: CardStatProps) {
  return (
    <div className={cn("stat", className)}>
      <div className="stat-label">
        {icon && <Icon name={icon} size={14} />}
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {hint && <div className="text-3" style={{ fontSize: "var(--text-xs)" }}>{hint}</div>}
    </div>
  );
}