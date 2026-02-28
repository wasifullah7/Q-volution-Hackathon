export interface GraphNode {
  id: string;
  label: string;
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

/** Max-Cut solution: maps node id -> partition (0 or 1) */
export type MaxCutSolution = Map<string, 0 | 1>;

/**
 * Determine if a link is a "cut" edge (endpoints in different partitions).
 */
export function isCutEdge(
  link: { source: string; target: string },
  solution: MaxCutSolution
): boolean {
  const sp = solution.get(link.source);
  const tp = solution.get(link.target);
  if (sp === undefined || tp === undefined) return false;
  return sp !== tp;
}

/**
 * Count cut edges for a given solution.
 */
export function countCutEdges(
  links: GraphLink[],
  solution: MaxCutSolution
): number {
  return links.filter((l) => isCutEdge(l, solution)).length;
}

/**
 * Simulate a Max-Cut solution (mock QAOA result).
 * Assigns each node to partition 0 or 1 using a greedy heuristic
 * to produce a plausible-looking cut.
 */
export function simulateMaxCutSolution(graph: ParsedGraph): MaxCutSolution {
  const solution: MaxCutSolution = new Map();
  const adj = new Map<string, string[]>();

  for (const node of graph.nodes) {
    adj.set(node.id, []);
  }
  for (const link of graph.links) {
    adj.get(link.source)?.push(link.target);
    adj.get(link.target)?.push(link.source);
  }

  // Greedy assignment: for each node, pick the partition that maximizes cut edges
  for (const node of graph.nodes) {
    const neighbors = adj.get(node.id) ?? [];
    let count0 = 0;
    let count1 = 0;

    for (const nId of neighbors) {
      const np = solution.get(nId);
      if (np === 0) count0++;
      else if (np === 1) count1++;
    }

    // Put in the partition opposite to the majority of already-assigned neighbors
    solution.set(node.id, count0 >= count1 ? 1 : 0);
  }

  return solution;
}

// ---- File Parsers ----

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

export function parseGraphFile(content: string, filename: string): ParsedGraph {
  const ext = filename.toLowerCase().split(".").pop() ?? "";

  if (ext === "gml") return parseGML(content);
  if (ext === "json") return parseJSON(content);

  const trimmed = content.trim();
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      return parseJSON(content);
    } catch {
      // fall through
    }
  }

  if (trimmed.includes("graph [") || trimmed.includes("graph\n[")) {
    return parseGML(content);
  }

  return parseEdgeList(content);
}

export function generateDemoGraph(nodeCount: number = 20, edgeDensity: number = 0.3): ParsedGraph {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ id: String(i), label: `Q${i}` });
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
