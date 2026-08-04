"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const step = Math.max(1, Math.ceil(Math.abs(diff) / 8));
    const timer = setInterval(() => {
      setDisplay((d) => {
        if (Math.abs(value - d) <= step) {
          clearInterval(timer);
          return value;
        }
        return d + (diff > 0 ? step : -step);
      });
    }, 40);
    return () => clearInterval(timer);
  }, [value, display]);

  return <>{display.toLocaleString("en-IN")}</>;
}

export function LiveStats() {
  const [messages, setMessages] = useState(48291);
  const [users, setUsers] = useState(1247);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages((m) => m + Math.floor(Math.random() * 3) + 1);
      if (Math.random() > 0.7) setUsers((u) => u + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: messages, suffix: "+", label: "Aaj ke messages", color: "text-gold-light" },
    { value: users, suffix: "", label: "Abhi active", color: "text-white" },
    { value: 4.9, suffix: " ★", label: "Rating", color: "text-gold-light", isStar: true },
  ];

  return (
    <div className="flex flex-wrap gap-6 md:gap-10 p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.1 }}
        >
          <p className={`text-2xl md:text-3xl font-display font-bold tabular-nums ${stat.color}`}>
            {stat.isStar ? (
              <>
                {stat.value}
                {stat.suffix}
              </>
            ) : (
              <>
                <AnimatedNumber value={stat.value as number} />
                {stat.suffix}
              </>
            )}
          </p>
          <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
