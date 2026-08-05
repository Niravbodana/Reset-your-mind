"use client";

import { Shield } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { hasStreakFreeze } from "@/lib/scheduler";

export function StreakFreezeBadge() {
  const { state } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const available = hasStreakFreeze(user);

  return (
    <div
      className={`mb-6 rounded-2xl border px-4 py-3.5 flex items-start gap-3 ${
        available ? "border-gold/25 bg-gold/5" : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
        <Shield size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">
          {isIN ? "Streak freeze" : "Streak freeze"}
        </p>
        <p className="text-xs text-ink-soft mt-1 leading-relaxed">
          {available
            ? isIN
              ? "Is mahine 1 miss maaf — habit tootegi nahi. Automatic protect."
              : "1 missed day forgiven this month — your habit stays protected automatically."
            : isIN
              ? "Is mahine freeze use ho chuka. Agle mahine naya milega."
              : "This month's freeze is used. A new one arrives next month."}
        </p>
      </div>
    </div>
  );
}
