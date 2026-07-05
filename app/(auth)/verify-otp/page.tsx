"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function VerifyOtpPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [redirectTo, setRedirectTo] = useState("/profile");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEmail(params.get("email") ?? "");
    setRedirectTo(params.get("redirect") ?? "/profile");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setStatus("Demo mode: OTP accepted. Redirecting to protected preview...");
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 800);
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email"
    });

    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    window.location.href = redirectTo;
  }

  return (
    <section className="w-full max-w-md rounded-lg border border-brand-border bg-white p-6 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-brand-primary">
        <KeyRound className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-black text-brand-text">
        Verify Email OTP
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Enter the one-time password sent to your email. After verification, you
        will return to your previous page or profile.
      </p>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="OTP code"
          inputMode="numeric"
          placeholder="123456"
          value={token}
          onChange={(event) => setToken(event.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify and Continue"}
        </Button>
      </form>
      {status ? (
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-brand-primary">
          {status}
        </p>
      ) : null}
      <p className="mt-5 text-sm text-slate-600">
        Need a new OTP?{" "}
        <Link href="/login" className="font-black text-brand-primary">
          Send again
        </Link>
      </p>
    </section>
  );
}
