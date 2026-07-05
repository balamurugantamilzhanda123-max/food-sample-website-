export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center rounded-lg border border-brand-border bg-white">
      <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-primary border-t-transparent" />
        {label}
      </div>
    </div>
  );
}
