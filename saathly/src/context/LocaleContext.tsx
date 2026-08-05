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
  defaultsForRegion,
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
  /** False → India-style Hinglish marketing; True → English */
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
        const defaults = defaultsForRegion(region);

        // Region defaults win when stored language conflicts with region
        // (e.g. leftover Hinglish on Worldwide, or English stuck on India).
        let uiLang: UiLang = parsed.uiLang || defaults.uiLang;
        let language = (parsed.language as Language) || defaults.language;

        if (region === "GLOBAL") {
          if (!parsed.uiLang || language === "hinglish") {
            uiLang = "en";
            language = "english";
          } else {
            language = messageLanguageFor("GLOBAL", uiLang);
          }
        } else {
          // India — default Hinglish unless user explicitly chose English UI
          if (!parsed.uiLang || (!parsed.language && uiLang === "hi")) {
            uiLang = "hi";
            language = "hinglish";
          } else if (uiLang === "hi" && language === "english") {
            // Hindi UI on India → messages Hinglish
            language = "hinglish";
          } else if (!parsed.language) {
            language = messageLanguageFor("IN", uiLang);
          }
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
        const defaults = defaultsForRegion(base.region);
        setProfile({
          ...base,
          language: defaults.language,
          uiLang: defaults.uiLang,
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
      // Always reset to region defaults on toggle:
      // India → Hinglish · Worldwide → English
      const defaults = defaultsForRegion(region);
      return persist({
        ...p,
        region,
        currency: region === "IN" ? "INR" : "USD",
        marketLabel: region === "IN" ? "India" : "Worldwide",
        uiLang: defaults.uiLang,
        language: defaults.language,
      });
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

  // India + Hinglish/Hindi → Hinglish marketing. Worldwide English (unless Hindi UI).
  const preferEnglish =
    profile.region === "GLOBAL"
      ? profile.uiLang !== "hi"
      : profile.language === "english";

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
