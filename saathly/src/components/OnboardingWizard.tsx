"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, Calendar, CreditCard, X } from "lucide-react";
import { haptic } from "@/lib/haptic";

const STEPS = [
  {
    icon: CreditCard,
    title: "EMI set karo",
    body: "Amount, date, bank — 30 second. 1 din pehle caring alert milega.",
    href: "/emi-reminders?welcome=1",
    cta: "EMI add karo",
  },
  {
    icon: Calendar,
    title: "Schedule choose karo",
    body: "Wake, sleep, interval — messages tumhari life ke hisaab se.",
    href: "/settings?welcome=1",
    cta: "Schedule set karo",
  },
  {
    icon: Bell,
    title: "Pehla message feel karo",
    body: "Dashboard pe aaj ke alerts — naam ke saath, value ke saath.",
    href: "/dashboard",
    cta: "Dashboard kholo",
  },
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rizn_onboarding_done") === "1") return;
    setOpen(true);
  }, []);

  if (!open) return null;

  const current = STEPS[step];
  const Icon = current.icon;
  const last = step === STEPS.length - 1;

  const finish = () => {
    localStorage.setItem("rizn_onboarding_done", "1");
    haptic("success");
    setOpen(false);
  };

  const next = () => {
    haptic("light");
    if (last) finish();
    else setStep((s) => s + 1);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-0 sm:p-4">
      <div className="w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-gold/25 bg-[#0c0c12] p-6 sm:p-8 shadow-2xl relative">
        <button
          type="button"
          onClick={finish}
          className="absolute top-4 right-4 text-muted hover:text-white min-h-10 min-w-10 flex items-center justify-center"
          aria-label="Skip"
        >
          <X size={20} />
        </button>

        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-1">
          Setup · {step + 1}/{STEPS.length}
        </p>
        <div className="mb-5 flex gap-1.5">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold" : "bg-white/10"}`}
            />
          ))}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold mb-4">
          <Icon size={26} />
        </div>
        <h2 className="font-display text-2xl font-bold text-white mb-2">{current.title}</h2>
        <p className="text-sm text-ink-soft leading-relaxed mb-6">{current.body}</p>

        <div className="flex flex-col gap-3">
          <Link
            href={current.href}
            onClick={() => {
              if (last) localStorage.setItem("rizn_onboarding_done", "1");
              haptic("medium");
            }}
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold min-h-[52px]"
          >
            {current.cta}
            <ArrowRight size={16} />
          </Link>
          <button
            type="button"
            onClick={next}
            className="text-sm text-muted hover:text-white min-h-[44px]"
          >
            {last ? "Skip — later" : "Agla step"}
          </button>
        </div>
      </div>
    </div>
  );
}
