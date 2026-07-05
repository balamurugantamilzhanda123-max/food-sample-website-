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
    slug: slugify(payload.name),
    ...payload,
    message: "Product validated for admin-only persistence."
  });
}
