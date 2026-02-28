import { CardTitle, MetricCard } from "@/components/ui";
import { Cpu, Layers, Activity, GitBranch } from "lucide-react";

export function TechnicalMetrics() {
  return (
    <div className="space-y-4">
      <CardTitle>Technical Metrics</CardTitle>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard
          icon={<Cpu className="h-4 w-4" />}
          label="1-Qubit Gates"
          value={49}
        />
        <MetricCard
          icon={<Layers className="h-4 w-4" />}
          label="2-Qubit Gates"
          value={18}
        />
        <MetricCard
          icon={<Activity className="h-4 w-4" />}
          label="MEPS"
          value="0.601"
        />
        <MetricCard
          icon={<GitBranch className="h-4 w-4" />}
          label="Depth"
          value={35}
        />
      </div>
    </div>
  );
}
