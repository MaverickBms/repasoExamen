import { useLocation } from "../../utils/router";
import { Brand, NavGroups, ThemeToggle } from "./NavShared";

export function Sidebar() {
  const current = useLocation();
  return (
    <aside className="sidebar no-print">
      <Brand />
      <NavGroups current={current} />
      <div className="sidebar-footer">
        <span className="text-3" style={{ fontSize: "var(--text-xs)" }}>
          v0.1
        </span>
        <ThemeToggle />
      </div>
    </aside>
  );
}