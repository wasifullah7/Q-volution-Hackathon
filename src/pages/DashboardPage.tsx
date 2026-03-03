import { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import {
  ProjectConfig,
  GraphVisualization,
  MeasurementResults,
  TechnicalMetrics,
  AIAnalysis,
  SustainabilityScorecard,
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
            <GraphVisualization graph={graph} solution={solution} />
          </FullscreenCard>

          {/* Top Right - Sustainability Scorecard */}
          <FullscreenCard>
            <SustainabilityScorecard />
          </FullscreenCard>

          {/* Bottom Left - State Distribution */}
          <FullscreenCard>
            <StateDistribution data={simData.stateDistribution} />
          </FullscreenCard>

          {/* Bottom Right - Measurement Results */}
          <FullscreenCard>
            <MeasurementResults data={simData.measurements} />
          </FullscreenCard>
        </div>
      }
      aside={
        <div className="flex h-full flex-col gap-6">
          <TechnicalMetrics data={simData.metrics} />
          <AIAnalysis simStatus={simStatus} />
        </div>
      }
    />
  );
}
