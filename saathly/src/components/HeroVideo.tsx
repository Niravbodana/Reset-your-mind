"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import Image from "next/image";
import { NotificationPhone } from "./NotificationPhone";

export function HeroVideo() {
  const config = useSiteConfig();
  const url = config.marketing.heroVideoUrl;

  if (url) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-[9/16] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
        <video src={url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/15 mb-6">
        <Image
          src="/images/hero-premium.jpg"
          alt="RIZN preview"
          fill
          className="object-cover"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="text-white text-sm font-medium px-4 text-center">
            Animated phone preview — app launch pe aisa dikhega
          </p>
        </div>
      </div>
      <NotificationPhone />
    </div>
  );
}
