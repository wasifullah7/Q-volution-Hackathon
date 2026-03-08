import { Badge } from "@/components/ui";
import { Zap, Home, LayoutDashboard } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <header className="flex h-16 items-center justify-between border-b border-border-subtle bg-bg-surface-1 px-6">
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent-primary to-accent-secondary">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-display text-lg font-bold tracking-tight text-text-primary">
              Ele(Q)tric
            </h1>
            <span className="text-[10px] text-text-tertiary">
              Quantum Optimization Suite
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${!isDashboard
                ? "bg-accent-primary-dim/50 text-accent-primary"
                : "text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${isDashboard
                ? "bg-accent-primary-dim/50 text-accent-primary"
                : "text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary"
              }`}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="success">Connected</Badge>
        <Badge variant="secondary">v1.0.0</Badge>
      </div>
    </header>
  );
}
