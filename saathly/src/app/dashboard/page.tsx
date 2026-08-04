"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  Bell,
  Share2,
  Copy,
  Check,
  Wallet,
  Heart,
  Activity,
  ChevronRight,
} from "lucide-react";

const todayMessages = [
  {
    time: "9:00 AM",
    text: "Nirav, naya din hai. Aaj ek important kaam choose karo — baaki follow karega. Tu capable hai. 💪",
    area: "Daily",
    read: true,
  },
  {
    time: "11:00 AM",
    text: "Nirav, financial stress normal hai. Aaj ₹50 side me rakh — chhota step, bada future.",
    area: "Finance",
    read: true,
  },
  {
    time: "1:00 PM",
    text: "Nirav, 1 baj gaya — khana khaya? Body weak hogi to mind bhi weak hoga. 15 min break le.",
    area: "Health",
    read: true,
  },
  {
    time: "3:00 PM",
    text: "Nirav, thak gaya? Normal hai. Paani pi, 2 minute walk kar. Energy wapas aayegi.",
    area: "Energy",
    read: false,
  },
  {
    time: "5:00 PM",
    text: "Nirav, workload zyada hai par tu akela nahi hai. Haar mat maanna — kuch accha hone wala hai.",
    area: "Career",
    read: false,
  },
  {
    time: "9:00 PM",
    text: "Nirav, aaj ke liye proud ho. Phone band karo, mind ko rest do. Kal naya din. ✨",
    area: "Evening",
    read: false,
  },
];

const weekStats = [
  { label: "Messages read", value: "34/42", pct: 81 },
  { label: "Mood improved", value: "+23%", pct: 23 },
  { label: "Actions done", value: "18", pct: 60 },
];

export default function DashboardPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://saathly.in/ref/NIRAV2026";

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-sm text-muted">Good afternoon 👋</p>
            <h1 className="font-display text-3xl font-bold">
              <span className="gradient-gold">Nirav</span>, tu strong hai
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass-gold rounded-xl px-4 py-2.5 flex items-center gap-2">
              <Flame size={18} className="text-orange-400" />
              <div>
                <p className="text-lg font-bold text-gold-light leading-none">12</p>
                <p className="text-[10px] text-muted">day streak</p>
              </div>
            </div>
            <div className="glass rounded-xl px-4 py-2.5 flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <div>
                <p className="text-lg font-bold leading-none">+23%</p>
                <p className="text-[10px] text-muted">mood up</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {weekStats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4">
              <p className="text-xs text-muted mb-1">{stat.label}</p>
              <p className="text-xl font-display font-bold text-gold-light">{stat.value}</p>
              <div className="mt-2 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full transition-all"
                  style={{ width: `${stat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <Bell size={18} className="text-gold-light" />
                Aaj ke messages
              </h2>
              <span className="text-xs text-muted">3/6 read</span>
            </div>

            <div className="space-y-3">
              {todayMessages.map((msg, i) => (
                <motion.div
                  key={msg.time}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className={`rounded-xl p-4 border transition-all ${
                    msg.read
                      ? "glass border-gold/10 opacity-80"
                      : "glass-gold border-gold/20 glow-gold"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gold-light">{msg.time}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-elevated text-muted">
                      {msg.area}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {!msg.read && (
                    <button
                      type="button"
                      className="mt-3 text-xs text-gold-light hover:text-gold transition-colors flex items-center gap-1"
                    >
                      Mark as read <ChevronRight size={12} />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="glass-gold rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-3">Mood check-in</h3>
              <div className="flex justify-between">
                {["😔", "😐", "🙂", "😊", "🤩"].map((emoji, i) => (
                  <button
                    key={emoji}
                    type="button"
                    className={`text-2xl p-2 rounded-xl transition-all hover:scale-110 ${
                      i === 2 ? "bg-gold/15 ring-1 ring-gold/30" : "hover:bg-surface-elevated"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-3">Aaj ka micro-action</h3>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" className="mt-1 accent-gold" />
                <span className="text-sm text-muted group-hover:text-foreground transition-colors">
                  ₹50 save karo aaj
                </span>
              </label>
            </div>

            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                <Share2 size={14} className="text-gold-light" />
                Dost ko bhejo
              </h3>
              <p className="text-xs text-muted mb-3">
                Refer karo — dono ko 1 mahina free!
              </p>
              <div className="flex gap-2">
                <input
                  readOnly
                  value={referralLink}
                  className="flex-1 bg-surface text-[10px] px-3 py-2 rounded-lg border border-gold/10 text-muted"
                />
                <button
                  type="button"
                  onClick={copyLink}
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-gold-light" />}
                </button>
              </div>
            </div>

            <div className="glass rounded-xl p-5">
              <h3 className="font-semibold text-sm mb-3">Focus areas</h3>
              <div className="space-y-2">
                {[
                  { icon: Wallet, label: "Finance", pct: 75 },
                  { icon: Activity, label: "Health", pct: 50 },
                  { icon: Heart, label: "Love", pct: 30 },
                ].map((area) => (
                  <div key={area.label} className="flex items-center gap-3">
                    <area.icon size={14} className="text-gold-light shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted">{area.label}</span>
                        <span className="text-gold-light">{area.pct}%</span>
                      </div>
                      <div className="h-1 bg-surface-elevated rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold/60 rounded-full"
                          style={{ width: `${area.pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/"
              className="block text-center text-xs text-muted hover:text-gold-light transition-colors py-2"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
