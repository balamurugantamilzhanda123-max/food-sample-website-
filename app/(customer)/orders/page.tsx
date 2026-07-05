import Link from "next/link";
import { Download, RotateCcw } from "lucide-react";
import { Badge } from "@/components/shared/Badge";
import { OrderTimeline } from "@/components/customer/OrderTimeline";
import { orders } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function OrdersPage() {
  return (
    <main className="container-page py-10">
      <div>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Protected orders
        </p>
        <h1 className="mt-2 text-3xl font-black text-brand-text">My Orders</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Order history, status tracking, invoice downloads, returns, and refunds
          require login.
        </p>
      </div>
      <div className="mt-6 space-y-5">
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-lg border border-brand-border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-black text-brand-text">
                    {order.orderNumber}
                  </h2>
                  <Badge tone="green">{order.paymentStatus}</Badge>
                  <Badge tone={order.orderStatus === "Delivered" ? "green" : "blue"}>
                    {order.orderStatus}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Placed on {formatDate(order.createdAt)} · {order.items.length}{" "}
                  items · {formatCurrency(order.total)}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href={order.invoiceUrl ?? "#"}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-brand-border bg-white px-3 text-sm font-bold text-brand-text hover:border-brand-primary hover:text-brand-primary"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Invoice
                </Link>
                {order.orderStatus === "Delivered" ? (
                  <Link
                    href="/profile#return"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-primary px-3 text-sm font-bold text-white hover:bg-blue-900"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Return
                  </Link>
                ) : null}
              </div>
            </div>
            <div className="mt-5">
              <OrderTimeline status={order.orderStatus} />
            </div>
            <div className="mt-5 grid gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg bg-brand-background p-3"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="h-14 w-14 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-black text-brand-text">
                      {item.productName}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.variant} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-brand-text">
                    {formatCurrency(item.price)}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
