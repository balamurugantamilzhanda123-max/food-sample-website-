import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { discountPercent, formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const discount = discountPercent(product.price, product.offerPrice);
  const salePrice = product.offerPrice ?? product.price;

  return (
    <article className="group overflow-hidden rounded-lg border border-brand-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lift">
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          {discount > 0 ? (
            <span className="absolute left-3 top-3 rounded-full bg-brand-accent px-2.5 py-1 text-xs font-black text-slate-950">
              {discount}% OFF
            </span>
          ) : null}
        </div>
      </Link>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link
              href={`/products/${product.slug}`}
              className="font-black text-brand-text transition hover:text-brand-primary"
            >
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-slate-500">{product.variant}</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-black text-brand-success">
            <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            {product.rating}
          </span>
        </div>
        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
          {product.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} tone="blue">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-black text-brand-text">
              {formatCurrency(salePrice)}
            </p>
            {product.offerPrice ? (
              <p className="text-xs font-semibold text-slate-400 line-through">
                {formatCurrency(product.price)}
              </p>
            ) : null}
          </div>
          <Link
            href={`/login?redirect=/cart&product=${product.slug}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white transition hover:bg-blue-900 focus-ring"
            aria-label={`Add ${product.name} to cart`}
            title="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
