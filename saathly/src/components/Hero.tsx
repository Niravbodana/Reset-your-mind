"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

const templates = [
  (n: string) =>
    `${n}, system check: mind tired, still online. Ek chhota step le — aaj ka win yahi se shuru.`,
  (n: string) =>
    `${n}, money noise high hai. Panic mode off. Aaj ₹50 side me rakh — future signal green.`,
  (n: string) =>
    `${n}, body battery low. Khana + paani. Strong body = sharp mind. 10 min recharge.`,
  (n: string) =>
    `${n}, heart lag heavy? Normal. Tu akela process nahi kar raha. 5 min calm — then rise.`,
  (n: string) =>
    `${n}, workload spike detected. Tu machine nahi. Ek task clean, baaki kal. Keep rising.`,
];

export function Hero() {
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);
  const displayName = name.trim() || "Nirav";
  const message = useMemo(() => templates[tick % templates.length](displayName), [displayName, tick]);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-10 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-laser-2 mb-5">
            <Zap size={14} className="text-laser" />
            Daily operating system for busy minds
          </div>
          <h1 className="font-display text-[2.7rem] sm:text-5xl md:text-[3.7rem] font-extrabold leading-[1.05] tracking-tight mb-5">
            Har 2 ghante
            <br />
            <span className="laser-text">tumhare naam</span> pe
            <br />
            ek rise signal.
          </h1>
          <p className="text-base md:text-lg text-ink-soft max-w-xl mx-auto leading-relaxed">
            Finance. Health. Love. Career. RIZN tumhe yaad dilata hai — tu akela nahi, tu aage badh
            sakta hai. Premium dark energy. Real life impact.
          </p>
        </motion.div>

        <div id="feel" className="max-w-xl mx-auto soft-card rounded-3xl p-5 md:p-7 mb-10 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-laser to-transparent" />
          <label className="block text-sm font-semibold text-white mb-2">
            Apna naam likho — live feel
          </label>
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya, Rahul, Nirav..."
              maxLength={20}
              className="flex-1 rounded-xl border border-white/10 bg-black/50 px-4 py-3.5 text-base text-white placeholder:text-muted focus:outline-none focus:border-laser focus:ring-2 focus:ring-laser/30"
            />
            <button
              type="button"
              onClick={() => setTick((t) => t + 1)}
              className="btn-secondary rounded-xl px-4 text-sm whitespace-nowrap"
            >
              Next pulse
            </button>
          </div>

          <div className="rounded-2xl bg-black/70 border border-white/10 p-5 text-left relative overflow-hidden">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-laser/20 blur-2xl" />
            <div className="flex items-center gap-2 mb-3 relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-laser to-laser-3 flex items-center justify-center text-[10px] font-bold">
                R
              </div>
              <div>
                <p className="text-sm font-bold text-white">RIZN</p>
                <p className="text-[11px] text-laser-2">live pulse · personalized</p>
              </div>
            </div>
            <p className="text-[15px] md:text-base leading-relaxed text-white/95 relative">{message}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base w-full sm:w-auto"
          >
            7 din free start
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/#problems"
            className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-xl text-base w-full sm:w-auto"
          >
            Kis problem ke liye?
          </Link>
        </div>
        <p className="text-center text-sm text-muted">₹99/month · No card for trial · Cancel anytime</p>
      </div>
    </section>
  );
}
