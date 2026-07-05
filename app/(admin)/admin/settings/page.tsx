import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Select } from "@/components/shared/Select";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Admin settings
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Store configuration
        </h1>
      </section>
      <form className="grid gap-5 rounded-lg border border-brand-border bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Store name" defaultValue="FreshCart" />
          <Input label="Support email" defaultValue="support@freshcart.example" />
          <Input label="Delivery fee" type="number" defaultValue="40" />
          <Input label="Free delivery above" type="number" defaultValue="999" />
          <Select label="Payment provider" defaultValue="razorpay">
            <option value="razorpay">Razorpay</option>
            <option value="stripe">Stripe-ready later</option>
          </Select>
          <Select label="Admin route protection" defaultValue="enabled">
            <option value="enabled">Enabled</option>
            <option value="configuration-required">Configuration required</option>
          </Select>
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
