import {
  CreditCard,
  Package,
  RefreshCcw,
  RotateCcw,
  ShoppingBag,
  Truck
} from "lucide-react";
import { AdminGuard } from "@/components/admin/AdminGuard";
import { DataTable } from "@/components/admin/DataTable";
import { MetricCard } from "@/components/admin/MetricCard";
import { Badge } from "@/components/shared/Badge";
import { dashboardMetrics, orders } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <AdminGuard />
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Dashboard
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Store overview
        </h1>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total products"
          value={dashboardMetrics.totalProducts}
          icon={<Package className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Total orders"
          value={dashboardMetrics.totalOrders}
          icon={<ShoppingBag className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Total sales"
          value={dashboardMetrics.totalSales}
          currency
          icon={<CreditCard className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Pending orders"
          value={dashboardMetrics.pendingOrders}
          icon={<Truck className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Delivered orders"
          value={dashboardMetrics.deliveredOrders}
          icon={<Truck className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Return requests"
          value={dashboardMetrics.returnRequests}
          icon={<RotateCcw className="h-5 w-5" aria-hidden="true" />}
        />
        <MetricCard
          label="Refund requests"
          value={dashboardMetrics.refundRequests}
          icon={<RefreshCcw className="h-5 w-5" aria-hidden="true" />}
        />
      </section>
      <section>
        <h2 className="mb-4 text-xl font-black text-brand-text">
          Recent orders
        </h2>
        <DataTable
          headers={[
            "Order",
            "Customer",
            "Date",
            "Payment",
            "Status",
            "Total"
          ]}
        >
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-4 font-black text-brand-text">
                {order.orderNumber}
              </td>
              <td className="px-4 py-4 text-slate-600">{order.customerName}</td>
              <td className="px-4 py-4 text-slate-600">
                {formatDate(order.createdAt)}
              </td>
              <td className="px-4 py-4">
                <Badge tone="green">{order.paymentStatus}</Badge>
              </td>
              <td className="px-4 py-4">
                <Badge tone={order.orderStatus === "Delivered" ? "green" : "blue"}>
                  {order.orderStatus}
                </Badge>
              </td>
              <td className="px-4 py-4 font-black text-brand-text">
                {formatCurrency(order.total)}
              </td>
            </tr>
          ))}
        </DataTable>
      </section>
    </div>
  );
}
