import { PaymentSummary } from "@/components/customer/PaymentSummary";

export default function PaymentPage() {
  return (
    <main className="container-page py-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Payment
        </p>
        <h1 className="mt-2 text-3xl font-black text-brand-text">
          Complete your order
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This structure is Razorpay-ready. With live keys configured, the server
          creates and verifies payment orders securely.
        </p>
        <div className="mt-6">
          <PaymentSummary amount={1132} />
        </div>
      </div>
    </main>
  );
}
