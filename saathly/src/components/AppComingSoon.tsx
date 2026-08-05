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
              Android & iOS — jaldi aa raha hai
            </h2>
            <p className="text-ink-soft leading-relaxed mb-6">
              Abhi website preview use karo. App aate hi push notifications — lock screen pe tumhare naam ke saath message.
            </p>
            <Link href="/signup" className="btn-primary inline-flex px-6 py-3.5 rounded-xl text-sm">
              Waitlist join karo — pehle notify
            </Link>
          </div>
          <div className="flex flex-col items-center gap-4">
            {config.marketing.playStoreUrl ? (
              <a href={config.marketing.playStoreUrl} className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[200px]">
                <Play size={24} className="text-gold-light" />
                <span className="font-semibold text-white text-sm">Google Play</span>
              </a>
            ) : (
              <div className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 opacity-60">
                <Play size={24} className="text-gold-light" />
                <span className="text-sm text-muted">Play Store — coming soon</span>
              </div>
            )}
            {config.marketing.appStoreUrl ? (
              <a href={config.marketing.appStoreUrl} className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 min-w-[200px]">
                <Apple size={24} className="text-gold-light" />
                <span className="font-semibold text-white text-sm">App Store</span>
              </a>
            ) : (
              <div className="soft-card rounded-2xl px-6 py-4 flex items-center gap-3 opacity-60">
                <Apple size={24} className="text-gold-light" />
                <span className="text-sm text-muted">App Store — coming soon</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
