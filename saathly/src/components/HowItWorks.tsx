"use client";

import { motion } from "framer-motion";
import { UserPlus, Target, BellRing, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Apna naam aur goals batao",
    desc: "2 minute me signup — naam, life areas (finance, health, love, career), aur notification time set karo.",
  },
  {
    icon: Target,
    step: "02",
    title: "Tumhari personalized journey",
    desc: "Hum tumhari situation samajh kar messages banate hain — Hinglish me, tumhare naam ke saath.",
  },
  {
    icon: BellRing,
    step: "03",
    title: "Har 2 ghante motivation aaye",
    desc: "Subah 9 se raat 10 tak — 6 powerful messages jo mind stable rakhein aur action lein.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Life me change dekho",
    desc: "Streak banao, weekly report dekho, micro-actions complete karo — aur feel karo difference.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium mb-2">Simple process</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            4 steps me <span className="gradient-gold">zindagi badalna</span> shuru
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Koi complicated app nahi. Bas signup karo, aur pehle din se farq mehsoos karo.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-gold rounded-2xl p-6 relative group hover:border-gold/30 transition-colors"
            >
              <span className="text-5xl font-display font-bold text-gold/10 absolute top-4 right-4">
                {item.step}
              </span>
              <div className="p-3 rounded-xl bg-gold/10 w-fit mb-4 group-hover:bg-gold/15 transition-colors">
                <item.icon size={24} className="text-gold-light" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
