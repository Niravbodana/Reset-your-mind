"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { IPhoneNotificationDemo } from "./IPhoneNotificationDemo";

export function HeroVideo() {
  const config = useSiteConfig();
  const url = config.marketing.heroVideoUrl;

  if (url) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <video src={url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return <IPhoneNotificationDemo />;
}
