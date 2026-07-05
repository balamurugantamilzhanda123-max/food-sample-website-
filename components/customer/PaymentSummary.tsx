"use client";

import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { formatCurrency } from "@/lib/utils";

export function PaymentSummary({ amount }: { amount: number }) {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function createPaymentOrder() {
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount,
          receipt: `receipt_${Date.now()}`
        })
      });

      const data = (await response.json()) as { id?: string; demo?: boolean };

      if (!response.ok) {
        throw new Error("Payment setup failed");
      }

      setStatus(
        data.demo
          ? `Demo Razorpay order created: ${data.id}`
          : `Razorpay order created: ${data.id}`
      );
    } catch {
      setStatus("Unable to create payment order. Check server configuration.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border border-brand-border bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-black text-brand-text">Secure Payment</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Razorpay order creation and signature verification are handled by
            server routes. Add keys to activate live checkout.
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-lg bg-brand-background p-4">
        <div className="flex items-center justify-between text-lg font-black">
          <span>Payable amount</span>
          <span>{formatCurrency(amount)}</span>
        </div>
      </div>
      <Button
        className="mt-5 w-full"
        size="lg"
        onClick={createPaymentOrder}
        disabled={loading}
      >
        {loading ? "Creating payment order..." : "Pay with Razorpay"}
      </Button>
      {status ? (
        <p className="mt-3 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-brand-primary">
          {status}
        </p>
      ) : null}
    </div>
  );
}
