import type { PublicSiteConfig } from "./site-settings-types";
import type { DisplayCurrency, Region } from "./locale";
import { formatMoney } from "./locale";

type Config = Pick<PublicSiteConfig, "marketing" | "features">;

export function personalMonthlyPrice(config: Config, currency: DisplayCurrency = "INR"): number {
  if (currency === "USD") {
    return config.features.earlyBirdActive
      ? config.marketing.earlyBirdPricePersonalUsd
      : config.marketing.launchPricePersonalUsd;
  }
  return config.features.earlyBirdActive
    ? config.marketing.earlyBirdPricePersonal
    : config.marketing.launchPricePersonal;
}

export function parivaarMonthlyPrice(config: Config, currency: DisplayCurrency = "INR"): number {
  if (currency === "USD") {
    return config.features.earlyBirdActive
      ? config.marketing.earlyBirdPriceParivaarUsd
      : config.marketing.launchPriceParivaarUsd;
  }
  return config.features.earlyBirdActive
    ? config.marketing.earlyBirdPriceParivaar
    : config.marketing.launchPriceParivaar;
}

export function parivaarPerPerson(config: Config, currency: DisplayCurrency = "INR"): number {
  const p = parivaarMonthlyPrice(config, currency);
  return currency === "USD" ? Math.round((p / 4) * 100) / 100 : Math.round(p / 4);
}

export function formatPersonalPrice(config: Config, currency: DisplayCurrency): string {
  return formatMoney(personalMonthlyPrice(config, currency), currency);
}

export function formatInrMonthly(amount: number): string {
  return `₹${amount}/month`;
}

/** Single-currency price for the active region — never mix ₹ and $ */
export function regionPersonalPriceLabel(
  config: Config,
  region: Region,
  currency?: DisplayCurrency
): string {
  const c = currency || (region === "IN" ? "INR" : "USD");
  const amount = personalMonthlyPrice(config, c);
  if (c === "INR") return formatInrMonthly(amount);
  return `${formatMoney(amount, "USD")}/month`;
}

/**
 * @deprecated Use regionPersonalPriceLabel — dual ₹·$ causes India/Worldwide mismatch.
 * Kept as region-aware alias so old call sites stay correct.
 */
export function dualPersonalPriceLabel(config: Config, region: Region = "GLOBAL"): string {
  return regionPersonalPriceLabel(config, region);
}

export function pricingLabel(config: Config, region: Region = "GLOBAL"): string {
  if (region === "IN") {
    const personal = personalMonthlyPrice(config, "INR");
    if (config.features.earlyBirdActive) {
      return `Early access: ${formatInrMonthly(personal)}`;
    }
    return `Personal ${formatInrMonthly(personal)}`;
  }
  const usd = personalMonthlyPrice(config, "USD");
  if (config.features.earlyBirdActive) {
    return `Early access: ${formatMoney(usd, "USD")}/month`;
  }
  return `Personal ${formatMoney(usd, "USD")}/month`;
}
