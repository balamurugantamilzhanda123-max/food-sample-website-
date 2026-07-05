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

export function hasSupabaseBrowserEnv() {
  return (
    getMissingSupabaseBrowserEnvNames().length === 0 &&
    isValidSupabaseUrl(supabaseBrowserEnv.url) &&
    isLikelySupabaseAnonKey(supabaseBrowserEnv.anonKey)
  );
}

export function getSupabaseBrowserConfigError() {
  const missingNames = getMissingSupabaseBrowserEnvNames();

  if (missingNames.length === 0) {
    const invalidNames = [
      !isValidSupabaseUrl(supabaseBrowserEnv.url)
        ? "NEXT_PUBLIC_SUPABASE_URL"
        : null,
      !isLikelySupabaseAnonKey(supabaseBrowserEnv.anonKey)
        ? "NEXT_PUBLIC_SUPABASE_ANON_KEY"
        : null
    ].filter(Boolean);

    if (invalidNames.length > 0) {
      return `Supabase is not configured correctly. Invalid: ${invalidNames.join(
        ", "
      )}. NEXT_PUBLIC_SUPABASE_URL must be your Supabase Project URL, and NEXT_PUBLIC_SUPABASE_ANON_KEY must be the long anon public API key from Supabase Project Settings > API. Do not use VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in this Next.js app.`;
    }

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
