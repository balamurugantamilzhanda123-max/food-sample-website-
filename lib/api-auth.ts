import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  getMissingSupabaseServerEnvNames
} from "@/lib/supabase/server";

export async function requireAdminApi() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    const missingNames = getMissingSupabaseServerEnvNames();

    return {
      ok: false,
      response: NextResponse.json(
        {
          error: `Supabase is not configured. Missing: ${missingNames.join(
            ", "
          )}. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.`
        },
        { status: 500 }
      )
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
    userId: user.id
  } as const;
}
