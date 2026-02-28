import { Card, CardHeader, CardTitle, Badge } from "@/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const QISKIT_DATA = [
  { bitstring: "01101110", qiskit: 435, rigetti: 280 },
  { bitstring: "11001011", qiskit: 380, rigetti: 310 },
  { bitstring: "10001010", qiskit: 340, rigetti: 295 },
  { bitstring: "10001101", qiskit: 310, rigetti: 270 },
  { bitstring: "01011010", qiskit: 275, rigetti: 260 },
  { bitstring: "11010010", qiskit: 240, rigetti: 250 },
  { bitstring: "01001100", qiskit: 210, rigetti: 240 },
  { bitstring: "10000001", qiskit: 185, rigetti: 230 },
  { bitstring: "01110100", qiskit: 160, rigetti: 210 },
  { bitstring: "00110010", qiskit: 140, rigetti: 195 },
];

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
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

export function MeasurementResults() {
  return (
    <div className="space-y-3">
      <CardHeader className="mb-0">
        <CardTitle>Measurement Results</CardTitle>
        <Badge variant="secondary">Compare</Badge>
      </CardHeader>

      <Card className="p-3">
        <div className="mb-2 flex items-center gap-3 text-[11px] text-text-secondary">
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-data-1" />
            Qiskit
          </div>
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-data-2" />
            Rigetti
          </div>
        </div>

        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={QISKIT_DATA} barGap={1}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#2A3450"
                vertical={false}
              />
              <XAxis
                dataKey="bitstring"
                tick={false}
                axisLine={{ stroke: "#2A3450" }}
                tickLine={false}
                height={5}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#94A3B8" }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="qiskit"
                name="Qiskit"
                fill="#38BDF8"
                radius={[2, 2, 0, 0]}
                maxBarSize={12}
              />
              <Bar
                dataKey="rigetti"
                name="Rigetti"
                fill="#A78BFA"
                radius={[2, 2, 0, 0]}
                maxBarSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-2 flex items-center justify-between text-[11px] text-text-tertiary">
          <span>
            Opt: <span className="tabular-nums text-accent-primary">-10.44</span>
          </span>
          <span>
            Iter: <span className="tabular-nums text-text-secondary">177</span> | <span className="tabular-nums text-text-secondary">150</span>
          </span>
        </div>
      </Card>
    </div>
  );
}
