"use client";

import { Check, Smartphone } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { personalMonthlyPrice } from "@/lib/pricing";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";

/** Autopay preview — region-aware (UPI for India, cards worldwide) */
export function UpiPayPreview({
  className = "",
  amountLabel,
}: {
  className?: string;
  amountLabel?: string;
  region?: string;
  currency?: string;
}) {
  const config = useSiteConfig();
  const { currency, region } = useLocale();
  const isIN = region === "IN";
  const price = personalMonthlyPrice(config, currency);
  const priceLabel = amountLabel || formatMoney(price, currency);
  const trialDays = config.marketing.trialDays || 7;
  const zero = formatMoney(0, currency);

  const steps = isIN
    ? [
        `Aaj: mandate set — ${zero} charge`,
        `${trialDays} din: poora access free`,
        `Din ${trialDays + 1}: pehla ${priceLabel} bank se auto-cut`,
        "Har mahine same amount — cancel anytime",
      ]
    : [
        `Today: authorize mandate — ${zero} charged`,
        `${trialDays} days: full access free`,
        `Day ${trialDays + 1}: first ${priceLabel} autopay`,
        "Same amount every month — cancel anytime",
      ];

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
            {isIN
              ? `${trialDays} din free → phir ${priceLabel}/month auto`
              : `${trialDays} days free → then ${priceLabel}/month`}
          </p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
          <Smartphone size={20} />
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/50 p-4 mb-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm text-white/60">RIZN Personal</span>
          <span className="font-display text-2xl font-bold text-white">{priceLabel}</span>
        </div>
        <p className="text-xs text-muted mt-1">
          {isIN
            ? "/month · UPI Autopay · Cards · Netbanking"
            : "/month · Cards · Apple Pay / Google Pay · Worldwide"}
        </p>
      </div>

      <div className="space-y-2 mb-4">
        {steps.map((t) => (
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
          {isIN
            ? "Razorpay secure · Autopay after trial · No surprise charges during trial"
            : "Secure checkout · Autopay after trial · No charge during trial"}
        </p>
      </div>
    </div>
  );
}
