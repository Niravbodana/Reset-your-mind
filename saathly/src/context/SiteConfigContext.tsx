"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { PublicSiteConfig } from "@/lib/site-settings-types";
import { DEFAULT_SETTINGS, toPublicConfig } from "@/lib/site-settings-types";

const defaultConfig = toPublicConfig(DEFAULT_SETTINGS, 0);

const Ctx = createContext<PublicSiteConfig>(defaultConfig);

export function SiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<PublicSiteConfig>(defaultConfig);

  useEffect(() => {
    fetch("/api/settings/public")
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .catch(() => setConfig(defaultConfig));
  }, []);

  return <Ctx.Provider value={config}>{children}</Ctx.Provider>;
}

export function useSiteConfig() {
  return useContext(Ctx);
}
