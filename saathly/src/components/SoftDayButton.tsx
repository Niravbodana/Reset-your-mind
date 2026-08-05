"use client";

import { CloudSun } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

/** One-tap Soft Day — fewer / gentler messages without opening Settings */
export function SoftDayButton() {
  const { state, patchUser, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = !preferEnglish && (region === "IN" || user.language !== "english");
  const on = user.softMode;

  const toggle = () => {
    haptic("medium");
    patchUser({ softMode: !on });
    trackEvent("soft_day_toggle", !on ? "on" : "off");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`mb-6 w-full rounded-2xl border px-4 py-3.5 text-left min-h-[56px] transition-colors ${
        on
          ? "border-gold/40 bg-gold/10"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
            on ? "bg-gold/20 text-gold" : "bg-white/5 text-white/70"
          }`}
        >
          <CloudSun size={18} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white">
            {on
              ? isIN
                ? "Soft Day ON"
                : "Soft Day ON"
              : isIN
                ? "Aaj Soft Day chahiye?"
                : "Need a Soft Day?"}
          </p>
          <p className="text-xs text-ink-soft mt-0.5 leading-relaxed">
            {on
              ? isIN
                ? "Kam messages, soft tone. Kabhi bhi off karo."
                : "Fewer messages, gentler tone. Tap anytime to turn off."
              : isIN
                ? "Ek tap — kam messages, soft tone. Difficult days ke liye."
                : "One tap — fewer messages, gentler tone for hard days."}
          </p>
        </div>
        <span
          className={`text-[11px] font-bold uppercase tracking-wide shrink-0 ${
            on ? "text-gold-light" : "text-muted"
          }`}
        >
          {on ? "ON" : "OFF"}
        </span>
      </div>
    </button>
  );
}
