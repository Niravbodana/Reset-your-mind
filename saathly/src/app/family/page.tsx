"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { uid } from "@/lib/storage";
import type { LifeArea } from "@/lib/types";

import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function FamilyPage() {
  const { state, addFamilyMember, trackEvent } = useApp();
  const { ready } = useRequireAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.family.length >= 4 || !consent) return;
    addFamilyMember({
      id: uid("fam"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      areas: (state.user?.areas || ["mind"]) as LifeArea[],
    });
    trackEvent("family_add", email);
    setName("");
    setEmail("");
    setConsent(false);
  };

  if (!ready) {
    return <div className="pt-28 text-center text-muted">Loading…</div>;
  }

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Parivaar</h1>
        <p className="text-sm text-ink-soft mb-4">
          Preview: save up to four family seat emails for the Parivaar plan. Separate profiles and
          messaging ship at launch.
        </p>
        <p className="text-xs text-muted mb-8">
          Only add people who agreed to share their email with RIZN for waitlist / launch invites.
        </p>

        <form onSubmit={add} className="soft-card rounded-2xl p-5 space-y-3 mb-6">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Member name"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Member email"
            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3"
          />
          <label className="flex gap-2 items-start text-xs text-ink-soft">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5"
              required
            />
            I confirm this person agreed to be added and to receive RIZN launch communication.
          </label>
          <button
            type="submit"
            className="btn-primary w-full py-3 rounded-xl text-sm disabled:opacity-50"
            disabled={state.family.length >= 4 || !consent}
          >
            Add member ({state.family.length}/4)
          </button>
        </form>

        <div className="space-y-3">
          {state.family.map((m) => (
            <div key={m.id} className="soft-card rounded-xl p-4 flex justify-between">
              <div>
                <p className="font-semibold">{m.name}</p>
                <p className="text-xs text-muted">{m.email}</p>
              </div>
              <span className="text-xs text-laser-2">seat (preview)</span>
            </div>
          ))}
          {!state.family.length && <p className="text-sm text-muted">Abhi koi member nahi.</p>}
        </div>

        <Link href="/dashboard" className="block text-center text-sm text-muted mt-8 hover:text-white">
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
