import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-background">
      <header className="border-b border-brand-border bg-white">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-lg font-black text-white">
              F
            </span>
            <span className="text-lg font-black text-brand-secondary">
              EverydayFresh
            </span>
          </Link>
          <Link
            href="/products"
            className="text-sm font-black text-brand-primary hover:text-blue-900"
          >
            Browse products
          </Link>
        </div>
      </header>
      <main className="container-page grid min-h-[calc(100vh-4rem)] place-items-center py-10">
        {children}
      </main>
    </div>
  );
}
