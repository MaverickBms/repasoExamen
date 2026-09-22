import { cn } from "../../utils/cn";
import { Link, useLocation, isActive } from "../../utils/router";
import { Icon, IconButton, type IconName } from "../common/icons";
import { useTheme } from "../../hooks/useTheme";
import { NAV_GROUPS, type NavItem } from "../../data/nav";

function NavLink({ item, current }: { item: NavItem; current: string }) {
  const active = isActive(current, item.path);
  return (
    <Link
      to={item.path}
      className={cn("nav-link", active && "is-active")}
      aria-current={active ? "page" : undefined}
    >
      <Icon name={item.icon} size={18} />
      {item.label}
    </Link>
  );
}

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to="/" className="brand" onClick={onNavigate}>
      <span className="brand-mark">
        <svg viewBox="0 0 64 64" width="26" height="26" aria-hidden="true" focusable="false">
          <path d="M12 20h12v6H12zM28 20h12v6H28zM44 20h8v6h-8z" fill="rgba(255,255,255,.95)" />
          <path d="M12 32h12v6H12zM28 32h12v6H28zM44 32h8v6h-8z" fill="rgba(15,18,26,.85)" />
          <path d="M26 46l14-16v7L26 53z" fill="#fff" opacity=".9" />
        </svg>
      </span>
      <span>
        <span className="brand-name">POO Racing Academy</span>
        <span className="brand-sub">Aprende · Practica · Domina</span>
      </span>
    </Link>
  );
}

export function NavGroups({ current }: { current: string }) {
  return (
    <>
      {NAV_GROUPS.map((group) => (
        <nav key={group.label} className="nav-group" aria-label={group.label}>
          <div className="nav-label">{group.label}</div>
          {group.items.map((item) => (
            <NavLink key={item.id} item={item} current={current} />
          ))}
        </nav>
      ))}
    </>
  );
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const name: IconName = theme === "dark" ? "sun" : "moon";
  return (
    <IconButton
      name={name}
      label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={theme === "dark" ? "Modo claro" : "Modo oscuro"}
      onClick={toggleTheme}
      className={className}
    />
  );
}