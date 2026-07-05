"use client";

import { useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import type { Address } from "@/types/order";

export function CheckoutAddressSelector({ addresses }: { addresses: Address[] }) {
  const [selected, setSelected] = useState(
    addresses.find((address) => address.isDefault)?.id ?? addresses[0]?.id
  );

  return (
    <div className="space-y-3">
      {addresses.map((address) => {
        const isSelected = selected === address.id;

        return (
          <button
            type="button"
            key={address.id}
            onClick={() => setSelected(address.id)}
            className={`w-full rounded-lg border bg-white p-4 text-left transition focus-ring ${
              isSelected
                ? "border-brand-primary shadow-lift"
                : "border-brand-border hover:border-brand-primary"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <MapPin
                  className="mt-1 h-5 w-5 text-brand-primary"
                  aria-hidden="true"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black text-brand-text">
                      {address.label}
                    </h3>
                    {address.isDefault ? <Badge tone="green">Default</Badge> : null}
                  </div>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {address.recipientName}, {address.mobile}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {address.line1}, {address.line2 ? `${address.line2}, ` : ""}
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
              </div>
              {isSelected ? (
                <CheckCircle2
                  className="h-5 w-5 text-brand-success"
                  aria-hidden="true"
                />
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
