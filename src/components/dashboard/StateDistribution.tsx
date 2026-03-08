import { BarChart3 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ReferenceArea
} from "recharts";

const complexityData = Array.from({ length: 25 }, (_, i) => {
  const n = (i + 1) * 4; // up to 100
  return {
    n,
    qaoa: Math.pow(10, (n * 0.33) + 2), 
    bruteForce: Math.pow(10, (n * 0.3) + 1),
    gwSdp: Math.pow(n, 3) * 10
  };
});

// Since recharts log scale has some quirks with 0, we start n a bit higher, or handle it carefully.

export function StateDistribution() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 p-5 transition-colors duration-300">
      <div className="mb-3 flex items-center gap-2">
        <BarChart3 className="h-4 w-4 text-accent-primary" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
          Problem Complexity
        </h3>
      </div>
      
      <div className="text-center font-semibold text-text-primary text-xs mb-4">
        Max-Cut: Exact (NP-Hard) vs. Approximation (n=100)
      </div>

      <div className="flex flex-1 flex-col">
        <div className="min-h-44 flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complexityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" opacity={0.5} />
              <XAxis 
                dataKey="n" 
                type="number" 
                domain={[0, 100]} 
                tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }} 
                axisLine={{ stroke: "var(--color-border-subtle)" }} 
                tickLine={false} 
              />
              <YAxis 
                scale="log" 
                domain={[10, 1e33]} 
                tickFormatter={(val) => `10^${Math.log10(val)}`}
                tick={{ fill: "var(--color-text-secondary)", fontSize: 11 }} 
                axisLine={false} 
                tickLine={false} 
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "var(--color-bg-surface-2)", borderColor: "var(--color-border-subtle)", color: "var(--color-text-primary)" }}
                labelFormatter={(val) => `Nodes (n): ${val}`}
              />
              <Legend wrapperStyle={{ fontSize: '11px', color: 'var(--color-text-primary)' }} />
              
              <ReferenceArea x1={4} x2={21} fill="#fef0d9" fillOpacity={0.2} />
              <ReferenceLine x={21} stroke="var(--color-text-secondary)" strokeDasharray="3 3" />
              
              <Line type="monotone" dataKey="qaoa" name="QAOA sim (Exact) - O(2^n)" stroke="#9370db" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="bruteForce" name="Brute Force (Exact) - O(2^n)" stroke="#fa8072" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="gwSdp" name="GW-SDP (Approx) - O(n^3)" stroke="#20b2aa" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
    </div>
  );
}
