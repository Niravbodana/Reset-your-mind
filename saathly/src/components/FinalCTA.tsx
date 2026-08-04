"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Zap } from "lucide-react";

const trust = [
  { icon: Clock, text: "7 din free — bina card ke" },
  { icon: Shield, text: "Data safe — kabhi share nahi" },
  { icon: Zap, text: "Cancel anytime — 1 click" },
];

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative glass-gold rounded-3xl p-10 md:p-16 text-center glow-gold overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-accent-purple/5 pointer-events-none" />

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 relative">
            Aaj se tumhara naya din <span className="gradient-gold">shuru</span>
          </h2>
          <p className="text-muted text-lg mb-8 max-w-lg mx-auto relative">
            Kal regret mat karo ke shuru nahi kiya. 7 din free me try karo — agar life me farq
            mehsoos nahi hua, cancel kar dena.
          </p>

          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-lg relative"
          >
            Abhi Free Shuru Karo
            <ArrowRight size={20} />
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mt-8 relative">
            {trust.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-xs text-muted">
                <item.icon size={14} className="text-gold" />
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
