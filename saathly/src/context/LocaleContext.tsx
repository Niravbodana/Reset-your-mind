"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  buildLocaleProfile,
  type DisplayCurrency,
  type LocaleProfile,
  type Region,
} from "@/lib/locale";
import type { Language } from "@/lib/types";

type LocaleCtx = LocaleProfile & {
  setRegion: (r: Region) => void;
  setCurrency: (c: DisplayCurrency) => void;
  ready: boolean;
};

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "rizn_locale_pref";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<LocaleProfile>({
    region: "GLOBAL",
    currency: "USD",
    language: "english",
    marketLabel: "Worldwide",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<LocaleProfile>;
        const base = buildLocaleProfile();
        setProfile({
          region: parsed.region || base.region,
          currency: parsed.currency || (parsed.region === "IN" ? "INR" : base.currency),
          language: (parsed.language as Language) || base.language,
          marketLabel: parsed.region === "IN" ? "India" : "Worldwide",
        });
      } else {
        setProfile(buildLocaleProfile());
      }
    } catch {
      setProfile(buildLocaleProfile());
    }
    setReady(true);
  }, []);

  const setRegion = (region: Region) => {
    setProfile((p) => {
      const next = {
        ...p,
        region,
        currency: (region === "IN" ? "INR" : "USD") as DisplayCurrency,
        marketLabel: region === "IN" ? "India" : "Worldwide",
        language: (region === "IN" ? "hinglish" : "english") as Language,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const setCurrency = (currency: DisplayCurrency) => {
    setProfile((p) => {
      const next = { ...p, currency };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const value = useMemo(
    () => ({ ...profile, setRegion, setCurrency, ready }),
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
      setRegion: () => {},
      setCurrency: () => {},
      ready: false,
    };
  }
  return ctx;
}
