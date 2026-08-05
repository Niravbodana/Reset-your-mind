"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { NotificationPhone } from "./NotificationPhone";

const templates = [
  (n: string) =>
    `${n}, start with one thing: drink water and take a 5-minute walk. Small actions keep the day steady.`,
  (n: string) =>
    `${n}, money stress is common. Today, move ₹50 to savings — one step, not a full plan.`,
  (n: string) =>
    `${n}, if today feels heavy, pause for five minutes. You do not have to handle everything alone.`,
  (n: string) =>
    `${n}, work is piling up. Finish one task now; leave the rest for tomorrow.`,
  (n: string) =>
    `${n}, end the day calmly. Put the phone aside — tomorrow is a fresh start.`,
];

export function Hero() {
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || DEMO_NAME;
  const message = useMemo(() => templates[tick % templates.length](displayName), [displayName, tick]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN personalized daily motivation"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/88 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-black/40" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="inline-block text-xs font-semibold uppercase tracking-widest text-gold-light mb-5">
              Personalized daily motivation
            </p>

            <h1 className="font-display text-[2.35rem] sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight mb-5 text-white">
              Messages with your name,
              <br />
              every two hours,
              <br />
              <span className="text-gold-light">when you need them.</span>
            </h1>

            <p className="text-base md:text-lg text-ink-soft max-w-lg leading-relaxed mb-8">
              RIZN helps with money stress, health habits, relationships, career pressure, and mental
              clarity — through short, personal nudges in Hinglish, Hindi, or English. Website preview
              available now; mobile app coming soon.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base"
              >
                Join early access
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/#notifications"
                className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-xl text-base"
              >
                How notifications work
              </Link>
            </div>

            <p className="text-sm text-muted">
              Planned from ₹99/month · Preview free on web · No payment required to try
            </p>
          </motion.div>

          <motion.div
            id="feel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="hidden lg:block absolute -left-4 top-8 z-10">
              <NotificationPhone name={displayName} />
            </div>

            <div className="lg:ml-[180px] soft-card rounded-2xl p-6 md:p-7">
              <p className="text-sm font-semibold text-white mb-1">Try it — enter your name</p>
              <p className="text-xs text-muted mb-4">This is how a real pulse will read</p>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Priya, Rahul, Ananya..."
                  maxLength={20}
                  className="flex-1 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-base text-white placeholder:text-muted focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/40"
                />
                <button
                  type="button"
                  onClick={() => setTick((t) => t + 1)}
                  className="btn-secondary rounded-xl px-4 text-sm whitespace-nowrap"
                >
                  Next
                </button>
              </div>

              <div className="rounded-xl bg-black/60 border border-white/10 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center text-xs font-bold text-black">
                    R
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">RIZN</p>
                    <p className="text-[11px] text-muted">Personalized pulse</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-white/95">{message}</p>
              </div>
            </div>

            <div className="lg:hidden mt-8">
              <NotificationPhone name={displayName} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
