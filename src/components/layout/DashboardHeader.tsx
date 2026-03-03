import { Moon } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex h-10 items-center justify-between border-b border-border-subtle bg-bg-base px-5">
      <div className="flex items-center gap-3">
        <span className="font-display text-sm font-bold tracking-wider">
          <span className="text-accent-primary">QUANTUM</span>{" "}
          <span className="text-success">DASH</span>
        </span>
        <span className="text-text-tertiary">|</span>
        <span className="font-display text-xs font-medium tracking-wider text-text-tertiary">
          QAOA OPTIMIZATION SUITE
        </span>
      </div>
      <button className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-bg-surface-2 hover:text-text-primary">
        <Moon className="h-4 w-4" />
      </button>
    </div>
  );
}
