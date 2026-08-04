"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const stories = [
  {
    name: "Priya S.",
    city: "Mumbai",
    area: "Financial stress",
    before: "Har raat EMI ke baare me sochti thi, neend nahi aati thi.",
    after: "30 din me ₹8000 save kiya. Ab har message pe action leti hoon.",
    days: 45,
    avatar: "PS",
  },
  {
    name: "Rahul K.",
    city: "Delhi",
    area: "Work burnout",
    before: "12 ghante office, ghar pe bhi kaam. Health bigad gayi thi.",
    after: "Ab lunch break leta hoon, walk karta hoon. Boss bhi notice kiya change.",
    days: 28,
    avatar: "RK",
  },
  {
    name: "Ananya M.",
    city: "Bangalore",
    area: "Heartbreak",
    before: "Breakup ke baad 2 mahine depression me thi. Kuch feel nahi hota tha.",
    after: "Roz naam sunke lagta hai koi hai. 21 din program ne bahut help ki.",
    days: 60,
    avatar: "AM",
  },
  {
    name: "Vikram P.",
    city: "Pune",
    area: "Health neglect",
    before: "Subah se shaam tak baitha rehta tha, junk food, zero exercise.",
    after: "Har message pe paani peeta hoon, 15 min walk. 4 kg kam!",
    days: 35,
    avatar: "VP",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % stories.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const story = stories[current];

  return (
    <section id="stories" className="py-24 md:py-32 bg-surface/20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <ScrollReveal className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3">Real stories</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4">
            Logon ki <span className="gradient-gold italic">zindagi badli</span>
          </h2>
        </ScrollReveal>

        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="glass-gold rounded-3xl p-8 md:p-12 glow-gold shimmer-border"
            >
              <Quote size={32} className="text-gold/30 mb-6" />

              <div className="grid sm:grid-cols-2 gap-5 mb-8">
                <div className="rounded-2xl bg-red-500/[0.06] border border-red-500/10 p-5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-red-400/70 mb-2">Pehle</p>
                  <p className="text-sm text-muted leading-relaxed font-light">{story.before}</p>
                </div>
                <div className="rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/10 p-5">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-emerald-400/70 mb-2">Ab</p>
                  <p className="text-sm text-champagne leading-relaxed">{story.after}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-sm font-bold text-background">
                    {story.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-xs text-muted">
                      {story.city} · {story.area}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-display font-bold gradient-gold">{story.days}</p>
                  <p className="text-[10px] text-muted uppercase tracking-wider">din streak</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + stories.length) % stories.length)}
              className="p-2 rounded-full glass hover:border-gold/30 transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft size={20} className="text-gold-light" />
            </button>
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-gold" : "w-2 bg-gold/20 hover:bg-gold/40"
                  }`}
                  aria-label={`Story ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % stories.length)}
              className="p-2 rounded-full glass hover:border-gold/30 transition-colors"
              aria-label="Next story"
            >
              <ChevronRight size={20} className="text-gold-light" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
