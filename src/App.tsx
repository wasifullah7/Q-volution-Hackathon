import { Layout } from "@/components/layout";
import {
  ProjectConfig,
  GraphVisualization,
  MeasurementResults,
  TechnicalMetrics,
  AIAnalysis,
} from "@/components/dashboard";
import { useGraphData } from "@/hooks/useGraphData";

export default function App() {
  const { graph, filename, error, loadFile, loadDemo } = useGraphData();

  return (
    <Layout
      sidebar={
        <ProjectConfig
          filename={filename}
          nodeCount={graph.nodes.length}
          edgeCount={graph.links.length}
          error={error}
          onFileLoad={loadFile}
          onLoadDemo={loadDemo}
        />
      }
      main={<GraphVisualization graph={graph} />}
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
