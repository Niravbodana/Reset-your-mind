"use client";

import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { parivaarMonthlyPrice, personalMonthlyPrice } from "@/lib/pricing";

type Props = {
  plan?: "personal" | "parivaar";
  size?: "sm" | "lg";
  className?: string;
};

export function OfferPrice({ plan = "personal", size = "lg", className = "" }: Props) {
  const config = useSiteConfig();
  const price = plan === "parivaar" ? parivaarMonthlyPrice(config) : personalMonthlyPrice(config);
  const was =
    plan === "parivaar"
      ? config.marketing.launchPriceParivaar
      : config.marketing.launchPricePersonal;
  const showOffer = config.features.earlyBirdActive && was > price;

  if (size === "sm") {
    return (
      <span className={className}>
        {showOffer && (
          <>
            <span className="line-through text-muted mr-1.5">₹{was}</span>
            <span className="text-gold-light font-semibold">₹{price}/mo</span>
          </>
        )}
        {!showOffer && <span>₹{price}/mo</span>}
      </span>
    );
  }

  return (
    <div className={className}>
      {showOffer && (
        <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-wider bg-gold text-black px-3 py-1 rounded-full">
          Limited time offer
        </span>
      )}
      <p className="flex flex-wrap items-baseline gap-2">
        {showOffer && (
          <span className="text-xl md:text-2xl text-muted line-through font-medium">₹{was}</span>
        )}
        <span className="font-display text-4xl md:text-5xl font-bold text-white">₹{price}</span>
        <span className="text-sm text-muted">/month</span>
      </p>
      {showOffer && (
        <p className="text-xs text-gold-light mt-1">You save ₹{was - price} — early access pricing</p>
      )}
    </div>
  );
}

export function OfferBanner() {
  const config = useSiteConfig();
  if (!config.features.earlyBirdActive) return null;
  const price = personalMonthlyPrice(config);
  const was = config.marketing.launchPricePersonal;
  if (was <= price) return null;

  return (
    <Link
      href="/signup"
      className="inline-flex items-center gap-2 text-xs font-medium text-gold-light border border-gold/30 bg-gold/10 rounded-full px-4 py-2 hover:bg-gold/15 transition-colors"
    >
      <span className="line-through text-muted">₹{was}</span>
      <span className="text-white font-semibold">₹{price}/mo</span>
      <span className="text-xs uppercase tracking-wide text-gold">Limited offer</span>
    </Link>
  );
}
