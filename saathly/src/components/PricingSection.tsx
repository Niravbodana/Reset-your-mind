import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Personal",
    price: "99",
    desc: "Apne liye — daily companion",
    popular: true,
    href: "/signup?plan=individual",
    features: [
      "6 personalized messages / day",
      "Naam + situation ke hisaab se",
      "Finance, health, love, career, mind",
      "Mood check-in + streak",
      "Weekly progress summary",
      "Heavy-day soft mode",
      "Hinglish / Hindi / English",
    ],
  },
  {
    name: "Parivaar",
    price: "249",
    desc: "4 members tak — ek ghar, ek plan",
    popular: false,
    href: "/signup?plan=family",
    features: [
      "Personal plan ki saari cheezein",
      "4 alag profiles & goals",
      "Family progress view",
      "Parents / partner / siblings",
      "Shared motivation culture ghar me",
      "Better value: ~₹62 / person",
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
            <p className="section-label mb-3">Simple plans</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-3">
              Ek chai se kam. Mind ke liye roz.
            </h2>
            <p className="text-ink-soft">
              Do hi plans. Hidden fees nahi. 7 din free — pasand na aaye to cancel.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 md:p-8 relative ${
                plan.popular
                  ? "bg-bg-deep text-white"
                  : "soft-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 bg-accent text-white text-[11px] font-bold px-3 py-1 rounded-full">
                  Most chosen
                </span>
              )}
              <h3 className="font-display text-2xl font-semibold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-5 ${plan.popular ? "text-white/55" : "text-muted"}`}>
                {plan.desc}
              </p>
              <p className="mb-6">
                <span className="font-display text-5xl font-semibold">₹{plan.price}</span>
                <span className={`text-sm ${plan.popular ? "text-white/50" : "text-muted"}`}>
                  /month
                </span>
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <Check
                      size={16}
                      className={`shrink-0 mt-0.5 ${plan.popular ? "text-accent" : "text-success"}`}
                    />
                    <span className={plan.popular ? "text-white/80" : "text-ink-soft"}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block text-center py-3.5 rounded-xl text-sm font-semibold ${
                  plan.popular
                    ? "bg-accent text-white hover:bg-accent-deep"
                    : "btn-primary"
                } transition-colors`}
              >
                7 din free try karo
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted mt-8 max-w-lg mx-auto">
          Dost ko invite karo — dono ko 1 mahina free. Real change share karna hi sabse strong marketing
          hai.
        </p>
      </div>
    </section>
  );
}
