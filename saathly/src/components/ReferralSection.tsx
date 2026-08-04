"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Share2, Users, Trophy, MessageCircle } from "lucide-react";

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
    title: "Daily Win Messages",
    desc: "Har din ek shareable card — tumhara naam, tumhara win. Logo sochenge ye kya app hai?",
  },
];

export function ReferralSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold text-sm font-medium mb-2">Community growth</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ek ne bataya, <span className="gradient-gold">dusra join kiya</span> — aise badhega Saathly
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              Jab tumhari life me change aata hai, tum automatically dusron ko batate ho. Humne isko
              easy banaya — refer karo, share karo, poora parivaar lao.
            </p>
            <Link href="/signup" className="btn-primary inline-flex px-6 py-3 rounded-full text-sm">
              Apna Referral Link Banao
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5 hover:border-gold/20 transition-colors"
              >
                <item.icon size={20} className="text-gold-light mb-3" />
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
