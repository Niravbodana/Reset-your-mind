"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TransformationSection() {
  return (
    <section id="transform" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/50 to-background" />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">
            Real transformation
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Pehle vs Ab — <span className="text-gold-light italic">asli farq dekho</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Ye sirf words nahi — ye wo feel hai jo NaamSaath use karne wale log roz mehsoos karte hain
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
          {/* BEFORE */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -top-3 left-4 z-10 bg-red-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Pehle 😔
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-red-500/20 shadow-xl">
              <Image
                src="/images/person-stressed.jpg"
                alt="Stressed before"
                fill
                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/90 text-sm leading-relaxed">
                  &quot;Har raat neend nahi aati thi. Work stress, EMI tension, akela feel hota
                  tha...&quot;
                </p>
                <p className="text-red-300 text-xs mt-2 font-medium">— Rahul, Delhi</p>
              </div>
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative group"
          >
            <div className="absolute -top-3 left-4 z-10 bg-emerald-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Ab 😊
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-xl shadow-gold/10">
              <Image
                src="/images/person-happy.jpg"
                alt="Happy after"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-sm leading-relaxed font-medium">
                  &quot;Ab roz subah message aata hai mere naam se — lagta hai koi hai jo samajhta
                  hai. 30 din me life change!&quot;
                </p>
                <p className="text-gold-light text-xs mt-2 font-semibold">— Rahul, 28 din streak 🔥</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-full text-base font-bold"
          >
            Meri bhi life badlo
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
