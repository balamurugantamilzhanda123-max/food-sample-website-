import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  icon,
  currency = false
}: {
  label: string;
  value: number;
  icon: ReactNode;
  currency?: boolean;
}) {
  return (
    <div className="rounded-lg border border-brand-border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
          {icon}
        </div>
        <ArrowUpRight className="h-5 w-5 text-brand-success" aria-hidden="true" />
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black text-brand-text">
        {currency ? formatCurrency(value) : value.toLocaleString("en-IN")}
      </p>
    </div>
  );
}
