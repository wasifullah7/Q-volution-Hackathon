import { Layout } from "@/components/layout";
import {
  ProjectConfig,
  GraphVisualization,
  MeasurementResults,
  TechnicalMetrics,
  AIAnalysis,
} from "@/components/dashboard";
import { useGraphData } from "@/hooks/useGraphData";

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

  const hasSolution = solution !== null && solution.size > 0;

  return (
    <Layout
      sidebar={
        <ProjectConfig
          filename={filename}
          nodeCount={graph.nodes.length}
          edgeCount={graph.links.length}
          error={error}
          hasSolution={hasSolution}
          onFileLoad={loadFile}
          onLoadDemo={loadDemo}
          onRunSolution={runSolution}
          onClearSolution={clearSolution}
        />
      }
      main={<GraphVisualization graph={graph} solution={solution} />}
      aside={
        <div className="flex h-full flex-col gap-6">
          <TechnicalMetrics />
          <MeasurementResults />
          <AIAnalysis />
        </div>
      }
    />
  );
}
