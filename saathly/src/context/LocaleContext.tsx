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
import type { DisplayCurrency, LocaleProfile, Region } from "@/lib/locale";
import type { Language } from "@/lib/types";
import {
  defaultsForRegion,
  messageLanguageFor,
  t as translate,
  type UiLang,
  isRtl,
} from "@/lib/i18n";
import { INDIA_ONLY } from "@/lib/market";

type LocaleCtx = LocaleProfile & {
  uiLang: UiLang;
  setRegion: (r: Region) => void;
  setCurrency: (c: DisplayCurrency) => void;
  setUiLang: (l: UiLang) => void;
  setLanguage: (l: Language) => void;
  regionLocked: boolean;
  setRegionLocked: (locked: boolean) => void;
  t: (key: string) => string;
  preferEnglish: boolean;
  ready: boolean;
};

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "rizn_locale_pref";

type Stored = Partial<LocaleProfile> & { uiLang?: UiLang; regionLocked?: boolean };

const INDIA_PROFILE: LocaleProfile & { uiLang: UiLang } = {
  region: "IN",
  currency: "INR",
  language: "english",
  marketLabel: "India",
  uiLang: "en",
};

function forceIndia(
  profile: LocaleProfile & { uiLang: UiLang }
): LocaleProfile & { uiLang: UiLang } {
  if (!INDIA_ONLY) return profile;
  return {
    ...profile,
    region: "IN",
    currency: "INR",
    marketLabel: "India",
    // Keep explicit English if user picked it; otherwise Hinglish
    uiLang:
      profile.uiLang === "en" || profile.uiLang === "hi" || profile.uiLang === "hinglish"
        ? profile.uiLang
        : "en",
    language:
      profile.language === "english" || profile.language === "hindi" || profile.language === "hinglish"
        ? profile.language
        : "english",
  };
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [regionLocked, setRegionLockedState] = useState(INDIA_ONLY);
  const [profile, setProfile] = useState<LocaleProfile & { uiLang: UiLang }>(INDIA_PROFILE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Stored;
        let uiLang: UiLang = parsed.uiLang || "en";
        const language = (parsed.language as Language) || "english";

        if (uiLang === "hi" && language === "hinglish") uiLang = "hinglish";

        const next = forceIndia({
          region: "IN",
          currency: "INR",
          language,
          marketLabel: "India",
          uiLang: uiLang === "hinglish" || uiLang === "hi" || uiLang === "en" ? uiLang : "hinglish",
        });

        if (parsed.region === "GLOBAL" || parsed.currency === "USD") {
          next.uiLang = "en";
          next.language = "english";
        }

        setRegionLockedState(INDIA_ONLY || Boolean(parsed.regionLocked));
        setProfile(next);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...next, regionLocked: INDIA_ONLY || Boolean(parsed.regionLocked) })
        );
      } else {
        setProfile(INDIA_PROFILE);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ ...INDIA_PROFILE, regionLocked: true })
        );
      }
    } catch {
      setProfile(INDIA_PROFILE);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang =
      profile.uiLang === "hinglish" ? "hi-Latn" : profile.uiLang;
    document.documentElement.dir = isRtl(profile.uiLang) ? "rtl" : "ltr";
  }, [profile.uiLang, ready]);

  const persist = useCallback(
    (next: LocaleProfile & { uiLang: UiLang }, locked = regionLocked) => {
      const forced = forceIndia(next);
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...forced, regionLocked: INDIA_ONLY || locked })
      );
      return forced;
    },
    [regionLocked]
  );

  const setRegionLocked = useCallback((locked: boolean) => {
    setRegionLockedState(INDIA_ONLY || locked);
    setProfile((p) => persist(p, INDIA_ONLY || locked));
  }, [persist]);

  const setRegion = useCallback(
    (region: Region) => {
      if (INDIA_ONLY) {
        setProfile((p) => persist({ ...p, ...defaultsForRegion("IN"), region: "IN", currency: "INR", marketLabel: "India" }));
        return;
      }
      setProfile((p) => {
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
    },
    [persist]
  );

  const setCurrency = useCallback(() => {
    setProfile((p) => persist({ ...p, currency: "INR" }));
  }, [persist]);

  const setUiLang = useCallback(
    (uiLang: UiLang) => {
      setProfile((p) =>
        persist({
          ...p,
          uiLang,
          language: messageLanguageFor("IN", uiLang),
        })
      );
    },
    [persist]
  );

  const setLanguage = useCallback(
    (language: Language) => {
      setProfile((p) => persist({ ...p, language }));
    },
    [persist]
  );

  const t = useCallback((key: string) => translate(profile.uiLang, key), [profile.uiLang]);

  // India launch: English UI default; Hinglish/Hindi when user picks them
  const preferEnglish = profile.uiLang === "en" || profile.language === "english";

  const value = useMemo(
    () => ({
      ...profile,
      setRegion,
      setCurrency,
      setUiLang,
      setLanguage,
      regionLocked: INDIA_ONLY || regionLocked,
      setRegionLocked,
      t,
      preferEnglish,
      ready,
    }),
    [profile, ready, regionLocked, setRegion, setCurrency, setUiLang, setLanguage, setRegionLocked, preferEnglish, t]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    return {
      region: "IN" as Region,
      currency: "INR" as DisplayCurrency,
      language: "english" as Language,
      marketLabel: "India",
      uiLang: "en" as UiLang,
      setRegion: () => {},
      setCurrency: () => {},
      setUiLang: () => {},
      setLanguage: () => {},
      regionLocked: true,
      setRegionLocked: () => {},
      t: (key: string) => translate("en", key),
      preferEnglish: false,
      ready: false,
    };
  }
  return ctx;
}
