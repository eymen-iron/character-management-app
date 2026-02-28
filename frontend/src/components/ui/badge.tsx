import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "alive" | "dead" | "unknown";
}

const variantStyles: Record<string, string> = {
  default: "border-border bg-bg-badge text-text-secondary",
  alive: "border-status-alive-border bg-status-alive-bg text-status-alive",
  dead: "border-status-dead-border bg-status-dead-bg text-status-dead",
  unknown: "border-status-unknown-border bg-status-unknown-bg text-status-unknown",
};

export function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest border ${variantStyles[variant]}`}
    >
      {children}
    </span>
  );
}
