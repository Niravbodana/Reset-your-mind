"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { peekState } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const { restoreSession, trackEvent } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    const stored = peekState();

    if (stored.user?.email === normalized && restoreSession()) {
      trackEvent("login", email);
      router.push("/dashboard");
      return;
    }

    setError(
      "Is email se account is device pe nahi mila. Pehle signup karo — same email se wapas aana."
    );
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-md mx-auto premium-card rounded-2xl p-8">
        <h1 className="font-display text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-ink-soft mb-6">
          Apna account <strong className="text-white">isi browser</strong> pe saved hai. Same email
          daalo — dashboard turant khul jayega.
        </p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-gold"
          />
          {error && <p className="text-sm text-gold-light">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm font-semibold">
            Continue
          </button>
        </form>
        <p className="text-center text-xs text-muted mt-4">
          Naye ho? <Link href="/signup" className="text-gold-light">Start free</Link>
        </p>
      </div>
    </div>
  );
}
