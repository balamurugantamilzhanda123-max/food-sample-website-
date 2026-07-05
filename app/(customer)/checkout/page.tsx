import Link from "next/link";
import { Plus } from "lucide-react";
import { CheckoutAddressSelector } from "@/components/customer/CheckoutAddressSelector";
import { CartSummary } from "@/components/customer/CartSummary";
import { addresses, products } from "@/lib/mock-data";

export default function CheckoutPage() {
  const subtotal = products
    .slice(0, 3)
    .reduce((total, product) => total + (product.offerPrice ?? product.price), 0);

  return (
    <main className="container-page py-10">
      <div>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Checkout
        </p>
        <h1 className="mt-2 text-3xl font-black text-brand-text">
          Delivery and payment
        </h1>
      </div>
      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="rounded-lg border border-brand-border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-black text-brand-text">
                  Select address
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Choose where this order should be delivered.
                </p>
              </div>
              <Link
                href="/profile#address"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-3 text-sm font-bold text-brand-text hover:border-brand-primary hover:text-brand-primary"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add Address
              </Link>
            </div>
            <div className="mt-4">
              <CheckoutAddressSelector addresses={addresses} />
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <CartSummary subtotal={subtotal} deliveryFee={40} discount={75} />
          <Link
            href="/payment"
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-brand-accent px-5 font-black text-slate-950 transition hover:bg-amber-400 focus-ring"
          >
            Go to Payment
          </Link>
        </div>
      </section>
    </main>
  );
}
