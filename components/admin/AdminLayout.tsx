"use client";

import { useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { Button } from "@/components/shared/Button";

export function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-background">
      <div className="fixed inset-y-0 left-0 hidden w-72 lg:block">
        <AdminSidebar />
      </div>
      <div className="lg:pl-72">
        <AdminTopbar onMenuClick={() => setOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden">
          <div className="h-full w-80 max-w-[86vw] bg-brand-secondary">
            <div className="absolute left-[calc(min(86vw,20rem)-3.5rem)] top-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                aria-label="Close admin menu"
                title="Close"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
            <AdminSidebar onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
