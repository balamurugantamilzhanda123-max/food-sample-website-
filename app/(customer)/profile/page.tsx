import Link from "next/link";
import {
  Edit,
  LogOut,
  MapPin,
  Plus,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  User
} from "lucide-react";
import { ReturnRequestForm } from "@/components/customer/ReturnRequestForm";
import { RefundRequestForm } from "@/components/customer/RefundRequestForm";
import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { addresses, orders, refundRequests, returnRequests } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const deliveredOrder = orders.find((order) => order.orderStatus === "Delivered");

  return (
    <main className="container-page py-10">
      <section className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-lg border border-brand-border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-brand-border pb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
              <User className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-black text-brand-text">Aarav Sharma</h1>
              <p className="text-sm text-slate-500">aarav@example.com</p>
            </div>
          </div>
          <nav className="mt-4 grid gap-1">
            {[
              ["#account", "Your Account"],
              ["#address", "Your Address"],
              ["/orders", "Orders"],
              ["#return", "Return"],
              ["#refund", "Refund"]
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className="rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-primary"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/login?switch=true"
              className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-brand-primary"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Switch Accounts
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-error hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign Out
            </Link>
          </nav>
        </aside>

        <div className="space-y-6">
          <section
            id="account"
            className="rounded-lg border border-brand-border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
                  Your Account
                </p>
                <h2 className="mt-1 text-2xl font-black text-brand-text">
                  Profile details
                </h2>
              </div>
              <Button variant="outline">
                <Edit className="h-4 w-4" aria-hidden="true" />
                Edit profile
              </Button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Input label="Name" defaultValue="Aarav Sharma" />
              <Input label="Email" defaultValue="aarav@example.com" />
              <Input label="Mobile number" defaultValue="+91 98765 43210" />
            </div>
            <p className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm font-semibold text-brand-success">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Email OTP verification active for account access.
            </p>
          </section>

          <section
            id="address"
            className="rounded-lg border border-brand-border bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
                  Your Address
                </p>
                <h2 className="mt-1 text-2xl font-black text-brand-text">
                  Delivery addresses
                </h2>
              </div>
              <Button>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Add new address
              </Button>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {addresses.map((address) => (
                <article
                  key={address.id}
                  className="rounded-lg border border-brand-border bg-brand-background p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <MapPin
                        className="mt-1 h-5 w-5 text-brand-primary"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-black text-brand-text">
                            {address.label}
                          </h3>
                          {address.isDefault ? (
                            <Badge tone="green">Default</Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm font-semibold text-slate-700">
                          {address.recipientName}, {address.mobile}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {address.line1}, {address.line2} {address.city},{" "}
                          {address.state} - {address.pincode}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      Set default
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2
                        className="h-4 w-4 text-brand-error"
                        aria-hidden="true"
                      />
                      Delete
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-brand-border bg-white p-5 shadow-sm">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
                  Orders
                </p>
                <h2 className="mt-1 text-2xl font-black text-brand-text">
                  Recent order history
                </h2>
              </div>
              <Link
                href="/orders"
                className="text-sm font-black text-brand-primary hover:text-blue-900"
              >
                View all orders
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col justify-between gap-3 rounded-lg bg-brand-background p-4 sm:flex-row sm:items-center"
                >
                  <div>
                    <p className="font-black text-brand-text">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatDate(order.createdAt)} · {formatCurrency(order.total)}
                    </p>
                  </div>
                  <Badge tone={order.orderStatus === "Delivered" ? "green" : "blue"}>
                    {order.orderStatus}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          <section id="return" className="grid gap-5 lg:grid-cols-2">
            {deliveredOrder ? (
              <ReturnRequestForm orderNumber={deliveredOrder.orderNumber} />
            ) : null}
            <div className="rounded-lg border border-brand-border bg-white p-5">
              <h3 className="text-lg font-black text-brand-text">
                Return status
              </h3>
              <div className="mt-4 space-y-3">
                {returnRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-lg bg-brand-background p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-brand-text">
                        {request.orderNumber}
                      </p>
                      <Badge tone="amber">{request.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {request.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="refund" className="grid gap-5 lg:grid-cols-2">
            {deliveredOrder ? (
              <RefundRequestForm orderNumber={deliveredOrder.orderNumber} />
            ) : null}
            <div className="rounded-lg border border-brand-border bg-white p-5">
              <h3 className="text-lg font-black text-brand-text">
                Refund status
              </h3>
              <div className="mt-4 space-y-3">
                {refundRequests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-lg bg-brand-background p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-black text-brand-text">
                        {request.orderNumber}
                      </p>
                      <Badge tone="blue">{request.status}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-slate-600">
                      {request.reason} · {formatCurrency(request.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
