import { ProductForm } from "@/components/admin/ProductForm";

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Add product
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          New grocery item
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Product uploads are designed for Supabase Storage and admin-only table
          writes.
        </p>
      </section>
      <ProductForm />
    </div>
  );
}
