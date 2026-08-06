"use client";

import Link from "next/link";
import { Apple, Play } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function AppComingSoon() {
  const config = useSiteConfig();

  return (
    <section id="app" className="py-20 md:py-24 border-y border-white/5 bg-bg-elevated/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="section-label mb-3">Mobile app</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Android & iOS — launching soon
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Start on web today — browser notifications are live. Daily messages with your name, bill reminders 1 day early. Native Android & iOS apps coming soon.
            </p>
            <Link href="/signup" className="btn-primary inline-flex px-6 py-3.5 rounded-xl text-sm font-semibold">
              Start free — pehle access pao
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4">
            {config.marketing.playStoreUrl ? (
              <a href={config.marketing.playStoreUrl} className="premium-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[200px]">
                <Play size={24} className="text-gold-light" />
                <span className="font-semibold text-white text-sm">Google Play</span>
              </a>
            ) : (
              <div className="premium-card rounded-2xl px-6 py-4 flex items-center gap-3 opacity-70">
                <Play size={24} className="text-gold-light" />
                <span className="text-sm text-ink-soft">Google Play — soon</span>
              </div>
            )}
            {config.marketing.appStoreUrl ? (
              <a href={config.marketing.appStoreUrl} className="premium-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[200px]">
                <Apple size={24} className="text-gold-light" />
                <span className="font-semibold text-white text-sm">App Store</span>
              </a>
            ) : (
              <div className="premium-card rounded-2xl px-6 py-4 flex items-center gap-3 opacity-70">
                <Apple size={24} className="text-gold-light" />
                <span className="text-sm text-ink-soft">App Store — soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
