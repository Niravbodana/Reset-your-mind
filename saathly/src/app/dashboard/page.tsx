"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Check, LogOut } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { isTrialActive } from "@/lib/plans";
import { uid } from "@/lib/storage";

const EMOJIS = [
  { e: "😔", s: 1 },
  { e: "😐", s: 2 },
  { e: "🙂", s: 3 },
  { e: "😊", s: 4 },
  { e: "⚡", s: 5 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { ready, state, markPulse, checkinMood, patchUser, logout, activatePaid } = useApp();
  const [copied, setCopied] = useState(false);
  const user = state.user;

  useEffect(() => {
    if (ready && !user) router.replace("/signup");
  }, [ready, user, router]);

  const today = new Date().toISOString().slice(0, 10);
  const pulses = useMemo(() => state.pulses.filter((p) => p.date === today), [state.pulses, today]);
  const readCount = pulses.filter((p) => p.read).length;
  const trialOk = user ? isTrialActive(user.trialEndsAt) || user.subStatus === "active" : false;

  if (!ready || !user) {
    return <div className="pt-28 text-center text-muted">Loading dashboard…</div>;
  }

  const refLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/signup?ref=${user.referralCode}`
      : `https://rizn.app/signup?ref=${user.referralCode}`;

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-laser-2 mb-1">
              {user.subStatus === "active" ? "ACTIVE" : trialOk ? "TRIAL" : "TRIAL ENDED"}
            </p>
            <h1 className="font-display text-3xl font-bold">{user.name}, rise mode on</h1>
            <p className="text-sm text-ink-soft mt-1">
              {user.streak} day streak · best {user.bestStreak} · {user.language}
            </p>
          </div>
          <button type="button" onClick={logout} className="btn-secondary p-2.5 rounded-xl" aria-label="Logout">
            <LogOut size={16} />
          </button>
        </div>

        {!trialOk && user.subStatus !== "active" && (
          <div className="soft-card border border-laser/40 rounded-2xl p-5 mb-6">
            <p className="font-semibold mb-2">Trial khatam — rise continue?</p>
            <p className="text-sm text-ink-soft mb-4">Demo me 1-click activate. Production me Razorpay (Phase M).</p>
            <button type="button" onClick={activatePaid} className="btn-primary px-5 py-2.5 rounded-xl text-sm">
              Activate {user.plan} (demo pay)
            </button>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { l: "Pulses read", v: `${readCount}/${pulses.length || 6}` },
            { l: "Streak", v: String(user.streak) },
            { l: "Actions done", v: String(pulses.filter((p) => p.actionDone).length) },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-2xl p-4">
              <p className="text-xs text-muted">{s.l}</p>
              <p className="font-display text-2xl font-bold mt-1 laser-text">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/family" className="btn-secondary px-4 py-2 rounded-xl text-xs">Family</Link>
          <Link href="/programs" className="btn-secondary px-4 py-2 rounded-xl text-xs">21-day programs</Link>
          <Link href="/billing" className="btn-secondary px-4 py-2 rounded-xl text-xs">Billing</Link>
          <button
            type="button"
            onClick={() => patchUser({ softMode: !user.softMode })}
            className="btn-secondary px-4 py-2 rounded-xl text-xs"
          >
            Soft mode: {user.softMode ? "ON" : "OFF"}
          </button>
        </div>

        <h2 className="font-semibold mb-3">Today&apos;s pulses</h2>
        <div className="space-y-3 mb-8">
          {pulses.map((m) => (
            <div key={m.id} className={`rounded-2xl p-4 border ${m.read ? "border-white/5 bg-white/[0.02] opacity-70" : "soft-card border-laser/30"}`}>
              <div className="flex justify-between gap-2 mb-1">
                <p className="text-xs font-bold text-laser">{m.timeLabel}</p>
                <p className="text-[10px] uppercase text-muted">{m.area}</p>
              </div>
              <p className="text-sm leading-relaxed mb-3">{m.text}</p>
              <p className="text-xs text-laser-2 mb-3">Action: {m.microAction}</p>
              <div className="flex gap-2">
                {!m.read && (
                  <button type="button" onClick={() => markPulse(m.id, { read: true })} className="btn-secondary px-3 py-1.5 rounded-lg text-xs">
                    Mark read
                  </button>
                )}
                {!m.actionDone && (
                  <button type="button" onClick={() => markPulse(m.id, { read: true, actionDone: true })} className="btn-primary px-3 py-1.5 rounded-lg text-xs">
                    Action done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-2">Mood now?</p>
          <div className="flex gap-2">
            {EMOJIS.map((item) => (
              <button
                key={item.e}
                type="button"
                onClick={() =>
                  checkinMood({ id: uid("mood"), score: item.s, emoji: item.e, at: new Date().toISOString() })
                }
                className="flex-1 text-2xl py-3 rounded-xl bg-white/5 hover:bg-accent-soft transition-colors"
              >
                {item.e}
              </button>
            ))}
          </div>
          {state.moods[0] && (
            <p className="text-xs text-muted mt-3">Last: {state.moods[0].emoji} · score {state.moods[0].score}</p>
          )}
        </div>

        <div className="soft-card rounded-2xl p-5">
          <p className="font-semibold text-sm mb-1">Referral — both get 1 month free (Phase P)</p>
          <div className="flex gap-2 mt-3">
            <code className="flex-1 text-xs bg-black/50 rounded-lg px-3 py-2.5 truncate border border-white/10">{refLink}</code>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(refLink);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
              className="btn-primary px-3 rounded-lg"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
