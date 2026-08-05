"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Copy, Check, LogOut, Smartphone } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { isTrialActive } from "@/lib/plans";
import { uid } from "@/lib/storage";
import { FirstPulseModal } from "@/components/FirstPulseModal";
import { PushNotifyPrompt } from "@/components/PushNotifyPrompt";

const EMOJIS = [
  { e: "😔", s: 1 },
  { e: "😐", s: 2 },
  { e: "🙂", s: 3 },
  { e: "😊", s: 4 },
  { e: "⚡", s: 5 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { ready, state, markPulse, checkinMood, patchUser, logout, clearAllData } = useApp();
  const [copied, setCopied] = useState(false);
  const user = state.user;

  useEffect(() => {
    if (ready && !user) router.replace("/signup");
  }, [ready, user, router]);

  const today = new Date().toISOString().slice(0, 10);
  const pulses = useMemo(() => state.pulses.filter((p) => p.date === today), [state.pulses, today]);
  const readCount = pulses.filter((p) => p.read).length;
  const trialOk = user ? isTrialActive(user.trialEndsAt) || user.subStatus === "active" : false;
  const expectedCount = user?.softMode ? 4 : 6;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleClearData = () => {
    const ok = window.confirm(
      "Delete all preview data on this device? Streak, messages, mood — sab wipe. Waitlist email on server stays. This cannot be undone."
    );
    if (ok) {
      clearAllData();
      router.push("/signup");
    }
  };

  if (!ready || !user) {
    return <div className="pt-28 text-center text-muted">Loading…</div>;
  }

  const refLink =
    typeof window !== "undefined"
      ? `${window.location.origin}/signup?ref=${user.referralCode}`
      : `https://rizn.app/signup?ref=${user.referralCode}`;

  return (
    <div className="pt-24 pb-16 px-4">
      {pulses[0] && (
        <FirstPulseModal
          name={user.name}
          message={pulses[0].text}
          microAction={pulses[0].microAction}
          pulseCount={expectedCount}
        />
      )}
      <div className="mx-auto max-w-3xl">
        <PushNotifyPrompt />
        <div className="soft-card border border-gold/20 rounded-2xl p-4 mb-6 flex gap-3 items-start">
          <Smartphone size={18} className="text-gold-light shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-white">Web preview (this device)</p>
            <p className="text-ink-soft mt-1">
              Aaj ke messages yahan padho. Automatic phone notifications app launch ke baad. Same
              email se{" "}
              <Link href="/login" className="text-gold-light underline">
                sign in
              </Link>{" "}
              sirf is browser pe kaam karta hai abhi.
            </p>
          </div>
        </div>

        <div className="flex items-start justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted mb-1">
              {user.subStatus === "active" ? "Paid (preview)" : trialOk ? "Free preview" : "Preview ended"}
            </p>
            <h1 className="font-display text-3xl font-bold">Hello, {user.name}</h1>
            <p className="text-sm text-ink-soft mt-1">
              {user.streak} day streak · best {user.bestStreak} · {user.language}
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={handleLogout} className="btn-secondary p-2.5 rounded-xl" aria-label="Sign out">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {!trialOk && user.subStatus !== "active" && (
          <div className="soft-card border border-gold/30 rounded-2xl p-5 mb-6">
            <p className="font-semibold mb-2">Preview period ended</p>
            <p className="text-sm text-ink-soft mb-4">
              Paid subscriptions are not live yet. You are on the waitlist — we will email you at{" "}
              {user.email} when billing opens.
            </p>
            <Link href="/pricing" className="btn-secondary inline-block px-5 py-2.5 rounded-xl text-sm">
              View planned pricing
            </Link>
          </div>
        )}

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          {[
            { l: "Read today", v: `${readCount}/${pulses.length || expectedCount}` },
            { l: "Streak", v: String(user.streak) },
            { l: "Actions done", v: String(pulses.filter((p) => p.actionDone).length) },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-2xl p-4">
              <p className="text-xs text-muted">{s.l}</p>
              <p className="font-display text-2xl font-bold mt-1 text-white">{s.v}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <Link href="/family" className="btn-secondary px-4 py-2 rounded-xl text-xs">
            Family
          </Link>
          <Link href="/programs" className="btn-secondary px-4 py-2 rounded-xl text-xs">
            Programs
          </Link>
          <Link href="/billing" className="btn-secondary px-4 py-2 rounded-xl text-xs">
            Billing
          </Link>
          <Link href="/settings" className="btn-secondary px-4 py-2 rounded-xl text-xs">
            Settings
          </Link>
        </div>
        <p className="text-[11px] text-muted mb-6">
          Interval & anchors: <Link href="/settings" className="text-gold-light underline">Settings</Link>
          {user.pulseIntervalMinutes ? ` · every ${user.pulseIntervalMinutes} min` : ""}
          {user.softMode ? " · soft mode" : ""}
        </p>

        <h2 className="font-semibold mb-3">Today&apos;s messages</h2>
        <p className="text-xs text-muted mb-4">
          Open dashboard to read — app launch pe yehi messages push notifications ban jayenge.
        </p>
        <div className="space-y-3 mb-8">
          {pulses.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl p-4 border ${m.read ? "border-white/5 bg-white/[0.02] opacity-75" : "soft-card border-gold/20"}`}
            >
              <div className="flex justify-between gap-2 mb-1">
                <p className="text-xs font-semibold text-gold-light">{m.timeLabel}</p>
                <p className="text-[10px] uppercase text-muted">{m.area}</p>
              </div>
              <p className="text-sm leading-relaxed mb-3">{m.text}</p>
              <p className="text-xs text-muted mb-3">Suggested action: {m.microAction}</p>
              <div className="flex gap-2">
                {!m.read && (
                  <button
                    type="button"
                    onClick={() => markPulse(m.id, { read: true })}
                    className="btn-secondary px-3 py-1.5 rounded-lg text-xs"
                  >
                    Mark read
                  </button>
                )}
                {!m.actionDone && (
                  <button
                    type="button"
                    onClick={() => markPulse(m.id, { read: true, actionDone: true })}
                    className="btn-primary px-3 py-1.5 rounded-lg text-xs"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-2">Aaj mood kaisa hai?</p>
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
            <p className="text-xs text-muted mt-3">Last check-in: {state.moods[0].emoji}</p>
          )}
        </div>

        <div className="soft-card rounded-2xl p-5">
          <p className="font-semibold text-sm mb-1">Invite someone</p>
          <p className="text-xs text-muted mb-3">Share your link — referral rewards when we launch billing.</p>
          <div className="flex gap-2">
            <code className="flex-1 text-xs bg-black/50 rounded-lg px-3 py-2.5 truncate border border-white/10">
              {refLink}
            </code>
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

        <button
          type="button"
          onClick={handleClearData}
          className="text-xs text-muted hover:text-gold-light mt-8 block mx-auto underline"
        >
          Delete all preview data on this device
        </button>
      </div>
    </div>
  );
}
