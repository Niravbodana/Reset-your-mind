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
    color: "from-amber-400/30 to-orange-500/15",
  },
  {
    icon: Wallet,
    time: "11:00 AM",
    name: "Nirav",
    message: "Financial stress normal hai. Aaj ₹50 side me rakh — chhota step, bada future.",
    color: "from-emerald-400/30 to-teal-500/15",
  },
  {
    icon: Briefcase,
    time: "1:00 PM",
    name: "Nirav",
    message: "Khana khaya? Body weak hogi to mind bhi weak hoga. 15 min break le.",
    color: "from-sky-400/30 to-blue-500/15",
  },
  {
    icon: Heart,
    time: "5:00 PM",
    name: "Nirav",
    message: "Haar mat maanna — kuch accha hone wala hai. Tu capable hai.",
    color: "from-rose-400/30 to-pink-500/15",
  },
  {
    icon: Moon,
    time: "9:00 PM",
    name: "Nirav",
    message: "Aaj ke liye proud ho. Phone band karo, mind ko rest do. Good night.",
    color: "from-violet-400/30 to-purple-500/15",
  },
];

export function NotificationPhone({ name = "Nirav" }: { name?: string }) {
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
    <div className="relative w-[280px] md:w-[320px] mx-auto">
      <div className="absolute -inset-8 bg-gold/25 rounded-[3rem] blur-3xl animate-pulse-glow" />

      <div className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-[2.5rem] p-3 border-2 border-gold/40 shadow-2xl shadow-gold/30 animate-float">
        <div className="bg-[#0a0a0f] rounded-[2rem] overflow-hidden">
          <div className="px-5 pt-4 pb-3 flex justify-between items-center bg-gold/10 border-b border-gold/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-gold-light">RIZN</span>
            </div>
            <span className="text-[10px] text-black bg-gold px-2 py-0.5 rounded-full font-bold">LIVE</span>
          </div>

          <div className="px-4 pb-6 min-h-[320px]">
            <div className="text-center py-4">
              <p className="text-xs text-white/50 uppercase tracking-widest">Aaj ke messages</p>
              <p className="font-display text-4xl gradient-gold font-bold mt-1">{index + 1} / 6</p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl p-4 bg-gradient-to-br ${current.color} border border-white/10`}
              >
                <div className="flex gap-3">
                  <div className="p-2 rounded-xl bg-gold/20 shrink-0">
                    <Icon size={18} className="text-gold-light" />
                  </div>
                  <div>
                    <div className="flex gap-2 mb-1.5">
                      <span className="text-xs font-bold text-gold-light">RIZN</span>
                      <span className="text-[10px] text-white/50">{current.time}</span>
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      <span className="text-gold-light font-bold">{name}, </span>
                      {current.message}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {["💰 Paisa", "❤️ Dil", "🏃 Health"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-center py-2 rounded-xl bg-white/5 text-white/70 border border-white/10"
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
