"use client";

import Link from "next/link";
import { CalendarClock, CheckCircle2, Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { formatDueLabel, getUpcomingBills } from "@/lib/bills";

export function TodayBriefing() {
  const { state } = useApp();
  const { region } = useLocale();
  const user = state.user;
  if (!user) return null;

  const isIN = region === "IN";
  const fmtAmt = (n: number) =>
    `${isIN ? "₹" : "$"}${n.toLocaleString(isIN ? "en-IN" : "en-US")}`;
  const today = new Date().toISOString().slice(0, 10);
  const pulses = state.pulses.filter((p) => p.date === today);
  const unread = pulses.filter((p) => !p.read).length;
  const done = pulses.filter((p) => p.actionDone).length;
  const upcoming = getUpcomingBills(user.emiReminders, 7);
  const unpaidSoon = upcoming.filter((b) => !b.paidThisCycle);

  return (
    <div className="premium-card rounded-2xl p-4 sm:p-5 mb-6 border border-gold/25">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={16} className="text-gold-light" />
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
          {isIN ? "Aaj ka briefing" : "Today's briefing"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-xl bg-black/40 border border-white/10 px-3 py-2.5">
          <p className="text-[11px] text-muted">{isIN ? "Messages" : "Messages"}</p>
          <p className="text-sm font-semibold text-white mt-0.5">
            {unread > 0
              ? isIN
                ? `${unread} padhne baaki`
                : `${unread} left to read`
              : isIN
                ? `${pulses.length} ready`
                : `${pulses.length} ready`}
          </p>
        </div>
        <div className="rounded-xl bg-black/40 border border-white/10 px-3 py-2.5">
          <p className="text-[11px] text-muted">{isIN ? "Actions" : "Wins today"}</p>
          <p className="text-sm font-semibold text-white mt-0.5">
            {done} {isIN ? "done" : "done"}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/30 p-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-xs font-semibold text-white flex items-center gap-1.5">
            <CalendarClock size={14} className="text-gold-light" />
            {isIN ? "Bills / EMI — next 7 days" : "Bills due — next 7 days"}
          </p>
          <Link href="/emi-reminders" className="text-[11px] text-gold-light hover:underline">
            {isIN ? "Manage" : "Manage"}
          </Link>
        </div>

        {unpaidSoon.length === 0 ? (
          <p className="text-xs text-ink-soft leading-relaxed flex items-start gap-2">
            <CheckCircle2 size={14} className="text-success shrink-0 mt-0.5" />
            {upcoming.length > 0
              ? isIN
                ? "Is hafte ke bills marked paid / clear — shaant raho."
                : "This week's bills are marked paid or clear — breathe easy."
              : isIN
                ? "Koi bill 7 din me nahi. Add karo taaki pehle se ready raho."
                : "No bills in 7 days. Add one so you're ready early."}
          </p>
        ) : (
          <ul className="space-y-2">
            {unpaidSoon.slice(0, 3).map((b) => (
              <li key={b.id} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-white font-medium truncate">
                  {b.label} · {fmtAmt(b.amount)}
                </span>
                <span className="text-gold-light shrink-0">
                  {formatDueLabel(b.daysUntil, user.language)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
