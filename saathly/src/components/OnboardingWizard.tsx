"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell, BellRing, Calendar, CreditCard, Sparkles, X } from "lucide-react";
import { haptic } from "@/lib/haptic";
import { useLocale } from "@/context/LocaleContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";
import { formatMoney } from "@/lib/locale";

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);
  const { region, currency, preferEnglish } = useLocale();
  const config = useSiteConfig();
  const isIN = region === "IN" && !preferEnglish;
  const priceLabel = regionPersonalPriceLabel(config, region);
  const trialDays = config.marketing.trialDays || 7;
  const zero = formatMoney(0, currency);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem("rizn_onboarding_done") === "1") return;
    setOpen(true);
  }, []);

  if (!open) return null;

  const steps = isIN
    ? [
        {
          icon: Sparkles,
          title: `${trialDays}-day free trial + Autopay`,
          body: `Aaj mandate set (${zero}). ${trialDays} din free. Phir har mahine ${priceLabel} bank se automatic.`,
          href: "/billing?trial=1",
          cta: "Free trial + Autopay set karo",
        },
        {
          icon: CreditCard,
          title: "EMI / bill set karo",
          body: "Amount, date, bank — 30 second. 1 din pehle caring alert milega.",
          href: "/emi-reminders?welcome=1",
          cta: "EMI / bill add karo",
        },
        {
          icon: Calendar,
          title: "Schedule choose karo",
          body: "Wake, sleep, interval — messages tumhari life ke hisaab se.",
          href: "/settings?welcome=1",
          cta: "Schedule set karo",
        },
        {
          icon: BellRing,
          title: "Web alerts enable karo",
          body: "Browser me Allow dabao — daily messages + EMI reminder schedule pe aayenge.",
          href: "/dashboard",
          cta: "Notifications allow karo",
        },
        {
          icon: Bell,
          title: "Pehla message feel karo",
          body: "Dashboard pe aaj ke alerts — naam ke saath, value ke saath.",
          href: "/dashboard",
          cta: "Dashboard kholo",
        },
      ]
    : [
        {
          icon: Sparkles,
          title: `${trialDays}-day free trial + Autopay`,
          body: `Authorize mandate today (${zero}). ${trialDays} days free. Then ${priceLabel} automatic.`,
          href: "/billing?trial=1",
          cta: "Start free trial + Autopay",
        },
        {
          icon: CreditCard,
          title: "Set bill reminders",
          body: "Amount, date, provider — 30 seconds. Caring alert one day early.",
          href: "/emi-reminders?welcome=1",
          cta: "Add a bill",
        },
        {
          icon: Calendar,
          title: "Choose your schedule",
          body: "Wake, sleep, interval — messages that fit your life.",
          href: "/settings?welcome=1",
          cta: "Set schedule",
        },
        {
          icon: BellRing,
          title: "Enable web alerts",
          body: "Tap Allow — daily messages and bill reminders arrive on your schedule.",
          href: "/dashboard",
          cta: "Allow notifications",
        },
        {
          icon: Bell,
          title: "Feel your first message",
          body: "Today's alerts on the dashboard — with your name, with value.",
          href: "/dashboard",
          cta: "Open dashboard",
        },
      ];

  const current = steps[step];
  const Icon = current.icon;
  const last = step === steps.length - 1;

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
          Setup · {step + 1}/{steps.length}
        </p>
        <div className="flex items-start gap-3 mb-4 mt-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <Icon size={22} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-white">{current.title}</h2>
            <p className="text-sm text-ink-soft mt-1.5 leading-relaxed">{current.body}</p>
          </div>
        </div>

        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-gold" : "bg-white/10"}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Link
            href={current.href}
            onClick={finish}
            className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
          >
            {current.cta}
            <ArrowRight size={16} />
          </Link>
          <button
            type="button"
            onClick={next}
            className="text-sm text-muted hover:text-white min-h-[44px]"
          >
            {last ? (isIN ? "Skip — dashboard pe jao" : "Skip — go to dashboard") : isIN ? "Agla step" : "Next step"}
          </button>
        </div>
      </div>
    </div>
  );
}
