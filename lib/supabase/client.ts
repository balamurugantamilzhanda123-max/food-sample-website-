"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database";

export const supabaseBrowserEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim(),
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
};

export function hasSupabaseBrowserEnv() {
  return Boolean(supabaseBrowserEnv.url && supabaseBrowserEnv.anonKey);
}

export function getSupabaseBrowserConfigError() {
  if (hasSupabaseBrowserEnv()) {
    return null;
  }

  return "Supabase is not configured. This is a Next.js app, so set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local or Vercel. VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are only for Vite apps.";
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
