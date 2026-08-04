"use client";

import { motion } from "framer-motion";
import { Wallet, Heart, Activity, Briefcase, Brain, Users } from "lucide-react";

const areas = [
  {
    icon: Wallet,
    title: "Financial Strength",
    desc: "EMI stress, savings, side income — har din chhota step, bada future.",
    example: '"Nirav, aaj ₹100 bachaa — ye teri freedom ki shuruaat hai."',
    gradient: "from-emerald-600/30 to-teal-600/10",
  },
  {
    icon: Heart,
    title: "Love & Relationships",
    desc: "Breakup, loneliness, family tension — healing messages bina judgment ke.",
    example: '"Dil toota hai, par tu toota nahi hai. Aaj khud ke liye 10 min."',
    gradient: "from-rose-600/30 to-pink-600/10",
  },
  {
    icon: Activity,
    title: "Health & Body",
    desc: "Khana, paani, walk, sleep — body strong = mind strong.",
    example: '"1:00 PM ho gaya — khana khaya? Body ko mat bhoolo."',
    gradient: "from-blue-600/30 to-cyan-600/10",
  },
  {
    icon: Briefcase,
    title: "Work & Career",
    desc: "Burnout, workload, boss stress — boundary aur confidence dono.",
    example: '"10 ghante kaam kiya — par tu machine nahi hai. Break le."',
    gradient: "from-amber-600/30 to-orange-600/10",
  },
  {
    icon: Brain,
    title: "Mind & Mood",
    desc: "Anxiety, overthinking, low days — gentle support har mood ke liye.",
    example: '"Aaj heavy feel ho raha hai? Normal hai. Kal better hoga."',
    gradient: "from-purple-600/30 to-violet-600/10",
  },
  {
    icon: Users,
    title: "Family & Life",
    desc: "Parents, bachche, responsibilities — tum achha kar rahe ho, yaad dilayenge.",
    example: '"Tu sab sambhalta hai — aaj 5 min sirf apne liye."',
    gradient: "from-indigo-600/30 to-blue-600/10",
  },
];

export function LifeAreas() {
  return (
    <section className="py-20 md:py-28 bg-surface/30">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-16">
          <p className="text-gold text-sm font-medium mb-2">6 Life Areas</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Har problem ke liye <span className="gradient-gold">ek saathi</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Finance ho ya love, health ho ya career — har area ke liye alag messages, tumhare naam ke saath.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-2xl p-6 bg-gradient-to-br ${area.gradient} border border-white/5 hover:border-gold/20 transition-all group`}
            >
              <div className="p-3 rounded-xl bg-black/20 w-fit mb-4">
                <area.icon size={22} className="text-gold-light" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{area.title}</h3>
              <p className="text-sm text-muted mb-4 leading-relaxed">{area.desc}</p>
              <p className="text-xs italic text-gold-light/80 border-l-2 border-gold/30 pl-3">
                {area.example}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
