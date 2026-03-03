import { BarChart3 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { StateEntry } from "@/types/simulation";

interface StateDistributionProps {
  data: StateEntry[];
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) {
  if (!active || !payload?.length) return null;
  const entry = payload[0];
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface-3 px-3 py-2 shadow-card">
      <p className="font-mono text-xs text-text-primary">{entry.name}</p>
      <p className="tabular-nums text-xs" style={{ color: entry.payload.color }}>
        Count: {entry.value}
      </p>
    </div>
  );
}

export function StateDistribution({ data }: StateDistributionProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 p-5">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-accent-primary" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
          State Distribution
        </h3>
      </div>

      <div className="mb-2 flex items-center gap-2 text-[11px] text-text-secondary">
        <span className="h-2 w-2 rounded-full bg-accent-primary" />
        Rigetti QPU
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="aspect-square w-full max-w-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
