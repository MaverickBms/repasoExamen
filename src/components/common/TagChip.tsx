import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon, type IconName } from "./icons";

interface TagChipProps {
  children: ReactNode;
  icon?: IconName;
  active?: boolean;
  onClick?: () => void;
  className?: string;
  title?: string;
}

export function TagChip({ children, icon, active, onClick, className, title }: TagChipProps) {
  const inner = (
    <>
      {icon && <Icon name={icon} size={13} />}
      {children}
    </>
  );
  if (onClick) {
    return (
      <button
        type="button"
        className={cn("tag", active && "badge-accent", className)}
        onClick={onClick}
        title={title}
        aria-pressed={active}
      >
        {inner}
      </button>
    );
  }
  return (
    <span className={cn("tag", active && "badge-accent", className)} title={title}>
      {inner}
    </span>
  );
}