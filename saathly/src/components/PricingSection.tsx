"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { getMessageBankStats } from "@/lib/message-bank";
import { formatInrMonthly, personalMonthlyPrice, regionPersonalPriceLabel } from "@/lib/pricing";
import { OfferPrice } from "./OfferPrice";
import { ScrollReveal } from "./ScrollReveal";
import { UpiPayPreview } from "./UpiPayPreview";
import { NoSpamPromise } from "./NoSpamPromise";

const MESSAGE_COUNT = getMessageBankStats().total;

const COMPARE_ROWS = [
  { item: "Daily chai (₹30 × 30 days)", cost: "₹900/month", note: "Habit spend — not personalized" },
  { item: "One counselling session", cost: "₹2,000+", note: "Clinical — RIZN is not a substitute" },
  { item: "Generic quote apps", cost: "Free", note: "No name, no timing, no action" },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const config = useSiteConfig();
  const priceLabel = regionPersonalPriceLabel(config, "IN");
  const trialDays = config.marketing.trialDays;
  const price = personalMonthlyPrice(config, "INR");
  const launch = config.marketing.launchPricePersonal;
  const launchLabel = formatInrMonthly(launch);

  const includes = [
    `${MESSAGE_COUNT}+ personalized messages`,
    "Bill & EMI reminders (1 day early)",
    "Water, sleep, steps tracking",
    "Morning card & daily briefing",
    "Health score & weekly wins",
    "Soft Day, Pause, Streak Freeze",
    "Buddy check-in & referral",
    "English, Hinglish, Hindi",
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <ScrollReveal variant="blur-up" className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Simple. <span className="text-gold-light">{priceLabel}.</span> Everything included.
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              {trialDays}-day free trial. Cancel anytime. No hidden fees.
            </p>
          </ScrollReveal>
        )}

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <ScrollReveal variant="left" delay={0.05}>
            <div className="rounded-2xl p-6 sm:p-8 relative bg-bg-card border border-gold/35 shadow-xl shadow-gold/5">
              <span className="absolute -top-3 left-6 bg-gold text-black text-[11px] font-bold px-3 py-1 rounded-full">
                RIZN Personal
              </span>
              <div className="flex justify-start mb-6 mt-2">
                <OfferPrice plan="personal" size="lg" />
              </div>
              <ul className="space-y-3 mb-8">
                {includes.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                    <Check size={16} className="text-success shrink-0 mt-0.5" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="btn-primary block text-center py-4 rounded-xl text-base font-bold min-h-[52px]"
              >
                Start {trialDays}-day free trial
              </Link>
              <p className="text-xs text-center text-muted mt-3">
                ₹0 today · {trialDays} days free · Then {priceLabel} · Cancel anytime
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="right" delay={0.08}>
            <div className="premium-card rounded-2xl overflow-hidden border border-white/10">
              <div className="px-5 py-4 border-b border-white/10">
                <h3 className="font-semibold text-white text-sm">Why ₹99/month?</h3>
                <p className="text-xs text-muted mt-1">Less than chai. More personal than free apps.</p>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted text-xs border-b border-white/5">
                    <th className="px-5 py-3 font-semibold">Option</th>
                    <th className="px-5 py-3 font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((r) => (
                    <tr key={r.item} className="border-b border-white/5">
                      <td className="px-5 py-3.5 text-white/90">{r.item}</td>
                      <td className="px-5 py-3.5 text-ink-soft">{r.cost}</td>
                    </tr>
                  ))}
                  <tr className="bg-gold/5">
                    <td className="px-5 py-3.5 font-medium text-white">RIZN Personal</td>
                    <td className="px-5 py-3.5 font-semibold text-gold-light">{priceLabel}</td>
                  </tr>
                </tbody>
              </table>
              {config.features.earlyBirdActive && launch > price && (
                <p className="px-5 py-3 text-xs text-gold-light border-t border-white/5">
                  Early access {priceLabel} · Regular {launchLabel}
                </p>
              )}
            </div>
            <div className="mt-6">
              <UpiPayPreview />
            </div>
            <div className="mt-4">
              <NoSpamPromise />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
