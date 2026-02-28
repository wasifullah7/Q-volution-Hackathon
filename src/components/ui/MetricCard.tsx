import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface MetricCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export function MetricCard({ icon, label, value, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-lg border border-border-subtle bg-bg-surface-1 p-4",
        className
      )}
    >
      <div className="flex items-center gap-2 text-text-secondary">
        {icon}
        <span className="font-body text-xs font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <span className="tabular-nums font-body text-2xl font-bold text-accent-primary">
        {value}
      </span>
    </div>
  );
}
