import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/api-auth";

const orderStatusSchema = z.object({
  status: z.enum([
    "Pending",
    "Confirmed",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled"
  ])
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdminApi();

  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await context.params;
  const payload = orderStatusSchema.parse(await request.json());

  return NextResponse.json({
    id,
    status: payload.status,
    demo: auth.demo,
    message: auth.demo
      ? "Demo order status accepted. Connect Supabase to persist."
      : "Order status validated for admin-only update."
  });
}
