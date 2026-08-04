"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Wallet, Briefcase, Sun } from "lucide-react";

const notifications = [
  {
    icon: Sun,
    time: "9:00 AM",
    name: "Nirav",
    message: "Naya din, naya mauka. Aaj bas ek important kaam choose karo — baaki follow karega.",
    color: "from-amber-500/20 to-orange-500/10",
  },
  {
    icon: Wallet,
    time: "11:00 AM",
    name: "Nirav",
    message: "Financial stress normal hai. Tu sahi direction me hai. Aaj ₹50 side me rakh — chhota step, bada future.",
    color: "from-emerald-500/20 to-green-500/10",
  },
  {
    icon: Briefcase,
    time: "1:00 PM",
    name: "Nirav",
    message: "Khana khaya? Body weak hogi to mind bhi weak hoga. 15 min break le, phir wapas strong.",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    icon: Heart,
    time: "5:00 PM",
    name: "Nirav",
    message: "Workload zyada hai, par tu capable hai. Haar mat maanna — kuch accha hone wala hai.",
    color: "from-rose-500/20 to-pink-500/10",
  },
  {
    icon: Bell,
    time: "9:00 PM",
    name: "Nirav",
    message: "Aaj ke liye proud ho. Kal naya din hai. Phone band karo, mind ko rest do. Good night ✨",
    color: "from-purple-500/20 to-violet-500/10",
  },
];

export function NotificationPhone() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = notifications[index];
  const Icon = current.icon;

  return (
    <div className="relative w-[320px] md:w-[360px]">
      <div className="absolute -inset-4 bg-gradient-to-r from-gold/20 via-accent-purple/10 to-gold/20 rounded-[3rem] blur-2xl animate-pulse-glow" />

      <div className="relative glass-gold rounded-[2.5rem] p-3 glow-gold animate-float">
        <div className="bg-surface rounded-[2rem] overflow-hidden border border-gold/10">
          <div className="px-6 pt-4 pb-2 flex justify-between items-center">
            <span className="text-xs text-muted">Saathly</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-gold/60" />
              <div className="w-1 h-1 rounded-full bg-gold/40" />
              <div className="w-1 h-1 rounded-full bg-gold/20" />
            </div>
          </div>

          <div className="px-4 pb-6 min-h-[280px]">
            <div className="text-center mb-4">
              <p className="text-xs text-muted">Aaj ke messages</p>
              <p className="font-display text-2xl gradient-gold font-semibold mt-1">6 / 6</p>
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i <= index ? "w-6 bg-gold" : "w-3 bg-gold/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl p-4 bg-gradient-to-br ${current.color} border border-white/5`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-gold/10 shrink-0">
                    <Icon size={18} className="text-gold-light" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-gold-light">Saathly</span>
                      <span className="text-[10px] text-muted">{current.time}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      <span className="text-gold-light">{current.name}, </span>
                      {current.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["💰 Finance", "❤️ Love", "🏃 Health"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-center py-1.5 rounded-lg bg-surface-elevated/80 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
