import { useEffect, useRef, useState, useMemo } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Badge } from "@/components/ui";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Crosshair,
  Minimize2,
} from "lucide-react";
import type { ParsedGraph, MaxCutSolution } from "@/lib/graph-parser";
import { isCutEdge } from "@/lib/graph-parser";

const COLORS = {
  node: "#38BDF8",
  nodeFill: "#0C4A6E",
  nodeStroke: "#38BDF8",
  edge: "rgba(56, 189, 248, 0.15)",
  edgeWidth: 1,
  hoverEdge: "rgba(56, 189, 248, 0.5)",
  hoverEdgeWidth: 2,
  partition0: "#38BDF8",
  partition0Fill: "#0C4A6E",
  partition1: "#A78BFA",
  partition1Fill: "#4C1D95",
  cutEdge: "#FBBF24",
  cutEdgeWidth: 2.5,
  nonCutEdge: "rgba(71, 85, 105, 0.2)",
  nonCutEdgeWidth: 0.5,
  label: "#F1F5F9",
  labelDim: "#94A3B8",
  bg: "#0B0F19",
};

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

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-8 w-8 items-center justify-center rounded-md bg-bg-surface-2/80 text-text-secondary transition-all duration-150 hover:bg-bg-surface-3 hover:text-text-primary"
    >
      {children}
    </button>
  );
}

function getLinkEndpointId(val: string | number | FGNode | undefined): string {
  if (val === undefined) return "";
  if (typeof val === "object") return String(val.id ?? "");
  return String(val);
}

