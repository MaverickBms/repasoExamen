import { useEffect } from "react";
import { useLocation } from "../../utils/router";
import { Icon, IconButton } from "../common/icons";
import { Brand, NavGroups, ThemeToggle } from "./NavShared";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

export function Drawer({ open, onClose }: DrawerProps) {
  const current = useLocation();

  useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Menú de navegación">
        <div className="row-between">
          <Brand onNavigate={onClose} />
          <IconButton name="x" label="Cerrar menú" onClick={onClose} />
        </div>
        <NavGroups current={current} />
        <div
          className="row-between"
          style={{ marginTop: "auto", borderTop: "1px solid var(--border)", paddingTop: "var(--sp-3)" }}
        >
          <span className="text-3" style={{ fontSize: "var(--text-xs)" }}>
            v0.1 · FASE 2
          </span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}