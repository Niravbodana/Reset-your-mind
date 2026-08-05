"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Building2, Calendar, CreditCard, User } from "lucide-react";
import Link from "next/link";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { useLocale } from "@/context/LocaleContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { formatPersonalPrice } from "@/lib/pricing";
import { ScrollReveal } from "./ScrollReveal";

export function EmiReminderDemo() {
  const { region } = useLocale();
  const config = useSiteConfig();
  const isIN = region === "IN";
  const priceLabel = formatPersonalPrice(config, isIN ? "INR" : "USD");
  const [step, setStep] = useState(0);

  const steps = isIN
    ? [
        { icon: User, label: "Naam", value: "Rahul" },
        { icon: CreditCard, label: "Amount", value: "₹12,500" },
        { icon: Calendar, label: "EMI date", value: "5 har mahine" },
        { icon: Building2, label: "Bank / NBFC", value: "HDFC Bank" },
      ]
    : [
        { icon: User, label: "Name", value: "Alex" },
        { icon: CreditCard, label: "Amount", value: "$450" },
        { icon: Calendar, label: "Due date", value: "5th each month" },
        { icon: Building2, label: "Provider", value: "Chase" },
      ];

  // Advance steps only — notification stays mounted (avoids page jump)
  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => (s >= steps.length - 1 ? 0 : s + 1));
    }, 1600);
    return () => clearInterval(t);
  }, [steps.length]);

  const notifLang = isIN ? "hinglish" : "english";
  const notifName = isIN ? "Rahul" : "Alex";
  const notifText = formatEmiNotification(notifName, DEMO_EMI, notifLang);

  return (
    <section
      id="emi-reminder"
      className="py-14 sm:py-20 md:py-28 border-y border-white/5 bg-bg-elevated/40 overflow-x-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <p className="section-label mb-3">
            {isIN
              ? `EMI / Bill Reminder — included in ${priceLabel} plan`
              : `Bill Reminders — included in ${priceLabel} plan`}
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            {isIN ? (
              <>
                EMI yaad dilana?{" "}
                <span className="text-gold-light">1 din pehle, caring alert.</span>
              </>
            ) : (
              <>
                Never miss a bill.{" "}
                <span className="text-gold-light">One day early, caring alert.</span>
              </>
            )}
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            {isIN
              ? "Naam, amount, date, bank/NBFC — 30 second me set. Kal EMI hai to aaj supportive notification — tension kam, confidence zyada."
              : "Name, amount, date, provider — set in 30 seconds. Get a supportive notification one day before due. Less stress, more control — worldwide."}
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div className="premium-card rounded-2xl p-4 sm:p-6 border border-gold/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-4">
              {isIN ? "Easy setup — 4 fields" : "Easy setup — 4 fields"}
            </p>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    i <= step
                      ? "border-gold/40 bg-black/50"
                      : "border-white/10 bg-black/30 opacity-70"
                  }`}
                >
                  <s.icon size={18} className="text-gold-light shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] sm:text-xs text-muted uppercase">{s.label}</p>
                    <p className="text-sm text-white font-medium truncate">{s.value}</p>
                  </div>
                  {i <= step && <span className="text-success text-xs font-bold shrink-0">✓</span>}
                </div>
              ))}
            </div>
            <Link
              href="/signup"
              className="btn-primary mt-6 w-full py-3 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[48px]"
            >
              {isIN
                ? `${priceLabel} plan — EMI reminder included`
                : `Join ${priceLabel} plan — bill reminders included`}
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>

          <div className="relative min-w-0">
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6">
              <div className="relative aspect-[3/4] min-h-[140px] bg-[#1a1520] overflow-hidden">
                <Image
                  src="/images/animatic-before-emi.jpg"
                  alt={isIN ? "EMI tension" : "Bill stress"}
                  fill
                  className="object-cover brightness-75"
                  sizes="(max-width: 768px) 45vw, 200px"
                />
                <div className="absolute inset-0 bg-red-950/30" />
                <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] font-bold uppercase text-red-200 bg-black/60 px-2 py-1 rounded-full">
                  {isIN ? "Pehle" : "Before"}
                </span>
              </div>
              <div className="relative aspect-[3/4] min-h-[140px] bg-[#151510] overflow-hidden">
                <Image
                  src="/images/animatic-after-emi.jpg"
                  alt={isIN ? "EMI peace" : "Bill calm"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 200px"
                />
                <div className="absolute inset-0 bg-gold/10" />
                <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] font-bold uppercase text-gold-light bg-black/60 px-2 py-1 rounded-full">
                  {isIN ? "Ab" : "With RIZN"}
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-muted mb-3">
              {isIN ? "1 din pehle aisa notification" : "Notification like this — 1 day early"}
            </p>

            {/* Fixed min-height — prevents page jump when demo toggles */}
            <div className="min-h-[148px]">
              {showNotif ? (
                <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black font-bold text-sm shrink-0">
                      R
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-white mb-1">
                        {isIN ? "RIZN · EMI Reminder" : "RIZN · Bill Reminder"}
                      </p>
                      <p className="text-sm text-white/95 leading-relaxed break-words line-clamp-4">
                        {notifText}
                      </p>
                      <p className="text-[11px] sm:text-xs text-gold-light mt-2">
                        {isIN
                          ? "Kal due · Aap capable hain — balance check kijiye"
                          : "Due tomorrow · You've got this — check your balance"}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="min-h-[148px] rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-muted text-sm">
                  {isIN ? "Form fill ho raha hai…" : "Setting up…"}
                </div>
              )}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="soft-card rounded-xl p-3">
                <p className="text-red-300/90 font-medium">{isIN ? "Pehle" : "Before"}</p>
                <p className="text-muted mt-1">
                  {isIN ? "Date miss, stress, guilt" : "Missed dates, stress, guilt"}
                </p>
              </div>
              <div className="soft-card rounded-xl p-3 border border-gold/20">
                <p className="text-success font-medium">
                  {isIN ? "Ab RIZN ke saath" : "With RIZN"}
                </p>
                <p className="text-muted mt-1">
                  {isIN ? "1 din pehle alert, control me" : "1-day early alert, in control"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
