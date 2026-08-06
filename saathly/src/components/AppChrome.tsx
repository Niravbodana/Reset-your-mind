"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InstallPWA } from "@/components/InstallPWA";
import { DemoModeBanner } from "@/components/DemoModeBanner";

const AUTH_PATHS = new Set(["/login", "/signup"]);
const STICKY_CTA_PATHS = new Set(["/", "/pricing", "/emi-reminder", "/daily-motivation"]);

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = AUTH_PATHS.has(pathname);
  const hasStickyCta = STICKY_CTA_PATHS.has(pathname);

  if (isAuth) {
    return (
      <div className="relative z-10 flex-1">
        <div className="sticky top-0 z-[60]">
          <DemoModeBanner />
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className={hasStickyCta ? "has-mobile-cta" : undefined}>
      <Navbar />
      <div className="relative z-10 flex-1">{children}</div>
      <Footer />
      <InstallPWA />
    </div>
  );
}
