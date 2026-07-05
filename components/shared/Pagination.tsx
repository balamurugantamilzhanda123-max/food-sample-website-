import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/shared/Button";

export function Pagination() {
  return (
    <div className="flex items-center justify-between border-t border-brand-border pt-4">
      <Button variant="outline" size="sm">
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </Button>
      <span className="text-sm font-semibold text-slate-600">Page 1 of 1</span>
      <Button variant="outline" size="sm">
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
