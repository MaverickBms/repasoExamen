import { cn } from "../../utils/cn";
import { Link, useLocation, isActive } from "../../utils/router";
import { Icon, IconButton } from "../common/icons";
import { BOTTOM_NAV } from "../../data/nav";

interface MobileNavProps {
  onOpenDrawer: () => void;
}

export function MobileNav({ onOpenDrawer }: MobileNavProps) {
  const current = useLocation();
  return (
    <div className="bottom-nav-wrap no-print">
      <nav className="bottom-nav" aria-label="Navegación principal">
        {BOTTOM_NAV.map((item) => {
          const active = isActive(current, item.path);
          return (
            <Link
              key={item.id}
              to={item.path}
              className={cn("bottom-item", active && "is-active")}
              aria-current={active ? "page" : undefined}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          className="bottom-item"
          onClick={onOpenDrawer}
          aria-label="Más opciones"
        >
          <Icon name="menu" size={20} />
          Más
        </button>
      </nav>
    </div>
  );
}