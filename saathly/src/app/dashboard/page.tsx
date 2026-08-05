"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

const messages = [
  { time: "9:00", text: "Nirav, boot sequence. Aaj ek clear intention — rise starts now.", done: true },
  { time: "11:00", text: "Nirav, money noise? ₹50 side. Future signal green.", done: true },
  { time: "13:00", text: "Nirav, body battery check. Lunch + water. Recharge.", done: false },
  { time: "15:00", text: "Nirav, dip shield on. 2 min stretch. Stay sharp.", done: false },
  { time: "17:00", text: "Nirav, chhota win likh. Progress compound hota hai.", done: false },
  { time: "21:00", text: "Nirav, shutdown calm. Proud. Phone side. Rest.", done: false },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const link = "https://rizn.app/r/nirav";

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm text-laser-2 mb-1">TODAY</p>
          <h1 className="font-display text-3xl font-bold">Nirav, rise mode on</h1>
          <p className="text-sm text-ink-soft mt-1">12 day streak · mood trending up</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { l: "Pulses read", v: "2/6" },
            { l: "Streak", v: "12" },
            { l: "Week actions", v: "9" },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-2xl p-4">
              <p className="text-xs text-muted">{s.l}</p>
              <p className="font-display text-2xl font-bold mt-1 laser-text">{s.v}</p>
            </div>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Today&apos;s pulses</h2>
        <div className="space-y-3 mb-8">
          {messages.map((m) => (
            <div
              key={m.time}
              className={`rounded-2xl p-4 border ${
                m.done ? "border-white/5 bg-white/[0.02] opacity-60" : "soft-card border-laser/30"
              }`}
            >
              <p className="text-xs font-bold text-laser mb-1">{m.time}</p>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-2">Mood now?</p>
          <div className="flex gap-2">
            {["😔", "😐", "🙂", "😊", "⚡"].map((e) => (
              <button
                key={e}
                type="button"
                className="flex-1 text-2xl py-3 rounded-xl bg-white/5 hover:bg-accent-soft transition-colors"
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="soft-card rounded-2xl p-5">
          <p className="font-semibold text-sm mb-1">Invite — both get 1 month free</p>
          <div className="flex gap-2 mt-3">
            <code className="flex-1 text-xs bg-black/50 rounded-lg px-3 py-2.5 truncate border border-white/10">
              {link}
            </code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(link);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="btn-primary px-3 rounded-lg"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        <Link href="/" className="block text-center text-sm text-muted mt-8 hover:text-white">
          ← Home
        </Link>
      </div>
    </div>
  );
}
