import type { ReactNode } from "react";
import { Navigation } from "@/components/home/Navigation";

interface LayoutProps {
  sidebar: ReactNode;
  main: ReactNode;
  aside: ReactNode;
}

export function Layout({ sidebar, main, aside }: LayoutProps) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-bg-base">
      <Navigation />
      <div className="flex flex-1 overflow-hidden pt-14">
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-border-subtle bg-bg-surface-1 p-5">
          {sidebar}
        </aside>

        <main className="relative flex flex-1 flex-col overflow-y-auto p-4">
          {main}
        </main>

        <aside className="w-80 shrink-0 overflow-y-auto border-l border-border-subtle bg-bg-surface-1 p-5">
          {aside}
        </aside>
      </div>
    </div>
  );
}
