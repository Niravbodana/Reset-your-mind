"use client";

import { useState } from "react";
import { Check, Gift } from "lucide-react";
import { haptic } from "@/lib/haptic";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function ReferralCard({ code }: { code: string }) {
  const config = useSiteConfig();
  const [copied, setCopied] = useState(false);
  const origin =
    typeof window !== "undefined" ? window.location.origin : config.marketing.siteUrl;
  const link = `${origin}/signup?ref=${encodeURIComponent(code)}`;
  const shareText = `RIZN try karo — daily messages + EMI reminder, ₹99/month.\nMere code se join karo → 7 din free feel:\n${link}`;

  const copy = async () => {
    haptic("success");
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
    }
  };

  const waShare = () => {
    haptic("medium");
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  return (
    <div className="soft-card rounded-2xl p-5 border border-gold/20 mb-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Gift size={18} />
        </div>
        <div>
          <p className="font-semibold text-white text-sm">Dost ko invite karo</p>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed">
            Share link → unhe free trial. Tumhara code:{" "}
            <span className="text-gold-light font-mono font-semibold">{code}</span>
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={copy}
          className="btn-secondary flex-1 rounded-xl py-3 text-sm min-h-[44px] inline-flex items-center justify-center gap-2"
        >
          {copied ? <Check size={16} className="text-success" /> : null}
          {copied ? "Link copied!" : "Copy invite link"}
        </button>
        <button
          type="button"
          onClick={waShare}
          className="flex-1 rounded-xl py-3 text-sm font-semibold min-h-[44px] bg-[#25D366] text-black inline-flex items-center justify-center"
        >
          WhatsApp pe bhejo
        </button>
      </div>
    </div>
  );
}
