import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function CartSummary({
  subtotal,
  deliveryFee,
  discount
}: {
  subtotal: number;
  deliveryFee: number;
  discount: number;
}) {
  const total = subtotal + deliveryFee - discount;

  return (
    <aside className="rounded-lg border border-brand-border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-brand-text">Order Summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-slate-600">Subtotal</dt>
          <dd className="font-bold text-brand-text">{formatCurrency(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-slate-600">Delivery</dt>
          <dd className="font-bold text-brand-text">
            {formatCurrency(deliveryFee)}
          </dd>
        </div>
        <div className="flex justify-between text-brand-success">
          <dt>Discount</dt>
          <dd className="font-bold">-{formatCurrency(discount)}</dd>
        </div>
      </dl>
      <div className="mt-4 border-t border-brand-border pt-4">
        <div className="flex justify-between text-lg font-black text-brand-text">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 font-black text-white shadow-lift transition hover:bg-blue-900 focus-ring"
      >
        Continue to Checkout
        <ArrowRight className="h-5 w-5" aria-hidden="true" />
      </Link>
    </aside>
  );
}
