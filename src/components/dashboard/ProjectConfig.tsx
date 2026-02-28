import { Card, CardTitle, Button, Select } from "@/components/ui";
import { Upload, Play } from "lucide-react";
import { useState } from "react";

const BACKENDS = [
  { value: "qiskit", label: "Qiskit Simulator" },
  { value: "rigetti", label: "Rigetti QPU" },
  { value: "both", label: "Compare Both" },
];

const LAYERS = [1, 2, 3, 4];

export function ProjectConfig() {
  const [activeLayer, setActiveLayer] = useState(2);

  return (
    <div className="flex h-full flex-col gap-5">
      <CardTitle>Project Config</CardTitle>

      {/* Graph Input */}
      <div className="space-y-2">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
          Graph Input
        </label>
        <Card className="flex cursor-pointer flex-col items-center gap-2 border-dashed py-6 transition-colors hover:border-accent-primary">
          <Upload className="h-8 w-8 text-text-tertiary" />
          <span className="font-mono text-sm text-accent-primary">
            demo-graph.gml
          </span>
          <span className="text-xs text-text-tertiary">
            Click or drop to replace
          </span>
        </Card>
      </div>

      {/* Backend */}
      <div className="space-y-2">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
          Backend
        </label>
        <Select options={BACKENDS} defaultValue="qiskit" />
      </div>

      {/* QAOA Layers */}
      <div className="space-y-2">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
          QAOA Layers (P)
        </label>
        <div className="flex gap-2">
          {LAYERS.map((p) => (
            <button
              key={p}
              onClick={() => setActiveLayer(p)}
              className={`flex-1 rounded-lg border px-3 py-2 font-mono text-sm transition-all duration-200 ${
                activeLayer === p
                  ? "border-accent-primary bg-accent-primary-dim text-accent-primary shadow-glow-primary"
                  : "border-border-subtle bg-bg-surface-2 text-text-secondary hover:border-border-default hover:text-text-primary"
              }`}
            >
              p={p}
            </button>
          ))}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Run Button */}
      <Button size="lg" className="w-full text-base font-semibold">
        <Play className="h-4 w-4" />
        Run Simulation
      </Button>
    </div>
  );
}
