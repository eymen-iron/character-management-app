"use client";

import { Checkbox } from "./checkbox";

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function CheckboxGroup({
  label,
  options,
  selected,
  onChange,
}: CheckboxGroupProps) {
  const handleToggle = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selected, value]);
    } else {
      onChange(selected.filter((v) => v !== value));
    }
  };

  return (
    <div className="flex flex-col gap-2.5">
      <span className="text-xs font-medium text-text-muted uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <Checkbox
            key={opt.value}
            id={`${label}-${opt.value}`}
            label={opt.label}
            checked={selected.includes(opt.value)}
            onChange={(checked) => handleToggle(opt.value, checked)}
          />
        ))}
      </div>
    </div>
  );
}
