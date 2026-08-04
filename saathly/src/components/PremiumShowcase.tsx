"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { Sparkles, Heart, TrendingUp } from "lucide-react";

const highlights = [
  {
    icon: Sparkles,
    title: "Tumhare naam ke saath",
    desc: "Har message personally addressed — jaise koi apna tumhe samajh ke bol raha ho.",
    stat: "100%",
    statLabel: "personalized",
  },
  {
    icon: Heart,
    title: "Dil se likha hua",
    desc: "Generic quotes nahi — real life ke problems ke liye real, warm, Hinglish messages.",
    stat: "6,000+",
    statLabel: "message variants",
  },
  {
    icon: TrendingUp,
    title: "Life me measurable change",
    desc: "Streak, mood tracking, weekly reports — tum khud dekho kitna aage badhe ho.",
    stat: "+23%",
    statLabel: "avg mood boost",
  },
];

export function PremiumShowcase() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Why NaamSaath</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-balance">
            Sirf app nahi — tumhara daily{" "}
            <span className="gradient-gold italic">life companion</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto font-light">
            Premium experience jo tumhe har step pe yaad dilaye — tu akela nahi hai, tu strong hai.
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="glass-gold rounded-2xl p-8 h-full shimmer-border group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-2xl bg-gold/10 group-hover:bg-gold/15 transition-colors">
                    <item.icon size={24} className="text-gold-light" />
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl gradient-gold font-semibold">{item.stat}</p>
                    <p className="text-[10px] text-muted uppercase tracking-wider">{item.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
