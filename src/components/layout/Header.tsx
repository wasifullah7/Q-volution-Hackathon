import { Badge } from "@/components/ui";
import { Atom } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border-subtle bg-bg-surface-1 px-6">
      <div className="flex items-center gap-3">
        <Atom className="h-6 w-6 text-accent-primary" />
        <h1 className="font-display text-lg font-bold tracking-tight text-text-primary">
          QUANTUM <span className="text-accent-primary">DASH</span>
        </h1>
        <span className="hidden text-sm text-text-tertiary sm:inline">
          QAOA Optimization Suite
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Badge variant="success">Connected</Badge>
        <Badge variant="secondary">v1.0.0</Badge>
      </div>
    </header>
  );
}
