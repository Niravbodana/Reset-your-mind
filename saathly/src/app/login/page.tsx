"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { loadState } from "@/lib/storage";

export default function LoginPage() {
  const router = useRouter();
  const { state, trackEvent } = useApp();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    const s = loadState();
    if (s.user && s.user.email === normalized) {
      trackEvent("login", email);
      router.push("/dashboard");
      return;
    }
    if (state.user && state.user.email === normalized) {
      router.push("/dashboard");
      return;
    }
    setError(
      "Is email se koi preview account is browser / device pe nahi mila. Pehle waitlist join karo — cloud login baad me aayega."
    );
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-md mx-auto soft-card rounded-2xl p-8">
        <h1 className="font-display text-3xl font-bold mb-2">Sign in</h1>
        <p className="text-sm text-ink-soft mb-6">
          Preview accounts are saved on <strong className="text-white">this browser only</strong>. Use
          the same email you used at signup on the same phone or computer.
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
          <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm">
            Continue
          </button>
        </form>
        <p className="text-center text-xs text-muted mt-4">
          Naye ho? <Link href="/signup" className="text-gold-light">Join early access</Link>
        </p>
      </div>
    </div>
  );
}
