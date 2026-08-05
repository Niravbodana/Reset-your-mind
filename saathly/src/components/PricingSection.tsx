"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

const plans = [
  {
    id: "personal" as const,
    name: "Personal",
    desc: "One person, full access",
    popular: true,
    features: [
      "6 personalized messages per day",
      "Name and focus-area targeting",
      "Money, health, love, career, mind",
      "Mood and streak tracking",
      "Weekly summary",
      "Soft mode on difficult days",
      "Hinglish, Hindi, or English",
    ],
  },
  {
    id: "parivaar" as const,
    name: "Parivaar",
    desc: "Up to 4 family members",
    popular: false,
    features: [
      "Everything in Personal",
      "4 profiles with separate goals",
      "Shared family dashboard",
      "Optional WhatsApp delivery",
      "About ₹62 per person",
      "Priority support at launch",
    ],
  },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  const config = useSiteConfig();

  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Simple plans — early bird chal raha hai
            </h2>
            <p className="text-ink-soft text-sm">
              {config.features.earlyBirdActive && (
                <>
                  Launch pe Personal ₹{config.marketing.launchPricePersonal} hoga · Abhi lock karo ₹
                  {config.marketing.earlyBirdPricePersonal} &nbsp;
                </>
              )}
              · {config.marketing.trialDays} din free trial jab billing live ho
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => {
            const price =
              plan.id === "parivaar"
                ? config.features.earlyBirdActive
                  ? config.marketing.earlyBirdPriceParivaar
                  : config.marketing.launchPriceParivaar
                : config.features.earlyBirdActive
                  ? config.marketing.earlyBirdPricePersonal
                  : config.marketing.launchPricePersonal;
            const launch =
              plan.id === "parivaar"
                ? config.marketing.launchPriceParivaar
                : config.marketing.launchPricePersonal;

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
                  <p className="text-xs text-gold-light mb-2 line-through">₹{launch}/mo launch price</p>
                )}
                <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-muted mb-5">{plan.desc}</p>
                <p className="mb-6">
                  <span className="font-display text-5xl font-bold text-white">₹{price}</span>
                  <span className="text-sm text-muted">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
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
                <p className="text-[10px] text-center text-muted mt-3">Cancel anytime · Secure Razorpay at launch</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
