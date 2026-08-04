"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

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
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center mb-14">
          <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Daily schedule</p>
          <h2 className="font-display text-2xl md:text-4xl font-semibold">
            Tumhara din — <span className="gradient-gold italic">har 2 ghante ek saathi</span>
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {schedule.map((item, i) => (
            <StaggerItem key={item.time}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass-gold rounded-2xl p-5 text-center h-full shimmer-border group cursor-default"
              >
                <motion.span
                  className="text-3xl mb-3 block"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                  {item.emoji}
                </motion.span>
                <p className="text-xs font-semibold text-gold-light">{item.time}</p>
                <p className="text-[10px] text-muted mt-1 uppercase tracking-wider">{item.type}</p>
                <p className="text-[10px] text-champagne/60 mt-3 leading-snug hidden md:block font-light">
                  {item.msg}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
