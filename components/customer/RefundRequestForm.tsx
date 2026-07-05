"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";

export function RefundRequestForm({ orderNumber }: { orderNumber: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="space-y-4 rounded-lg border border-brand-border bg-white p-5"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div>
        <h3 className="text-lg font-black text-brand-text">
          Request refund for {orderNumber}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Refunds are reviewed against payment and return eligibility.
        </p>
      </div>
      <Select label="Refund reason" required>
        <option value="">Select reason</option>
        <option value="return-approved">Return approved</option>
        <option value="missing">Missing item</option>
        <option value="payment">Payment issue</option>
      </Select>
      <Textarea label="Additional details" placeholder="Share a few details" />
      <Button type="submit">Submit Refund Request</Button>
      {submitted ? (
        <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-brand-success">
          Refund request form validated. Connect Supabase to persist this
          request.
        </p>
      ) : null}
    </form>
  );
}
