"use client";

import { Wallet, Heart, Activity, Briefcase, Brain, Users } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";
import { motion } from "framer-motion";

const areas = [
  {
    icon: Wallet,
    title: "Financial Strength",
    desc: "EMI stress, savings, side income — har din chhota step, bada future.",
    example: '"Nirav, aaj ₹100 bachaa — ye teri freedom ki shuruaat hai."',
    gradient: "from-emerald-600/20 to-teal-900/10",
  },
  {
    icon: Heart,
    title: "Love & Relationships",
    desc: "Breakup, loneliness, family tension — healing messages bina judgment ke.",
    example: '"Dil toota hai, par tu toota nahi hai. Aaj khud ke liye 10 min."',
    gradient: "from-rose-600/20 to-pink-900/10",
  },
  {
    icon: Activity,
    title: "Health & Body",
    desc: "Khana, paani, walk, sleep — body strong = mind strong.",
    example: '"1:00 PM ho gaya — khana khaya? Body ko mat bhoolo."',
    gradient: "from-sky-600/20 to-blue-900/10",
  },
  {
    icon: Briefcase,
    title: "Work & Career",
    desc: "Burnout, workload, boss stress — boundary aur confidence dono.",
    example: '"10 ghante kaam kiya — par tu machine nahi hai. Break le."',
    gradient: "from-amber-600/20 to-orange-900/10",
  },
  {
    icon: Brain,
    title: "Mind & Mood",
    desc: "Anxiety, overthinking, low days — gentle support har mood ke liye.",
    example: '"Aaj heavy feel ho raha hai? Normal hai. Kal better hoga."',
    gradient: "from-violet-600/20 to-purple-900/10",
  },
  {
    icon: Users,
    title: "Family & Life",
    desc: "Parents, bachche, responsibilities — tum achha kar rahe ho.",
    example: '"Tu sab sambhalta hai — aaj 5 min sirf apne liye."',
    gradient: "from-indigo-600/20 to-blue-900/10",
  },
];

export function LifeAreas() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">6 Life Areas</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 text-white">
            Har problem ke liye <span className="gradient-gold italic">ek saathi</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <StaggerItem key={area.title}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`rounded-2xl p-7 bg-gradient-to-br ${area.gradient} border border-white/[0.06] hover:border-gold/20 transition-colors h-full`}
              >
                <div className="p-3 rounded-xl bg-black/25 w-fit mb-4">
                  <area.icon size={20} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{area.title}</h3>
                <p className="text-sm text-muted mb-4 leading-relaxed font-light">{area.desc}</p>
                <p className="text-xs italic text-gold-light/70 border-l-2 border-gold/30 pl-3 font-light">
                  {area.example}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
