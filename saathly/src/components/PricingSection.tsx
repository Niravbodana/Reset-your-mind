"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { parivaarPerPerson } from "@/lib/pricing";
import { OfferPrice } from "./OfferPrice";

const plans = [
  {
    id: "personal" as const,
    name: "Personal",
    desc: "One person, full schedule control",
    popular: true,
    features: [
      "Message interval: 30 min, 1h, 2h, 3h, or 4h — you choose",
      "Settings: wake, sleep, lunch, dinner, gym, yoga, medicine",
      "Name + focus-area personalized messages",
      "Money, health, love, career, mind",
      "Mood and streak tracking",
      "Hinglish, Hindi, or English",
      "Soft mode on difficult days",
    ],
  },
  {
    id: "parivaar" as const,
    name: "Parivaar",
    desc: "Up to 4 family members",
    popular: false,
    features: [
      "Everything in Personal for each member",
      "4 separate profiles with own schedule — at launch",
      "Family seat list in preview",
      "WhatsApp delivery — planned",
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
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
              Limited time — ₹99 instead of ₹199
            </h2>
            <p className="text-ink-soft text-sm leading-relaxed">
              Web preview free abhi. Jab billing live ho, early access wale is rate pe lock ho sakte ho.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => {
            const features =
              plan.id === "parivaar"
                ? plan.features.map((f) =>
                    f === "Dynamic per-person pricing shown below"
                      ? `About ₹${perPerson} per person at offer price`
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
                <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-muted mb-5">{plan.desc}</p>
                <OfferPrice plan={plan.id} className="mb-6" />
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
                  className="btn-primary block text-center py-3.5 rounded-xl text-sm font-semibold"
                >
                  Join waitlist — free preview
                </Link>
                <p className="text-[10px] text-center text-muted mt-3">
                  No payment today · Settings unlock after signup
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
