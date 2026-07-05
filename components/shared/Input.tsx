import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export function Input({ label, hint, className, id, ...props }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={inputId} className="block space-y-2">
      <span className="text-sm font-semibold text-brand-text">{label}</span>
      <input
        id={inputId}
        className={cn(
          "h-11 w-full rounded-lg border border-brand-border bg-white px-3 text-sm text-brand-text transition placeholder:text-slate-400 focus-ring",
          className
        )}
        {...props}
      />
      {hint ? <span className="text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}
