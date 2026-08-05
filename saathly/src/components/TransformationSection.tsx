"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TransformationSection() {
  return (
    <section id="transform" className="py-20 md:py-28 relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Asli badlav</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
            Pehle vs Ab — <span className="gradient-gold italic">farq khud dekho</span>
          </h2>
          <p className="text-ink-soft text-lg max-w-2xl mx-auto">
            Generic quotes nahi. Tumhare naam ke saath messages jo roz life me farq laate hain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group"
          >
            <div className="absolute -top-3 left-4 z-10 bg-red-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Pehle
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-red-500/20 shadow-xl">
              <Image
                src="/images/person-stressed.jpg"
                alt="Stress se pareshan"
                fill
                className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white/90 text-sm leading-relaxed">
                  &quot;Har raat neend nahi. EMI, office stress, akela feel — koi samajhta hi nahi tha...&quot;
                </p>
                <p className="text-red-300 text-xs mt-2 font-medium">— Rahul, Delhi</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative group"
          >
            <div className="absolute -top-3 left-4 z-10 bg-emerald-500/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
              Ab
            </div>
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-xl shadow-gold/10">
              <Image
                src="/images/testimonial-rahul.jpg"
                alt="Khush aur confident"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white text-sm leading-relaxed font-medium">
                  &quot;Roz mere naam se message — lagta hai koi hai jo samajhta hai. 30 din me routine, sleep, sab better!&quot;
                </p>
                <p className="text-gold-light text-xs mt-2 font-semibold">— Rahul · 28 din streak</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 rounded-3xl overflow-hidden relative aspect-[21/9] max-w-4xl mx-auto border border-gold/20">
          <Image
            src="/images/transform-premium.jpg"
            alt="Life transformation with RIZN"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 896px"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 md:p-12">
            <div className="max-w-md">
              <p className="text-gold-light text-sm font-semibold mb-2">Premium experience</p>
              <p className="text-white text-xl md:text-2xl font-display font-bold leading-snug">
                Sirf motivation nahi — roz ka system jo tumhe aage rakhe.
              </p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/signup"
            className="btn-primary inline-flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold"
          >
            Meri bhi life badlo — 7 din free
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
