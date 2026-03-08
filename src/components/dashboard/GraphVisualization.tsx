import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Badge } from "@/components/ui";
import { CircuitBoard } from "lucide-react";
import type { ParsedGraph, MaxCutSolution } from "@/lib/graph-parser";
import { isCutEdge } from "@/lib/graph-parser";

function getCSSVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function useGraphColors() {
  const read = useCallback(() => {
    const accent = getCSSVar("--color-accent-primary");
    const accentDim = getCSSVar("--color-accent-primary-dim");
    const secondary = getCSSVar("--color-accent-secondary");
    const secondaryDim = getCSSVar("--color-accent-secondary-dim");
    const warning = getCSSVar("--color-warning");
    const textPrimary = getCSSVar("--color-text-primary");
    const textSecondary = getCSSVar("--color-text-secondary");
    const textTertiary = getCSSVar("--color-text-tertiary");
    const bg = getCSSVar("--color-bg-base");

    return {
      node: accent,
      nodeFill: accentDim,
      nodeStroke: accent,
      edge: hexToRgba(accent, 0.15),
      edgeWidth: 1,
      hoverEdge: hexToRgba(accent, 0.5),
      hoverEdgeWidth: 2,
      partition0: accent,
      partition0Fill: accentDim,
      partition1: secondary,
      partition1Fill: secondaryDim,
      cutEdge: warning,
      cutEdgeWidth: 2.5,
      nonCutEdge: hexToRgba(textTertiary, 0.2),
      nonCutEdgeWidth: 0.5,
      label: textPrimary,
      labelDim: textSecondary,
      bg,
    };
  }, []);

  const [colors, setColors] = useState(read);

  useEffect(() => {
    const observer = new MutationObserver(() => setColors(read()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [read]);

  return colors;
}

interface GraphVisualizationProps {
  graph: ParsedGraph;
  solution: MaxCutSolution | null;
}

interface FGNode {
  id?: string | number;
  label?: string;
  x?: number;
  y?: number;
  [key: string]: unknown;
}

interface FGLink {
  source?: string | number | FGNode;
  target?: string | number | FGNode;
  weight?: number;
  [key: string]: unknown;
}

function getLinkEndpointId(val: string | number | FGNode | undefined): string {
  if (val === undefined) return "";
  if (typeof val === "object") return String(val.id ?? "");
  return String(val);
}

export function GraphVisualization({ graph, solution }: GraphVisualizationProps) {
  const COLORS = useGraphColors();
  const colorsRef = useRef(COLORS);
  colorsRef.current = COLORS;

  const fgRef = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  const hoveredNodeRef = useRef<FGNode | null>(null);
  const highlightNodesRef = useRef<Set<string | number>>(new Set());
  const highlightLinksRef = useRef<Set<string>>(new Set());
  const [hoveredNodeDisplay, setHoveredNodeDisplay] = useState<FGNode | null>(null);

  const solutionRef = useRef<MaxCutSolution | null>(null);
  solutionRef.current = solution;

  const hasSolution = solution !== null && solution.size > 0;

  const neighborMap = useRef<Map<string | number, Set<string | number>>>(new Map());
  useEffect(() => {
    const map = new Map<string | number, Set<string | number>>();
    for (const node of graph.nodes) map.set(node.id, new Set());
    for (const link of graph.links) {
      map.get(link.source)?.add(link.target);
      map.get(link.target)?.add(link.source);
    }
    neighborMap.current = map;
  }, [graph]);

  const graphData = useMemo(
    () => ({
      nodes: graph.nodes.map((n) => ({ ...n })),
      links: graph.links.map((l) => ({ ...l })),
    }),
    [graph]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width: Math.floor(width), height: Math.floor(height) });
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fgRef.current?.zoomToFit(400, 60);
    }, 600);
    return () => clearTimeout(timer);
  }, [graph]);

  const handleNodeHover = (node: FGNode | null) => {
    hoveredNodeRef.current = node;
    const hNodes = new Set<string | number>();
    const hLinks = new Set<string>();

    if (node?.id !== undefined) {
      hNodes.add(node.id);
      const neighbors = neighborMap.current.get(node.id);
      if (neighbors) {
        for (const nId of neighbors) {
          hNodes.add(nId);
          hLinks.add(`${node.id}-${nId}`);
          hLinks.add(`${nId}-${node.id}`);
        }
      }
    }
    highlightNodesRef.current = hNodes;
    highlightLinksRef.current = hLinks;
    setHoveredNodeDisplay(node);
  };

  const nodeCanvasObject = (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const COLORS = colorsRef.current;
    const id = String(node.id ?? "");
    const label = (node.label as string) ?? id;
    const x = node.x ?? 0;
    const y = node.y ?? 0;
    const isHovered = hoveredNodeRef.current?.id === node.id;
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;

    let fillColor = "#1f77b4";

    if (hasSol) {
      const partition = sol!.get(id);
      if (partition === 1) {
        fillColor = "#ff7f0e";
      } else {
        fillColor = "#1f77b4";
      }
    }

    const radius = 10;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.font = `8px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = COLORS.bg === "#ffffff" ? "#ffffff" : "#000000"; // Assuming label should be readable in the dot if it's solid, wait no - let's make it always white or black based on the theme. Actually the dot is blue. So white text in a dark blue dot is fine, or black text.
    ctx.fillStyle = "#ffffff";
    ctx.fillText(label, x, y);

    if (isHovered) {
      ctx.strokeStyle = COLORS.label;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  };

  const linkColor = (link: FGLink) => {
    const COLORS = colorsRef.current;
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;
    if (hasSol) {
      const sId = getLinkEndpointId(link.source);
      const tId = getLinkEndpointId(link.target);
      const cut = isCutEdge({ source: sId, target: tId }, sol!);
      return cut ? "#ff0000" : COLORS.labelDim;
    }
    return COLORS.labelDim;
  };

  const linkWidth = (link: FGLink) => {
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;
    if (hasSol) {
      const sId = getLinkEndpointId(link.source);
      const tId = getLinkEndpointId(link.target);
      const cut = isCutEdge({ source: sId, target: tId }, sol!);
      return cut ? 2 : 1;
    }
    return 1;
  };

  const cutEdgeCount = hasSolution
    ? graph.links.filter((l) => isCutEdge(l, solution!)).length
    : 0;

  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 transition-colors duration-300">
      {/* Outer Header */}
      <div className="flex items-center gap-2 border-b border-border-subtle p-5 pb-3">
        <CircuitBoard className="h-4 w-4 text-accent-primary" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-accent-primary">
          Graph Partitioning
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-2 min-h-0">
        {/* Inner header */}
        <div className="relative flex items-center justify-center py-2 pb-4">
          <h3 className="font-sans text-[15px] text-text-primary tracking-normal font-medium">
            Representative Light-Cone Subgraph
          </h3>
        </div>
        
        {/* Graph Canvas */}
        <div
          ref={containerRef}
          className="relative flex-1 overflow-hidden rounded-md min-h-0 w-full"
        >
        <ForceGraph2D
          ref={fgRef}
          width={dimensions.width}
          height={dimensions.height}
          graphData={graphData}
          backgroundColor={COLORS.bg}
          nodeCanvasObject={nodeCanvasObject}
          nodePointerAreaPaint={(node: FGNode, color: string, ctx: CanvasRenderingContext2D) => {
            ctx.beginPath();
            ctx.arc(node.x ?? 0, node.y ?? 0, 10, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
          }}
          onNodeHover={handleNodeHover}
          linkColor={linkColor}
          linkWidth={linkWidth}
          linkDirectionalParticles={0}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          warmupTicks={100}
          cooldownTicks={200}
          cooldownTime={5000}
          enableZoomInteraction={true}
          enablePanInteraction={true}
          enableNodeDrag={true}
          minZoom={0.2}
          maxZoom={15}
        />




        </div>
      </div>
    </div>
  );
}
