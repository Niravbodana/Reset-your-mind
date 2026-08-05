"use client";

import { Check, Smartphone } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice } from "@/lib/pricing";

/** Visual UPI / Razorpay autopay preview — 7-day trial then ₹99/mo */
export function UpiPayPreview({ className = "" }: { className?: string }) {
  const config = useSiteConfig();
  const price = personalMonthlyPrice(config);
  const trialDays = config.marketing.trialDays || 7;

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
            Autopay setup
          </p>
          <p className="text-sm text-white/70 mt-1">
            {trialDays} din free → phir ₹{price}/month auto
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Smartphone size={20} />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/50 p-4 mb-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm text-white/60">RIZN Personal</span>
          <span className="font-display text-2xl font-bold text-white">₹{price}</span>
        </div>
        <p className="text-xs text-muted mt-1">/month · UPI Autopay · Cards · Netbanking</p>
      </div>

      <div className="space-y-2 mb-4">
        {[
          `Aaj: mandate set — ₹0 charge`,
          `${trialDays} din: poora access free`,
          `Din ${trialDays + 1}: pehla ₹${price} bank se auto-cut`,
          "Har mahine same amount — cancel anytime",
        ].map((t) => (
          <p key={t} className="flex items-center gap-2 text-xs text-ink-soft">
            <Check size={14} className="text-success shrink-0" />
            {t}
          </p>
        ))}
      </div>

      <div className="rounded-xl border border-dashed border-gold/30 bg-gold/5 px-4 py-3 text-center">
        <p className="text-sm font-semibold text-gold-light">
          Start free trial — {trialDays} days
        </p>
        <p className="text-xs text-white/45 mt-1">
          Razorpay secure · Autopay after trial · No surprise charges during trial
        </p>
      </div>
    </div>
  );
}
