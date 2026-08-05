"use client";

import { motion } from "framer-motion";

const beams = [
  { color: "#ff2d6a", top: "12%", rotate: -18, delay: 0, duration: 3.2 },
  { color: "#00e5ff", top: "28%", rotate: 14, delay: 0.6, duration: 2.8 },
  { color: "#b14dff", top: "48%", rotate: -10, delay: 1.1, duration: 3.6 },
  { color: "#ff2d6a", top: "66%", rotate: 22, delay: 0.3, duration: 2.5 },
  { color: "#00e5ff", top: "82%", rotate: -25, delay: 1.4, duration: 3.1 },
];

export function LaserBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />

      {/* ambient glow orbs */}
      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#ff2d6a]/15 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-[#00e5ff]/12 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[#b14dff]/12 blur-[120px]" />

      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {/* laser beams */}
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className="absolute left-[-20%] h-[2px] w-[140%]"
          style={{
            top: b.top,
            rotate: b.rotate,
            background: `linear-gradient(90deg, transparent, ${b.color}, transparent)`,
            boxShadow: `0 0 18px ${b.color}, 0 0 40px ${b.color}`,
          }}
          initial={{ opacity: 0.15, x: "-10%" }}
          animate={{ opacity: [0.15, 0.85, 0.2], x: ["-10%", "8%", "-10%"] }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* vertical laser streaks */}
      <motion.div
        className="absolute left-[18%] top-0 h-full w-px"
        style={{
          background: "linear-gradient(transparent, #ff2d6a, transparent)",
          boxShadow: "0 0 12px #ff2d6a",
        }}
        animate={{ opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-[22%] top-0 h-full w-px"
        style={{
          background: "linear-gradient(transparent, #00e5ff, transparent)",
          boxShadow: "0 0 12px #00e5ff",
        }}
        animate={{ opacity: [0.1, 0.55, 0.1] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}
      />

      <div className="scanline" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,8,0.85)_100%)]" />
    </div>
  );
}
