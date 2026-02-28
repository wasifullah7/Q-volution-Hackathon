import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: "primary" | "secondary";
}

export function Card({ className, glow, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-subtle bg-bg-surface-1 p-4",
        "transition-shadow duration-200",
        glow === "primary" && "shadow-glow-primary",
        glow === "secondary" && "shadow-glow-secondary",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "font-display text-sm font-semibold uppercase tracking-wider text-accent-primary",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}
