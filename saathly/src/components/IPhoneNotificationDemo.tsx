"use client";

import { useEffect, useMemo, useState } from "react";
import { Bell, Wallet, Sunrise, CreditCard } from "lucide-react";
import { DEMO_NAME } from "@/lib/constants";
import { formatCustomerName } from "@/lib/message-format";
import { DEMO_EMI, formatEmiNotification } from "@/lib/emi-reminder";
import { MESSAGE_BANK } from "@/lib/message-bank";

type Notif = {
  id: string;
  icon: typeof Bell;
  title: string;
  body: string;
  time: string;
};

function buildNotifications(name: string, seed: number): Notif[] {
  const n = formatCustomerName(name, "hinglish");
  const pool = MESSAGE_BANK.filter((t) => t.slot === "morning" || t.slot === "any" || t.area === "finance");
  const pick = (offset: number) => {
    const tpl = pool[(seed + offset) % pool.length];
    return tpl.hinglish.replaceAll("{name}", n);
  };
  const emi = formatEmiNotification(name, DEMO_EMI, "hinglish");

  return [
    { id: "emi", icon: CreditCard, title: "RIZN · EMI Reminder", body: emi, time: "9:41 AM" },
    { id: "morning", icon: Sunrise, title: "RIZN", body: pick(1), time: "7:15 AM" },
    { id: "money", icon: Wallet, title: "RIZN", body: pick(2), time: "11:00 AM" },
    { id: "evening", icon: Bell, title: "RIZN", body: pick(3), time: "9:00 PM" },
  ];
}

function StatusBar() {
  return (
    <div className="relative flex items-center justify-between px-5 pt-2.5 pb-1 text-[10px] font-semibold text-white">
      <span>9:41</span>
      <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[72px] h-[22px] bg-black rounded-full border border-white/10" />
      <div className="flex items-center gap-1 text-[9px]">
        <span className="w-5 h-2.5 border border-white/60 rounded-sm relative">
          <span className="absolute inset-0.5 bg-white rounded-[1px]" style={{ width: "70%" }} />
        </span>
      </div>
    </div>
  );
}

export function IPhoneNotificationDemo({
  name = DEMO_NAME,
  compact = false,
}: {
  name?: string;
  compact?: boolean;
}) {
  const [seed, setSeed] = useState(0);
  const notifications = useMemo(() => buildNotifications(name, seed), [name, seed]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % notifications.length;
        if (next === 0) setSeed((s) => s + 1);
        return next;
      });
    }, 3800);
    return () => clearInterval(t);
  }, [notifications.length]);

  const current = notifications[index];
  const Icon = current.icon;

  return (
    <div
      className={`relative w-full mx-auto overflow-hidden ${
        compact ? "max-w-[min(280px,88vw)]" : "max-w-[min(300px,92vw)]"
      }`}
    >
      <div className="relative rounded-[2.4rem] p-[3px] bg-gradient-to-b from-white/20 to-white/5 shadow-2xl shadow-black/50">
        <div className="rounded-[2.25rem] bg-[#0c0c10] overflow-hidden border border-white/10">
          <StatusBar />

          <div
            className={`relative bg-gradient-to-b from-[#1a1a24] to-[#0a0a0f] px-3 pb-5 ${
              compact ? "min-h-[260px] sm:min-h-[320px]" : "min-h-[320px] sm:min-h-[400px]"
            }`}
          >
            <div className="text-center pt-6 pb-3">
              <p className="text-3xl sm:text-4xl font-light text-white tracking-tight">9:41</p>
              <p className="text-xs text-muted mt-1">Wednesday, 5 Aug</p>
            </div>

            <div
              key={`${name}-${current.id}`}
              className="mx-1 rounded-2xl bg-white/12 backdrop-blur-xl border border-white/15 p-3 shadow-lg"
            >
              <div className="flex gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2 mb-0.5">
                    <p className="text-[11px] font-bold text-white truncate">{current.title}</p>
                    <p className="text-[10px] text-white/50 shrink-0">{current.time}</p>
                  </div>
                  <p className="text-[12px] leading-snug text-white/90 break-words">{current.body}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-1.5 mt-4">
              {notifications.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all ${i === index ? "w-5 bg-gold" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>

            <p className="text-center text-[10px] text-muted mt-4 px-2">
              iPhone pe aise notifications — naam ke saath, EMI 1 din pehle
            </p>
          </div>

          <div className="h-1 w-24 bg-white/30 rounded-full mx-auto mb-2" />
        </div>
      </div>
    </div>
  );
}
