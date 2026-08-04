"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

const messages = [
  { time: "9:00 AM", text: "Nirav, naya din. Aaj ek clear intention choose karo — baaki follow karega.", done: true },
  { time: "11:00 AM", text: "Nirav, financial stress normal hai. Aaj ₹50 side me rakh.", done: true },
  { time: "1:00 PM", text: "Nirav, lunch time. Body ignore mat kar — 15 min break le.", done: false },
  { time: "3:00 PM", text: "Nirav, thakaan aayi to theek. Paani pi, 2 min stretch.", done: false },
  { time: "5:00 PM", text: "Nirav, aaj ka chhota win likh. Tu progress pe hai.", done: false },
  { time: "9:00 PM", text: "Nirav, din wrap. Proud feel kar. Phone side, rest.", done: false },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const link = "https://humsafar.app/r/nirav";

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-sm text-muted mb-1">Aaj ka din</p>
          <h1 className="font-display text-3xl font-semibold">
            Nirav, tu saath hai
          </h1>
          <p className="text-sm text-ink-soft mt-1">12 din streak · Mood improving</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { l: "Messages read", v: "2/6" },
            { l: "Streak", v: "12 days" },
            { l: "This week actions", v: "9" },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-2xl p-4">
              <p className="text-xs text-muted">{s.l}</p>
              <p className="font-display text-2xl font-semibold mt-1">{s.v}</p>
            </div>
          ))}
        </div>

        <h2 className="font-semibold mb-3">Aaj ke messages</h2>
        <div className="space-y-3 mb-8">
          {messages.map((m) => (
            <div
              key={m.time}
              className={`rounded-2xl p-4 border ${
                m.done ? "bg-bg-soft border-line opacity-70" : "soft-card border-accent/25"
              }`}
            >
              <p className="text-xs font-semibold text-accent mb-1">{m.time}</p>
              <p className="text-sm leading-relaxed text-ink">{m.text}</p>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-2">Mood abhi?</p>
          <div className="flex gap-2">
            {["😔", "😐", "🙂", "😊", "💪"].map((e) => (
              <button
                key={e}
                type="button"
                className="flex-1 text-2xl py-3 rounded-xl bg-bg-soft hover:bg-accent-soft transition-colors"
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div className="soft-card rounded-2xl p-5">
          <p className="font-semibold text-sm mb-1">Dost ko bhejo — dono ko 1 mahina free</p>
          <p className="text-xs text-muted mb-3">Real help share karna = growth</p>
          <div className="flex gap-2">
            <code className="flex-1 text-xs bg-bg-soft rounded-lg px-3 py-2.5 truncate">{link}</code>
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

        <Link href="/" className="block text-center text-sm text-muted mt-8 hover:text-ink">
          ← Home
        </Link>
      </div>
    </div>
  );
}
