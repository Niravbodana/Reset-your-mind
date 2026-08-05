"use client";

import { Activity } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { isPaidThisCycle } from "@/lib/bills";
import {
  computeHealthScore,
  getHabitDay,
  getHabitGoals,
  habitPct,
  scoreLabel,
} from "@/lib/habits";
import { haptic } from "@/lib/haptic";

export function WeeklyHealthScore() {
  const { state, trackEvent } = useApp();
  const { region } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN";
  const goals = getHabitGoals(user);
  const day = getHabitDay(user);
  const mood = state.moods[0]?.score;
  const bills = user.emiReminders ?? [];
  const paid = bills.filter((b) => isPaidThisCycle(b)).length;
  const billsPaidRatio = bills.length ? paid / bills.length : 0.5;

  const score = computeHealthScore({
    steps: day.steps,
    stepGoal: goals.stepGoal,
    water: day.water,
    waterGoal: goals.waterGoal,
    sleepDone: day.sleepDone,
    moodScore: mood,
    billsPaidRatio,
    streak: user.streak,
  });

  const parts = [
    {
      l: isIN ? "Steps" : "Steps",
      v: `${habitPct(day.steps, goals.stepGoal)}%`,
    },
    {
      l: isIN ? "Water" : "Water",
      v: `${habitPct(day.water, goals.waterGoal)}%`,
    },
    { l: isIN ? "Sleep" : "Sleep", v: day.sleepDone ? "✓" : "—" },
    { l: isIN ? "Streak" : "Streak", v: String(user.streak) },
  ];

  const share = () => {
    haptic("success");
    trackEvent("health_score_share", String(score));
    const text = isIN
      ? `RIZN Health Score aaj: ${score}/100 (${scoreLabel(score, user.language)}).\nSteps ${day.steps}/${goals.stepGoal} · Water ${day.water}/${goals.waterGoal}\nChhote steps, better days.`
      : `My RIZN Health Score today: ${score}/100 (${scoreLabel(score, "english")}).\nSteps ${day.steps}/${goals.stepGoal} · Water ${day.water}/${goals.waterGoal}\nSmall steps, better days.`;
    if (navigator.share) {
      void navigator.share({ text }).catch(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="premium-card rounded-2xl p-5 mb-6 border border-gold/25">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Activity size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
            {isIN ? "Weekly health score" : "Health score"}
          </p>
          <p className="font-display text-3xl font-bold text-white mt-1">
            {score}
            <span className="text-base text-muted font-medium">/100</span>
          </p>
          <p className="text-xs text-ink-soft mt-1">
            {scoreLabel(score, isIN ? user.language : "english")} ·{" "}
            {isIN
              ? "steps + water + sleep + mood + bills"
              : "steps + water + sleep + mood + bills"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-4">
        {parts.map((p) => (
          <div
            key={p.l}
            className="rounded-xl bg-black/40 border border-white/10 px-2 py-2 text-center"
          >
            <p className="text-[10px] text-muted uppercase">{p.l}</p>
            <p className="text-sm font-bold text-white mt-0.5">{p.v}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={share}
        className="btn-secondary w-full rounded-xl py-3 text-sm font-semibold min-h-[44px]"
      >
        {isIN ? "Score share karo" : "Share your score"}
      </button>
    </div>
  );
}
