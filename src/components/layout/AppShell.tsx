import { useState, type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { Drawer } from "./Drawer";

interface AppShellProps {
  title?: string;
  children: ReactNode;
}

export function AppShell({ title, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main">
        <TopBar title={title} onOpenDrawer={() => setDrawerOpen(true)} />
        <main className="main-inner" id="main-content">
          {children}
        </main>
      </div>
      <MobileNav onOpenDrawer={() => setDrawerOpen(true)} />
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}