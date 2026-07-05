import type { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
};

export function Select({ label, className, children, id, ...props }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={selectId} className="block space-y-2">
      <span className="text-sm font-semibold text-brand-text">{label}</span>
      <span className="relative block">
        <select
          id={selectId}
          className={cn(
            "h-11 w-full appearance-none rounded-lg border border-brand-border bg-white px-3 pr-10 text-sm text-brand-text transition focus-ring",
            className
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        />
      </span>
    </label>
  );
}
