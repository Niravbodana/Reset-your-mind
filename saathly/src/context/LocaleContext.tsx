"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildLocaleProfile,
  type DisplayCurrency,
  type LocaleProfile,
  type Region,
} from "@/lib/locale";
import type { Language } from "@/lib/types";
import {
  messageLanguageFor,
  t as translate,
  type UiLang,
  isRtl,
} from "@/lib/i18n";

type LocaleCtx = LocaleProfile & {
  uiLang: UiLang;
  setRegion: (r: Region) => void;
  setCurrency: (c: DisplayCurrency) => void;
  setUiLang: (l: UiLang) => void;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
  /** True when UI should prefer English marketing (Worldwide or uiLang=en) */
  preferEnglish: boolean;
  ready: boolean;
};

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "rizn_locale_pref";

type Stored = Partial<LocaleProfile> & { uiLang?: UiLang };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<LocaleProfile & { uiLang: UiLang }>({
    region: "GLOBAL",
    currency: "USD",
    language: "english",
    marketLabel: "Worldwide",
    uiLang: "en",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        const base = buildLocaleProfile();
        const region = parsed.region || base.region;
        let uiLang: UiLang =
          parsed.uiLang ||
          (region === "IN" ? ("hi" as UiLang) : ("en" as UiLang));
        let language =
          (parsed.language as Language) || messageLanguageFor(region, uiLang);

        // Worldwide: never keep accidental Hinglish; default UI English.
        // Explicit LanguageSelect (parsed.uiLang) still wins for world languages.
        if (region === "GLOBAL") {
          if (language === "hinglish" || !parsed.uiLang) {
            uiLang = parsed.uiLang && language !== "hinglish" ? parsed.uiLang : "en";
          }
          language = messageLanguageFor("GLOBAL", uiLang);
        }

        setProfile({
          region,
          currency: parsed.currency || (region === "IN" ? "INR" : "USD"),
          language,
          marketLabel: region === "IN" ? "India" : "Worldwide",
          uiLang,
        });
      } else {
        const base = buildLocaleProfile();
        const uiLang: UiLang = base.region === "IN" ? "hi" : "en";
        setProfile({
          ...base,
          language: messageLanguageFor(base.region, uiLang),
          uiLang,
        });
      }
    } catch {
      setProfile({
        region: "GLOBAL",
        currency: "USD",
        language: "english",
        marketLabel: "Worldwide",
        uiLang: "en",
      });
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = profile.uiLang;
    document.documentElement.dir = isRtl(profile.uiLang) ? "rtl" : "ltr";
  }, [profile.uiLang, ready]);

  const persist = (next: LocaleProfile & { uiLang: UiLang }) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  };

  const setRegion = (region: Region) => {
    setProfile((p) => {
      // Selecting Worldwide always resets UI + messages to English.
      // User can then pick any world language from the Language selector.
      const uiLang: UiLang =
        region === "GLOBAL" ? "en" : p.uiLang === "en" || p.region === "GLOBAL" ? "hi" : p.uiLang;
      const next = persist({
        ...p,
        region,
        currency: region === "IN" ? "INR" : "USD",
        marketLabel: region === "IN" ? "India" : "Worldwide",
        uiLang,
        language: messageLanguageFor(region, uiLang),
      });
      return next;
    });
  };

  const setCurrency = (currency: DisplayCurrency) => {
    setProfile((p) => persist({ ...p, currency }));
  };

  const setUiLang = (uiLang: UiLang) => {
    setProfile((p) =>
      persist({
        ...p,
        uiLang,
        language: messageLanguageFor(p.region, uiLang),
      })
    );
  };

  const setLanguage = (language: Language) => {
    setProfile((p) => persist({ ...p, language }));
  };

  const t = (key: string) => translate(profile.uiLang, key);

  // Hinglish marketing only when Hindi UI is active (India default, or user picked Hindi).
  // Worldwide + English (default) → English. Future features must use preferEnglish / t().
  const preferEnglish = profile.uiLang !== "hi";

  const value = useMemo(
    () => ({
      ...profile,
      setRegion,
      setCurrency,
      setUiLang,
      setLanguage,
      t,
      preferEnglish,
      ready,
    }),
    [profile, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      region: "GLOBAL" as Region,
      currency: "USD" as DisplayCurrency,
      language: "english" as Language,
      marketLabel: "Worldwide",
      uiLang: "en" as UiLang,
      setRegion: () => {},
      setCurrency: () => {},
      setUiLang: () => {},
      setLanguage: () => {},
      t: (key: string) => translate("en", key),
      preferEnglish: true,
      ready: false,
    };
  }
  return ctx;
}
