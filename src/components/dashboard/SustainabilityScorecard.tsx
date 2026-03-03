import { Leaf } from "lucide-react";

export function SustainabilityScorecard() {
  return (
    <div className="flex h-full flex-col rounded-lg border border-border-subtle bg-bg-surface-1 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Leaf className="h-4 w-4 text-success" />
        <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-success">
          Sustainability Scorecard
        </h3>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-4">
        <div className="flex items-center gap-3">
          <svg
            className="h-8 w-8 text-success"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span className="font-display text-4xl font-bold text-success">
            10% Energy Saving
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-text-primary">
            Carbon Avoided:{" "}
            <span className="font-semibold text-text-primary">
              0.12kg CO<sub>2</sub>e
            </span>
          </p>
          <p className="text-xs leading-relaxed text-text-secondary">
            Aligned with US EPA Portfolio Manager & Green Software Foundation
            2026 standards.
          </p>
        </div>
      </div>
    </div>
  );
}
