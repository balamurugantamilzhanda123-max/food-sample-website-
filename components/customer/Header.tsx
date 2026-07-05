"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { ProfileMenu } from "@/components/customer/ProfileMenu";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/products?category=fresh-fruits", label: "Categories" },
  { href: "/orders", label: "My Orders" }
];

export function Header({ isAuthenticated = false }: { isAuthenticated?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-lg font-black text-white">
              F
            </span>
            <span className="text-lg font-black text-brand-secondary">
              FreshCart
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-brand-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 justify-center md:flex">
            <label className="relative w-full max-w-sm">
              <span className="sr-only">Search products</span>
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              />
              <input
                placeholder="Search fruits, dairy, pantry"
                className="h-10 w-full rounded-lg border border-brand-border bg-brand-background pl-9 pr-3 text-sm focus-ring"
              />
            </label>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Link
              href="/cart"
              aria-label="Open cart"
              title="Cart"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand-border bg-white text-brand-text transition hover:border-brand-primary hover:text-brand-primary focus-ring"
            >
              <ShoppingCart className="h-5 w-5" aria-hidden="true" />
            </Link>
            {isAuthenticated ? (
              <ProfileMenu />
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white shadow-lift transition hover:bg-blue-900 focus-ring"
              >
                Login / Signup
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label="Open menu"
            title="Menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-brand-secondary/50 sm:hidden">
          <div className="ml-auto min-h-screen w-80 max-w-[86vw] bg-white p-4 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-brand-secondary">
                FreshCart
              </span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                title="Close"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <nav className="mt-6 grid gap-2">
              {[...navItems, { href: "/cart", label: "Cart" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-brand-primary px-4 text-sm font-semibold text-white shadow-lift"
            >
              Login / Signup
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
