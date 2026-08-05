"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Check, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import type { EmiReminder } from "@/lib/emi-reminder";
import { formatEmiNotification } from "@/lib/emi-reminder";
import { uid } from "@/lib/storage";

export default function EmiRemindersPage() {
  return (
    <Suspense fallback={<div className="pt-28 text-center text-muted">Loading…</div>}>
      <EmiRemindersContent />
    </Suspense>
  );
}

function EmiRemindersContent() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";
  const { state, patchUser, trackEvent } = useApp();
  const { ready } = useRequireAuth();
  const user = state.user;
  const reminders = user?.emiReminders ?? [];

  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("5");
  const [bankName, setBankName] = useState("");
  const [saved, setSaved] = useState(false);

  if (!ready || !user) {
    return <div className="pt-28 text-center text-muted">Loading…</div>;
  }

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

  const preview = reminders[0]
    ? formatEmiNotification(user.name, reminders[0], user.language)
    : formatEmiNotification(
        user.name,
        {
          id: "p",
          label: label || "EMI",
          amount: parseInt(amount, 10) || 0,
          dueDay: parseInt(dueDay, 10) || 5,
          bankName: bankName || "Bank",
          enabled: true,
        },
        user.language
      );

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">EMI Reminders</h1>
        {welcome && (
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 mb-6 text-sm text-ink-soft">
            <p className="font-semibold text-white mb-1">Welcome! Pehla step — EMI set karo</p>
            <p className="text-xs">Neeche details bharo. 1 din pehle tumhare naam pe alert jayega.</p>
          </div>
        )}
        <p className="text-sm text-ink-soft mb-8">
          Naam ke saath notification <strong className="text-gold-light">1 din pehle</strong> jayega —
          amount, date, bank/NBFC sab clear.
        </p>

        <div className="soft-card rounded-2xl p-5 mb-6 space-y-4 border border-gold/15">
          <p className="text-xs font-semibold uppercase text-gold-light">Naya EMI add karo</p>
          <label className="block text-xs text-muted">
            EMI name (e.g. Home Loan)
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Home Loan"
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
            />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs text-muted">
              Amount (₹)
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="12500"
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
              />
            </label>
            <label className="block text-xs text-muted">
              Due day (1–28)
              <input
                type="number"
                min={1}
                max={28}
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
              />
            </label>
          </div>
          <label className="block text-xs text-muted">
            Bank / NBFC name
            <input
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="HDFC Bank, Bajaj Finserv..."
              className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm"
            />
          </label>
          <button type="button" onClick={add} className="btn-primary w-full py-3 rounded-xl text-sm inline-flex items-center justify-center gap-2">
            {saved ? <Check size={16} /> : <Plus size={16} />}
            {saved ? "Saved!" : "EMI reminder save karo"}
          </button>
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6 bg-black/40">
          <p className="text-[10px] uppercase text-muted mb-2">Preview — 1 din pehle</p>
          <p className="text-sm text-white leading-relaxed">{preview}</p>
        </div>

        {reminders.length > 0 && (
          <div className="space-y-3 mb-8">
            <p className="text-sm font-semibold text-white">Tumhare EMIs ({reminders.length})</p>
            {reminders.map((r) => (
              <div key={r.id} className="soft-card rounded-xl p-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-white">{r.label}</p>
                  <p className="text-xs text-ink-soft mt-1">
                    ₹{r.amount.toLocaleString("en-IN")} · Day {r.dueDay} · {r.bankName}
                  </p>
                </div>
                <button type="button" onClick={() => remove(r.id)} className="text-muted hover:text-red-400 p-1" aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        <Link href="/dashboard" className="block text-center text-sm text-muted hover:text-white">
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}
