import type { ReactNode } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { requireAdmin } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children
}: {
  children: ReactNode;
}) {
  await requireAdmin();

  return <AdminLayout>{children}</AdminLayout>;
}
