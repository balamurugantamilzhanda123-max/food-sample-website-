"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { Select } from "@/components/shared/Select";

export function ProductFilters() {
  return (
    <div className="rounded-lg border border-brand-border bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
        <label className="relative">
          <span className="sr-only">Search products</span>
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            className="h-11 w-full rounded-lg border border-brand-border bg-white pl-9 pr-3 text-sm focus-ring"
            placeholder="Search groceries"
          />
        </label>
        <Select label="Category" defaultValue="all">
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select label="Sort by" defaultValue="featured">
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to high</option>
          <option value="price-high">Price: High to low</option>
        </Select>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
        Filters are wired for UI now and ready to connect to Supabase queries.
      </p>
    </div>
  );
}
