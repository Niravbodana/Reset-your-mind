"use client";

import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { trialDayNumber } from "@/lib/bills";
import { isTrialActive } from "@/lib/plans";
import { formatPersonalPrice } from "@/lib/pricing";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { haptic } from "@/lib/haptic";

/** Day 5+ trial value report → nudge toward keeping autopay */
export function TrialValueReport() {
  const { state, patchUser, trackEvent } = useApp();
  const { region, currency, preferEnglish } = useLocale();
  const config = useSiteConfig();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const day = trialDayNumber(user.createdAt, user.trialEndsAt);
  const trialLive = isTrialActive(user.trialEndsAt);
  const show =
    trialLive &&
    user.subStatus === "trial" &&
    day >= 5 &&
    !user.trialReportDismissed;

  if (!show) return null;

  const today = new Date().toISOString().slice(0, 10);
  const actions = state.pulses.filter((p) => p.actionDone).length;
  const reads = state.pulses.filter((p) => p.read).length;
  const bills = user.emiReminders?.length ?? 0;
  const price = formatPersonalPrice(config, currency);

  const dismiss = () => {
    haptic("light");
    patchUser({ trialReportDismissed: true });
    trackEvent("trial_report_dismiss", String(day));
  };

  return (
    <div className="mb-6 rounded-2xl border border-gold/40 bg-gradient-to-b from-gold/15 to-black/60 p-5 relative">
      <button
        type="button"
        onClick={dismiss}
        className="absolute top-3 right-3 text-muted hover:text-white min-h-9 min-w-9 flex items-center justify-center"
        aria-label="Dismiss"
      >
        <X size={18} />
      </button>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-gold-light" />
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
          {isIN ? `Trial day ${day} — aapka value report` : `Trial day ${day} — your value report`}
        </p>
      </div>
      <h3 className="font-display text-lg font-bold text-white mb-2 pr-8">
        {isIN
          ? "Dekho kitna move ho chuka hai"
          : "Look how far you've already moved"}
      </h3>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { l: isIN ? "Streak" : "Streak", v: user.streak },
          { l: isIN ? "Reads" : "Reads", v: reads },
          { l: isIN ? "Actions" : "Actions", v: actions },
        ].map((s) => (
          <div key={s.l} className="rounded-xl bg-black/40 border border-white/10 px-2 py-2 text-center">
            <p className="text-[10px] text-muted uppercase">{s.l}</p>
            <p className="font-display text-lg font-bold text-white">{s.v}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink-soft leading-relaxed mb-4">
        {isIN
          ? `${bills} bill reminder set · Soft Day + Pause ready · Trial ke baad sirf ${price}/month. Cancel anytime.`
          : `${bills} bill reminder(s) set · Soft Day + Pause ready · After trial just ${price}/month. Cancel anytime.`}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href="/billing?trial=1"
          onClick={() => trackEvent("trial_report_cta", today)}
          className="btn-primary flex-1 text-center rounded-xl py-3 text-sm font-bold min-h-[48px]"
        >
          {user.autopayEnabled
            ? isIN
              ? "Autopay already set ✓"
              : "Autopay already set ✓"
            : isIN
              ? "Autopay set karo — trial continue"
              : "Set autopay — keep your trial wins"}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="btn-secondary rounded-xl px-4 py-3 text-sm min-h-[48px]"
        >
          {isIN ? "Baad me" : "Later"}
        </button>
      </div>
    </div>
  );
}
