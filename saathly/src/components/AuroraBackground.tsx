"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030308]" />

      <motion.div
        className="absolute -top-1/2 left-1/4 w-[800px] h-[800px] rounded-full opacity-30 animate-aurora"
        style={{
          background:
            "radial-gradient(circle, rgba(201,169,98,0.25) 0%, rgba(201,169,98,0.05) 40%, transparent 70%)",
        }}
        animate={{ x: [0, 30, -20, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(124,108,191,0.3) 0%, transparent 60%)",
        }}
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-[700px] h-[700px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(74,158,142,0.2) 0%, transparent 60%)",
        }}
        animate={{ x: [0, 25, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(201,169,98,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,169,98,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}
