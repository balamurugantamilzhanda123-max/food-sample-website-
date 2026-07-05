import { ProductFilters } from "@/components/customer/ProductFilters";
import { ProductGrid } from "@/components/customer/ProductGrid";
import { categories, products } from "@/lib/mock-data";

export default async function ProductsPage({
  searchParams
}: {
  searchParams?: Promise<{ category?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const activeCategory = categories.find(
    (category) => category.slug === params.category
  );
  const visibleProducts = activeCategory
    ? products.filter((product) => product.categoryId === activeCategory.id)
    : products;

  return (
    <main className="container-page py-10">
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
            Grocery catalog
          </p>
          <h1 className="mt-2 text-3xl font-black text-brand-text sm:text-4xl">
            {activeCategory ? activeCategory.name : "All products"}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Browse fresh foods, pantry essentials, dairy staples, and grocery
            packs with stock-aware product cards.
          </p>
        </div>
      </section>
      <div className="mt-6">
        <ProductFilters />
      </div>
      <div className="mt-6">
        <ProductGrid products={visibleProducts} />
      </div>
    </main>
  );
}
