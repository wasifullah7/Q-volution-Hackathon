import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning";
}

export function Badge({
  className,
  variant = "primary",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-body text-xs font-medium",
        variant === "primary" && "bg-accent-primary-dim text-accent-primary",
        variant === "secondary" && "bg-accent-secondary-dim text-accent-secondary",
        variant === "success" && "bg-success/15 text-success",
        variant === "warning" && "bg-warning/15 text-warning",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
