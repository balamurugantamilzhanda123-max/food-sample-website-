import { CheckCircle2, Circle } from "lucide-react";
import type { OrderStatus } from "@/types/order";

const statuses: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered"
];

export function OrderTimeline({ status }: { status: OrderStatus }) {
  const currentIndex = statuses.indexOf(status);

  if (status === "Cancelled") {
    return (
      <div className="rounded-lg bg-red-50 p-3 text-sm font-bold text-brand-error">
        Order cancelled
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:grid-cols-5">
      {statuses.map((item, index) => {
        const complete = index <= currentIndex;

        return (
          <div key={item} className="flex items-center gap-2 text-sm">
            {complete ? (
              <CheckCircle2
                className="h-5 w-5 text-brand-success"
                aria-hidden="true"
              />
            ) : (
              <Circle className="h-5 w-5 text-slate-300" aria-hidden="true" />
            )}
            <span
              className={complete ? "font-black text-brand-text" : "text-slate-500"}
            >
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
