"use client";

import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Input } from "@/components/ui/input";

const STATUS_OPTIONS = [
  { value: "ALIVE", label: "Alive" },
  { value: "DEAD", label: "Dead" },
  { value: "UNKNOWN", label: "Unknown" },
];

const GENDER_OPTIONS = [
  { value: "MALE", label: "Male" },
  { value: "FEMALE", label: "Female" },
  { value: "UNKNOWN", label: "Unknown" },
];

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchLoading?: boolean;
  statusFilters: string[];
  onStatusChange: (selected: string[]) => void;
  genderFilters: string[];
  onGenderChange: (selected: string[]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function FilterBar({
  search,
  onSearchChange,
  searchLoading,
  statusFilters,
  onStatusChange,
  genderFilters,
  onGenderChange,
  onClear,
  hasActiveFilters,
}: FilterBarProps) {
  return (
    <div className="space-y-6">
      <CheckboxGroup
        label="Status"
        options={STATUS_OPTIONS}
        selected={statusFilters}
        onChange={onStatusChange}
      />

      <CheckboxGroup
        label="Gender"
        options={GENDER_OPTIONS}
        selected={genderFilters}
        onChange={onGenderChange}
      />

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="w-full py-2 px-4 border border-border bg-bg-secondary hover:bg-bg-hover text-sm font-medium uppercase tracking-wider transition-colors"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
