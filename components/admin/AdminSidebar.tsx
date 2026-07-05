import Link from "next/link";
import {
  CreditCard,
  LayoutDashboard,
  LogOut,
  Package,
  RefreshCcw,
  RotateCcw,
  Settings,
  ShoppingBag,
  Tags,
  Users
} from "lucide-react";

const adminLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/returns", label: "Returns", icon: RotateCcw },
  { href: "/admin/refunds", label: "Refunds", icon: RefreshCcw },
  { href: "/admin/payments", label: "Payments", icon: CreditCard },
  { href: "/admin/categories", label: "Categories", icon: Tags },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full flex-col bg-brand-secondary text-white">
      <Link
        href="/admin/dashboard"
        className="flex h-16 items-center gap-3 border-b border-white/10 px-5"
        onClick={onNavigate}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-accent text-lg font-black text-slate-950">
          F
        </span>
        <span>
          <span className="block text-base font-black">FreshCart</span>
          <span className="block text-xs font-semibold text-slate-300">
            Admin Panel
          </span>
        </span>
      </Link>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {adminLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link
          href="/admin/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Logout
        </Link>
      </div>
    </aside>
  );
}
