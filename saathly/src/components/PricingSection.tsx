import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Personal",
    price: "99",
    desc: "Sirf tumhare liye",
    popular: true,
    href: "/signup?plan=individual",
    features: [
      "Roz 6 personalized messages",
      "Naam + situation targeting",
      "Paisa · health · pyaar · career · mind",
      "Mood + streak tracking",
      "Weekly progress report",
      "Heavy din pe soft mode",
      "Hinglish / Hindi / English",
    ],
  },
  {
    name: "Parivaar",
    price: "249",
    desc: "4 members tak",
    popular: false,
    href: "/signup?plan=family",
    features: [
      "Personal me sab kuch",
      "4 profiles & goals",
      "Family dashboard",
      "Parents / partner / siblings",
      "~₹62 per person",
      "Ghar me positive culture",
      "Priority support",
    ],
  },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section id="pricing" className="py-20 md:py-28 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Plans</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Ek coffee se kam — <span className="gradient-gold">poori life ka support</span>
            </h2>
            <p className="text-ink-soft">2 plans. 7 din free. Koi hidden charge nahi.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 md:p-8 relative ${
                plan.popular
                  ? "bg-gradient-to-b from-[#1a1508] to-bg-card border border-gold/40 shadow-[0_0_40px_rgba(201,162,39,0.15)]"
                  : "soft-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 bg-gold text-black text-[11px] font-bold px-3 py-1 rounded-full shadow-[0_0_16px_rgba(201,162,39,0.5)]">
                  SABSE POPULAR
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-muted mb-5">{plan.desc}</p>
              <p className="mb-6">
                <span className="font-display text-5xl font-bold text-white">₹{plan.price}</span>
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
                href={plan.href}
                className="btn-primary block text-center py-3.5 rounded-xl text-sm"
              >
                7 din free try karo
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
