"use client";

import { useState } from "react";
import { Button } from "@/components/shared/Button";
import { Select } from "@/components/shared/Select";
import { Textarea } from "@/components/shared/Textarea";

export function ReturnRequestForm({ orderNumber }: { orderNumber: string }) {
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
          Request return for {orderNumber}
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Returns are available only for delivered orders.
        </p>
      </div>
      <Select label="Return reason" required>
        <option value="">Select reason</option>
        <option value="quality">Item quality issue</option>
        <option value="wrong-item">Wrong item delivered</option>
        <option value="damaged">Damaged package</option>
      </Select>
      <Textarea label="Additional details" placeholder="Share a few details" />
      <Button type="submit">Submit Return Request</Button>
      {submitted ? (
        <p className="rounded-lg bg-green-50 p-3 text-sm font-semibold text-brand-success">
          Return request form validated. Connect Supabase to persist this
          request.
        </p>
      ) : null}
    </form>
  );
}
