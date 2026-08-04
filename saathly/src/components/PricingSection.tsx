"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Users, User, Gift } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const plans = [
  {
    id: "individual",
    name: "Prerna Plan",
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
      "Sab kuch Prerna Plan me hai",
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
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {showTitle && (
          <ScrollReveal className="text-center mb-16">
            <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Simple pricing</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-white">
              Ek chai ke price me — <span className="gradient-gold italic">poori zindagi badlo</span>
            </h2>
            <p className="text-muted max-w-xl mx-auto font-light">
              Sirf 2 plans. Koi hidden charges nahi. 7 din free try karo.
            </p>
          </ScrollReveal>
        )}

        <StaggerContainer className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <StaggerItem key={plan.id}>
              <motion.div
                whileHover={{ y: -6 }}
                className={`relative rounded-3xl p-8 md:p-10 h-full ${
                  plan.popular
                    ? "glass-gold glow-gold-strong shimmer-border"
                    : "glass border border-gold/10"
                }`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold via-gold-light to-gold text-background text-[10px] font-bold px-5 py-1.5 rounded-full uppercase tracking-wider"
                  >
                    Sabse Popular
                  </motion.span>
                )}

                <div className="flex items-center gap-3 mb-5">
                  <div className="p-3 rounded-2xl bg-gold/10">
                    <plan.icon size={22} className="text-gold-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{plan.name}</h3>
                    <p className="text-xs text-muted font-light">{plan.desc}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-display font-bold gradient-gold">₹{plan.price}</span>
                  <span className="text-muted text-sm">/{plan.period}</span>
                  {plan.savings && (
                    <p className="text-xs text-emerald-400/90 mt-2 font-medium">{plan.savings}</p>
                  )}
                </div>

                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check size={16} className="text-gold shrink-0 mt-0.5" />
                      <span className="text-muted font-light">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href={plan.href}
                    className={`block text-center py-4 rounded-full font-semibold text-sm transition-all ${
                      plan.popular ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </motion.div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <ScrollReveal delay={0.2} className="mt-12">
          <div className="glass-gold rounded-2xl p-6 max-w-2xl mx-auto flex items-start gap-4 shimmer-border">
            <Gift size={24} className="text-gold-light shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1">Dost ko bhejo, 1 mahina free pao</p>
              <p className="text-xs text-muted leading-relaxed font-light">
                Jab tumhara dost signup kare tumhare link se, tumhe aur unhe dono ko 1 mahina free
                milega.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
