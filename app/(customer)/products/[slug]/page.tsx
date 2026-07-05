import Link from "next/link";
import { ArrowLeft, ShoppingCart, Star, Truck } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { QuantityStepper } from "@/components/customer/QuantityStepper";
import { ProductGrid } from "@/components/customer/ProductGrid";
import { products } from "@/lib/mock-data";
import { discountPercent, formatCurrency } from "@/lib/utils";

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug) ?? products[0];
  const related = products
    .filter(
      (item) =>
        item.categoryId === product.categoryId && item.slug !== product.slug
    )
    .slice(0, 4);
  const salePrice = product.offerPrice ?? product.price;
  const discount = discountPercent(product.price, product.offerPrice);

  return (
    <main className="container-page py-10">
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm font-black text-brand-primary hover:text-blue-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to products
      </Link>
      <section className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.gallery.map((image) => (
              <img
                key={image}
                src={image}
                alt=""
                className="aspect-[4/3] rounded-lg border border-brand-border object-cover"
              />
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-brand-border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="blue">{product.categoryName}</Badge>
            {discount > 0 ? <Badge tone="amber">{discount}% off</Badge> : null}
            <Badge tone={product.stockQuantity > 0 ? "green" : "red"}>
              {product.stockQuantity > 0 ? "In stock" : "Out of stock"}
            </Badge>
          </div>
          <h1 className="mt-4 text-3xl font-black text-brand-text sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            {product.variant} · {product.freshness}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-sm font-black text-brand-success">
              <Star className="h-4 w-4 fill-current" aria-hidden="true" />
              {product.rating}
            </span>
            <span className="text-sm text-slate-500">Verified customer rating</span>
          </div>
          <p className="mt-5 text-base leading-7 text-slate-700">
            {product.description}
          </p>
          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-black text-brand-text">
              {formatCurrency(salePrice)}
            </p>
            {product.offerPrice ? (
              <p className="pb-1 text-sm font-semibold text-slate-400 line-through">
                {formatCurrency(product.price)}
              </p>
            ) : null}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <QuantityStepper />
            <Link
              href={`/login?redirect=/cart&product=${product.slug}`}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-brand-primary px-5 font-black text-white shadow-lift transition hover:bg-blue-900 focus-ring"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
              Add to Cart
            </Link>
          </div>
          <div className="mt-6 rounded-lg bg-brand-background p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-brand-text">
              <Truck className="h-5 w-5 text-brand-primary" aria-hidden="true" />
              Same-day delivery slots available for eligible pincodes.
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-black text-brand-text">
            More from {product.categoryName}
          </h2>
          <div className="mt-5">
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
