import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

type CookieToSet = {
  name: string;
  value: string;
  options?: Record<string, unknown>;
};

export function getMissingSupabaseServerEnvNames() {
  return [
    ["NEXT_PUBLIC_SUPABASE_URL", process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()],
    [
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
    ]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

function isValidSupabaseUrl(value?: string) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

function isLikelySupabaseAnonKey(value?: string) {
  return Boolean(value && value.startsWith("eyJ") && value.length > 100);
}

export function getInvalidSupabaseServerEnvNames() {
  return [
    !isValidSupabaseUrl(process.env.NEXT_PUBLIC_SUPABASE_URL?.trim())
      ? "NEXT_PUBLIC_SUPABASE_URL"
      : null,
    !isLikelySupabaseAnonKey(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim())
      ? "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      : null
  ].filter(Boolean);
}

export function hasSupabaseServerEnv() {
  return (
    getMissingSupabaseServerEnvNames().length === 0 &&
    getInvalidSupabaseServerEnvNames().length === 0
  );
}

export async function createSupabaseServerClient() {
  if (!hasSupabaseServerEnv()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options as never);
          });
        }
      }
    }
  );
}
