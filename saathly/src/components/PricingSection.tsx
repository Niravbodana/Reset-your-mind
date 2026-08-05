"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { parivaarMonthlyPrice, parivaarPerPerson, personalMonthlyPrice } from "@/lib/pricing";

const plans = [
  {
    id: "personal" as const,
    name: "Personal",
    desc: "One person, full access",
    popular: true,
    features: [
      "Up to 6 personalized messages per day (4 in soft mode)",
      "Name and focus-area targeting",
      "Money, health, love, career, mind",
      "Mood and streak tracking in web preview",
      "Language: Hinglish, Hindi, or English (at signup)",
      "Soft mode on difficult days",
      "Weekly summary — planned at app launch",
    ],
  },
  {
    id: "parivaar" as const,
    name: "Parivaar",
    desc: "Up to 4 family members",
    popular: false,
    features: [
      "Everything in Personal",
      "4 separate profiles with own goals — at launch",
      "Family seat list in preview (shared dashboard planned)",
      "WhatsApp delivery — planned for Parivaar",
      "Dynamic per-person pricing shown below",
      "Priority support at launch",
    ],
  },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const config = useSiteConfig();
  const perPerson = parivaarPerPerson(config);

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Planned pricing — preview free abhi
            </h2>
            <p className="text-ink-soft text-sm">
              {config.features.earlyBirdActive && (
                <>
                  Early bird: Personal ₹{personalMonthlyPrice(config)} · Parivaar ₹
                  {parivaarMonthlyPrice(config)} &nbsp;·&nbsp;
                </>
              )}
              Launch target: ₹{config.marketing.launchPricePersonal}/₹{config.marketing.launchPriceParivaar} ·{" "}
              {config.marketing.trialDays} din trial jab billing live ho · No card required now
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => {
            const price =
              plan.id === "parivaar" ? parivaarMonthlyPrice(config) : personalMonthlyPrice(config);
            const launch =
              plan.id === "parivaar"
                ? config.marketing.launchPriceParivaar
                : config.marketing.launchPricePersonal;

            const features =
              plan.id === "parivaar"
                ? plan.features.map((f) =>
                    f === "Dynamic per-person pricing shown below"
                      ? `About ₹${perPerson} per person at current price`
                      : f
                  )
                : plan.features;

            return (
              <div
                key={plan.name}
                className={`rounded-2xl p-7 md:p-8 relative ${
                  plan.popular ? "bg-bg-card border border-gold/30" : "soft-card"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-6 bg-gold text-black text-[11px] font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                {config.features.earlyBirdActive && launch > price && (
                  <p className="text-xs text-gold-light mb-2 line-through">₹{launch}/mo launch target</p>
                )}
                <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-muted mb-5">{plan.desc}</p>
                <p className="mb-6">
                  <span className="font-display text-5xl font-bold text-white">₹{price}</span>
                  <span className="text-sm text-muted">/month planned</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm text-ink-soft">
                      <Check size={16} className="text-success shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/signup?plan=${plan.id}`}
                  className="btn-primary block text-center py-3.5 rounded-xl text-sm"
                >
                  Join waitlist — free preview
                </Link>
                <p className="text-[10px] text-center text-muted mt-3">
                  No payment today · Secure Razorpay when billing opens
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
