"use client";

import { PauseCircle, PlayCircle } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { haptic } from "@/lib/haptic";

/** Retention: pause 7 days instead of feeling stuck / cancelling */
export function PausePlanCard() {
  const { state, patchUser, trackEvent } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = !preferEnglish && (region === "IN" || user.language !== "english");
  const pausedUntil = user.planPausedUntil ? new Date(user.planPausedUntil) : null;
  const paused = pausedUntil ? pausedUntil.getTime() > Date.now() : false;

  const pause = () => {
    haptic("medium");
    const until = new Date();
    until.setDate(until.getDate() + 7);
    patchUser({ planPausedUntil: until.toISOString(), softMode: true });
    trackEvent("plan_paused_7d");
  };

  const resume = () => {
    haptic("success");
    patchUser({ planPausedUntil: undefined, softMode: false });
    trackEvent("plan_resumed");
  };

  return (
    <div className="soft-card rounded-2xl p-5 mb-6 border border-white/10">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-gold-light">
          {paused ? <PlayCircle size={18} /> : <PauseCircle size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white text-sm">
            {paused
              ? isIN
                ? "Plan paused (7 days)"
                : "Plan paused (7 days)"
              : isIN
                ? "Break chahiye? 7 din pause"
                : "Need a break? Pause 7 days"}
          </p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            {paused
              ? isIN
                ? `Soft mode on · resume ${pausedUntil?.toLocaleDateString("en-IN", { day: "numeric", month: "short" })}. Cancel ki zarurat nahi.`
                : `Soft mode on · resumes ${pausedUntil?.toLocaleDateString("en-US", { day: "numeric", month: "short" })}. No need to cancel.`
              : isIN
                ? "Life heavy ho to cancel mat karo — 7 din soft pause. Autopay same; messages soft."
                : "If life is heavy, don't cancel — soft pause 7 days. Autopay stays; messages go gentle."}
          </p>
          <button
            type="button"
            onClick={paused ? resume : pause}
            className={`mt-3 rounded-xl px-4 py-2.5 text-sm font-semibold min-h-[44px] ${
              paused ? "btn-primary" : "btn-secondary"
            }`}
          >
            {paused
              ? isIN
                ? "Abhi resume karo"
                : "Resume now"
              : isIN
                ? "7 din pause karo"
                : "Pause for 7 days"}
          </button>
        </div>
      </div>
    </div>
  );
}
