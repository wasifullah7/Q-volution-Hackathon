import type { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  aside: ReactNode;
}

export function Layout({ sidebar, main, aside }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg-base">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar -- Project Config */}
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-border-subtle bg-bg-surface-1 p-5">
          {sidebar}
        </aside>

        {/* Center -- Full Graph */}
        <main className="relative flex flex-1 flex-col overflow-hidden">
          {main}
        </main>

        {/* Right Panel -- Metrics + AI */}
        <aside className="w-80 shrink-0 overflow-y-auto border-l border-border-subtle bg-bg-surface-1 p-5">
          {aside}
        </aside>
      </div>
    </div>
  );
}
