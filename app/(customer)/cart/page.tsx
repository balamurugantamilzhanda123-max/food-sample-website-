import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartSummary } from "@/components/customer/CartSummary";
import { QuantityStepper } from "@/components/customer/QuantityStepper";
import { Button } from "@/components/shared/Button";
import { Badge } from "@/components/shared/Badge";
import { products } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const cartProducts = products.slice(0, 3);

export default function CartPage() {
  const subtotal = cartProducts.reduce(
    (total, product) => total + (product.offerPrice ?? product.price),
    0
  );

  return (
    <main className="container-page py-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
            Protected cart
          </p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">Your cart</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Login is required to save cart changes and continue checkout.
          </p>
        </div>
        <Link
          href="/login?redirect=/cart"
          className="inline-flex h-11 items-center justify-center rounded-lg border border-brand-border bg-white px-4 text-sm font-bold text-brand-text hover:border-brand-primary hover:text-brand-primary"
        >
          Login to sync cart
        </Link>
      </div>

      <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartProducts.map((product) => (
            <article
              key={product.id}
              className="grid gap-4 rounded-lg border border-brand-border bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="aspect-square w-full rounded-lg object-cover sm:w-28"
              />
              <div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone="blue">{product.categoryName}</Badge>
                  <Badge tone="green">In stock</Badge>
                </div>
                <h2 className="mt-3 text-lg font-black text-brand-text">
                  {product.name}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{product.variant}</p>
                <p className="mt-3 text-lg font-black text-brand-text">
                  {formatCurrency(product.offerPrice ?? product.price)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <QuantityStepper />
                <Button variant="ghost" size="icon" aria-label="Remove item">
                  <Trash2 className="h-5 w-5 text-brand-error" aria-hidden="true" />
                </Button>
              </div>
            </article>
          ))}
        </div>
        <CartSummary subtotal={subtotal} deliveryFee={40} discount={75} />
      </section>
    </main>
  );
}
