import { CardTitle, MetricCard } from "@/components/ui";
import { Cpu, Layers, Activity, GitBranch } from "lucide-react";
import type { MetricsData } from "@/types/simulation";

interface TechnicalMetricsProps {
  data: MetricsData;
}

export function TechnicalMetrics({ data }: TechnicalMetricsProps) {
  return (
    <div className="space-y-4">
      <CardTitle>Technical Metrics</CardTitle>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Cpu className="h-4 w-4" />}
          label="1-Qubit Gates"
          value={data.oneQubitGates}
        />
        <MetricCard
          icon={<Layers className="h-4 w-4" />}
          label="2-Qubit Gates"
          value={data.twoQubitGates}
        />
        <MetricCard
          icon={<Activity className="h-4 w-4" />}
          label="MEPS"
          value={data.meps}
        />
        <MetricCard
          icon={<GitBranch className="h-4 w-4" />}
          label="Depth"
          value={data.depth}
        />
      </div>
    </div>
  );
}
