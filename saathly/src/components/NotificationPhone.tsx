"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Heart, Wallet, Briefcase, Moon } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";

function buildNotifications(name: string) {
  return [
    {
      icon: Bell,
      time: "9:00 AM",
      message: `${name}, choose one priority for today. Everything else can wait until that is done.`,
      color: "from-amber-400/20 to-orange-500/10",
    },
    {
      icon: Wallet,
      time: "11:00 AM",
      message: `${name}, move a small amount to savings today. Consistency matters more than the amount.`,
      color: "from-emerald-400/20 to-teal-500/10",
    },
    {
      icon: Briefcase,
      time: "1:00 PM",
      message: `${name}, have you eaten? A short break now will help you focus later.`,
      color: "from-sky-400/20 to-blue-500/10",
    },
    {
      icon: Heart,
      time: "5:00 PM",
      message: `${name}, today was not easy — that is okay. You are still moving forward.`,
      color: "from-rose-400/20 to-pink-500/10",
    },
    {
      icon: Moon,
      time: "9:00 PM",
      message: `${name}, close the day. Put the phone down and rest — tomorrow needs a clear mind.`,
      color: "from-violet-400/20 to-purple-500/10",
    },
  ];
}

export function NotificationPhone({ name = DEMO_NAME }: { name?: string }) {
  const [index, setIndex] = useState(0);
  const notifications = buildNotifications(name);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % notifications.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [notifications.length]);

  const current = notifications[index];
  const Icon = current.icon;

  return (
    <div className="relative w-[260px] md:w-[300px] mx-auto">
      <div className="relative bg-white/5 backdrop-blur-sm rounded-[2rem] p-2.5 border border-white/15 shadow-xl">
        <div className="bg-[#0a0a0f] rounded-[1.6rem] overflow-hidden">
          <div className="px-4 pt-3 pb-2 flex justify-between items-center border-b border-white/10">
            <span className="text-sm font-semibold text-white">RIZN</span>
            <span className="text-[10px] text-muted uppercase tracking-wide">RIZN</span>
          </div>

          <div className="px-3 pb-5 min-h-[280px]">
            <p className="text-center text-xs text-muted py-3">Today · {index + 1} of 6</p>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${name}-${index}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className={`rounded-xl p-3.5 bg-gradient-to-br ${current.color} border border-white/10`}
              >
                <div className="flex gap-2.5">
                  <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
                    <Icon size={16} className="text-gold-light" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted mb-1">{current.time}</p>
                    <p className="text-sm text-white leading-relaxed">{current.message}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
