"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Mail, Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { peekState } from "@/lib/storage";
import { AuthShell } from "@/components/auth/AuthShell";
import { AuthButton, AuthField } from "@/components/auth/AuthField";

export default function LoginPage() {
  const router = useRouter();
  const { restoreSession, trackEvent } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 400));

    const normalized = email.trim().toLowerCase();
    const stored = peekState();

    if (stored.user?.email === normalized && restoreSession()) {
      trackEvent("login", email);
      router.push("/dashboard");
      return;
    }

    setLoading(false);
    setError(
      "Is email se account is device pe nahi mila. Pehle signup karo — same email se wapas aana."
    );
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Apna account isi browser pe saved hai. Same email daalo — dashboard turant khul jayega."
      footer={
        <p className="text-center text-xs text-white/45">
          Naye ho?{" "}
          <Link href="/signup" className="font-medium text-gold hover:text-gold-light">
            Create account — free trial
          </Link>
        </p>
      }
    >
      <form onSubmit={submit} className="space-y-5">
        <AuthField
          label="Email address"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="you@email.com"
          icon={<Mail size={18} />}
          error={error || undefined}
          autoComplete="email"
          autoFocus
        />

        <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <Shield size={18} className="mt-0.5 shrink-0 text-gold/80" />
          <p className="text-xs leading-relaxed text-white/55">
            Your data stays on this device. Sign in works only with the email you used during signup
            on this browser.
          </p>
        </div>

        <AuthButton loading={loading}>
          Continue to dashboard
          <ArrowRight size={16} />
        </AuthButton>
      </form>
    </AuthShell>
  );
}
