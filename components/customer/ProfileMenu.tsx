"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  LogOut,
  MapPin,
  PackageCheck,
  RefreshCcw,
  RotateCcw,
  User,
  UserRoundCog
} from "lucide-react";
import { Button } from "@/components/shared/Button";

const menuItems = [
  { href: "/profile#account", label: "Your Account", icon: User },
  { href: "/profile#address", label: "Your Address", icon: MapPin },
  { href: "/orders", label: "Orders", icon: PackageCheck },
  { href: "/profile#return", label: "Return", icon: RotateCcw },
  { href: "/profile#refund", label: "Refund", icon: RefreshCcw }
];

export function ProfileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        aria-expanded={open}
        aria-label="Open profile menu"
        title="Profile"
        onClick={() => setOpen((value) => !value)}
      >
        <UserRoundCog className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Profile</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-40 w-64 rounded-lg border border-brand-border bg-white p-2 shadow-soft">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-primary"
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
          <div className="my-2 border-t border-brand-border" />
          <Link
            href="/login?switch=true"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-brand-primary"
            onClick={() => setOpen(false)}
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            Switch Accounts
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
            onClick={() => setOpen(false)}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign Out
          </Link>
        </div>
      ) : null}
    </div>
  );
}
