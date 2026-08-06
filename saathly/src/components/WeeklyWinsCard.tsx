"use client";

import { Trophy } from "lucide-react";
import { useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

export function WeeklyWinsCard() {
  const { state, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  const weekAgo = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.getTime();
  }, []);

  if (!user) return null;

  const isIN = !preferEnglish && (region === "IN" || user.language !== "english");
  const moodsWeek = state.moods.filter((m) => new Date(m.at).getTime() >= weekAgo).length;
  const actionsWeek = state.pulses.filter((p) => p.actionDone).length;
  const billsPaid = (user.emiReminders ?? []).filter((e) => e.lastPaidMonth).length;

  const wins = [
    { label: isIN ? "Din ki streak" : "Day streak", value: user.streak },
    { label: isIN ? "Actions (aaj)" : "Actions today", value: actionsWeek },
    { label: isIN ? "Mood check-ins" : "Mood check-ins", value: moodsWeek },
    { label: isIN ? "Bills marked paid" : "Bills marked paid", value: billsPaid },
  ];

  const share = () => {
    haptic("success");
    trackEvent("weekly_wins_share");
    const text = isIN
      ? `RIZN pe meri week: ${user.streak} din streak, ${actionsWeek} actions done. Chhote steps, better days ✨\nhttps://rizn.app`
      : `My RIZN week: ${user.streak}-day streak, ${actionsWeek} actions done. Small steps, better days.\nhttps://rizn.app`;
    if (navigator.share) {
      void navigator.share({ text }).catch(() => {
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
      });
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="soft-card rounded-2xl p-5 mb-6 border border-gold/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Trophy size={18} />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">
            {isIN ? "Is hafte ke wins" : "This week's wins"}
          </p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            {isIN
              ? "Chhote steps count hote hain — ye proof hai tum move kar rahe ho."
              : "Small steps count — this is proof you're moving forward."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {wins.map((w) => (
          <div key={w.label} className="rounded-xl bg-black/40 border border-white/10 px-3 py-2.5">
            <p className="text-[11px] text-muted">{w.label}</p>
            <p className="font-display text-xl font-bold text-white mt-0.5">{w.value}</p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={share}
        className="btn-secondary w-full rounded-xl py-3 text-sm min-h-[44px] font-semibold"
      >
        {isIN ? "Win share karo" : "Share your win"}
      </button>
    </div>
  );
}
