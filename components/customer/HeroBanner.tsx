import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-brand-secondary text-white">
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1800&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/25" />
      <div className="container-page relative grid min-h-[520px] items-center py-16 sm:min-h-[560px]">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-amber-400 px-3 py-1 text-sm font-black text-slate-950">
            Fresh groceries, delivered fast
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Premium groceries for everyday Indian kitchens
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Shop fruits, vegetables, dairy, and pantry essentials with verified
            freshness, secure OTP login, and reliable order tracking.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-accent px-5 font-black text-slate-950 transition hover:bg-amber-400 focus-ring"
            >
              Shop Products
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 px-5 font-bold text-white transition hover:bg-white/10 focus-ring"
            >
              Create Account
            </Link>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Same-day slots", icon: Clock },
              { label: "Secure checkout", icon: ShieldCheck },
              { label: "Cold-chain care", icon: Truck }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-white/15 bg-white/10 px-3 py-3 text-sm font-bold backdrop-blur"
                >
                  <Icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  {item.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
