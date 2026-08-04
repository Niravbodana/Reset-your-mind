"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Users, User, Gift } from "lucide-react";

const plans = [
  {
    id: "individual",
    name: "Saath Plan",
    price: 99,
    period: "month",
    icon: User,
    popular: true,
    desc: "Apne liye — har din personalized motivation",
    features: [
      "6 messages har din (har 2 ghante)",
      "Sab 6 life areas covered",
      "Tumhare naam ke saath messages",
      "Mood check-in & streak tracking",
      "Weekly progress report",
      "21-day transformation programs",
      "Crisis mode — jab din heavy ho",
      "Hinglish / Hindi / English",
    ],
    cta: "7 Din Free Try Karo",
    href: "/signup?plan=individual",
  },
  {
    id: "family",
    name: "Parivaar Plan",
    price: 249,
    period: "month",
    icon: Users,
    popular: false,
    desc: "Pure parivaar ke liye — 4 members tak",
    features: [
      "Sab kuch Saath Plan me hai",
      "4 family members add karo",
      "Har member ka alag profile & goals",
      "Family streak dashboard",
      "Parents, partner, bachche — sab cover",
      "Ek payment, poora ghar motivated",
      "Family weekly report",
      "Priority support",
    ],
    cta: "Parivaar ke liye Shuru Karo",
    href: "/signup?plan=family",
    savings: "4 log = ₹62/person — 37% bachat",
  },
];

export function PricingSection({ showTitle = true }: { showTitle?: boolean }) {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <div className="text-center mb-16">
            <p className="text-gold text-sm font-medium mb-2">Simple pricing</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ek chai ke price me — <span className="gradient-gold">poori zindagi badlo</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto">
              Sirf 2 plans. Koi hidden charges nahi. 7 din free try karo, pasand na aaye to cancel.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "glass-gold glow-gold border-gold/30"
                  : "glass border-gold/10"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-gold-dark text-background text-xs font-bold px-4 py-1 rounded-full">
                  SABSE POPULAR
                </span>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-xl bg-gold/10">
                  <plan.icon size={22} className="text-gold-light" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  <p className="text-xs text-muted">{plan.desc}</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold text-gold-light">₹{plan.price}</span>
                <span className="text-muted text-sm">/{plan.period}</span>
                {plan.savings && (
                  <p className="text-xs text-emerald-400 mt-1">{plan.savings}</p>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className="text-gold shrink-0 mt-0.5" />
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block text-center py-3.5 rounded-full font-semibold text-sm transition-all ${
                  plan.popular ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 glass-gold rounded-2xl p-6 max-w-2xl mx-auto flex items-start gap-4">
          <Gift size={24} className="text-gold-light shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-sm mb-1">Dost ko bhejo, 1 mahina free pao</p>
            <p className="text-xs text-muted leading-relaxed">
              Jab tumhara dost signup kare tumhare link se, tumhe aur unhe dono ko 1 mahina free
              milega. Zyada logon ki life badlegi, zyada tum bachoge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
