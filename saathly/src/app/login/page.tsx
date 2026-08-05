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
    const s = loadState();
    if (s.user && s.user.email === email.trim().toLowerCase()) {
      trackEvent("login", email);
      router.push("/dashboard");
      return;
    }
    if (state.user && state.user.email === email.trim().toLowerCase()) {
      router.push("/dashboard");
      return;
    }
    setError("Is browser me ye email se signup nahi mila. Pehle signup karo.");
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-md mx-auto soft-card rounded-3xl p-8">
        <h1 className="font-display text-3xl font-bold mb-2">Login</h1>
        <p className="text-sm text-ink-soft mb-6">Demo auth = same browser localStorage (Phase F).</p>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 focus:outline-none focus:border-laser"
          />
          {error && <p className="text-sm text-laser">{error}</p>}
          <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm">
            Continue
          </button>
        </form>
        <p className="text-center text-xs text-muted mt-4">
          New? <Link href="/signup" className="text-laser-2">Signup</Link>
        </p>
      </div>
    </div>
  );
}
