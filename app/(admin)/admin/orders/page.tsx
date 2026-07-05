import { Mail, Phone } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { Badge } from "@/components/shared/Badge";
import { orders } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          View orders
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Order management
        </h1>
      </section>
      <DataTable
        headers={[
          "Customer",
          "Delivery address",
          "Products",
          "Total",
          "Payment",
          "Order status"
        ]}
      >
        {orders.map((order) => (
          <tr key={order.id} className="align-top">
            <td className="px-4 py-4">
              <p className="font-black text-brand-text">{order.customerName}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Mail className="h-3 w-3" aria-hidden="true" />
                {order.email}
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Phone className="h-3 w-3" aria-hidden="true" />
                {order.mobile}
              </p>
            </td>
            <td className="px-4 py-4 text-sm leading-6 text-slate-600">
              {order.address.line1}, {order.address.city},{" "}
              {order.address.state} - {order.address.pincode}
            </td>
            <td className="px-4 py-4">
              <div className="space-y-2">
                {order.items.map((item) => (
                  <p key={item.id} className="text-sm text-slate-600">
                    <span className="font-bold text-brand-text">
                      {item.productName}
                    </span>{" "}
                    · {item.variant} · Qty {item.quantity}
                  </p>
                ))}
              </div>
            </td>
            <td className="px-4 py-4 font-black text-brand-text">
              {formatCurrency(order.total)}
            </td>
            <td className="px-4 py-4">
              <Badge tone="green">{order.paymentStatus}</Badge>
            </td>
            <td className="min-w-48 px-4 py-4">
              <OrderStatusSelect value={order.orderStatus} />
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
