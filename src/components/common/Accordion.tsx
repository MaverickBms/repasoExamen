import { useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Icon, type IconName } from "./icons";

export interface AccordionItem {
  id: string;
  title: string;
  icon?: IconName;
  content: ReactNode;
  initialOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  const initial = new Set(
    items.filter((i) => i.initialOpen).map((i) => i.id),
  );
  const [openIds, setOpenIds] = useState<Set<string>>(initial);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn("stack", className)}>
      {items.map((item) => {
        const open = openIds.has(item.id);
        return (
          <div key={item.id} className={cn("acco", open && "open")}>
            <button
              type="button"
              className="acco-head"
              aria-expanded={open}
              aria-controls={`acco-panel-${item.id}`}
              onClick={() => toggle(item.id)}
            >
              {item.icon && <Icon name={item.icon} size={18} className="text-3" />}
              {item.title}
              <Icon name="chevronDown" size={18} className="chevron" />
            </button>
            {open && (
              <div
                id={`acco-panel-${item.id}`}
                role="region"
                className="acco-body anim-fade"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}