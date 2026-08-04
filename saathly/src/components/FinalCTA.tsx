"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Zap } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const trust = [
  { icon: Clock, text: "7 din free — bina card ke" },
  { icon: Shield, text: "Data safe — kabhi share nahi" },
  { icon: Zap, text: "Cancel anytime — 1 click" },
];

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <ScrollReveal direction="scale">
          <div className="relative glass-gold rounded-[2rem] p-12 md:p-20 text-center glow-gold-strong shimmer-border overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-30"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(201,169,98,0.15), transparent 50%), radial-gradient(circle at 70% 80%, rgba(124,108,191,0.1), transparent 50%)",
              }}
              animate={{ opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-5 relative text-white text-balance">
              Aaj se tumhara naya din{" "}
              <span className="gradient-gold italic">shuru</span>
            </h2>
            <p className="text-muted text-lg mb-10 max-w-lg mx-auto relative font-light">
              Kal regret mat karo ke shuru nahi kiya. 7 din free me try karo — agar life me farq
              mehsoos nahi hua, cancel kar dena.
            </p>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="relative">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center gap-2 px-12 py-4 rounded-full text-lg"
              >
                Abhi Free Shuru Karo
                <ArrowRight size={20} />
              </Link>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mt-10 relative">
              {trust.map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-xs text-muted">
                  <item.icon size={14} className="text-gold" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
