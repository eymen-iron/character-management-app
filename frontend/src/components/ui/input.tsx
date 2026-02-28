"use client";

import { InputHTMLAttributes } from "react";
import { Search } from "lucide-react";
import { Spinner } from "./spinner";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  loading?: boolean;
  icon?: boolean;
}

export function Input({ className = "", loading, icon = true, ...props }: InputProps) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-text-muted" />
        </div>
      )}
      <input
        className={`block w-full ${icon ? "pl-10" : "px-3"} pr-3 py-2 border border-border bg-bg-input text-sm text-text placeholder:text-text-placeholder outline-none focus:border-border-focus transition-colors ${loading ? "pr-9" : ""} ${className}`}
        {...props}
      />
      {loading && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
}
