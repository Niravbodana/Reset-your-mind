"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { OfferPrice } from "./OfferPrice";
import { ScrollReveal } from "./ScrollReveal";

const features = [
  "Daily personalized messages — naam ke saath, kabhi repeat nahi",
  "EMI reminder 1 din pehle — amount, date, bank/NBFC",
  "Schedule control: 30 min to 4 hour interval",
  "Wake, sleep, lunch, gym, medicine, dinner anchors",
  "Money, health, love, career, mind — tum choose karo",
  "Mood & streak tracking",
  "Hinglish, Hindi, or English",
  "Soft mode on difficult days",
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const config = useSiteConfig();

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Sirf <span className="text-gold-light">₹99</span> — poora plan
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              Daily motivation + EMI reminders. Limited time — launch pe ₹{config.marketing.launchPricePersonal}.
            </p>
          </ScrollReveal>
        )}

        <ScrollReveal delay={0.1} className="max-w-xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 relative bg-bg-card border border-gold/35 shadow-xl shadow-gold/5">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-black text-[11px] font-bold px-4 py-1 rounded-full">
              Life change plan
            </span>
            <h3 className="font-display text-2xl font-bold text-white mb-1 text-center">RIZN Personal</h3>
            <p className="text-sm text-muted mb-6 text-center">Messages + EMI reminders — sab included</p>
            <div className="flex justify-center mb-8">
              <OfferPrice plan="personal" size="lg" />
            </div>
            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                  <Check size={16} className="text-success shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="btn-primary block text-center py-4 rounded-xl text-base font-bold"
            >
              Abhi join karo — ₹99
            </Link>
            <p className="text-[10px] text-center text-muted mt-3">
              No payment today · {config.marketing.trialDays} din trial when billing opens
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
