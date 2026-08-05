"use client";

import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";
import { dualPersonalPriceLabel, personalMonthlyPrice, parivaarMonthlyPrice } from "@/lib/pricing";

type Props = {
  plan?: "personal" | "parivaar";
  size?: "sm" | "lg";
  className?: string;
  /** Show both ₹ and $ for world-level marketing */
  dual?: boolean;
};

export function OfferPrice({ plan = "personal", size = "lg", className = "", dual = true }: Props) {
  const config = useSiteConfig();
  const { currency } = useLocale();
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
  const otherCurrency = currency === "INR" ? "USD" : "INR";
  const otherPrice =
    plan === "parivaar"
      ? parivaarMonthlyPrice(config, otherCurrency)
      : personalMonthlyPrice(config, otherCurrency);

  if (size === "sm") {
    return (
      <span className={className}>
        {showOffer && (
          <span className="line-through text-muted mr-1.5">{formatMoney(was, currency)}</span>
        )}
        <span className="text-gold-light font-semibold">{formatMoney(price, currency)}/mo</span>
        {dual && (
          <span className="text-muted text-xs ml-1.5">
            ({formatMoney(otherPrice, otherCurrency)})
          </span>
        )}
      </span>
    );
  }

  return (
    <div className={className}>
      {showOffer && (
        <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-wider bg-gold text-black px-3 py-1 rounded-full">
          Worldwide early access
        </span>
      )}
      <p className="flex flex-wrap items-baseline gap-2">
        {showOffer && (
          <span className="text-xl md:text-2xl text-muted line-through font-medium">
            {formatMoney(was, currency)}
          </span>
        )}
        <span className="font-display text-4xl md:text-5xl font-bold text-white">
          {formatMoney(price, currency)}
        </span>
        <span className="text-sm text-muted">/month</span>
      </p>
      {dual && (
        <p className="text-sm text-ink-soft mt-1">
          Also {formatMoney(otherPrice, otherCurrency)}/mo · available worldwide
        </p>
      )}
      {showOffer && (
        <p className="text-xs text-gold-light mt-1">
          You save {formatMoney(was - price, currency)} — early access pricing
        </p>
      )}
    </div>
  );
}

export function OfferBanner() {
  const config = useSiteConfig();
  const { currency } = useLocale();
  if (!config.features.earlyBirdActive) return null;
  const price = personalMonthlyPrice(config, currency);
  const was =
    currency === "USD"
      ? config.marketing.launchPricePersonalUsd
      : config.marketing.launchPricePersonal;
  if (was <= price) return null;

  return (
    <Link
      href="/signup"
      className="inline-flex flex-wrap items-center gap-2 text-xs font-medium text-gold-light border border-gold/30 bg-gold/10 rounded-full px-4 py-2 hover:bg-gold/15 transition-colors"
    >
      <span className="line-through text-muted">{formatMoney(was, currency)}</span>
      <span className="text-white font-semibold">{formatMoney(price, currency)}/mo</span>
      <span className="text-xs uppercase tracking-wide text-gold">Worldwide</span>
      <span className="text-white/50 hidden sm:inline">{dualPersonalPriceLabel(config)}</span>
    </Link>
  );
}
