"use client";

import { motion } from "framer-motion";

const schedule = [
  { time: "9:00 AM", type: "Morning Power", emoji: "🌅", msg: "Naya din, naya mauka" },
  { time: "11:00 AM", type: "Focus & Work", emoji: "💼", msg: "Deep breath, tu capable hai" },
  { time: "1:00 PM", type: "Health Check", emoji: "🍽️", msg: "Khana khaya? Body ko mat bhoolo" },
  { time: "3:00 PM", type: "Energy Boost", emoji: "⚡", msg: "Thak gaya? Paani pi, 2 min walk" },
  { time: "5:00 PM", type: "Finance Mindset", emoji: "💰", msg: "Chhota saving = bada future" },
  { time: "9:00 PM", type: "Evening Calm", emoji: "🌙", msg: "Aaj ke liye proud ho. Rest karo." },
];

export function DailySchedule() {
  return (
    <section className="py-16 md:py-20 border-y border-gold/5">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-medium mb-2">Daily schedule</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold">
            Tumhara din — <span className="gradient-gold">har 2 ghante ek saathi</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {schedule.map((item, i) => (
            <motion.div
              key={item.time}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-4 text-center hover:border-gold/20 transition-colors group"
            >
              <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">
                {item.emoji}
              </span>
              <p className="text-xs font-semibold text-gold-light">{item.time}</p>
              <p className="text-[10px] text-muted mt-1">{item.type}</p>
              <p className="text-[10px] text-foreground/70 mt-2 leading-snug hidden md:block">
                {item.msg}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
