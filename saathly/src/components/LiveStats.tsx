"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const diff = value - display;
    if (diff === 0) return;
    const step = Math.ceil(Math.abs(diff) / 10);
    const timer = setInterval(() => {
      setDisplay((d) => {
        if (Math.abs(value - d) <= step) {
          clearInterval(timer);
          return value;
        }
        return d + (diff > 0 ? step : -step);
      });
    }, 50);
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
    { value: messages, suffix: "+", label: "Aaj bheje gaye messages" },
    { value: users, suffix: "", label: "Log abhi active hain" },
    { value: 4.9, suffix: "★", label: "User rating", isStar: true },
  ];

  return (
    <div className="flex flex-wrap gap-8 md:gap-10">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + i * 0.1 }}
        >
          <p className="text-3xl font-display font-semibold text-gold-light tabular-nums">
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
          <p className="text-muted text-xs mt-1">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
