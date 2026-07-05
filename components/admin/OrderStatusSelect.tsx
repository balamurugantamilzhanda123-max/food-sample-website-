"use client";

import { Select } from "@/components/shared/Select";
import type { OrderStatus } from "@/types/order";

const statuses: OrderStatus[] = [
  "Pending",
  "Confirmed",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled"
];

export function OrderStatusSelect({ value }: { value: OrderStatus }) {
  return (
    <Select label="Order status" defaultValue={value}>
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </Select>
  );
}
