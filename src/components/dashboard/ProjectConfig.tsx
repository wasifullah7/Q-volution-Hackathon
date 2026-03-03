import { CardTitle, Button, Select } from "@/components/ui";
import { Play, FileText, X, RotateCcw, Leaf, Loader2 } from "lucide-react";
import { useState, useRef, useCallback, type DragEvent } from "react";

const BACKENDS = [
  { value: "rigetti", label: "Rigetti QPU" },
  { value: "qiskit", label: "Qiskit Simulator" },
  { value: "both", label: "Compare Both" },
];

const LAYERS = [1, 2, 3, 4];

const ACCEPTED_EXTENSIONS = [".gml", ".json", ".csv", ".txt", ".tsv", ".edgelist"];

interface ProjectConfigProps {
  filename: string;
  nodeCount: number;
  edgeCount: number;
  error: string | null;
  hasSolution: boolean;
  isLoading: boolean;
  onFileLoad: (file: File) => void;
  onLoadDemo: (nodeCount?: number, density?: number) => void;
  onRunSolution: () => void;
  onClearSolution: () => void;
}

export function ProjectConfig({
  filename,
  nodeCount,
  edgeCount,
  error,
  hasSolution,
  isLoading,
  onFileLoad,
  onLoadDemo,
  onRunSolution,
  onClearSolution,
}: ProjectConfigProps) {
  const [activeLayer, setActiveLayer] = useState(2);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileLoad(file);
    },
    [onFileLoad]
  );

  const handleFileSelect = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFileLoad(file);
      e.target.value = "";
    },
    [onFileLoad]
  );

  const displayName = filename || "requirements.txt";
  const hasGraph = nodeCount > 0;

  return (
    <div className="flex h-full flex-col gap-5">
      <CardTitle>Project Config</CardTitle>

      {/* Graph Input */}
      <div className="space-y-2">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
          Graph Input
        </label>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS.join(",")}
          onChange={handleInputChange}
          className="hidden"
        />

        <div
          onClick={handleFileSelect}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed px-3 py-5 transition-all duration-200 ${
            isDragOver
              ? "border-accent-primary bg-accent-primary-dim/30 shadow-glow-primary"
              : "border-border-subtle bg-bg-surface-2 hover:border-accent-primary/50 hover:bg-bg-surface-3"
          }`}
        >
          <FileText className="h-7 w-7 text-accent-primary" />
          <span className="max-w-full truncate font-mono text-sm text-accent-primary">
            {displayName}
          </span>
          {hasGraph ? (
            <span className="tabular-nums text-[11px] text-text-tertiary">
              {nodeCount} nodes &middot; {edgeCount} edges
            </span>
          ) : (
            <span className="text-[11px] text-text-tertiary">
              Click or drop to replace
            </span>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-md bg-error/10 px-2.5 py-2 text-xs text-error">
            <X className="mt-0.5 h-3 w-3 shrink-0" />
            {error}
          </div>
        )}
      </div>

      {/* Backend */}
      <div className="space-y-2">
        <label className="font-body text-xs font-medium uppercase tracking-wider text-text-secondary">
          Backend
        </label>
        <Select options={BACKENDS} defaultValue="rigetti" />
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

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {hasSolution && !isLoading && (
          <Button
            variant="outline"
            size="md"
            className="w-full"
            onClick={onClearSolution}
          >
            <RotateCcw className="h-4 w-4" />
            Clear Solution
          </Button>
        )}
        <Button
          size="lg"
          className="w-full text-base font-semibold"
          onClick={() => {
            if (!hasGraph) onLoadDemo(9, 0.6);
            onRunSolution();
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Simulating...
            </>
          ) : (
            <>
              <Play className="h-4 w-4" />
              {hasSolution ? "Re-run Simulation" : "Run Simulation"}
            </>
          )}
        </Button>

        {/* Eco Mode Indicator */}
        <div className="flex items-center justify-center gap-2 py-1">
          <Leaf className="h-3.5 w-3.5 text-success" />
          <span className="font-display text-xs font-semibold uppercase tracking-wider text-success">
            Eco-Mode Active
          </span>
        </div>
      </div>
    </div>
  );
}
