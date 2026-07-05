import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={textareaId} className="block space-y-2">
      <span className="text-sm font-semibold text-brand-text">{label}</span>
      <textarea
        id={textareaId}
        className={cn(
          "min-h-28 w-full rounded-lg border border-brand-border bg-white px-3 py-3 text-sm text-brand-text transition placeholder:text-slate-400 focus-ring",
          className
        )}
        {...props}
      />
    </label>
  );
}
