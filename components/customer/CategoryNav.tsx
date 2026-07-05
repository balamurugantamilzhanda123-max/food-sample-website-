import Link from "next/link";
import { categories } from "@/lib/mock-data";

export function CategoryNav() {
  return (
    <div className="container-page -mt-10 relative z-10">
      <div className="grid gap-3 rounded-lg border border-brand-border bg-white p-3 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className="group flex items-center gap-3 rounded-lg p-2 transition hover:bg-blue-50"
          >
            <img
              src={category.imageUrl}
              alt=""
              className="h-16 w-16 rounded-lg object-cover"
            />
            <span>
              <span className="block text-sm font-black text-brand-text group-hover:text-brand-primary">
                {category.name}
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                {category.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
