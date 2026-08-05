"use client";

import Link from "next/link";
import { Sunrise, CreditCard, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { formatDueLabel, getUpcomingBills } from "@/lib/bills";

/** One morning card: first message + next bill — the daily habit loop */
export function MorningOneCard() {
  const { state, markPulse } = useApp();
  const { region, preferEnglish } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN" && !preferEnglish;
  const today = new Date().toISOString().slice(0, 10);
  const pulses = state.pulses
    .filter((p) => p.date === today)
    .sort((a, b) => a.hour - b.hour);
  const first = pulses.find((p) => !p.read) || pulses[0];
  const nextBill = getUpcomingBills(user.emiReminders, 14).find((b) => !b.paidThisCycle);
  const prefix = isIN ? "₹" : "$";

  if (!first && !nextBill) return null;

  return (
    <div className="premium-card rounded-2xl p-4 sm:p-5 mb-6 border border-gold/30">
      <div className="flex items-center gap-2 mb-3">
        <Sunrise size={16} className="text-gold-light" />
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
          {isIN ? "Subah ka ek card" : "Morning one-card"}
        </p>
      </div>

      {first && (
        <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 mb-3">
          <p className="text-[11px] text-muted mb-1">
            {isIN ? "Aaj ka pehla message" : "Today's first message"} · {first.timeLabel}
          </p>
          <p className="text-sm text-white leading-relaxed line-clamp-3">{first.text}</p>
          <p className="text-xs text-gold-light mt-2">→ {first.microAction}</p>
          {!first.actionDone && (
            <button
              type="button"
              onClick={() => markPulse(first.id, { read: true, actionDone: true })}
              className="btn-primary mt-3 rounded-lg px-3 py-2 text-xs font-bold min-h-[40px]"
            >
              {isIN ? "Ho gaya" : "Done"}
            </button>
          )}
        </div>
      )}

      <div className="rounded-xl bg-black/40 border border-white/10 p-3.5 flex items-start gap-3">
        <CreditCard size={16} className="text-gold-light shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          {nextBill ? (
            <>
              <p className="text-sm font-medium text-white truncate">{nextBill.label}</p>
              <p className="text-xs text-ink-soft mt-0.5">
                {prefix}
                {nextBill.amount.toLocaleString(isIN ? "en-IN" : "en-US")} ·{" "}
                {formatDueLabel(nextBill.daysUntil, user.language)}
              </p>
            </>
          ) : (
            <p className="text-xs text-ink-soft">
              {isIN
                ? "Koi bill jaldi nahi — calendar pe check karo."
                : "No bill soon — check your calendar."}
            </p>
          )}
        </div>
        <Link
          href="/emi-reminders"
          className="text-gold-light shrink-0 min-h-10 min-w-10 flex items-center justify-center"
          aria-label="Bills"
        >
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
