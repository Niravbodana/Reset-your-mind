"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MESSAGE_BANK } from "@/lib/message-bank";
import { formatEmiNotification, DEMO_EMI } from "@/lib/emi-reminder";
import { ScrollReveal } from "./ScrollReveal";

/** Same person — pehle (filtered) → ab (full) crossfade, ek ke baad ek */
const STORIES = [
  {
    id: "priya",
    name: "Priya ji",
    image: "/images/testimonial-priya.jpg",
    before: "Pehle: raat ko neend nahi, subah zero motivation, akela lagta tha.",
    after: "Ab: har din ek message — chhota step. Streak ban gaya, life control me.",
    message: MESSAGE_BANK[0].hinglish.replace("{name}", "Priya ji"),
    action: MESSAGE_BANK[0].microAction,
  },
  {
    id: "rahul",
    name: "Anand ji",
    image: "/images/testimonial-rahul.jpg",
    before: "Pehle: EMI date miss, late fee lag jati thi, bank call se dar.",
    after: "Ab: 1 din pehle alert — balance ready, tension kam, credit safe.",
    message: formatEmiNotification("Anand", DEMO_EMI, "hinglish"),
    action: "Balance check karo aaj",
  },
  {
    id: "ananya",
    name: "Ananya ji",
    image: "/images/testimonial-ananya.jpg",
    before: "Pehle: overthink, phone scroll, khud ke liye time zero.",
    after: "Ab: roz apne naam pe nudge — health, paisa, dil sab cover.",
    message: MESSAGE_BANK[8].hinglish.replace("{name}", "Ananya ji"),
    action: MESSAGE_BANK[8].microAction,
  },
];

type Phase = "before" | "after";

const BEFORE_MS = 4500;
const AFTER_MS = 4500;

export function HopeTransformation() {
  const [storyIdx, setStoryIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("before");

  const story = STORIES[storyIdx];
  const isBefore = phase === "before";

  useEffect(() => {
    const ms = phase === "before" ? BEFORE_MS : AFTER_MS;
    const t = setTimeout(() => {
      if (phase === "before") {
        setPhase("after");
      } else {
        setStoryIdx((i) => (i + 1) % STORIES.length);
        setPhase("before");
      }
    }, ms);
    return () => clearTimeout(t);
  }, [phase, storyIdx]);

  const goTo = (i: number) => {
    setStoryIdx(i);
    setPhase("before");
  };

  return (
    <section className="py-20 md:py-28 border-y border-white/5 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="section-label mb-3">Pehle vs Ab</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Life change ka reason — <span className="text-gold-light">hope wapas.</span>
          </h2>
          <p className="text-ink-soft text-sm md:text-base leading-relaxed">
            Same insaan — pehle struggle, phir RIZN ke saath control. Real feel, real change.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Single slot — pehle → ab smooth crossfade, same photo */}
          <ScrollReveal delay={0.1}>
            <div className="relative max-w-md mx-auto w-full">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${story.id}-${phase}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={story.image}
                      alt={story.name}
                      fill
                      priority={storyIdx === 0}
                      className="object-cover object-top transition-all duration-[900ms]"
                      style={{
                        filter: isBefore
                          ? "grayscale(0.85) brightness(0.55) contrast(1.05)"
                          : "grayscale(0) brightness(1) contrast(1)",
                      }}
                      sizes="(max-width: 768px) 90vw, 400px"
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-[900ms] ${
                        isBefore
                          ? "bg-gradient-to-t from-black/95 via-red-950/40 to-black/30"
                          : "bg-gradient-to-t from-black/90 via-emerald-950/20 to-transparent"
                      }`}
                    />
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                      <motion.span
                        key={`badge-${phase}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isBefore
                            ? "bg-red-500/20 text-red-200 border border-red-400/30"
                            : "bg-emerald-500/20 text-emerald-200 border border-emerald-400/30"
                        }`}
                      >
                        {isBefore ? "Pehle" : "Ab RIZN ke saath"}
                      </motion.span>
                      <span className="text-xs text-white/70 font-medium">{story.name}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <motion.p
                        key={`cap-${story.id}-${phase}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-sm md:text-base text-white font-medium leading-relaxed"
                      >
                        {isBefore ? story.before : story.after}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="mt-4 flex items-center gap-3">
                {STORIES.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-label={s.name}
                    onClick={() => goTo(i)}
                    className="flex-1 group"
                  >
                    <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className="h-full bg-gold rounded-full"
                        initial={{ width: "0%" }}
                        animate={{
                          width:
                            i < storyIdx
                              ? "100%"
                              : i === storyIdx
                                ? isBefore
                                  ? "50%"
                                  : "100%"
                                : "0%",
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                    <p
                      className={`text-[10px] mt-1.5 text-center transition-colors ${
                        i === storyIdx ? "text-gold-light" : "text-muted"
                      }`}
                    >
                      {s.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Message — synced with current story, always visible min-height */}
          <ScrollReveal delay={0.15} className="space-y-6">
            <div className="soft-card rounded-2xl p-5 border border-gold/20">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-gold-light mb-3">
                Phone pe aise messages — {story.name}
              </p>

              <div className="min-h-[160px] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${story.id}-${phase}-msg`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    className="rounded-xl bg-[#14141c] border border-white/15 p-4 shadow-inner"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center text-black text-xs font-bold shrink-0">
                        R
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">RIZN</p>
                        <p className="text-[10px] text-white/50">now · notification</p>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed text-white">{story.message}</p>
                    <p className="text-xs text-gold-light mt-3 font-medium">→ {story.action}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-[11px] text-muted mt-3">
                {isBefore ? "Pehle aisa message nahi tha…" : "Ab roz aisa value milta hai — habit ban jati hai"}
              </p>
            </div>

            <ul className="space-y-3 text-sm text-ink-soft">
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                Same insaan — pehle vs ab, real transformation
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                EMI 1 din pehle — late fee se bacho
              </li>
              <li className="flex gap-2">
                <span className="text-gold-light">✓</span>
                50+ unique messages — kabhi boring nahi
              </li>
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
