"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";
import { categories } from "@/lib/mock-data";

export function ProductForm() {
  const [saved, setSaved] = useState(false);

  return (
    <form
      className="grid gap-5 rounded-lg border border-brand-border bg-white p-5 shadow-sm"
      onSubmit={(event) => {
        event.preventDefault();
        setSaved(true);
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Input label="Product name" placeholder="Fresh Malai Paneer" required />
        <Input label="Product image URL" placeholder="https://..." required />
        <Input label="Price" type="number" min="0" placeholder="180" required />
        <Input label="Offer price" type="number" min="0" placeholder="159" />
        <Select label="Category" required>
          <option value="">Select category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Input
          label="Stock quantity"
          type="number"
          min="0"
          placeholder="28"
          required
        />
        <Input label="Size / weight / variant" placeholder="200 g" required />
        <Select label="Status" defaultValue="active">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>
      <Textarea
        label="Description"
        placeholder="Describe freshness, sourcing, and packaging"
        required
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit">Save Product</Button>
        <Button type="button" variant="outline">
          Upload Image
        </Button>
      </div>
      {saved ? (
        <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-brand-success">
          Product saved in demo mode. Connect Supabase to persist this form.
        </p>
      ) : null}
    </form>
  );
}
