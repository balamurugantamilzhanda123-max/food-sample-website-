import { AlertTriangle } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  description
}: {
  title?: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-red-100 bg-red-50 p-5 text-red-800">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5" aria-hidden="true" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm leading-6">{description}</p>
        </div>
      </div>
    </div>
  );
}
