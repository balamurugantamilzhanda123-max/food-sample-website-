import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRazorpaySignature } from "@/lib/razorpay";

export const runtime = "nodejs";

const verifyPaymentSchema = z.object({
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1)
});

export async function POST(request: Request) {
  try {
    const payload = verifyPaymentSchema.parse(await request.json());
    const verification = verifyRazorpaySignature(payload);

    if (!verification.verified) {
      return NextResponse.json(
        {
          verified: false,
          error: "Invalid payment signature"
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      verified: true,
      demo: verification.demo
    });
  } catch (error) {
    return NextResponse.json(
      {
        verified: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to verify payment"
      },
      { status: 400 }
    );
  }
}
