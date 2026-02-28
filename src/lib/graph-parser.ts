export interface GraphNode {
  id: string;
  label: string;
  group?: number;
}

export interface GraphLink {
  source: string;
  target: string;
  weight?: number;
}

export interface ParsedGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

/**
 * Parse GML (Graph Modeling Language) format.
 * Handles the standard GML output from NetworkX, QAOA tools, etc.
 */
function parseGML(content: string): ParsedGraph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  const nodeRegex = /node\s*\[([^\]]*(?:\[[^\]]*\])*[^\]]*)\]/g;
  const edgeRegex = /edge\s*\[([^\]]*(?:\[[^\]]*\])*[^\]]*)\]/g;
  const idRegex = /id\s+(\S+)/;
  const labelRegex = /label\s+"?([^"\n]+)"?/;
  const sourceRegex = /source\s+(\S+)/;
  const targetRegex = /target\s+(\S+)/;
  const weightRegex = /weight\s+(\S+)/;

  let match: RegExpExecArray | null;

  while ((match = nodeRegex.exec(content)) !== null) {
    const block = match[1];
    const id = idRegex.exec(block)?.[1] ?? "";
    const label = labelRegex.exec(block)?.[1] ?? id;
    nodes.push({ id: String(id), label: String(label) });
  }

  while ((match = edgeRegex.exec(content)) !== null) {
    const block = match[1];
    const source = sourceRegex.exec(block)?.[1] ?? "";
    const target = targetRegex.exec(block)?.[1] ?? "";
    const weight = weightRegex.exec(block)?.[1];
    links.push({
      source: String(source),
      target: String(target),
      weight: weight ? parseFloat(weight) : undefined,
    });
  }

  return { nodes, links };
}

/**
 * Parse JSON graph format.
 * Expects { nodes: [{id, ...}], links/edges: [{source, target, ...}] }
 */
function parseJSON(content: string): ParsedGraph {
  const data = JSON.parse(content);
  const rawNodes: { id?: string | number; label?: string; [k: string]: unknown }[] =
    data.nodes ?? data.vertices ?? [];
  const rawLinks: { source?: string | number; target?: string | number; weight?: number }[] =
    data.links ?? data.edges ?? [];

  const nodes: GraphNode[] = rawNodes.map((n, i) => ({
    id: String(n.id ?? i),
    label: String(n.label ?? n.id ?? i),
  }));

  const links: GraphLink[] = rawLinks.map((l) => ({
    source: String(l.source),
    target: String(l.target),
    weight: l.weight,
  }));

  return { nodes, links };
}

/**
 * Parse edge-list format (CSV/TXT).
 * Each line: source,target  OR  source target  OR  source\ttarget
 * Lines starting with # or // are comments.
 */
function parseEdgeList(content: string): ParsedGraph {
  const nodeSet = new Set<string>();
  const links: GraphLink[] = [];

  const lines = content.split(/\r?\n/).filter((l) => {
    const trimmed = l.trim();
    return trimmed && !trimmed.startsWith("#") && !trimmed.startsWith("//");
  });

  for (const line of lines) {
    const parts = line.trim().split(/[\s,;|]+/);
    if (parts.length >= 2) {
      const source = parts[0];
      const target = parts[1];
      const weight = parts[2] ? parseFloat(parts[2]) : undefined;
      nodeSet.add(source);
      nodeSet.add(target);
      links.push({ source, target, weight: Number.isNaN(weight) ? undefined : weight });
    }
  }

  const nodes: GraphNode[] = [...nodeSet].map((id) => ({ id, label: id }));
  return { nodes, links };
}

/**
 * Auto-detect format and parse graph file content.
 */
export function parseGraphFile(content: string, filename: string): ParsedGraph {
  const ext = filename.toLowerCase().split(".").pop() ?? "";

  if (ext === "gml") {
    return parseGML(content);
  }

  if (ext === "json") {
    return parseJSON(content);
  }

  // Try JSON detection for extensionless files
  const trimmed = content.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return parseJSON(content);
    } catch {
      // fall through to edge list
    }
  }

  // GML detection
  if (trimmed.includes("graph [") || trimmed.includes("graph\n[")) {
    return parseGML(content);
  }

  // Default: edge list (csv, txt, tsv, etc.)
  return parseEdgeList(content);
}

/**
 * Generate a demo QAOA-style graph for initial display.
 */
export function generateDemoGraph(nodeCount: number = 20, edgeDensity: number = 0.3): ParsedGraph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      id: String(i),
      label: `Q${i}`,
      group: Math.floor(i / Math.ceil(nodeCount / 4)),
    });
  }

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < edgeDensity) {
        links.push({
          source: String(i),
          target: String(j),
          weight: parseFloat((Math.random() * 2 - 1).toFixed(3)),
        });
      }
    }
  }

  return { nodes, links };
}
