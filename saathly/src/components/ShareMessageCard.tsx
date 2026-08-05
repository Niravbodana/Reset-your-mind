"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { haptic } from "@/lib/haptic";

type Props = {
  name: string;
  message: string;
  className?: string;
};

export function ShareMessageCard({ name, message, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const shareText = `Mera pehla RIZN message 💛\n\n"${message}"\n\n— ${name} ke liye, RIZN pe\nAapki life change ka reason · ₹99/month\nhttps://rizn.app`;

  const share = async () => {
    haptic("success");
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Mera RIZN message",
          text: shareText,
        });
        return;
      }
    } catch {
      /* user cancelled or failed — fall through to copy */
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(wa, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className={`btn-secondary inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium min-h-[44px] ${className}`}
    >
      {copied ? <Check size={16} className="text-success" /> : <Share2 size={16} />}
      {copied ? "Copied!" : "WhatsApp pe share karo"}
    </button>
  );
}
