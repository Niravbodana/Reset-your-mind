"use client";

import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";
import {
  personalMonthlyPrice,
  parivaarMonthlyPrice,
  regionPersonalPriceLabel,
} from "@/lib/pricing";

type Props = {
  plan?: "personal" | "parivaar";
  size?: "sm" | "lg";
  className?: string;
};

/** Region-only price — India shows ₹xx/- only, Worldwide shows $ only */
export function OfferPrice({ plan = "personal", size = "lg", className = "" }: Props) {
  const config = useSiteConfig();
  const { currency, region } = useLocale();
  const price =
    plan === "parivaar"
      ? parivaarMonthlyPrice(config, currency)
      : personalMonthlyPrice(config, currency);
  const was =
    currency === "USD"
      ? plan === "parivaar"
        ? config.marketing.launchPriceParivaarUsd
        : config.marketing.launchPricePersonalUsd
      : plan === "parivaar"
        ? config.marketing.launchPriceParivaar
        : config.marketing.launchPricePersonal;
  const showOffer = config.features.earlyBirdActive && was > price;
  const priceLabel =
    plan === "personal"
      ? regionPersonalPriceLabel(config, region, currency)
      : currency === "INR"
        ? `₹${price}/-`
        : formatMoney(price, currency);

  if (size === "sm") {
    return (
      <span className={className}>
        {showOffer && (
          <span className="line-through text-muted mr-1.5">
            {currency === "INR" ? `₹${was}/-` : formatMoney(was, currency)}
          </span>
        )}
        <span className="text-gold-light font-semibold">{priceLabel}/mo</span>
      </span>
    );
  }

  return (
    <div className={className}>
      {showOffer && (
        <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-wider bg-gold text-black px-3 py-1 rounded-full">
          {region === "IN" ? "Early access" : "Worldwide early access"}
        </span>
      )}
      <p className="flex flex-wrap items-baseline gap-2">
        {showOffer && (
          <span className="text-xl md:text-2xl text-muted line-through font-medium">
            {currency === "INR" ? `₹${was}/-` : formatMoney(was, currency)}
          </span>
        )}
        <span className="font-display text-4xl md:text-5xl font-bold text-white">
          {priceLabel}
        </span>
        <span className="text-sm text-muted">/month</span>
      </p>
      {showOffer && (
        <p className="text-xs text-gold-light mt-1">
          {region === "IN"
            ? `Aap save karte ho ₹${was - price}/- — early access`
            : `You save ${formatMoney(was - price, currency)} — early access pricing`}
        </p>
      )}
    </div>
  );
}

export function OfferBanner() {
  const config = useSiteConfig();
  const { currency, region } = useLocale();
  if (!config.features.earlyBirdActive) return null;
  const price = personalMonthlyPrice(config, currency);
  const was =
    currency === "USD"
      ? config.marketing.launchPricePersonalUsd
      : config.marketing.launchPricePersonal;
  if (was <= price) return null;
  const priceLabel = regionPersonalPriceLabel(config, region, currency);

  return (
    <Link
      href="/signup"
      className="inline-flex flex-wrap items-center gap-2 text-xs font-medium text-gold-light border border-gold/30 bg-gold/10 rounded-full px-4 py-2 hover:bg-gold/15 transition-colors"
    >
      <span className="line-through text-muted">
        {currency === "INR" ? `₹${was}/-` : formatMoney(was, currency)}
      </span>
      <span className="text-white font-semibold">{priceLabel}/mo</span>
      <span className="text-xs uppercase tracking-wide text-gold">
        {region === "IN" ? "India" : "Worldwide"}
      </span>
    </Link>
  );
}
