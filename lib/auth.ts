import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const customerProtectedRoutes = [
  "/cart",
  "/checkout",
  "/payment",
  "/orders",
  "/profile"
];

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getProfileRole(userId: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return "admin";
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  const profile = data as { role?: "customer" | "admin" } | null;

  return profile?.role ?? "customer";
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user && process.env.NEXT_PUBLIC_SUPABASE_URL) {
    redirect("/admin/login");
  }

  if (!user) {
    return null;
  }

  const role = await getProfileRole(user.id);

  if (role !== "admin") {
    redirect("/admin/login?error=unauthorized");
  }

  return user;
}
