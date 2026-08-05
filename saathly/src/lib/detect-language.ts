import type { Language } from "./types";

/** Prefer Hinglish for India / Hindi browsers; English otherwise */
export function detectPreferredLanguage(): Language {
  if (typeof navigator === "undefined") return "hinglish";
  const langs = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((l) =>
    l.toLowerCase()
  );
  if (langs.some((l) => l.startsWith("hi") || l.includes("hi-in"))) return "hinglish";
  if (langs.some((l) => l.startsWith("en-in"))) return "hinglish";
  if (langs.some((l) => l.startsWith("en"))) return "english";
  return "hinglish";
}
