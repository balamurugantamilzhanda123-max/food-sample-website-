import { NextResponse } from "next/server";
import { productSchema } from "@/lib/validators";
import { requireAdminApi } from "@/lib/api-auth";
import { slugify } from "@/lib/utils";

export async function POST(request: Request) {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  const payload = productSchema.parse(await request.json());

  return NextResponse.json({
    id: auth.demo ? `demo_product_${Date.now()}` : undefined,
    slug: slugify(payload.name),
    ...payload,
    demo: auth.demo,
    message: auth.demo
      ? "Demo product accepted. Connect Supabase to persist."
      : "Product validated for admin-only persistence."
  });
}
