"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Check, Flame, LogOut, Settings } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { formatCustomerName, greetForHour } from "@/lib/message-format";
import { FirstPulseModal } from "@/components/FirstPulseModal";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { ReferralCard } from "@/components/ReferralCard";
import { ShareMessageCard } from "@/components/ShareMessageCard";
import { DashboardSkeleton } from "@/components/Skeleton";
import { NoSpamPromise } from "@/components/NoSpamPromise";
import { TodayBriefing } from "@/components/TodayBriefing";
import { SoftDayButton } from "@/components/SoftDayButton";
import { WeeklyWinsCard } from "@/components/WeeklyWinsCard";
import { PausePlanCard } from "@/components/PausePlanCard";
import { MorningOneCard } from "@/components/MorningOneCard";
import { TrialValueReport } from "@/components/TrialValueReport";
import { BuddyCheckin } from "@/components/BuddyCheckin";
import { StreakFreezeBadge } from "@/components/StreakFreezeBadge";
import { HabitsPanel } from "@/components/HabitsPanel";
import { WeeklyHealthScore } from "@/components/WeeklyHealthScore";
import { GoalNudgeCard } from "@/components/GoalNudgeCard";
import { useLocale } from "@/context/LocaleContext";

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
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  const hour = new Date().getHours();
  const isIN = region === "IN" && !preferEnglish;

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
    return <DashboardSkeleton />;
  }

  const displayName = formatCustomerName(user.name, user.language);
  const greeting = greetForHour(hour, user.language, user.name);

  return (
    <div className="page-top pb-20 min-h-screen">
      <OnboardingWizard />
      {pulses[0] && (
        <FirstPulseModal
          name={user.name}
          message={pulses[0].text}
          microAction={pulses[0].microAction}
          pulseCount={pulses.length}
          language={user.language}
        />
      )}

      <div className="relative min-h-[200px] sm:min-h-[220px] overflow-hidden border-b border-white/10">
        <Image
          src="/images/person-wellness.jpg"
          alt="Calm wellness background"
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-black/55 to-black/30" />
        <div className="relative z-10 px-4 pb-5 pt-4 max-w-3xl mx-auto w-full flex flex-col gap-4 min-h-[200px] justify-end">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gold-light font-medium mb-1">{greeting}</p>
              <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">
                {displayName}
              </h1>
              <p className="text-xs text-ink-soft mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="inline-flex items-center gap-1">
                  <Flame size={14} className="text-gold-light" />
                  {isIN ? `${user.streak} din ki habit` : `${user.streak}-day streak`}
                </span>
                <span>·</span>
                <span>
                  {isIN ? `${doneCount} actions done aaj` : `${doneCount} actions done today`}
                </span>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Link
                href="/settings"
                className="btn-secondary min-h-11 min-w-11 flex items-center justify-center rounded-xl"
                aria-label="Settings"
              >
                <Settings size={18} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                className="btn-secondary min-h-11 min-w-11 flex items-center justify-center rounded-xl"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 -mt-2">
        <TrialValueReport />
        <MorningOneCard />
        <TodayBriefing />
        <GoalNudgeCard />
        <HabitsPanel />
        <WeeklyHealthScore />
        <SoftDayButton />
        <StreakFreezeBadge />

        <div className="grid grid-cols-3 gap-2 mb-8">
          {[
            { l: isIN ? "Padhe" : "Read", v: `${readCount}/${pulses.length}` },
            { l: "Streak", v: String(user.streak) },
            { l: isIN ? "Actions" : "Wins", v: String(doneCount) },
          ].map((s) => (
            <div key={s.l} className="soft-card rounded-xl p-3 text-center">
              <p className="text-xs text-muted uppercase">{s.l}</p>
              <p className="font-display text-xl font-bold text-white mt-0.5">{s.v}</p>
            </div>
          ))}
        </div>

        <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
          <Bell size={16} className="text-gold-light" />
          {isIN ? "Aaj ke alerts" : "Today's alerts"}
        </h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
          <p className="text-xs text-muted">
            {isIN
              ? "Latest messages — naam ke saath, value ke saath"
              : "Latest messages — with your name, with value"}
          </p>
          <button
            type="button"
            onClick={refreshPulses}
            className="text-sm font-medium text-gold-light hover:text-gold shrink-0 self-start min-h-[44px] flex items-center"
          >
            {isIN ? "Naye messages load karo" : "Load fresh messages"}
          </button>
        </div>

        {pulses.length === 0 && (
          <div className="soft-card rounded-2xl p-6 mb-6 text-center border border-gold/20">
            <p className="font-display text-lg font-bold text-white mb-2">Aaj ke messages ready nahi</p>
            <p className="text-sm text-ink-soft mb-4 leading-relaxed">
              Tension mat lo — ek tap pe load. Har message tumhare naam pe, naya value ke saath.
            </p>
            <button
              type="button"
              onClick={refreshPulses}
              className="btn-primary px-5 py-3 rounded-xl text-sm min-h-[48px] w-full sm:w-auto"
            >
              Messages load karo
            </button>
            <Link href="/settings" className="block mt-3 text-xs text-gold-light hover:underline">
              Ya pehle schedule set karo →
            </Link>
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
              <div className="bg-[#1a1a22] px-4 py-2.5 flex items-center gap-2 border-b border-white/5">
                <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center text-black text-[10px] font-bold shrink-0">
                  R
                </div>
                <span className="text-xs font-semibold text-white">RIZN</span>
                <span className="text-xs text-muted ml-auto shrink-0">{m.timeLabel}</span>
              </div>
              <div className="p-4 bg-black/40">
                <p className="text-[15px] leading-relaxed text-white/95 mb-3 break-words">{m.text}</p>
                <p className="text-sm text-gold-light mb-3">Aaj ka step: {m.microAction}</p>
                <div className="flex flex-wrap gap-2">
                  {!m.read && (
                    <button
                      type="button"
                      onClick={() => markPulse(m.id, { read: true })}
                      className="btn-secondary px-4 py-3 rounded-xl text-sm min-h-[44px]"
                    >
                      Padh liya
                    </button>
                  )}
                  {!m.actionDone && (
                    <button
                      type="button"
                      onClick={() => markPulse(m.id, { read: true, actionDone: true })}
                      className="btn-primary px-4 py-3 rounded-xl text-sm inline-flex items-center gap-1 min-h-[44px]"
                    >
                      <Check size={14} /> Ho gaya
                    </button>
                  )}
                  {m.actionDone && (
                    <span className="text-sm text-success flex items-center gap-1 py-2">
                      <Check size={14} /> Aaj ka step done — proud!
                    </span>
                  )}
                  <ShareMessageCard name={displayName} message={m.text} className="!min-h-[44px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <WeeklyWinsCard />
        <BuddyCheckin />
        <ReferralCard code={user.referralCode} />
        <PausePlanCard />
        <NoSpamPromise className="mb-6" />

        <div className="soft-card rounded-2xl p-5 mb-6">
          <p className="font-semibold text-sm mb-3 text-white">
            {isIN ? "Aaj mood kaisa hai?" : "How's your mood today?"}
          </p>
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
                className="text-2xl min-h-[48px] rounded-xl bg-white/5 hover:bg-accent-soft transition-colors"
              >
                {item.e}
              </button>
            ))}
          </div>
          {state.moods[0] && (
            <p className="text-xs text-muted mt-3">Last: {state.moods[0].emoji} — thank you for checking in</p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center text-sm pb-4">
          <Link href="/emi-reminders" className="text-gold-light hover:underline min-h-[44px] flex items-center">
            {isIN ? "EMI / Bills" : "Bill reminders"}
          </Link>
          <span className="text-muted self-center">·</span>
          <Link href="/settings" className="text-muted hover:text-white min-h-[44px] flex items-center">
            Schedule
          </Link>
          <span className="text-muted self-center">·</span>
          <Link href="/billing" className="text-muted hover:text-white min-h-[44px] flex items-center">
            Plan
          </Link>
          <span className="text-muted self-center">·</span>
          <Link href="/programs" className="text-muted hover:text-white min-h-[44px] flex items-center">
            Programs
          </Link>
          <span className="text-muted self-center">·</span>
          <Link href="/family" className="text-muted hover:text-white min-h-[44px] flex items-center">
            Family
          </Link>
        </div>
      </div>
    </div>
  );
}
