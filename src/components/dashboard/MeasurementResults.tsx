import { Target } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  ReferenceLine,
  Cell,
} from "recharts";

const comparisonData = [
  { name: "GW SDP", value: 5475.69, percentage: "73.3%", fill: "#c4a7e7" },
  { name: "Baseline SA", value: 6518.15, percentage: "87.3%", fill: "#eb9a44" },
  { name: "QVM Preconditioned", value: 6551.63, percentage: "87.8%", fill: "#4494eb" },
  { name: "Ankaa-3 Hardware", value: 3588.31, percentage: "48.1%", fill: "#cca33b" },
];

export function MeasurementResults() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 p-5 transition-colors duration-300">
      <div className="mb-3 flex items-center gap-2">
        <Target className="h-4 w-4 text-accent-primary" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
          Comparison With Other Results
        </h3>
      </div>

      <div className="text-center font-semibold text-text-primary text-xs mb-4">
        Final Results — All Methods Problem B: South Carolina Grid (180 nodes, 226 edges)
      </div>

      <div className="flex flex-1 flex-col">
        <div className="min-h-44 flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }} axisLine={{ stroke: "var(--color-border-subtle)" }} tickLine={false} />
              <YAxis tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 7500]} />
              <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ backgroundColor: "var(--color-bg-surface-2)", borderColor: "var(--color-border-subtle)", color: "var(--color-text-primary)" }} />
              <ReferenceLine y={6551.63} stroke="var(--color-text-secondary)" strokeDasharray="3 3" label={{ position: 'top', value: 'Best: 6551.63', fill: "var(--color-text-secondary)", fontSize: 11 }} />
              <Bar dataKey="value" maxBarSize={60}>
                {comparisonData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
