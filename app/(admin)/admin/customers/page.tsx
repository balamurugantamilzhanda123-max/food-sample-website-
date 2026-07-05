import { Mail, Phone } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/shared/Badge";
import { customers } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Manage customers
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Customers
        </h1>
      </section>
      <DataTable headers={["Customer", "Contact", "Role", "Orders", "Spend"]}>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td className="px-4 py-4 font-black text-brand-text">
              {customer.name}
            </td>
            <td className="px-4 py-4">
              <p className="flex items-center gap-1 text-sm text-slate-600">
                <Mail className="h-3 w-3" aria-hidden="true" />
                {customer.email}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-600">
                <Phone className="h-3 w-3" aria-hidden="true" />
                {customer.mobile}
              </p>
            </td>
            <td className="px-4 py-4">
              <Badge tone={customer.role === "admin" ? "amber" : "blue"}>
                {customer.role}
              </Badge>
            </td>
            <td className="px-4 py-4 text-slate-600">{customer.orders}</td>
            <td className="px-4 py-4 font-black text-brand-text">
              {formatCurrency(customer.totalSpend)}
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
