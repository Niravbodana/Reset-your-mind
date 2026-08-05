"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Check, Flame, LogOut, Settings } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatCustomerName, greetForHour } from "@/lib/message-format";
import { FirstPulseModal } from "@/components/FirstPulseModal";

const EMOJIS = [
  { e: "😔", s: 1 },
  { e: "😐", s: 2 },
  { e: "🙂", s: 3 },
  { e: "😊", s: 4 },
  { e: "⚡", s: 5 },
];

export default function DashboardPage() {
  const router = useRouter();
  const { ready, state, markPulse, checkinMood, logout, refreshPulses } = useApp();
  const user = state.user;
  const hour = new Date().getHours();

  useEffect(() => {
    if (ready && !user) router.replace("/signup");
  }, [ready, user, router]);

  const today = new Date().toISOString().slice(0, 10);
  const pulses = useMemo(() => {
    const todayList = state.pulses.filter((p) => p.date === today);
    return [...todayList].sort((a, b) => {
      const emiA = a.templateId?.startsWith("emi-") ? 0 : 1;
      const emiB = b.templateId?.startsWith("emi-") ? 0 : 1;
      if (emiA !== emiB) return emiA - emiB;
      return a.hour - b.hour || a.timeLabel.localeCompare(b.timeLabel);
    });
  }, [state.pulses, today]);
  const readCount = pulses.filter((p) => p.read).length;
  const doneCount = pulses.filter((p) => p.actionDone).length;

  if (!ready || !user) {
    return <div className="page-top text-center text-muted">Loading…</div>;
  }

  const displayName = formatCustomerName(user.name, user.language);
  const greeting = greetForHour(hour, user.language, user.name);

  return (
    <div className="page-top pb-16 min-h-screen">
      {pulses[0] && (
        <FirstPulseModal
          name={user.name}
          message={pulses[0].text}
          microAction={pulses[0].microAction}
          pulseCount={pulses.length}
          language={user.language}
        />
      )}

      {/* Hero banner with photo */}
      <div className="relative h-48 md:h-56 overflow-hidden border-b border-white/10">
        <Image
          src="/images/person-wellness.jpg"
          alt=""
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/50 to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-5 sm:pb-6 max-w-3xl mx-auto w-full">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gold-light font-medium mb-1">{greeting}</p>
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white truncate">{displayName}</h1>
              <p className="text-xs text-ink-soft mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex items-center gap-1">
                  <Flame size={14} className="text-gold-light" />
                  {user.streak} din ki habit
                </span>
                <span>·</span>
                <span>{doneCount} actions done aaj</span>
              </p>
            </div>
            <div className="flex gap-2 shrink-0 self-end sm:self-auto">
              <Link href="/settings" className="btn-secondary p-2.5 rounded-xl min-h-11 min-w-11 flex items-center justify-center" aria-label="Settings">
                <Settings size={18} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="btn-secondary p-2.5 rounded-xl min-h-11 min-w-11 flex items-center justify-center"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 -mt-2">
        <div className="soft-card rounded-2xl p-4 mb-6 border border-gold/15 text-center">
          <p className="text-sm text-white font-medium">
            Aaj ke {pulses.length} messages — har ek tumhare liye alag likha gaya
          </p>
          <p className="text-xs text-ink-soft mt-1">
            RIZN ki wajah se chhote steps roz — life better feel hoti hai. Yehi tumhari daily habit hai.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8">
          {[
            { l: "Padhe", v: `${readCount}/${pulses.length}` },
            { l: "Streak", v: String(user.streak) },
            { l: "Actions", v: String(doneCount) },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-xl p-3 text-center">
              <p className="text-[10px] text-muted uppercase">{s.l}</p>
              <p className="font-display text-xl font-bold text-white mt-0.5">{s.v}</p>
            </div>
          ))}
        </div>

        <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
          <Bell size={16} className="text-gold-light" />
          Aaj ke alerts
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <p className="text-xs text-muted">Latest messages — naam ke saath, value ke saath</p>
          <button
            type="button"
            onClick={refreshPulses}
            className="text-xs font-medium text-gold-light hover:text-gold shrink-0 self-start sm:self-auto min-h-[44px] sm:min-h-0 flex items-center"
          >
            Naye messages load karo
          </button>
        </div>

        {pulses.length === 0 && (
          <div className="soft-card rounded-2xl p-6 mb-6 text-center">
            <p className="text-sm text-white mb-2">Aaj ke messages abhi load nahi hue</p>
            <button type="button" onClick={refreshPulses} className="btn-primary px-5 py-2 rounded-xl text-sm">
              Messages load karo
            </button>
          </div>
        )}

        <div className="space-y-3 mb-10">
          {pulses.map((m) => (
            <div
              key={m.id}
              className={`rounded-2xl overflow-hidden border transition-all ${
                m.read ? "border-white/5 opacity-80" : "border-gold/25 shadow-lg shadow-gold/5"
              }`}
            >
              <div className="bg-[#1a1a22] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-black text-[10px] font-bold">
                  R
                </div>
                <span className="text-xs font-semibold text-white">RIZN</span>
                <span className="text-[10px] text-muted ml-auto">{m.timeLabel}</span>
              </div>
              <div className="p-4 bg-black/40">
                <p className="text-[15px] leading-relaxed text-white/95 mb-3">{m.text}</p>
                <p className="text-xs text-gold-light mb-3">Aaj ka step: {m.microAction}</p>
                <div className="flex flex-wrap gap-2">
                  {!m.read && (
                    <button
                      type="button"
                      onClick={() => markPulse(m.id, { read: true })}
                      className="btn-secondary px-3 py-1.5 rounded-lg text-xs"
                    >
                      Padh liya
                    </button>
                  )}
                  {!m.actionDone && (
                    <button
                      type="button"
                      onClick={() => markPulse(m.id, { read: true, actionDone: true })}
                      className="btn-primary px-3 py-1.5 rounded-lg text-xs inline-flex items-center gap-1"
                    >
                      <Check size={14} /> Ho gaya
                    </button>
                  )}
                  {m.actionDone && (
                    <span className="text-xs text-success flex items-center gap-1 py-1.5">
                      <Check size={14} /> Aaj ka step done — proud!
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-2 text-white">Aaj mood kaisa hai?</p>
          <div className="grid grid-cols-5 gap-2">
            {EMOJIS.map((item) => (
              <button
                key={item.e}
                type="button"
                onClick={() =>
                  checkinMood({
                    id: `mood_${Date.now()}`,
                    score: item.s,
                    emoji: item.e,
                    at: new Date().toISOString(),
                  })
                }
                className="text-2xl py-3 rounded-xl bg-white/5 hover:bg-accent-soft transition-colors"
              >
                {item.e}
              </button>
            ))}
          </div>
          {state.moods[0] && (
            <p className="text-xs text-muted mt-3">Last: {state.moods[0].emoji} — thank you for checking in</p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center text-xs">
          <Link href="/emi-reminders" className="text-gold-light hover:underline">
            EMI Reminders
          </Link>
          <span className="text-muted">·</span>
          <Link href="/settings" className="text-muted hover:text-white">
            Schedule
          </Link>
          <span className="text-muted">·</span>
          <Link href="/billing" className="text-muted hover:text-white">
            Plan
          </Link>
        </div>
      </div>
    </div>
  );
}
