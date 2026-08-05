"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { uid } from "@/lib/storage";
import type { LifeArea } from "@/lib/types";

export default function FamilyPage() {
  const { state, addFamilyMember, trackEvent } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (state.family.length >= 4) return;
    addFamilyMember({
      id: uid("fam"),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      areas: (state.user?.areas || ["mind"]) as LifeArea[],
    });
    trackEvent("family_add", email);
    setName("");
    setEmail("");
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Parivaar</h1>
        <p className="text-sm text-ink-soft mb-8">Add up to four family members on the Parivaar plan (at launch).</p>

        <form onSubmit={add} className="soft-card rounded-2xl p-5 space-y-3 mb-6">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Member name" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Member email" className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3" />
          <button type="submit" className="btn-primary w-full py-3 rounded-xl text-sm" disabled={state.family.length >= 4}>
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
              <span className="text-xs text-laser-2">seat</span>
            </div>
          ))}
          {!state.family.length && <p className="text-sm text-muted">Abhi koi member nahi.</p>}
        </div>

        <Link href="/dashboard" className="block text-center text-sm text-muted mt-8 hover:text-white">← Dashboard</Link>
      </div>
    </div>
  );
}
