import { Edit, Plus, Trash2 } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { categories } from "@/lib/mock-data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Manage categories
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Categories
        </h1>
      </section>
      <form className="grid gap-4 rounded-lg border border-brand-border bg-white p-5 shadow-sm md:grid-cols-[1fr_1fr_auto] md:items-end">
        <Input label="Category name" placeholder="Bakery" />
        <Input label="Description" placeholder="Fresh breads and breakfast" />
        <Button type="submit">
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Category
        </Button>
      </form>
      <DataTable headers={["Category", "Slug", "Description", "Status", "Actions"]}>
        {categories.map((category) => (
          <tr key={category.id}>
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <p className="font-black text-brand-text">{category.name}</p>
              </div>
            </td>
            <td className="px-4 py-4 text-slate-600">{category.slug}</td>
            <td className="px-4 py-4 text-slate-600">{category.description}</td>
            <td className="px-4 py-4">
              <Badge tone="green">{category.active ? "Active" : "Inactive"}</Badge>
            </td>
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon" aria-label="Edit category">
                  <Edit className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete category">
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
