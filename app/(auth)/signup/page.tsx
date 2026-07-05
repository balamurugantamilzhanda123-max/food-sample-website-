"use client";

import Link from "next/link";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const supabase = createSupabaseBrowserClient();

    if (!supabase) {
      setStatus(
        "Demo mode: Supabase keys are missing. Signup form is ready for OTP auth."
      );
      setLoading(false);
      return;
    }

    const origin = window.location.origin;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        data: {
          full_name: fullName,
          mobile
        },
        emailRedirectTo: `${origin}/verify-otp?email=${encodeURIComponent(
          email
        )}&redirect=/profile`
      }
    });

    setLoading(false);
    setStatus(
      error
        ? error.message
        : "Account created. Check your email for the OTP to finish verification."
    );
  }

  return (
    <section className="w-full max-w-lg rounded-lg border border-brand-border bg-white p-6 shadow-soft">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
        <UserPlus className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-5 text-3xl font-black text-brand-text">
        Create Account
      </h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Create a customer profile with name, email, and mobile number. Email OTP
        verification completes the signup.
      </p>
      <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          placeholder="Your full name"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          required
        />
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Input
          label="Mobile number"
          type="tel"
          placeholder="+91 98765 43210"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending OTP..." : "Create Account and Send OTP"}
        </Button>
      </form>
      {status ? (
        <p className="mt-4 rounded-lg bg-blue-50 p-3 text-sm font-semibold text-brand-primary">
          {status}
        </p>
      ) : null}
      <p className="mt-5 text-sm text-slate-600">
        Already have an account?{" "}
        <Link href="/login" className="font-black text-brand-primary">
          Login
        </Link>
      </p>
    </section>
  );
}
