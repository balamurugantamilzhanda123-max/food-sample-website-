"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { useState } from "react";

export function QuantityStepper({
  initial = 1,
  min = 1,
  max = 20
}: {
  initial?: number;
  min?: number;
  max?: number;
}) {
  const [quantity, setQuantity] = useState(initial);

  return (
    <div className="inline-flex items-center rounded-lg border border-brand-border bg-white">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Decrease quantity"
        title="Decrease"
        onClick={() => setQuantity((value) => Math.max(min, value - 1))}
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </Button>
      <span className="w-10 text-center text-sm font-black text-brand-text">
        {quantity}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Increase quantity"
        title="Increase"
        onClick={() => setQuantity((value) => Math.min(max, value + 1))}
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
