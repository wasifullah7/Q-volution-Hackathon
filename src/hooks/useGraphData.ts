import { useState, useCallback } from "react";
import {
  generateDemoGraph,
  simulateMaxCutSolution,
  countCutEdges,
  type ParsedGraph,
  type MaxCutSolution,
} from "@/lib/graph-parser";

const INITIAL_GRAPH = generateDemoGraph(25, 0.25);

export function useGraphData() {
  const [graph, setGraph] = useState<ParsedGraph>(INITIAL_GRAPH);
  const [filename, setFilename] = useState<string>("demo-graph.gml");
  const [error, setError] = useState<string | null>(null);
  const [solution, setSolution] = useState<MaxCutSolution | null>(null);
  const [cutCount, setCutCount] = useState(0);

  // File upload shows a dummy graph regardless of file content
  const loadFile = useCallback((file: File) => {
    setError(null);
    setSolution(null);
    setCutCount(0);
    // Show a fresh dummy graph instead of parsing the actual file
    setGraph(generateDemoGraph(25, 0.25));
    setFilename(file.name);
  }, []);

  const loadDemo = useCallback((nodeCount: number = 25, density: number = 0.25) => {
    setSolution(null);
    setCutCount(0);
    setGraph(generateDemoGraph(nodeCount, density));
    setFilename("demo-graph.gml");
    setError(null);
  }, []);

  const runSolution = useCallback(() => {
    const sol = simulateMaxCutSolution(graph);
    setSolution(sol);
    setCutCount(countCutEdges(graph.links, sol));
  }, [graph]);

  const clearSolution = useCallback(() => {
    setSolution(null);
    setCutCount(0);
  }, []);

  return {
    graph,
    filename,
    error,
    solution,
    cutCount,
    loadFile,
    loadDemo,
    runSolution,
    clearSolution,
  };
}
