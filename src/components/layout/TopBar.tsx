import { IconButton } from "../common/icons";
import { ThemeToggle } from "./NavShared";
import { LogoMark } from "../gamification/Logo";

interface TopBarProps {
  title?: string;
  onOpenDrawer: () => void;
}

export function TopBar({ title, onOpenDrawer }: TopBarProps) {
  return (
    <header className="topbar no-print">
      <IconButton name="menu" label="Abrir menú" onClick={onOpenDrawer} />
      <span className="topbar-brand">
        <LogoMark size={26} />
        <span>POO Racing</span>
      </span>
      {title && <span className="topbar-title">{title}</span>}
      <ThemeToggle />
    </header>
  );
}