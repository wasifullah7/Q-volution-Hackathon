import { useState, useRef, useEffect, type ReactNode } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface FullscreenCardProps {
  children: ReactNode;
}

export function FullscreenCard({ children }: FullscreenCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggle = () => {
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

  return (
    <div ref={containerRef} className="group relative h-full bg-bg-base">
      {children}
      <button
        onClick={handleToggle}
        title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle bg-bg-surface-1/90 text-text-secondary opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-bg-surface-3 hover:text-text-primary"
      >
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </button>
    </div>
  );
}
