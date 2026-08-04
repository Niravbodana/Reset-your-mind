"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { NotificationPhone } from "./NotificationPhone";
import { LiveStats } from "./LiveStats";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero background photo */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Sunrise hope"
          fill
          priority
          className="object-cover object-center scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0612]/95 via-[#0a0612]/80 to-[#0a0612]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0612] via-transparent to-[#0a0612]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_50%,rgba(201,169,98,0.15),transparent_60%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-28 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-5 py-2 text-sm text-gold-light mb-6 backdrop-blur-sm">
              <Sparkles size={16} className="text-gold" />
              <span className="font-medium">12,000+ logon ki zindagi badli</span>
              <span className="flex items-center gap-0.5 ml-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} className="fill-gold text-gold" />
                ))}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.75rem] font-bold leading-[1.08] mb-6 text-white drop-shadow-lg">
              Tumhare{" "}
              <span className="text-gold-light italic">naam</span> ke saath —{" "}
              <span className="text-white">har ghante zindagi badalne wali motivation</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              Finance, health, love, career — NaamSaath har 2 ghante tumhe yaad dilata hai ke tum
              akela nahi ho. Dekhte hi feel hoga — ye sirf tumhare liye hai.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base font-bold shadow-lg shadow-gold/25"
              >
                7 Din Free Shuru Karo
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/#transform"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-semibold bg-white/10 text-white border border-white/25 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                Transformation dekho
              </Link>
            </div>

            <LiveStats />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Floating person photo */}
            <div className="absolute -left-4 md:-left-12 top-8 z-20 hidden sm:block">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative w-28 h-36 md:w-36 md:h-48 rounded-2xl overflow-hidden border-2 border-gold/40 shadow-2xl shadow-gold/20"
              >
                <Image
                  src="/images/person-happy.jpg"
                  alt="Happy user"
                  fill
                  className="object-cover"
                  sizes="150px"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                  <p className="text-[10px] text-gold-light font-semibold">Priya, Mumbai</p>
                  <p className="text-[9px] text-white/70">45 din streak 🔥</p>
                </div>
              </motion.div>
            </div>

            <NotificationPhone />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
