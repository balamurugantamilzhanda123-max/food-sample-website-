"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [redirectTo, setRedirectTo] = useState("/profile");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setRedirectTo(params.get("redirect") ?? "/profile");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setStatus(
        "Demo mode: Supabase keys are missing. Continue to OTP page to preview the flow."
      );
      setLoading(false);
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/verify-otp?email=${encodeURIComponent(
          email
        )}&redirect=${encodeURIComponent(redirectTo)}`
      }
    });

    setLoading(false);
    setStatus(
      error ? error.message : "OTP sent. Check your email and enter the code."
    );
  }

  return (
    <section className="w-full max-w-md rounded-lg border border-brand-border bg-white p-6 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
        <Mail className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-black text-brand-text">Login</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Enter your email to receive a secure one-time password. Login is required
        for cart, checkout, orders, returns, refunds, and profile actions.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending OTP..." : "Send Email OTP"}
        </Button>
      </form>
      {status ? (
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-brand-primary">
          {status}
        </p>
      ) : null}
      <div className="mt-5 flex flex-col gap-2 text-sm text-slate-600">
        <Link href="/verify-otp" className="font-black text-brand-primary">
          I already have an OTP
        </Link>
        <span>
          No account?{" "}
          <Link href="/signup" className="font-black text-brand-primary">
            Create Account
          </Link>
        </span>
      </div>
    </section>
  );
}
