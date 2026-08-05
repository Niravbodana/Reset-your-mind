import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Personal",
    price: "99",
    desc: "Solo rise system",
    popular: true,
    href: "/signup?plan=individual",
    features: [
      "6 personalized pulses / day",
      "Name + situation targeting",
      "Finance · health · love · career · mind",
      "Mood + streak tracking",
      "Weekly rise report",
      "Heavy-day soft mode",
      "Hinglish / Hindi / English",
    ],
  },
  {
    name: "Parivaar",
    price: "249",
    desc: "Up to 4 members",
    popular: false,
    href: "/signup?plan=family",
    features: [
      "Everything in Personal",
      "4 profiles & goals",
      "Family rise dashboard",
      "Parents / partner / siblings",
      "~₹62 per person",
      "Shared motivation culture",
      "Priority support",
    ],
  },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="section-label mb-3">Plans</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
              Clear price. Real rise.
            </h2>
            <p className="text-ink-soft">2 plans. 7 din free. Hidden fees zero.</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 md:p-8 relative ${
                plan.popular
                  ? "bg-gradient-to-b from-[#1a0a12] to-bg-card border border-laser/40 shadow-[0_0_40px_rgba(255,45,106,0.15)]"
                  : "soft-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 bg-laser text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-[0_0_16px_rgba(255,45,106,0.6)]">
                  MOST CHOSEN
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
                7 din free try
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
