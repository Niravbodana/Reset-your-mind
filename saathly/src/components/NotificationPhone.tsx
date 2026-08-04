"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Wallet, Briefcase, Moon } from "lucide-react";

const notifications = [
  {
    icon: Bell,
    time: "9:00 AM",
    name: "Nirav",
    message: "Naya din, naya mauka. Aaj bas ek important kaam choose karo — baaki follow karega.",
    color: "from-amber-500/25 to-orange-600/10",
    ring: "ring-amber-500/20",
  },
  {
    icon: Wallet,
    time: "11:00 AM",
    name: "Nirav",
    message:
      "Financial stress normal hai. Tu sahi direction me hai. Aaj ₹50 side me rakh — chhota step, bada future.",
    color: "from-emerald-500/25 to-teal-600/10",
    ring: "ring-emerald-500/20",
  },
  {
    icon: Briefcase,
    time: "1:00 PM",
    name: "Nirav",
    message: "Khana khaya? Body weak hogi to mind bhi weak hoga. 15 min break le, phir wapas strong.",
    color: "from-sky-500/25 to-blue-600/10",
    ring: "ring-sky-500/20",
  },
  {
    icon: Heart,
    time: "5:00 PM",
    name: "Nirav",
    message: "Workload zyada hai, par tu capable hai. Haar mat maanna — kuch accha hone wala hai.",
    color: "from-rose-500/25 to-pink-600/10",
    ring: "ring-rose-500/20",
  },
  {
    icon: Moon,
    time: "9:00 PM",
    name: "Nirav",
    message: "Aaj ke liye proud ho. Kal naya din hai. Phone band karo, mind ko rest do. Good night ✨",
    color: "from-violet-500/25 to-purple-600/10",
    ring: "ring-violet-500/20",
  },
];

export function NotificationPhone() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % notifications.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = notifications[index];
  const Icon = current.icon;

  return (
    <div className="relative w-[320px] md:w-[380px]">
      <motion.div
        className="absolute -inset-8 rounded-[4rem] opacity-60"
        style={{
          background:
            "conic-gradient(from 180deg, rgba(201,169,98,0.15), rgba(124,108,191,0.1), rgba(201,169,98,0.15))",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute -inset-4 bg-gold/10 rounded-[3rem] blur-3xl animate-pulse-glow" />

      <div className="relative glass-gold rounded-[2.75rem] p-3 glow-gold-strong shimmer-border animate-float">
        <div className="bg-surface rounded-[2.25rem] overflow-hidden border border-gold/10">
          <div className="px-6 pt-5 pb-3 flex justify-between items-center border-b border-gold/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-muted font-medium tracking-wide">NaamSaath</span>
            </div>
            <span className="text-[10px] text-gold/60 uppercase tracking-widest">Live</span>
          </div>

          <div className="px-5 pb-7 min-h-[300px]">
            <div className="text-center py-5 mb-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted mb-1">Aaj ke messages</p>
              <motion.p
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-display text-4xl gradient-gold font-semibold"
              >
                {index + 1} / 6
              </motion.p>
              <div className="flex justify-center gap-1.5 mt-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-1 rounded-full bg-gold/20"
                    animate={{
                      width: i <= index ? 24 : 8,
                      backgroundColor: i <= index ? "rgba(201,169,98,0.8)" : "rgba(201,169,98,0.15)",
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24, rotateX: -8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -16, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className={`rounded-2xl p-5 bg-gradient-to-br ${current.color} border border-white/5 ring-1 ${current.ring}`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="p-2.5 rounded-xl bg-black/30 shrink-0"
                  >
                    <Icon size={20} className="text-gold-light" />
                  </motion.div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-gold-light">NaamSaath</span>
                      <span className="text-[10px] text-muted/80">{current.time}</span>
                    </div>
                    <p className="text-sm font-medium text-champagne leading-relaxed">
                      <span className="text-gold-light font-semibold">{current.name}, </span>
                      {current.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mt-5 grid grid-cols-3 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {["Finance", "Love", "Health"].map((tag, i) => (
                <span
                  key={tag}
                  className="text-[10px] text-center py-2 rounded-xl bg-surface-elevated/60 text-muted border border-gold/5"
                >
                  {["💰", "❤️", "🏃"][i]} {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
