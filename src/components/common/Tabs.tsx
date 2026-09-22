import { cn } from "../../utils/cn";
import { Icon, type IconName } from "./icons";

export interface TabItem {
  id: string;
  label: string;
  icon?: IconName;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

export function Tabs({ items, value, onChange, ariaLabel, className }: TabsProps) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={cn("tabs", className)}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          id={`tab-${item.id}`}
          aria-selected={value === item.id}
          aria-controls={`panel-${item.id}`}
          className={cn("tab", value === item.id && "is-active")}
          onClick={() => onChange(item.id)}
        >
          {item.icon && <Icon name={item.icon} size={16} />}
          {item.label}
        </button>
      ))}
    </div>
  );
}