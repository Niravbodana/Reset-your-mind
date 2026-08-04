"use client";

import { UserPlus, Target, BellRing, TrendingUp } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { motion } from "framer-motion";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Apna naam aur goals batao",
    desc: "2 minute me signup — naam, life areas, aur notification time set karo.",
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
    desc: "Subah 9 se raat 10 tak — 6 powerful messages jo mind stable rakhein.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Life me change dekho",
    desc: "Streak banao, weekly report dekho — aur feel karo difference.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-surface/20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Simple process</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
            4 steps me <span className="gradient-gold italic">zindagi badalna</span> shuru
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => (
            <StaggerItem key={item.step}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-gold rounded-2xl p-7 relative group h-full shimmer-border"
              >
                <span className="text-6xl font-display font-bold text-gold/[0.07] absolute top-3 right-4 select-none">
                  {item.step}
                </span>
                <div className="p-3 rounded-2xl bg-gold/10 w-fit mb-5 group-hover:scale-110 transition-transform">
                  <item.icon size={22} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
