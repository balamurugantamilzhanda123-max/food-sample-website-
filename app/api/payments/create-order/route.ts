import { NextResponse } from "next/server";
import { z } from "zod";
import { createRazorpayOrder } from "@/lib/razorpay";

export const runtime = "nodejs";

const createOrderSchema = z.object({
  amount: z.coerce.number().positive(),
  receipt: z.string().min(3)
});

export async function POST(request: Request) {
  try {
    const payload = createOrderSchema.parse(await request.json());
    const order = await createRazorpayOrder(payload);

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create payment order"
      },
      { status: 400 }
    );
  }
}
