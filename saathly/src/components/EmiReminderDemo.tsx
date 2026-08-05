"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Building2, Calendar, IndianRupee, User } from "lucide-react";
import Link from "next/link";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

const STEPS = [
  { icon: User, label: "Naam", value: "Rahul" },
  { icon: IndianRupee, label: "Amount", value: "₹12,500" },
  { icon: Calendar, label: "EMI date", value: "5 har mahine" },
  { icon: Building2, label: "Bank / NBFC", value: "HDFC Bank" },
];

export function EmiReminderDemo() {
  const [step, setStep] = useState(0);
  const [showNotif, setShowNotif] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          setShowNotif(true);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setShowNotif((v) => !v);
      setStep(0);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const notifText = formatEmiNotification("Rahul", DEMO_EMI, "hinglish");

  return (
    <section id="emi-reminder" className="py-14 sm:py-20 md:py-28 border-y border-white/5 bg-bg-elevated/40 overflow-x-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-8 sm:mb-14">
          <p className="section-label mb-3">EMI Reminder — included in ₹99 plan</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            EMI yaad dilana? <span className="text-gold-light">1 din pehle, caring alert.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            Naam, amount, date, bank/NBFC — 30 second me set. Kal EMI hai to aaj supportive
            notification — tension kam, confidence zyada. Aap capable hain.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 items-start">
          <div className="premium-card rounded-2xl p-4 sm:p-6 border border-gold/20">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold-light mb-4">
              Easy setup — 4 fields
            </p>
            <div className="space-y-3">
              {STEPS.map((s, i) => (
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
              ₹99 plan join karo — EMI reminder free
              <ArrowRight size={16} className="shrink-0" />
            </Link>
          </div>

          <div className="relative min-w-0">
            <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6">
              <div className="relative aspect-[3/4] min-h-[140px] bg-[#1a1520] overflow-hidden">
                <Image
                  src="/images/animatic-before-emi.jpg"
                  alt="EMI tension"
                  fill
                  className="object-cover brightness-75"
                  sizes="(max-width: 768px) 45vw, 200px"
                />
                <div className="absolute inset-0 bg-red-950/30" />
                <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] font-bold uppercase text-red-200 bg-black/60 px-2 py-1 rounded-full">
                  Pehle
                </span>
              </div>
              <div className="relative aspect-[3/4] min-h-[140px] bg-[#151510] overflow-hidden">
                <Image
                  src="/images/animatic-after-emi.jpg"
                  alt="EMI peace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 45vw, 200px"
                />
                <div className="absolute inset-0 bg-gold/10" />
                <span className="absolute top-2 left-2 text-[10px] sm:text-[11px] font-bold uppercase text-gold-light bg-black/60 px-2 py-1 rounded-full">
                  Ab
                </span>
              </div>
            </div>

            <p className="text-center text-xs text-muted mb-3">1 din pehle aisa notification</p>

            {showNotif ? (
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-4 shadow-2xl">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center text-black font-bold text-sm shrink-0">
                    R
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white mb-1">RIZN · EMI Reminder</p>
                    <p className="text-sm text-white/95 leading-relaxed break-words">{notifText}</p>
                    <p className="text-[11px] sm:text-xs text-gold-light mt-2">
                      Kal due · Aap capable hain — balance check kijiye
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-24 rounded-2xl border border-dashed border-white/10 flex items-center justify-center text-muted text-sm">
                Form fill ho raha hai…
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="soft-card rounded-xl p-3">
                <p className="text-red-300/90 font-medium">Pehle</p>
                <p className="text-muted mt-1">Date miss, stress, guilt</p>
              </div>
              <div className="soft-card rounded-xl p-3 border border-gold/20">
                <p className="text-success font-medium">Ab RIZN ke saath</p>
                <p className="text-muted mt-1">1 din pehle alert, control me</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
