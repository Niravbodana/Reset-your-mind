"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { formatCustomerName } from "@/lib/message-format";
import type { Language } from "@/lib/types";

type Props = {
  name: string;
  message: string;
  microAction: string;
  pulseCount?: number;
  language?: Language;
};

export function FirstPulseModal({
  name,
  message,
  microAction,
  pulseCount = 6,
  language = "hinglish",
}: Props) {
  const [open, setOpen] = useState(false);
  const display = formatCustomerName(name, language);

  useEffect(() => {
    const key = "rizn_first_pulse_seen";
    if (!sessionStorage.getItem(key)) {
      setOpen(true);
      sessionStorage.setItem(key, "1");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="soft-card rounded-2xl max-w-md w-full p-8 relative border border-gold/30">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-white"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <p className="text-xs font-semibold uppercase tracking-wide text-gold-light mb-2">
          Tumhara pehla alert
        </p>
        <h2 className="font-display text-2xl font-bold text-white mb-4">Welcome, {display}</h2>
        <div className="rounded-xl bg-black/50 border border-white/10 p-4 mb-4">
          <p className="text-[15px] leading-relaxed text-white/95">{message}</p>
        </div>
        <p className="text-sm text-gold-light mb-6">
          <span className="text-muted">Aaj ka step: </span>
          {microAction}
        </p>
        <p className="text-xs text-muted mb-4">
          Aaj ke {pulseCount} messages tumhare liye alag likhe gaye — har ek me value. Padho, karo,
          feel karo life better ho rahi hai.
        </p>
        <button type="button" onClick={() => setOpen(false)} className="btn-primary w-full py-3 rounded-xl text-sm">
          Chalo — aaj ke alerts dekho
        </button>
        <Link href="/settings" className="block text-center text-xs text-muted mt-3 hover:text-gold-light">
          Apna schedule set karo
        </Link>
      </div>
    </div>
  );
}
