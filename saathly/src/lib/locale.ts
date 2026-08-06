import type { Language } from "./types";
import { INDIA_ONLY } from "./market";

export type Region = "IN" | "GLOBAL";
export type DisplayCurrency = "INR" | "USD";

export type LocaleProfile = {
  region: Region;
  currency: DisplayCurrency;
  language: Language;
  /** Primary market label */
  marketLabel: string;
};

/** Detect region from browser. India-only launch always returns IN. */
export function detectRegion(): Region {
  if (INDIA_ONLY) return "IN";
  if (typeof navigator === "undefined") return "GLOBAL";
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (tz.startsWith("Asia/Kolkata") || tz.startsWith("Asia/Calcutta")) return "IN";
  } catch {
    /* ignore */
  }
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) =>
    l.toLowerCase()
  );
  if (langs.some((l) => l === "hi" || l.startsWith("hi-") || l === "en-in")) return "IN";
  return "GLOBAL";
}

export function detectPreferredLanguage(region?: Region): Language {
  const r = region ?? detectRegion();
  if (typeof navigator === "undefined") return "english";
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) =>
    l.toLowerCase()
  );
  if (langs.some((l) => l.startsWith("hi"))) return "hinglish";
  return "english";
}

export function buildLocaleProfile(): LocaleProfile {
  const region = detectRegion();
  return {
    region,
    currency: region === "IN" ? "INR" : "USD",
    language: detectPreferredLanguage(region),
    marketLabel: region === "IN" ? "India" : "Worldwide",
  };
}

export function formatMoney(
  amount: number,
  currency: DisplayCurrency,
  opts?: { compact?: boolean }
): string {
  if (currency === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    }).format(amount);
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Crisis resources by region */
export function crisisResources(region: Region): { label: string; value: string; href: string }[] {
  if (region === "IN") {
    return [
      { label: "iCall (India)", value: "9152987821", href: "tel:9152987821" },
      { label: "Vandrevala", value: "9999666555", href: "tel:9999666555" },
    ];
  }
  return [
    { label: "IASP resources", value: "Find local help", href: "https://www.iasp.info/suicidalthoughts/" },
    { label: "IASP website", value: "iasp.info", href: "https://www.iasp.info/" },
  ];
}
