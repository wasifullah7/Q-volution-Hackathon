import { BarChart3, ChevronLeft, ChevronRight } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";
import { useState } from "react";

const chart1Data = [
  { name: "(90,87)", value: 0.018 },
  { name: "(106,129)", value: 0.012 },
  { name: "(1,120)", value: 0.011 },
  { name: "(49,143)", value: 0.011 },
  { name: "(11,23)", value: 0.011 },
  { name: "(85,41)", value: 0.011 },
  { name: "(14,90)", value: 0.011 },
  { name: "(108,109)", value: 0.011 },
  { name: "(113,112)", value: 0.010 },
  { name: "(157,160)", value: 0.000 },
  { name: "(2,144)", value: 0.010 },
  { name: "(134,157)", value: 0.010 },
  { name: "(176,147)", value: 0.000 },
  { name: "(156,143)", value: 0.000 },
  { name: "(3,126)", value: 0.009 },
];

const chart2Data = [
  { name: "(90,87)", value: 0.018 },
  { name: "(106,129)", value: 0.012 },
  { name: "(1,120)", value: 0.011 },
  { name: "(49,143)", value: 0.011 },
  { name: "(11,23)", value: 0.011 },
  { name: "(85,41)", value: 0.011 },
  { name: "(14,90)", value: 0.011 },
  { name: "(108,109)", value: 0.011 },
  { name: "(113,112)", value: 0.010 },
  { name: "(157,160)", value: 0.010 },
  { name: "(2,144)", value: 0.010 },
  { name: "(134,157)", value: 0.010 },
  { name: "(176,147)", value: 0.009 },
  { name: "(156,143)", value: 0.009 },
  { name: "(3,126)", value: 0.009 },
];

export function ProbabilityOfResults() {
  const [activeChart, setActiveChart] = useState(0);

  const charts = [
    {
      title: "QAOA Preconditioned — Cut Contribution per Edge",
      subtitle: "Total cut value = 6551.6272 | G_pre weights = -(ZiZj)",
      data: chart1Data,
      color: "#4a9bf5"
    },
    {
      title: "Simulated Annealing — Cut Contribution per Edge",
      subtitle: "Total cut value = 6562.8826 | 5000 iterations, To=10, r=0.995",
      data: chart2Data,
      color: "#f5a153"
    }
  ];

  const current = charts[activeChart];

  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 transition-colors duration-300">
      <div className="flex items-center justify-between border-b border-border-subtle p-5 pb-3">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-accent-primary" />
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
            Probability of Results
          </h3>
        </div>
        <div className="flex gap-1.5">
          <button 
            className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-surface-2 text-text-secondary hover:bg-bg-surface-3 transition-colors"
            onClick={() => setActiveChart(0)}
          >
            <ChevronLeft className="h-3 w-3" />
          </button>
          <button 
            className="flex h-6 w-6 items-center justify-center rounded-full bg-bg-surface-2 text-text-secondary hover:bg-bg-surface-3 transition-colors"
            onClick={() => setActiveChart(1)}
          >
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2 pt-4 relative group">
        <div className="text-center mb-4 leading-tight">
          <h4 className="font-sans text-[13px] font-bold text-text-primary">
            {current.title}
          </h4>
          <p className="font-sans text-[12px] font-semibold text-text-primary">
            {current.subtitle}
          </p>
        </div>

        <div className="flex-1 w-full min-h-0 relative px-2 cursor-pointer" onClick={() => setActiveChart(activeChart === 0 ? 1 : 0)}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={current.data} margin={{ top: 20, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} opacity={0.3} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "var(--color-text-secondary)", fontSize: 9 }} 
                axisLine={{ stroke: "var(--color-border-subtle)" }} 
                tickLine={false} 
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis 
                tick={{ fill: "var(--color-text-secondary)", fontSize: 10 }} 
                axisLine={false} 
                tickLine={false}
                domain={[0, 0.02]}
                width={45}
                tickFormatter={(val) => val.toFixed(4)}
              />
              <Tooltip 
                cursor={{ fill: "transparent" }} 
                contentStyle={{ backgroundColor: "var(--color-bg-surface-2)", borderColor: "var(--color-border-subtle)", color: "var(--color-text-primary)", fontSize: "11px" }} 
                formatter={(value: any) => typeof value === 'number' ? value.toFixed(3) : value}
              />
              <Bar dataKey="value" fill={current.color} maxBarSize={40}>
                <LabelList dataKey="value" position="top" fill="var(--color-text-primary)" fontSize={8} formatter={(val: any) => typeof val === 'number' ? (val === 0 ? "0.000" : val.toFixed(3).replace(/^0+/, '')) : val} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-text-secondary">
          Edge (u, v) [top-15 by admittance weight]
        </div>

        <div className="mb-2 flex justify-center gap-1.5 mt-2">
          {charts.map((_, i) => (
            <span 
              key={i} 
              className={`block h-1.5 w-1.5 rounded-full transition-colors ${i === activeChart ? "bg-accent-primary" : "bg-bg-surface-3"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
