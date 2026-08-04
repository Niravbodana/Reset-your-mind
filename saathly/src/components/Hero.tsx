"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { NotificationPhone } from "./NotificationPhone";
import { LiveStats } from "./LiveStats";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  useEffect(() => setMounted(true), []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!phoneRef.current) return;
    const rect = phoneRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
      <div className="mx-auto max-w-6xl px-4 md:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 glass-gold rounded-full px-5 py-2 text-xs text-gold-light mb-8 shimmer-border"
            >
              <Sparkles size={14} className="text-gold animate-pulse-glow" />
              <span>12,000+ logon ki zindagi me change aa chuka hai</span>
            </motion.div>

            <h1 className="font-display text-[2.75rem] md:text-5xl lg:text-[3.5rem] font-semibold leading-[1.1] mb-6 text-balance">
              Tumhare{" "}
              <span className="gradient-gold italic">naam</span> ke saath — har ghante ek naya reason
              jeene ka
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-10 max-w-lg font-light">
              Finance, health, love, career — NaamSaath har 2 ghante tumhe yaad dilata hai ke tum
              akela nahi ho. Premium personalized motivation, sirf tumhare liye.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/signup"
                  className="btn-primary inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-base"
                >
                  7 Din Free Shuru Karo
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/#how-it-works"
                  className="btn-secondary inline-flex items-center justify-center px-10 py-4 rounded-full text-base"
                >
                  Dekho kaise kaam karta hai
                </Link>
              </motion.div>
            </div>

            <LiveStats />
          </motion.div>

          <motion.div
            ref={phoneRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative flex justify-center lg:justify-end"
          >
            <NotificationPhone />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
