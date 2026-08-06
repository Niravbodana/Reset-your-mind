"use client";

import { AppProvider } from "@/context/AppContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import { LocaleProvider } from "@/context/LocaleContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteConfigProvider>
      <LocaleProvider>
        <AppProvider>{children}</AppProvider>
      </LocaleProvider>
    </SiteConfigProvider>
  );
}
