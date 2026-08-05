"use client";

import {
  createContext,
  useCallback,
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
  /** After login — region cannot switch to the other market */
  regionLocked: boolean;
  setRegionLocked: (locked: boolean) => void;
  t: (key: string) => string;
  /** False → India Hinglish marketing; True → English */
  preferEnglish: boolean;
  ready: boolean;
};

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "rizn_locale_pref";

type Stored = Partial<LocaleProfile> & { uiLang?: UiLang; regionLocked?: boolean };

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [regionLocked, setRegionLockedState] = useState(false);
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

        let uiLang: UiLang = parsed.uiLang || defaults.uiLang;
        let language = (parsed.language as Language) || defaults.language;

        // Migrate old India default (uiLang=hi meant Hinglish, but showed Devanagari)
        if (region === "IN" && uiLang === "hi" && language === "hinglish") {
          uiLang = "hinglish";
        }

        if (region === "GLOBAL") {
          if (!parsed.uiLang || language === "hinglish" || uiLang === "hinglish") {
            uiLang = "en";
            language = "english";
          } else {
            language = messageLanguageFor("GLOBAL", uiLang);
          }
        } else {
          if (!parsed.uiLang || uiLang === "hi" && language === "hinglish") {
            uiLang = "hinglish";
            language = "hinglish";
          } else if (!parsed.language) {
            language = messageLanguageFor("IN", uiLang);
          }
        }

        setRegionLockedState(Boolean(parsed.regionLocked));
        setProfile({
          region,
          currency: region === "IN" ? "INR" : "USD",
          language,
          marketLabel: region === "IN" ? "India" : "Worldwide",
          uiLang,
        });
      } else {
        const base = buildLocaleProfile();
        const defaults = defaultsForRegion(base.region);
        setProfile({
          ...base,
          currency: base.region === "IN" ? "INR" : "USD",
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
    document.documentElement.lang =
      profile.uiLang === "hinglish" ? "hi-Latn" : profile.uiLang;
    document.documentElement.dir = isRtl(profile.uiLang) ? "rtl" : "ltr";
  }, [profile.uiLang, ready]);

  const persist = (
    next: LocaleProfile & { uiLang: UiLang },
    locked = regionLocked
  ) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...next, regionLocked: locked })
    );
    return next;
  };

  const setRegionLocked = useCallback((locked: boolean) => {
    setRegionLockedState(locked);
    setProfile((p) => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...p, regionLocked: locked })
      );
      return p;
    });
  }, []);

  const setRegion = useCallback((region: Region) => {
    setProfile((p) => {
      // Read lock from storage to avoid stale closure
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw && (JSON.parse(raw) as Stored).regionLocked) return p;
      } catch {
        /* ignore */
      }
      const defaults = defaultsForRegion(region);
      const next = {
        ...p,
        region,
        currency: (region === "IN" ? "INR" : "USD") as DisplayCurrency,
        marketLabel: region === "IN" ? "India" : "Worldwide",
        uiLang: defaults.uiLang,
        language: defaults.language,
      };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, regionLocked: false })
      );
      return next;
    });
  }, []);

  const setCurrency = useCallback((currency: DisplayCurrency) => {
    setProfile((p) => {
      const next = { ...p, currency: p.region === "IN" ? ("INR" as const) : ("USD" as const) };
      void currency;
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, regionLocked })
      );
      return next;
    });
  }, [regionLocked]);

  const setUiLang = useCallback((uiLang: UiLang) => {
    setProfile((p) => {
      const next = {
        ...p,
        uiLang,
        language: messageLanguageFor(p.region, uiLang),
      };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, regionLocked })
      );
      return next;
    });
  }, [regionLocked]);

  const setLanguage = useCallback((language: Language) => {
    setProfile((p) => {
      const next = { ...p, language };
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, regionLocked })
      );
      return next;
    });
  }, [regionLocked]);

  const t = (key: string) => translate(profile.uiLang, key);

  const preferEnglish =
    profile.region === "GLOBAL"
      ? profile.uiLang !== "hi" && profile.uiLang !== "hinglish"
      : profile.uiLang === "en" || profile.language === "english";

  const value = useMemo(
    () => ({
      ...profile,
      setRegion,
      setCurrency,
      setUiLang,
      setLanguage,
      regionLocked,
      setRegionLocked,
      t,
      preferEnglish,
      ready,
    }),
    [profile, ready, regionLocked]
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
      regionLocked: false,
      setRegionLocked: () => {},
      t: (key: string) => translate("en", key),
      preferEnglish: true,
      ready: false,
    };
  }
  return ctx;
}
