import Link from "next/link";
import { Home, PackageCheck, ShoppingBag, ShoppingCart, User } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: ShoppingBag },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
  { href: "/orders", label: "Orders", icon: PackageCheck },
  { href: "/profile", label: "Profile", icon: User }
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-brand-border bg-white px-2 py-2 sm:hidden">
      <div className="grid grid-cols-5">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 rounded-lg px-1 py-1.5 text-[11px] font-semibold text-slate-600 transition hover:bg-blue-50 hover:text-brand-primary"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
