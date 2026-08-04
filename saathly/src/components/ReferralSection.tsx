"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, Users, Trophy, MessageCircle } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

const features = [
  {
    icon: Share2,
    title: "Refer & Free Month",
    desc: "Dost ko invite karo — dono ko 1 mahina free. WhatsApp pe 1 click share.",
  },
  {
    icon: Trophy,
    title: "Streak Share Karo",
    desc: "30 din streak? Instagram story pe share karo — inspire karo aur khud bhi motivate raho.",
  },
  {
    icon: Users,
    title: "Family Plan = Viral",
    desc: "Ek member signup kare, poora parivaar join kare. Maa, papa, bhai — sab motivated.",
  },
  {
    icon: MessageCircle,
    title: "Daily Win Cards",
    desc: "Har din ek shareable card — tumhara naam, tumhara win. Logo sochenge ye kya app hai?",
  },
];

export function ReferralSection() {
  return (
    <section className="py-24 md:py-32 bg-surface/20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <ScrollReveal direction="left">
            <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Community growth</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-5 text-white">
              Ek ne bataya, <span className="gradient-gold italic">dusra join kiya</span>
            </h2>
            <p className="text-muted leading-relaxed mb-8 font-light">
              Jab tumhari life me change aata hai, tum automatically dusron ko batate ho. Humne isko
              easy banaya — refer karo, share karo, poora parivaar lao.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link href="/signup" className="btn-primary inline-flex px-8 py-3.5 rounded-full text-sm">
                Apna Referral Link Banao
              </Link>
            </motion.div>
          </ScrollReveal>

          <StaggerContainer className="grid sm:grid-cols-2 gap-4">
            {features.map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ y: -4, borderColor: "rgba(201,169,98,0.3)" }}
                  className="glass rounded-2xl p-6 h-full border border-transparent transition-colors"
                >
                  <item.icon size={20} className="text-gold-light mb-4" />
                  <h3 className="font-display text-base font-semibold mb-2">{item.title}</h3>
                  <p className="text-xs text-muted leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
