"use client";

import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string }) {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-brand-secondary px-4 py-3 text-sm font-semibold text-white shadow-soft">
      <CheckCircle2 className="h-4 w-4 text-brand-accent" aria-hidden="true" />
      {message}
    </div>
  );
}
