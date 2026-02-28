import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-body font-medium",
        "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-primary/50",
        variant === "primary" &&
          "bg-accent-primary text-bg-base shadow-glow-primary hover:bg-accent-primary-hover",
        variant === "ghost" &&
          "bg-transparent text-text-secondary hover:bg-bg-surface-2 hover:text-text-primary",
        variant === "outline" &&
          "border border-border-default bg-transparent text-text-primary hover:border-accent-primary hover:text-accent-primary",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
