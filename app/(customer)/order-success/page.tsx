import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <main className="container-page grid min-h-[70vh] place-items-center py-10">
      <section className="max-w-xl rounded-lg border border-brand-border bg-white p-8 text-center shadow-soft">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-brand-success">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-brand-text">
          Order placed successfully
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your order ID is FC-2026-1003. Track status from My Orders and download
          the invoice once the order is confirmed.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/orders"
            className="inline-flex h-11 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-black text-white"
          >
            View My Orders
          </Link>
          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-brand-border bg-white px-4 text-sm font-black text-brand-text"
          >
            Continue Shopping
          </Link>
        </div>
      </section>
    </main>
  );
}
