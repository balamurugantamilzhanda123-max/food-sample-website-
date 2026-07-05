import { NextResponse } from "next/server";
import {
  createSupabaseServerClient,
  getInvalidSupabaseServerEnvNames,
  getMissingSupabaseServerEnvNames
} from "@/lib/supabase/server";

export async function requireAdminApi() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    const missingNames = getMissingSupabaseServerEnvNames();
    const invalidNames = getInvalidSupabaseServerEnvNames();
    const issue = missingNames.length > 0 ? "Missing" : "Invalid";
    const names = missingNames.length > 0 ? missingNames : invalidNames;

    return {
      ok: false,
      response: NextResponse.json(
        {
          error: `Supabase is not configured correctly. ${issue}: ${names.join(
            ", "
          )}. Set NEXT_PUBLIC_SUPABASE_URL to your Project URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your long anon public key.`
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
