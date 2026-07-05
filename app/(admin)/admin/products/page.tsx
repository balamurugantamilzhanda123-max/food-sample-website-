import Link from "next/link";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { products } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
            Manage products
          </p>
          <h1 className="mt-1 text-3xl font-black text-brand-text">
            Products
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 text-sm font-black text-white shadow-lift hover:bg-blue-900"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </Link>
      </section>
      <div className="rounded-lg border border-brand-border bg-white p-4">
        <label className="relative block">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            className="h-11 w-full rounded-lg border border-brand-border bg-white pl-9 pr-3 text-sm focus-ring"
            placeholder="Search products by name or category"
          />
        </label>
      </div>
      <DataTable
        headers={[
          "Product",
          "Category",
          "Price",
          "Stock",
          "Status",
          "Actions"
        ]}
      >
        {products.map((product) => (
          <tr key={product.id}>
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-black text-brand-text">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.variant}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-slate-600">{product.categoryName}</td>
            <td className="px-4 py-4 font-black text-brand-text">
              {formatCurrency(product.offerPrice ?? product.price)}
            </td>
            <td className="px-4 py-4 text-slate-600">{product.stockQuantity}</td>
            <td className="px-4 py-4">
              <Badge tone={product.active ? "green" : "red"}>
                {product.active ? "Active" : "Inactive"}
              </Badge>
            </td>
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Edit product">
                  <Edit className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete product">
                  <Trash2
                    className="h-4 w-4 text-brand-error"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
