import crypto from "crypto";
import type { RazorpayCreateOrderResponse } from "@/types/payment";

type CreateOrderInput = {
  amount: number;
  receipt: string;
};

export async function createRazorpayOrder({
  amount,
  receipt
}: CreateOrderInput): Promise<RazorpayCreateOrderResponse> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  const amountInPaise = Math.round(amount * 100);

  if (!keyId || !keySecret) {
    return {
      id: `order_demo_${Date.now()}`,
      amount: amountInPaise,
      currency: "INR",
      receipt,
      demo: true
    };
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString(
        "base64"
      )}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: "INR",
      receipt
    })
  });

  if (!response.ok) {
    throw new Error("Unable to create Razorpay order");
  }

  const data = (await response.json()) as {
    id: string;
    amount: number;
    currency: "INR";
    receipt: string;
  };

  return {
    ...data,
    demo: false
  };
}

export function verifyRazorpaySignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature
}: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    return {
      verified: true,
      demo: true
    };
  }

  const payload = `${razorpayOrderId}|${razorpayPaymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(payload)
    .digest("hex");

  return {
    verified: expectedSignature === razorpaySignature,
    demo: false
  };
}
