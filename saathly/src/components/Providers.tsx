"use client";

import { AppProvider } from "@/context/AppContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SiteConfigProvider>
      <AppProvider>{children}</AppProvider>
    </SiteConfigProvider>
  );
}
