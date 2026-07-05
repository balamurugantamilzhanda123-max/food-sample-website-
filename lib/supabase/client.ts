"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export const supabaseBrowserEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
};

export function getMissingSupabaseBrowserEnvNames() {
  return [
    ["NEXT_PUBLIC_SUPABASE_URL", supabaseBrowserEnv.url],
    ["NEXT_PUBLIC_SUPABASE_ANON_KEY", supabaseBrowserEnv.anonKey]
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);
}

export function hasSupabaseBrowserEnv() {
  return getMissingSupabaseBrowserEnvNames().length === 0;
}

export function getSupabaseBrowserConfigError() {
  const missingNames = getMissingSupabaseBrowserEnvNames();

  if (missingNames.length === 0) {
    return null;
  }

  return `Supabase is not configured. Missing: ${missingNames.join(
    ", "
  )}. Create .env.local in the project root and set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. Do not use VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in this Next.js app.`;
}

export function createSupabaseBrowserClient() {
  if (!hasSupabaseBrowserEnv()) {
    return null;
  }

  return createBrowserClient<Database>(
    supabaseBrowserEnv.url!,
    supabaseBrowserEnv.anonKey!
  );
}
