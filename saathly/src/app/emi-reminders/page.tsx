"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { EmiReminder } from "@/lib/emi-reminder";
import { formatEmiNotification } from "@/lib/emi-reminder";
import { formatDueLabel, getUpcomingBills, isPaidThisCycle, markPaidMonth } from "@/lib/bills";
import { uid } from "@/lib/storage";
import { OnboardingWizard } from "@/components/OnboardingWizard";
import { BillCalendar } from "@/components/BillCalendar";
import { haptic } from "@/lib/haptic";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold/50 min-h-[48px]";

export default function EmiRemindersPage() {
  return (
    <Suspense fallback={<div className="page-top text-center text-muted px-4">Loading…</div>}>
      <EmiRemindersContent />
    </Suspense>
  );
}

function EmiRemindersContent() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";
  const { state, patchUser, trackEvent } = useApp();
  const { region } = useLocale();
  const { ready } = useRequireAuth();
  const user = state.user;
  const reminders = user?.emiReminders ?? [];
  const isIN = region === "IN";
  const currencyPrefix = isIN ? "₹" : "$";

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("5");
  const [bankName, setBankName] = useState("");
  const [saved, setSaved] = useState(false);

  if (!ready || !user) {
    return <div className="page-top text-center text-muted px-4">Loading…</div>;
  }

  const upcoming = getUpcomingBills(reminders, 14);

  const add = () => {
    const amt = parseInt(amount, 10);
    const day = parseInt(dueDay, 10);
    if (!label.trim() || !bankName.trim() || !amt || day < 1 || day > 28) return;

    const next: EmiReminder = {
      id: uid("emi"),
      label: label.trim(),
      amount: amt,
      dueDay: day,
      bankName: bankName.trim(),
      enabled: true,
    };
    patchUser({ emiReminders: [...reminders, next] });
    trackEvent("emi_add", next.label);
    setLabel("");
    setAmount("");
    setBankName("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const remove = (id: string) => {
    patchUser({ emiReminders: reminders.filter((r) => r.id !== id) });
  };

  const markPaid = (id: string) => {
    haptic("success");
    const next = reminders.map((r) => (r.id === id ? markPaidMonth(r) : r));
    patchUser({ emiReminders: next });
    trackEvent("bill_marked_paid", id);
  };

  const preview = reminders[0]
    ? formatEmiNotification(user.name, reminders[0], user.language)
    : formatEmiNotification(
        user.name,
        {
          id: "p",
          label: label || (isIN ? "EMI" : "Bill"),
          amount: parseInt(amount, 10) || 0,
          dueDay: parseInt(dueDay, 10) || 5,
          bankName: bankName || (isIN ? "Bank" : "Provider"),
          enabled: true,
        },
        user.language
      );

  return (
    <div className="page-top pb-24 px-4">
      {welcome && <OnboardingWizard />}
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-2xl sm:text-3xl font-bold mb-2 text-white">
          {isIN ? "EMI / Bill Reminders" : "Bill Reminders"}
        </h1>
        {welcome && (
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 mb-6 text-sm text-ink-soft">
            <p className="font-semibold text-white mb-1">
              {isIN ? "Welcome! Pehla step — EMI set karo" : "Welcome! First step — add a bill"}
            </p>
            <p className="text-xs">
              {isIN
                ? "Neeche details bharo. 1 din pehle tumhare naam pe alert jayega."
                : "Fill in the details below. You'll get a caring alert 1 day early."}
            </p>
          </div>
        )}
        <p className="text-sm text-ink-soft mb-6 leading-relaxed">
          {isIN ? (
            <>
              Naam ke saath notification <strong className="text-gold-light">1 din pehle</strong>{" "}
              jayega — amount, date, bank/NBFC sab clear.
            </>
          ) : (
            <>
              Get a notification with your name{" "}
              <strong className="text-gold-light">1 day early</strong> — amount, date, provider
              clear.
            </>
          )}
        </p>

        <BillCalendar className="mb-6" />

        {upcoming.length > 0 && (
          <div className="premium-card rounded-2xl p-4 mb-6 border border-gold/25">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-3">
              {isIN ? "Aane wale bills (14 din)" : "Upcoming (14 days)"}
            </p>
            <ul className="space-y-2.5">
              {upcoming.map((b) => {
                const paid = isPaidThisCycle(b);
                return (
                  <li
                    key={b.id}
                    className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{b.label}</p>
                      <p className="text-xs text-ink-soft mt-0.5">
                        {currencyPrefix}
                        {b.amount.toLocaleString(isIN ? "en-IN" : "en-US")} ·{" "}
                        {formatDueLabel(b.daysUntil, user.language)}
                        {paid ? (isIN ? " · Paid ✓" : " · Paid ✓") : ""}
                      </p>
                    </div>
                    {!paid && (
                      <button
                        type="button"
                        onClick={() => markPaid(b.id)}
                        className="btn-primary shrink-0 rounded-lg px-3 py-2 text-xs font-bold min-h-[40px]"
                      >
                        {isIN ? "Paid" : "Paid"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="soft-card rounded-2xl p-5 mb-6 space-y-4 border border-gold/15">
          <p className="text-xs font-semibold uppercase text-gold-light tracking-wider">
            {isIN ? "Naya EMI / bill add karo" : "Add a bill"}
          </p>
          <label className="block text-sm text-muted">
            {isIN ? "EMI name (e.g. Home Loan)" : "Bill name (e.g. Rent)"}
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={isIN ? "Home Loan" : "Rent"}
              className={inputClass}
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm text-muted">
              {isIN ? "Amount (₹)" : "Amount ($)"}
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={isIN ? "12500" : "450"}
                className={inputClass}
              />
            </label>
            <label className="block text-sm text-muted">
              Due day (1–28)
              <input
                type="number"
                min={1}
                max={28}
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>
          <label className="block text-sm text-muted">
            {isIN ? "Bank / NBFC name" : "Provider / bank"}
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder={isIN ? "HDFC Bank, Bajaj Finserv..." : "Chase, Amex..."}
              className={inputClass}
            />
          </label>
          <button
            type="button"
            onClick={add}
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[52px]"
          >
            {saved ? <Check size={16} /> : <Plus size={16} />}
            {saved
              ? isIN
                ? "Saved!"
                : "Saved!"
              : isIN
                ? "EMI reminder save karo"
                : "Save bill reminder"}
          </button>
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6 bg-black/40">
          <p className="text-xs uppercase text-muted mb-2 tracking-wider">
            {isIN ? "Aisa notification — 1 din pehle" : "Notification preview — 1 day early"}
          </p>
          <p className="text-[15px] text-white leading-relaxed break-words">{preview}</p>
        </div>

        {reminders.length > 0 && (
          <div className="space-y-3 mb-8">
            <p className="text-sm font-semibold text-white">
              {isIN ? `Tumhare bills (${reminders.length})` : `Your bills (${reminders.length})`}
            </p>
            {reminders.map((r) => {
              const paid = isPaidThisCycle(r);
              return (
                <div
                  key={r.id}
                  className="soft-card rounded-xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{r.label}</p>
                    <p className="text-sm text-ink-soft mt-1 break-words">
                      {currencyPrefix}
                      {r.amount.toLocaleString(isIN ? "en-IN" : "en-US")} · Day {r.dueDay} ·{" "}
                      {r.bankName}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {!paid ? (
                        <button
                          type="button"
                          onClick={() => markPaid(r.id)}
                          className="btn-primary rounded-lg px-3 py-2 text-xs font-bold min-h-[40px] inline-flex items-center gap-1"
                        >
                          <Check size={14} />
                          {isIN ? "Paid mark karo" : "Mark as paid"}
                        </button>
                      ) : (
                        <span className="text-xs text-success font-medium py-2">
                          {isIN ? "Is cycle paid ✓" : "Paid this cycle ✓"}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(r.id)}
                    className="text-muted hover:text-red-400 min-h-11 min-w-11 flex items-center justify-center shrink-0 rounded-xl"
                    aria-label="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <Link
          href="/dashboard"
          className="block text-center text-sm text-muted hover:text-white min-h-[48px] flex items-center justify-center"
        >
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
