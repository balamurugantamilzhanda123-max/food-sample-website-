import { Check, X } from "lucide-react";
import { DataTable } from "@/components/admin/DataTable";
import { ReturnStatusSelect } from "@/components/admin/ReturnStatusSelect";
import { Button } from "@/components/shared/Button";
import { returnRequests } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AdminReturnsPage() {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-black uppercase tracking-wider text-brand-primary">
          Manage returns
        </p>
        <h1 className="mt-1 text-3xl font-black text-brand-text">
          Return requests
        </h1>
      </section>
      <DataTable
        headers={["Order", "Customer", "Reason", "Date", "Status", "Actions"]}
      >
        {returnRequests.map((request) => (
          <tr key={request.id}>
            <td className="px-4 py-4 font-black text-brand-text">
              {request.orderNumber}
            </td>
            <td className="px-4 py-4 text-slate-600">{request.customerName}</td>
            <td className="px-4 py-4 text-slate-600">{request.reason}</td>
            <td className="px-4 py-4 text-slate-600">
              {formatDate(request.createdAt)}
            </td>
            <td className="min-w-48 px-4 py-4">
              <ReturnStatusSelect value={request.status} />
            </td>
            <td className="px-4 py-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Approve
                </Button>
                <Button variant="danger" size="sm">
                  <X className="h-4 w-4" aria-hidden="true" />
                  Reject
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </DataTable>
    </div>
  );
}
