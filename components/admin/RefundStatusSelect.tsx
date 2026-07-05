"use client";

import { Select } from "@/components/shared/Select";
import type { RefundStatus } from "@/types/order";

const statuses: RefundStatus[] = [
  "Requested",
  "Processing",
  "Completed",
  "Rejected"
];

export function RefundStatusSelect({ value }: { value: RefundStatus }) {
  return (
    <Select label="Refund status" defaultValue={value}>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
