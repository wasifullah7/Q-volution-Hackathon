import { useState, useCallback } from "react";
import {
  generateDemoGraph,
  parseGraphFile,
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

  const loadFile = useCallback((file: File) => {
    setError(null);
    setSolution(null);
    setCutCount(0);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = parseGraphFile(content, file.name);

        if (parsed.nodes.length === 0) {
          setError("No nodes found in file. Check the format.");
          return;
        }

        setGraph(parsed);
        setFilename(file.name);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to parse file");
      }
    };

    reader.onerror = () => setError("Failed to read file");
    reader.readAsText(file);
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
