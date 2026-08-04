"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Bell } from "lucide-react";

const templates = [
  (n: string) =>
    `${n}, aaj ka din tough lag raha hai — samajh sakta hoon. Par tu yahan hai, ye hi shuruaat hai. Ab sirf ek chhota step le.`,
  (n: string) =>
    `${n}, EMI aur bills dimaag me ghum rahe hain? Normal hai. Aaj ₹50 side me rakh — chhota saving bhi freedom ki taraf hai.`,
  (n: string) =>
    `${n}, khana khaya? Body ignore mat kar. Strong body = strong mind. 10 minute break, phir wapas.`,
  (n: string) =>
    `${n}, dil heavy hai to theek hai. Tu akela nahi hai. Aaj kisi se soft baat kar, ya 5 minute khud ke saath baith.`,
  (n: string) =>
    `${n}, workload zyada hai — tu machine nahi hai. Ek kaam perfect kar, baaki kal. Haar mat maanna.`,
];

export function Hero() {
  const [name, setName] = useState("");
  const [tick, setTick] = useState(0);

  const displayName = name.trim() || "Nirav";
  const message = useMemo(() => templates[tick % templates.length](displayName), [displayName, tick]);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 w-[420px] h-[420px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[320px] h-[320px] rounded-full bg-bg-soft" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
          <p className="section-label mb-4">Daily life companion for busy India</p>
          <h1 className="font-display text-[2.6rem] sm:text-5xl md:text-[3.6rem] font-semibold leading-[1.08] text-ink mb-5">
            Har 2 ghante koi aaye
            <br />
            <span className="text-accent">tumhare naam</span> leke bole —
            <br />
            aage badho.
          </h1>
          <p className="text-base md:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto">
            Finance tension, health ignore, love pain, office burnout — Humsafar tumhe roz yaad
            dilata hai ke tum akela nahi ho. Mind stable. Action clear.
          </p>
        </div>

        {/* Interactive product demo — the real hook */}
        <div
          id="feel"
          className="max-w-xl mx-auto soft-card rounded-3xl p-5 md:p-7 mb-10"
        >
          <label className="block text-sm font-semibold text-ink mb-2">
            Apna naam likho — abhi feel karo
          </label>
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya, Rahul, Nirav..."
              className="flex-1 rounded-xl border border-line bg-bg px-4 py-3.5 text-base text-ink placeholder:text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
              maxLength={20}
            />
            <button
              type="button"
              onClick={() => setTick((t) => t + 1)}
              className="btn-secondary rounded-xl px-4 text-sm whitespace-nowrap"
            >
              Naya message
            </button>
          </div>

          <div className="rounded-2xl bg-bg-deep text-white p-5 md:p-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Bell size={14} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">Humsafar</p>
                <p className="text-[11px] text-white/50">abhi · personalized</p>
              </div>
            </div>
            <p className="text-[15px] md:text-base leading-relaxed text-white/95">
              {message}
            </p>
            <p className="mt-4 text-xs text-white/40">
              Aisa message roz 6 baar aayega — tumhari situation ke hisaab se.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base w-full sm:w-auto"
          >
            7 din free shuru karo
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/#problems"
            className="btn-secondary inline-flex items-center justify-center px-8 py-4 rounded-xl text-base w-full sm:w-auto"
          >
            Ye kis problem ke liye hai?
          </Link>
        </div>

        <p className="text-center text-sm text-muted">
          ₹99/month · Card abhi nahi chahiye · Kabhi bhi cancel
        </p>
      </div>
    </section>
  );
}
