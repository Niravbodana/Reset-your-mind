"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { NotificationPhone } from "./NotificationPhone";
import { LiveStats } from "./LiveStats";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 glass-gold rounded-full px-4 py-1.5 text-xs text-gold-light mb-6">
              <Sparkles size={14} />
              <span>12,000+ logon ki zindagi me change aa chuka hai</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Har ghante tumhare{" "}
              <span className="gradient-gold">naam</span> ke saath — zindagi badalne wali motivation
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-8 max-w-lg">
              Finance ho, health ho, love ho ya work stress — Saathly har 2 ghante tumhe yaad dilata
              hai ke tum akela nahi ho. Tumhare naam ke saath, tumhari language me.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base"
              >
                7 Din Free Shuru Karo
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#how-it-works"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-full text-base"
              >
                Dekho kaise kaam karta hai
              </Link>
            </div>

            <LiveStats />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <NotificationPhone />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
