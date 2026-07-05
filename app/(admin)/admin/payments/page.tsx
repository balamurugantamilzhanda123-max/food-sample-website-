import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/shared/Badge";
import { payments } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Manage payments
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">Payments</h1>
      </section>
      <DataTable
        headers={["Order", "Provider", "Provider order ID", "Amount", "Status", "Date"]}
      >
        {payments.map((payment) => (
          <tr key={payment.id}>
            <td className="px-4 py-4 font-black text-brand-text">
              {payment.orderNumber}
            </td>
            <td className="px-4 py-4 text-slate-600">{payment.provider}</td>
            <td className="px-4 py-4 text-slate-600">
              {payment.providerOrderId}
            </td>
            <td className="px-4 py-4 font-black text-brand-text">
              {formatCurrency(payment.amount)}
            </td>
            <td className="px-4 py-4">
              <Badge tone={payment.status === "Captured" ? "green" : "blue"}>
                {payment.status}
              </Badge>
            </td>
            <td className="px-4 py-4 text-slate-600">
              {formatDate(payment.createdAt)}
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
