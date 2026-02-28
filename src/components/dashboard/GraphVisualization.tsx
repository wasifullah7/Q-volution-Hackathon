import { useCallback, useEffect, useRef, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { Badge } from "@/components/ui";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  RotateCcw,
  Lock,
  Unlock,
  Crosshair,
  Minimize2,
} from "lucide-react";
import type { ParsedGraph } from "@/lib/graph-parser";

interface GraphVisualizationProps {
  graph: ParsedGraph;
}

interface FGNode {
  id?: string | number;
  label?: string;
  group?: number;
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

const GROUP_COLORS = [
  "#38BDF8", // cyan
  "#A78BFA", // violet
  "#34D399", // emerald
  "#FB923C", // orange
  "#F472B6", // pink
  "#FBBF24", // amber
  "#67E8F9", // light cyan
  "#C084FC", // light violet
];

function ToolbarButton({
  onClick,
  title,
  active,
  children,
}: {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150 ${
        active
          ? "bg-accent-primary text-bg-base"
          : "bg-bg-surface-2/80 text-text-secondary hover:bg-bg-surface-3 hover:text-text-primary"
      }`}
    >
      {children}
    </button>
  );
}

export function GraphVisualization({ graph }: GraphVisualizationProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fgRef = useRef<any>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode] = useState<FGNode | null>(null);
  const [frozen, setFrozen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [highlightNodes, setHighlightNodes] = useState<Set<string | number>>(new Set());
  const [highlightLinks, setHighlightLinks] = useState<Set<string>>(new Set());

  // Resize observer
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

  // Fit to view after graph loads
  useEffect(() => {
    const timer = setTimeout(() => {
      fgRef.current?.zoomToFit(400, 60);
    }, 500);
    return () => clearTimeout(timer);
  }, [graph]);

  // Build neighbor maps for hover highlighting
  const neighborMap = useRef<Map<string | number, Set<string | number>>>(new Map());
  useEffect(() => {
    const map = new Map<string | number, Set<string | number>>();
    for (const node of graph.nodes) {
      map.set(node.id, new Set());
    }
    for (const link of graph.links) {
      map.get(link.source)?.add(link.target);
      map.get(link.target)?.add(link.source);
    }
    neighborMap.current = map;
  }, [graph]);

  const handleNodeHover = useCallback(
    (node: FGNode | null) => {
      setHoveredNode(node);
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

      setHighlightNodes(hNodes);
      setHighlightLinks(hLinks);
    },
    []
  );

  const handleZoomIn = () => {
    const current = fgRef.current?.zoom() ?? 1;
    fgRef.current?.zoom(current * 1.4, 300);
  };

  const handleZoomOut = () => {
    const current = fgRef.current?.zoom() ?? 1;
    fgRef.current?.zoom(current / 1.4, 300);
  };

  const handleFitView = () => {
    fgRef.current?.zoomToFit(400, 60);
  };

  const handleRecenter = () => {
    fgRef.current?.centerAt(0, 0, 400);
  };

  const handleReheat = () => {
    setFrozen(false);
    fgRef.current?.d3ReheatSimulation();
  };

  const handleToggleFreeze = () => {
    if (frozen) {
      fgRef.current?.resumeAnimation();
    } else {
      fgRef.current?.pauseAnimation();
    }
    setFrozen(!frozen);
  };

  const handleToggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  // Listen for external fullscreen changes
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // Custom node renderer
  const nodeCanvasObject = useCallback(
    (node: FGNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const id = node.id ?? "";
      const label = (node.label as string) ?? String(id);
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const isHovered = hoveredNode?.id === id;
      const isHighlighted = highlightNodes.has(id);
      const group = (node.group as number) ?? 0;
      const baseColor = GROUP_COLORS[group % GROUP_COLORS.length];
      const radius = isHovered ? 8 : 6;

      // Glow for hovered / highlighted
      if (isHighlighted || isHovered) {
        ctx.save();
        ctx.shadowColor = baseColor;
        ctx.shadowBlur = isHovered ? 25 : 12;
        ctx.beginPath();
        ctx.arc(x, y, radius + 2, 0, Math.PI * 2);
        ctx.fillStyle = "transparent";
        ctx.fill();
        ctx.restore();
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = isHighlighted ? baseColor : `${baseColor}88`;
      ctx.fill();
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = isHovered ? 2 : 1;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#F1F5F9";
      ctx.fill();

      // Label (show when zoomed in enough or hovered)
      if (globalScale > 1.8 || isHovered) {
        ctx.font = `${isHovered ? "600" : "500"} ${Math.max(10 / globalScale, 3)}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isHovered ? "#F1F5F9" : "#94A3B8";
        ctx.fillText(label, x, y + radius + 2);
      }
    },
    [hoveredNode, highlightNodes]
  );

  const linkColor = useCallback(
    (link: FGLink) => {
      const sId = typeof link.source === "object" ? link.source?.id : link.source;
      const tId = typeof link.target === "object" ? link.target?.id : link.target;
      const key1 = `${sId}-${tId}`;
      const key2 = `${tId}-${sId}`;
      if (highlightLinks.has(key1) || highlightLinks.has(key2)) {
        return "rgba(56, 189, 248, 0.6)";
      }
      return "rgba(56, 189, 248, 0.08)";
    },
    [highlightLinks]
  );

  const linkWidth = useCallback(
    (link: FGLink) => {
      const sId = typeof link.source === "object" ? link.source?.id : link.source;
      const tId = typeof link.target === "object" ? link.target?.id : link.target;
      const key1 = `${sId}-${tId}`;
      const key2 = `${tId}-${sId}`;
      return highlightLinks.has(key1) || highlightLinks.has(key2) ? 2 : 0.5;
    },
    [highlightLinks]
  );

  const graphData = {
    nodes: graph.nodes.map((n) => ({ ...n })),
    links: graph.links.map((l) => ({ ...l })),
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden rounded-lg border border-border-subtle bg-bg-base"
    >
      {/* Force Graph */}
      <ForceGraph2D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        backgroundColor="#0B0F19"
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
        enableZoomInteraction={true}
        enablePanInteraction={true}
        enableNodeDrag={true}
        minZoom={0.3}
        maxZoom={12}
      />

      {/* Stats Bar -- top left */}
      <div className="absolute left-3 top-3 flex items-center gap-2">
        <Badge variant="primary">Nodes: {graph.nodes.length}</Badge>
        <Badge variant="secondary">Edges: {graph.links.length}</Badge>
        {frozen && <Badge variant="warning">Paused</Badge>}
      </div>

      {/* Toolbar -- top right */}
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
        <ToolbarButton onClick={handleToggleFreeze} title={frozen ? "Resume" : "Freeze"} active={frozen}>
          {frozen ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
        </ToolbarButton>
        <ToolbarButton onClick={handleToggleFullscreen} title="Fullscreen">
          {isFullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </ToolbarButton>
      </div>

      {/* Hovered Node Info -- bottom left */}
      {hoveredNode && (
        <div className="absolute bottom-3 left-3 rounded-lg border border-border-subtle bg-bg-surface-1/90 px-3 py-2 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold text-accent-primary">
              {(hoveredNode.label as string) ?? String(hoveredNode.id)}
            </span>
            <span className="text-xs text-text-tertiary">
              {neighborMap.current.get(hoveredNode.id!)?.size ?? 0} connections
            </span>
          </div>
        </div>
      )}

      {/* Keyboard Hints -- bottom right */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-[10px] text-text-tertiary">
        <span>Scroll: zoom</span>
        <span>Drag canvas: pan</span>
        <span>Drag node: move</span>
      </div>
    </div>
  );
}
