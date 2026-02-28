"use client";

import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={`p-1.5 border transition-colors ${
          view === "grid"
            ? "border-bg-active bg-bg-active text-text-inverse"
            : "border-border bg-bg-card text-text-muted hover:border-border-hover"
        }`}
        aria-label="Grid view"
      >
        <LayoutGrid className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={`p-1.5 border transition-colors ${
          view === "list"
            ? "border-bg-active bg-bg-active text-text-inverse"
            : "border-border bg-bg-card text-text-muted hover:border-border-hover"
        }`}
        aria-label="List view"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
}
