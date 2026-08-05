import type { PublicSiteConfig } from "./site-settings-types";
import type { DisplayCurrency } from "./locale";
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

/** Dual price line for world-level marketing */
export function dualPersonalPriceLabel(config: Config): string {
  const inr = formatPersonalPrice(config, "INR");
  const usd = formatPersonalPrice(config, "USD");
  return `${inr} · ${usd}`;
}

export function pricingLabel(config: Config): string {
  const personal = personalMonthlyPrice(config, "INR");
  const usd = personalMonthlyPrice(config, "USD");
  if (config.features.earlyBirdActive) {
    return `Early access: ₹${personal}/mo · $${usd}/mo worldwide`;
  }
  return `Personal ₹${personal}/mo · $${usd}/mo`;
}
