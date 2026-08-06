import type { Language } from "./types";
import { detectPreferredLanguage as detect } from "./locale";

/** Prefer Hinglish for India / Hindi browsers; English for the rest of the world */
export function detectPreferredLanguage(): Language {
  return detect();
}
