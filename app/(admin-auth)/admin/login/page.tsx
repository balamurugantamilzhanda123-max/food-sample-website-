"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import {
  createSupabaseBrowserClient,
  getSupabaseBrowserConfigError
} from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "supabase_config") {
      setStatus(getSupabaseBrowserConfigError() ?? "");
    }

    if (error === "unauthorized") {
      setStatus("This account does not have the admin role.");
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const supabase = createSupabaseBrowserClient();
    const configError = getSupabaseBrowserConfigError();

    if (!supabase || configError) {
      setStatus(configError ?? "Supabase is not configured.");
      setLoading(false);
      return;
    }

    const safeEmail = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithOtp({
      email: safeEmail,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/admin/dashboard`
      }
    });

    setLoading(false);
    setStatus(error ? error.message : "Admin OTP sent. Verify from your email.");
  }

  return (
    <main className="grid min-h-screen place-items-center bg-brand-secondary px-4 py-10">
      <section className="w-full max-w-md rounded-lg bg-white p-6 shadow-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
          <ShieldCheck className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-3xl font-black text-brand-text">
          Admin Login
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Admin access is restricted to users with the admin role. Production
          access is enforced by Supabase role checks and RLS.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Admin email"
            type="email"
            placeholder="admin@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending OTP..." : "Send Admin OTP"}
          </Button>
        </form>
        {status ? (
          <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-brand-primary">
            {status}
          </p>
        ) : null}
        <div className="mt-5 flex justify-between text-sm">
          <Link href="/" className="font-black text-brand-primary">
            Customer site
          </Link>
          <Link href="/admin/dashboard" className="font-black text-brand-primary">
            Preview dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
