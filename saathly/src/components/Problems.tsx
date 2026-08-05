"use client";

import { Wallet, HeartPulse, HeartCrack, Briefcase, Brain, CreditCard } from "lucide-react";
import { useLocale } from "@/context/LocaleContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { regionPersonalPriceLabel } from "@/lib/pricing";

export function Problems() {
  const { region, currency, preferEnglish } = useLocale();
  const config = useSiteConfig();
  const isIN = region === "IN" && !preferEnglish;
  const priceLabel = regionPersonalPriceLabel(config, region);

  const problems = [
    {
      icon: Wallet,
      who: isIN ? "Money stress" : "Money stress",
      pain: isIN
        ? "EMIs, bills, and salary delays keep your mind running at night."
        : "Bills, rent, and paycheck timing keep your mind running at night.",
      help: "Short money reminders and small savings actions — without panic.",
    },
    {
      icon: Briefcase,
      who: "Work burnout",
      pain: "Long hours, skipped meals, and work following you home.",
      help: "Break and boundary reminders before you hit a wall.",
    },
    {
      icon: HeartCrack,
      who: "Emotional weight",
      pain: "Breakups, loneliness, or feeling like no one understands.",
      help: "Calm, direct language — no toxic positivity.",
    },
    {
      icon: HeartPulse,
      who: "Health neglected",
      pain: "Poor food choices, dehydration, no movement.",
      help: "Gentle nudges for meals, water, walks, and sleep.",
    },
    {
      icon: Brain,
      who: "Overthinking",
      pain: "Night loops, Sunday anxiety, a mind that will not switch off.",
      help: "Mood check-ins and a softer evening close.",
    },
    {
      icon: CreditCard,
      who: isIN ? "EMI miss ho jati hai" : "Bills slip through",
      pain: isIN
        ? "Date miss ho jaye, stress badhe, confidence kam ho."
        : "Due dates slip, stress rises, confidence drops.",
      help: isIN
        ? `1 din pehle alert — naam, amount, bank sab clear. ${priceLabel} plan me included.`
        : `Alert 1 day early — name, amount, provider clear. Included in the ${priceLabel} plan.`,
    },
  ];

  return (
    <section id="problems" className="py-14 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">What we help with</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Messages matched to your situation
          </h2>
          <p className="text-ink-soft leading-relaxed">
            You choose up to three focus areas. RIZN tailors tone and content to what is actually
            going on — not one-size-fits-all advice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p) => (
            <article
              key={p.who}
              className="soft-card rounded-2xl p-6 hover:border-gold/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                <p.icon size={20} className="text-gold-light" />
              </div>
              <h3 className="font-semibold text-lg text-white mb-2">{p.who}</h3>
              <p className="text-sm text-ink-soft mb-2">{p.pain}</p>
              <p className="text-sm text-white/90">{p.help}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
