import { Play } from "lucide-react";

interface ChartPlaceholderProps {
  label?: string;
}

export function ChartPlaceholder({ label = "Run simulation to see results" }: ChartPlaceholderProps) {
  return (
    <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-border-subtle bg-bg-surface-2/50">
      <Play className="mb-2 h-10 w-10 text-text-tertiary/60" strokeWidth={1.5} />
      <p className="text-xs text-text-tertiary">{label}</p>
    </div>
  );
}
