"use client";

import { useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

const programs = [
  { id: "money21", title: "Money Reset 21", days: 21, desc: "EMI panic → daily micro-saving + calm money mind." },
  { id: "heart21", title: "Heart Heal 21", days: 21, desc: "Soft healing pulses, no toxic move-on pressure." },
  { id: "burnout14", title: "Anti-Burnout 14", days: 14, desc: "Breaks, boundaries, sleep shutdown protocol." },
  { id: "body7", title: "Body Online 7", days: 7, desc: "Food, water, walk — guilt-free health nudges." },
];

export default function ProgramsPage() {
  const { trackEvent, state } = useApp();
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  const notify = (id: string) => {
    trackEvent("program_interest", id);
    setJoined((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Programs</h1>
        <p className="text-ink-soft text-sm mb-8">
          Guided 7–21 day journeys ship with the mobile app. Save your interest now — we will notify
          you at launch.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {programs.map((p) => (
            <div key={p.id} className="soft-card rounded-2xl p-6">
              <p className="text-xs text-laser-2 font-bold mb-2">{p.days} DAYS · PLANNED</p>
              <h2 className="font-display text-xl font-bold mb-2">{p.title}</h2>
              <p className="text-sm text-ink-soft mb-4">{p.desc}</p>
              {joined[p.id] ? (
                <p className="text-xs text-success font-semibold">Noted — we will email you at launch.</p>
              ) : (
                <button
                  type="button"
                  className="btn-primary px-4 py-2 rounded-xl text-sm disabled:opacity-50"
                  onClick={() => notify(p.id)}
                  disabled={!state.user}
                >
                  {state.user ? "Notify me at launch" : "Join waitlist first"}
                </button>
              )}
            </div>
          ))}
        </div>
        {!state.user && (
          <Link href="/signup" className="btn-secondary block text-center mt-6 py-3 rounded-xl text-sm">
            Join waitlist
          </Link>
        )}
        <Link href="/dashboard" className="block text-center text-sm text-muted mt-10">
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
