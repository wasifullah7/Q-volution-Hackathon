import { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  ProjectConfig,
  GraphVisualization,
  MeasurementResults,
  TechnicalMetrics,
  AIAnalysis,
  ProbabilityOfResults,
  StateDistribution,
} from "@/components/dashboard";
import { FullscreenCard } from "@/components/ui/FullscreenCard";
import { useGraphData } from "@/hooks/useGraphData";
import {
  INITIAL_SIMULATION,
  COMPLETED_SIMULATION,
  type SimulationStatus,
  type SimulationData,
} from "@/types/simulation";
import { exportReport } from "@/utils/exportReport";

export function DashboardPage() {
  const {
    graph,
    filename,
    error,
    solution,
    loadFile,
    loadDemo,
    runSolution,
    clearSolution,
  } = useGraphData();

  const [simStatus, setSimStatus] = useState<SimulationStatus>("idle");
  const [simData, setSimData] = useState<SimulationData>(INITIAL_SIMULATION);
  const [isExporting, setIsExporting] = useState(false);

  const hasSolution = solution !== null && solution.size > 0;

  const handleRunSimulation = useCallback(() => {
    setSimStatus("loading");

    // Load demo graph if empty
    if (graph.nodes.length === 0) {
      loadDemo(9, 0.6);
    }

    // Simulate loading delay, then show results
    setTimeout(() => {
      runSolution();
      setSimData(COMPLETED_SIMULATION);
      setSimStatus("completed");
    }, 2500);
  }, [graph.nodes.length, loadDemo, runSolution]);

  const handleClearSolution = useCallback(() => {
    clearSolution();
    setSimData(INITIAL_SIMULATION);
    setSimStatus("idle");
  }, [clearSolution]);

  const handleExport = useCallback(async () => {
    setIsExporting(true);
    try {
      await exportReport({
        simData,
        nodeCount: graph.nodes.length,
        edgeCount: graph.links.length,
        filename: filename || "demo-graph.gml",
      });
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
  }, [simData, graph.nodes.length, graph.links.length, filename]);

  return (
    <Layout
      sidebar={
        <ProjectConfig
          filename={filename}
          nodeCount={graph.nodes.length}
          edgeCount={graph.links.length}
          error={error}
          hasSolution={hasSolution}
          isLoading={simStatus === "loading"}
          onFileLoad={loadFile}
          onLoadDemo={loadDemo}
          onRunSolution={handleRunSimulation}
          onClearSolution={handleClearSolution}
        />
      }
      main={
        <div className="relative grid h-full grid-cols-2 grid-rows-2 gap-4">
          {/* Loading Overlay */}
          {simStatus === "loading" && (
            <div className="absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-bg-base/80 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-accent-primary/20 border-t-accent-primary" />
                <div className="text-center">
                  <p className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
                    Running QAOA Simulation
                  </p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Optimizing on Rigetti QPU with p=2 layers...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Top Left - Quantum Circuit Visualizer */}
          <FullscreenCard>
            <div id="chart-graph" className="flex h-full w-full flex-col overflow-hidden">
              <GraphVisualization graph={graph} solution={solution} />
            </div>
          </FullscreenCard>

          {/* Top Right - Probability of Results */}
          <FullscreenCard>
            <div id="chart-sustainability" className="flex h-full w-full flex-col overflow-hidden">
              <ProbabilityOfResults />
            </div>
          </FullscreenCard>

          {/* Bottom Left - State Distribution */}
          <FullscreenCard>
            <div id="chart-distribution" className="flex h-full w-full flex-col overflow-hidden">
              <StateDistribution />
            </div>
          </FullscreenCard>

          {/* Bottom Right - Measurement Results */}
          <FullscreenCard>
            <div id="chart-measurements" className="flex h-full w-full flex-col overflow-hidden">
              <MeasurementResults />
            </div>
          </FullscreenCard>
        </div>
      }
      aside={
        <div className="flex h-full flex-col gap-6">
          <TechnicalMetrics data={simData.metrics} />
          <AIAnalysis simStatus={simStatus} onExport={handleExport} isExporting={isExporting} />
        </div>
      }
    />
  );
}
