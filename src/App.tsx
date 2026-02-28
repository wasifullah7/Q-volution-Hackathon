import { Layout } from "@/components/layout";
import {
  ProjectConfig,
  GraphVisualization,
  MeasurementResults,
  TechnicalMetrics,
  AIAnalysis,
} from "@/components/dashboard";

export default function App() {
  return (
    <Layout
      sidebar={<ProjectConfig />}
      main={
        <>
          <GraphVisualization />
          <MeasurementResults />
        </>
      }
      aside={
        <div className="flex h-full flex-col gap-6">
          <TechnicalMetrics />
          <AIAnalysis />
        </div>
      }
    />
  );
}
