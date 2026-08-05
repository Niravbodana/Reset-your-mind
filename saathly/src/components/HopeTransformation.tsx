"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MESSAGE_BANK } from "@/lib/message-bank";

const previews = [
  MESSAGE_BANK[0],
  MESSAGE_BANK[8],
  MESSAGE_BANK[16],
  MESSAGE_BANK[24],
];

export function HopeTransformation() {
  const [showAfter, setShowAfter] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setShowAfter((v) => !v), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setMsgIdx((i) => (i + 1) % previews.length), 3500);
    return () => clearInterval(t);
  }, []);

  const sample = previews[msgIdx];
  const text = sample.hinglish.replace("{name}", "Priya ji");

  return (
    <section className="py-20 md:py-28 border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-label mb-3">Real change</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Pehle overwhelm. Phir ek rasta — <span className="text-gold-light">hope wapas.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            RIZN roz tumhare naam pe messages bhejta hai — chhote steps jo life me actually farak laate
            hain. Subscription isliye continue hota hai kyunki tum feel karte ho:{" "}
            <em className="text-white not-italic">ye alerts meri life better kar rahe hain.</em>
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative aspect-[4/5] max-w-md mx-auto w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {!showAfter ? (
                <motion.div
                  key="before"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/person-stressed.jpg"
                    alt="Before — stress and overwhelm"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-300/90 mb-2">
                      Before
                    </p>
                    <p className="text-white text-lg font-medium leading-snug">
                      &quot;Raat ko neend nahi, subah motivation zero, akela lagta hai.&quot;
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="after"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/images/person-happy.jpg"
                    alt="After — calm and rising"
                    fill
                    className="object-cover"
                    sizes="400px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-success mb-2">
                      After RIZN
                    </p>
                    <p className="text-white text-lg font-medium leading-snug">
                      &quot;Har din ek message — chhota step. Streak ban gaya, life control me.&quot;
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="soft-card rounded-2xl p-5 border border-gold/20">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-light mb-3">
                Aise messages aayenge
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={msgIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-xl bg-[#0b141a] border border-white/10 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-black text-xs font-bold">
                      R
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">RIZN</p>
                      <p className="text-[10px] text-muted">now</p>
                    </div>
                  </div>
                  <p className="text-[15px] leading-relaxed text-white/95">{text}</p>
                  <p className="text-xs text-gold-light mt-2">→ {sample.microAction}</p>
                </motion.div>
              </AnimatePresence>
              <p className="text-[11px] text-muted mt-3">
                Har message alag — kabhi repeat nahi jab tak naya pool na ho
              </p>
            </div>

            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                Priya ji, Anand ji — naam ke saath respect
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                50+ unique messages — roz naya value
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                Habit ban jata hai — subscription continue naturally
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
