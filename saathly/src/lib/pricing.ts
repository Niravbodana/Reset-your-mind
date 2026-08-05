import type { PublicSiteConfig } from "./site-settings-types";

type Config = Pick<PublicSiteConfig, "marketing" | "features">;

export function personalMonthlyPrice(config: Config): number {
  return config.features.earlyBirdActive
    ? config.marketing.earlyBirdPricePersonal
    : config.marketing.launchPricePersonal;
}

export function parivaarMonthlyPrice(config: Config): number {
  return config.features.earlyBirdActive
    ? config.marketing.earlyBirdPriceParivaar
    : config.marketing.launchPriceParivaar;
}

export function parivaarPerPerson(config: Config): number {
  return Math.round(parivaarMonthlyPrice(config) / 4);
}

export function pricingLabel(config: Config): string {
  const personal = personalMonthlyPrice(config);
  const parivaar = parivaarMonthlyPrice(config);
  if (config.features.earlyBirdActive) {
    return `Early bird: Personal ₹${personal}/mo · Parivaar ₹${parivaar}/mo (launch ₹${config.marketing.launchPricePersonal}/₹${config.marketing.launchPriceParivaar})`;
  }
  return `Personal ₹${personal}/mo · Parivaar ₹${parivaar}/mo`;
}
