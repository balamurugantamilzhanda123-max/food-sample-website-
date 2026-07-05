"use client";

import { Select } from "@/components/shared/Select";
import type { ReturnStatus } from "@/types/order";

const statuses: ReturnStatus[] = [
  "Requested",
  "Approved",
  "Rejected",
  "Picked Up",
  "Completed"
];

export function ReturnStatusSelect({ value }: { value: ReturnStatus }) {
  return (
    <Select label="Return status" defaultValue={value}>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
