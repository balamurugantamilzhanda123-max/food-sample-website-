import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Textarea } from "@/components/shared/Textarea";

export default function ContactPage() {
  return (
    <main className="container-page py-10">
      <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-black text-brand-text">
            We are here to help
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Reach out for delivery questions, account help, orders, returns, and
            refunds.
          </p>
          <div className="mt-6 space-y-3">
            {[
              { label: "support@everydayfresh.example", icon: Mail },
              { label: "+91 90000 00000", icon: Phone },
              { label: "Bengaluru, Karnataka", icon: MapPin }
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 rounded-lg border border-brand-border bg-white p-4"
                >
                  <Icon className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                  <span className="text-sm font-bold text-brand-text">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <form className="space-y-4 rounded-lg border border-brand-border bg-white p-5 shadow-sm">
          <Input label="Full name" placeholder="Your name" required />
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <Textarea label="Message" placeholder="How can we help?" required />
          <Button type="submit">Send Message</Button>
        </form>
      </section>
    </main>
  );
}
