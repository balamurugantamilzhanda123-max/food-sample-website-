import { ShieldCheck } from "lucide-react";

export function AdminGuard() {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-sm text-brand-primary">
      <div className="flex gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5" aria-hidden="true" />
        <p>
          Admin routes use Supabase role checks, middleware protection, server
          API guards, and RLS policies. Configure the public Supabase URL and
          anon key before using protected admin actions.
        </p>
      </div>
    </div>
  );
}
