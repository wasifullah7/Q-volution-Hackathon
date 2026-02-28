import { CardTitle, Button, Select } from "@/components/ui";
import { Upload, Play, FileText, X, RefreshCw, RotateCcw } from "lucide-react";
import { useState, useRef, useCallback, type DragEvent } from "react";

const BACKENDS = [
  { value: "qiskit", label: "Qiskit Simulator" },
  { value: "rigetti", label: "Rigetti QPU" },
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
          {filename ? (
            <>
              <FileText className="h-7 w-7 text-accent-primary" />
              <span className="max-w-full truncate font-mono text-sm text-accent-primary">
                {filename}
              </span>
              <span className="tabular-nums text-[11px] text-text-tertiary">
                {nodeCount} nodes &middot; {edgeCount} edges
              </span>
            </>
          ) : (
            <>
              <Upload className="h-7 w-7 text-text-tertiary" />
              <span className="text-xs text-text-secondary">
                Drop file or click to browse
              </span>
            </>
          )}
          <span className="text-[10px] text-text-tertiary">
            .gml, .json, .csv, .txt
          </span>
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-md bg-error/10 px-2.5 py-2 text-xs text-error">
            <X className="mt-0.5 h-3 w-3 shrink-0" />
            {error}
          </div>
        )}

        <button
          onClick={() => onLoadDemo(25, 0.25)}
          className="flex w-full items-center justify-center gap-1.5 rounded-md border border-border-subtle bg-bg-surface-2 px-2 py-1.5 text-xs text-text-secondary transition-colors hover:border-border-default hover:text-text-primary"
        >
          <RefreshCw className="h-3 w-3" />
          Generate Random Graph
        </button>
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

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {hasSolution && (
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
          onClick={onRunSolution}
        >
          <Play className="h-4 w-4" />
          {hasSolution ? "Re-run Simulation" : "Run Simulation"}
        </Button>
      </div>
    </div>
  );
}
