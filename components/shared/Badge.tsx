import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  tone?: "blue" | "amber" | "green" | "red" | "slate";
  className?: string;
};

const tones = {
  blue: "bg-blue-50 text-brand-primary",
  amber: "bg-amber-50 text-amber-700",
  green: "bg-green-50 text-brand-success",
  red: "bg-red-50 text-brand-error",
  slate: "bg-slate-100 text-slate-700"
};

export function Badge({ children, tone = "slate", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
