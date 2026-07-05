import Link from "next/link";
import { ArrowRight, Leaf, ShieldCheck, Truck } from "lucide-react";
import { CategoryNav } from "@/components/customer/CategoryNav";
import { HeroBanner } from "@/components/customer/HeroBanner";
import { ProductGrid } from "@/components/customer/ProductGrid";
import { products } from "@/lib/mock-data";

export default function HomePage() {
  const featured = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <HeroBanner />
      <CategoryNav />
      <main className="container-page py-12">
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
              Popular this week
            </p>
            <h2 className="mt-2 text-3xl font-black text-brand-text">
              Fresh picks customers love
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-black text-brand-primary hover:text-blue-900"
          >
            View all products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
        <div className="mt-6">
          <ProductGrid products={featured} />
        </div>

        <section className="mt-14 grid gap-4 lg:grid-cols-3">
          {[
            {
              title: "Freshness verified",
              text: "Daily checks for produce quality, packaging, and cold-chain items.",
              icon: Leaf
            },
            {
              title: "Secure OTP login",
              text: "Customers verify email before checkout, order actions, returns, or refunds.",
              icon: ShieldCheck
            },
            {
              title: "Fast local delivery",
              text: "Delivery-friendly checkout, address defaults, and order status tracking.",
              icon: Truck
            }
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-lg border border-brand-border bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-black text-brand-text">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.text}
                </p>
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}
