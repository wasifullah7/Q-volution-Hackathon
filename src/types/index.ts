export interface QAOAConfig {
  graphFile: string;
  backend: string;
  layers: number;
  nodes: number;
  edges: number;
}

export interface TechnicalMetrics {
  oneQubitGates: number;
  twoQubitGates: number;
  meps: number;
  depth: number;
}

export interface MeasurementEntry {
  bitstring: string;
  count: number;
}

export interface ChatMessage {
  role: "ai" | "user";
  content: string;
}

export interface GraphNode {
  id: string;
  x: number;
  y: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}
