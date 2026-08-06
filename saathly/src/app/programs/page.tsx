"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";

const programs = [
  { id: "money21", title: "Money Reset 21", days: 21, desc: "EMI panic → daily micro-saving + calm money mind." },
  { id: "heart21", title: "Heart Heal 21", days: 21, desc: "Soft healing pulses, no toxic move-on pressure." },
  { id: "burnout14", title: "Anti-Burnout 14", days: 14, desc: "Breaks, boundaries, sleep shutdown protocol." },
  { id: "body7", title: "Body Online 7", days: 7, desc: "Food, water, walk — guilt-free health nudges." },
];

export default function ProgramsPage() {
  const { trackEvent, state } = useApp();
  const { ready } = useRequireAuth();
  const [joined, setJoined] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const notify = async (id: string) => {
    if (!state.user) return;
    setSaving(id);
    trackEvent("program_interest", id);
    await fetch("/api/interest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: state.user.email, programId: id }),
    }).catch(() => null);
    setJoined((prev) => ({ ...prev, [id]: true }));
    setSaving(null);
  };

  if (!ready) {
    return <div className="page-top text-center text-muted">Loading…</div>;
  }

  return (
    <div className="page-top pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Programs</h1>
        <p className="text-ink-soft text-sm mb-8">
          Daily web messages are live now. Guided 7–21 day program journeys launch with the mobile app — save your interest below.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {programs.map((p) => (
            <div key={p.id} className="soft-card rounded-2xl p-6">
              <p className="text-xs text-laser-2 font-bold mb-2">
                {p.days} DAYS · {joined[p.id] ? "INTEREST SAVED" : "WEB DAILY · APP SOON"}
              </p>
              <h2 className="font-display text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-sm text-ink-soft mb-4">{p.desc}</p>
              {joined[p.id] ? (
                <p className="text-xs text-success font-semibold">Saved — launch pe email aayega.</p>
              ) : (
                <button
                  type="button"
                  className="btn-primary px-4 py-2 rounded-xl text-sm disabled:opacity-50"
                  onClick={() => notify(p.id)}
                  disabled={saving === p.id}
                >
                  {saving === p.id ? "Saving…" : "Notify me at launch"}
                </button>
              )}
            </div>
          ))}
        </div>
        <Link href="/dashboard" className="block text-center text-sm text-muted mt-10">
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
