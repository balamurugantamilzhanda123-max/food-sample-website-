"use client";

import { Menu, Search } from "lucide-react";
import { Button } from "@/components/shared/Button";

export function AdminTopbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-20 border-b border-brand-border bg-white">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div>
          <p className="text-xs font-black uppercase tracking-wider text-brand-primary">
            Secure admin
          </p>
          <h1 className="text-lg font-black text-brand-text">
            Store operations
          </h1>
        </div>
        <label className="relative hidden w-full max-w-sm md:block">
          <span className="sr-only">Search admin records</span>
          <Search
            aria-hidden="true"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <input
            className="h-10 w-full rounded-lg border border-brand-border bg-brand-background pl-9 pr-3 text-sm focus-ring"
            placeholder="Search orders, customers, products"
          />
        </label>
        <Button
          variant="outline"
          size="icon"
          className="lg:hidden"
          aria-label="Open admin menu"
          title="Menu"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}
