import type { ReactNode } from "react";
import { Header } from "@/components/customer/Header";
import { MobileNav } from "@/components/customer/MobileNav";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-background pb-20 sm:pb-0">
      <Header />
      {children}
      <MobileNav />
    </div>
  );
}
