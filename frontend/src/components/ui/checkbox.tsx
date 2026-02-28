"use client";

interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center justify-center w-5 h-5 border border-border bg-bg-card group-hover:border-border-hover transition-colors">
        <input
          id={id}
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="hidden peer-checked:block w-3 h-3 bg-bg-active" />
      </div>
      <span className="text-sm capitalize">{label}</span>
    </label>
  );
}
