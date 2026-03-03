import { Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { MeasurementData } from "@/types/simulation";

interface MeasurementResultsProps {
  data: MeasurementData;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string; color: string }[];
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-surface-3 px-3 py-2 shadow-card">
      <p className="mb-1 font-mono text-xs text-text-primary">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="tabular-nums text-xs"
          style={{ color: entry.color }}
        >
          Count: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function MeasurementResults({ data }: MeasurementResultsProps) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 p-5">
      <div className="mb-3 flex items-center gap-2">
        <Target className="h-4 w-4 text-accent-primary" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
          Measurement Results
        </h3>
      </div>

      <div className="mb-2 flex items-center gap-2 text-[11px] text-text-secondary">
        <span className="h-2 w-2 rounded-full bg-accent-primary" />
        Rigetti QPU
      </div>

      <div className="flex flex-1 flex-col">
        <div className="min-h-44 flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.entries} barGap={2}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="var(--color-border-subtle)"
                vertical={false}
              />
              <XAxis
                dataKey="bitstring"
                tick={{ fontSize: 9, fill: "var(--color-text-secondary)", fontFamily: "JetBrains Mono, monospace" }}
                axisLine={{ stroke: "var(--color-border-subtle)" }}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                height={50}
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "var(--color-text-secondary)" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="count"
                name="Rigetti QPU"
                fill="var(--color-accent-primary)"
                radius={[2, 2, 0, 0]}
                maxBarSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between text-[11px] text-text-tertiary">
        <span>
          Optimal: <span className="tabular-nums text-accent-primary">{data.optimal}</span>
        </span>
        <span>
          Iterations: <span className="tabular-nums text-text-secondary">{data.iterations}</span>
        </span>
      </div>
    </div>
  );
}
