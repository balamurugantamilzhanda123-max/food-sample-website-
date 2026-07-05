import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function requireAdminApi() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return {
      ok: true,
      demo: true,
      userId: "demo-admin"
    } as const;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Authentication required" }, { status: 401 })
    } as const;
  }

  const { data } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  const profile = data as { role?: "customer" | "admin" } | null;

  if (profile?.role !== "admin") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Admin access required" }, { status: 403 })
    } as const;
  }

  return {
    ok: true,
    demo: false,
    userId: user.id
  } as const;
}