export function GraphVisualization({ graph, solution }: GraphVisualizationProps) {
  const fgRef = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const handleZoomIn = () => {
    const current = fgRef.current?.zoom() ?? 1;
    fgRef.current?.zoom(current * 1.4, 300);
  };
  const handleZoomOut = () => {
    const current = fgRef.current?.zoom() ?? 1;
    fgRef.current?.zoom(current / 1.4, 300);
  };
  const handleFitView = () => fgRef.current?.zoomToFit(400, 60);
  const handleRecenter = () => fgRef.current?.centerAt(0, 0, 400);
  const handleReheat = () => fgRef.current?.d3ReheatSimulation();
  const handleToggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const nodeCanvasObject = (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const id = String(node.id ?? "");
    const label = (node.label as string) ?? id;
    const x = node.x ?? 0;
    const y = node.y ?? 0;
    const isHovered = hoveredNodeRef.current?.id === node.id;
    const isNeighborHighlighted = highlightNodesRef.current.has(id);
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;

    let fillColor: string;
    let strokeColor: string;

    if (hasSol) {
      const partition = sol!.get(id);
      if (partition === 1) {
        fillColor = COLORS.partition1Fill;
        strokeColor = COLORS.partition1;
      } else {
        fillColor = COLORS.partition0Fill;
        strokeColor = COLORS.partition0;
      }
    } else {
      fillColor = COLORS.nodeFill;
      strokeColor = COLORS.nodeStroke;
    }

    const radius = isHovered ? 8 : 6;

    if (isHovered || isNeighborHighlighted) {
      ctx.save();
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = isHovered ? 20 : 10;
      ctx.beginPath();
      ctx.arc(x, y, radius + 3, 0, Math.PI * 2);
      ctx.fillStyle = "transparent";
      ctx.fill();
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = isHovered ? 2.5 : 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fillStyle = strokeColor;
    ctx.fill();

    if (globalScale > 1.5 || isHovered) {
      const fontSize = Math.max(10 / globalScale, 3.5);
      ctx.font = `${isHovered ? 600 : 500} ${fontSize}px "Inter", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      ctx.fillStyle = isHovered ? COLORS.label : COLORS.labelDim;
      ctx.fillText(label, x, y + radius + 3);
    }
  };

  const linkColor = (link: FGLink) => {
    const sId = getLinkEndpointId(link.source);
    const tId = getLinkEndpointId(link.target);
    const hKey1 = `${sId}-${tId}`;
    const hKey2 = `${tId}-${sId}`;
    const isHover = highlightLinksRef.current.has(hKey1) || highlightLinksRef.current.has(hKey2);
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;

    if (hasSol) {
      const cut = isCutEdge({ source: sId, target: tId }, sol!);
      if (isHover) return cut ? COLORS.cutEdge : COLORS.hoverEdge;
      return cut ? COLORS.cutEdge : COLORS.nonCutEdge;
    }

    return isHover ? COLORS.hoverEdge : COLORS.edge;
  };

  const linkWidth = (link: FGLink) => {
    const sId = getLinkEndpointId(link.source);
    const tId = getLinkEndpointId(link.target);
    const hKey1 = `${sId}-${tId}`;
    const hKey2 = `${tId}-${sId}`;
    const isHover = highlightLinksRef.current.has(hKey1) || highlightLinksRef.current.has(hKey2);
    const sol = solutionRef.current;
    const hasSol = sol !== null && sol.size > 0;

    if (hasSol) {
      const cut = isCutEdge({ source: sId, target: tId }, sol!);
      if (isHover) return cut ? 3.5 : COLORS.hoverEdgeWidth;
      return cut ? COLORS.cutEdgeWidth : COLORS.nonCutEdgeWidth;
    }

    return isHover ? COLORS.hoverEdgeWidth : COLORS.edgeWidth;
  };

  const cutEdgeCount = hasSolution
    ? graph.links.filter((l) => isCutEdge(l, solution!)).length
    : 0;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-lg border border-border-subtle bg-bg-base"
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
          ctx.arc(node.x ?? 0, node.y ?? 0, 12, 0, Math.PI * 2);
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

      <div className="absolute left-3 top-3 flex items-center gap-2">
        <Badge variant="primary">Nodes: {graph.nodes.length}</Badge>
        <Badge variant="secondary">Edges: {graph.links.length}</Badge>
        {hasSolution && (
          <Badge variant="warning">
            Cut: {cutEdgeCount} / {graph.links.length}
          </Badge>
        )}
      </div>

      {hasSolution && (
        <div className="absolute bottom-3 left-3 rounded-lg border border-border-subtle bg-bg-surface-1/90 px-3 py-2 backdrop-blur-sm">
          <p className="mb-1.5 font-display text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
            Max-Cut Solution
          </p>
          <div className="flex flex-col gap-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2" style={{ borderColor: COLORS.partition0, backgroundColor: COLORS.partition0Fill }} />
              <span className="text-text-secondary">Partition 0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2" style={{ borderColor: COLORS.partition1, backgroundColor: COLORS.partition1Fill }} />
              <span className="text-text-secondary">Partition 1</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded" style={{ backgroundColor: COLORS.cutEdge, width: 14, height: 3 }} />
              <span className="text-text-secondary">Cut edge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded" style={{ backgroundColor: "#475569", width: 14, height: 2, opacity: 0.4 }} />
              <span className="text-text-secondary">Non-cut edge</span>
            </div>
          </div>
        </div>
      )}

      {hoveredNodeDisplay && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-lg border border-border-subtle bg-bg-surface-1/90 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="font-display text-sm font-semibold text-accent-primary">
              {(hoveredNodeDisplay.label as string) ?? String(hoveredNodeDisplay.id)}
            </span>
            <span className="text-xs text-text-tertiary">
              {neighborMap.current.get(hoveredNodeDisplay.id!)?.size ?? 0} connections
            </span>
            {hasSolution && (
              <span className="text-xs" style={{ color: solution!.get(String(hoveredNodeDisplay.id)) === 1 ? COLORS.partition1 : COLORS.partition0 }}>
                Partition {solution!.get(String(hoveredNodeDisplay.id)) ?? "?"}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="absolute right-3 top-3 flex flex-col gap-1.5 rounded-lg border border-border-subtle bg-bg-surface-1/90 p-1.5 backdrop-blur-sm">
        <ToolbarButton onClick={handleZoomIn} title="Zoom In">
          <ZoomIn className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleZoomOut} title="Zoom Out">
          <ZoomOut className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 border-t border-border-subtle" />
        <ToolbarButton onClick={handleFitView} title="Fit to View">
          <Maximize2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleRecenter} title="Re-center">
          <Crosshair className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton onClick={handleReheat} title="Re-layout">
          <RotateCcw className="h-4 w-4" />
        </ToolbarButton>
        <div className="mx-1 border-t border-border-subtle" />
        <ToolbarButton onClick={handleToggleFullscreen} title="Fullscreen">
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </ToolbarButton>
      </div>

      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] text-text-tertiary">
        <span>Scroll: zoom</span>
        <span>Drag bg: pan</span>
        <span>Drag node: move</span>
      </div>
    </div>
  );
}
