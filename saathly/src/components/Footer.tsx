"use client";

import Link from "next/link";
import { BrandLockup } from "./Logo";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { crisisResources } from "@/lib/locale";

export function Footer() {
  const config = useSiteConfig();
  const email = config.marketing.supportEmail || "hello@rizn.app";
  const crisis = crisisResources("IN");

  return (
    <footer className="border-t border-white/10 relative z-10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLockup />
            <p className="text-sm text-ink-soft leading-relaxed mt-4">
              Daily motivation + EMI/bill reminders — aapki life change hone ka reason. Abhi India ke
              liye.
            </p>
            <p className="text-xs text-gold-light mt-2">🇮🇳 Made for India · ₹99/- se</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-1 text-sm text-ink-soft">
              <li>
                <Link href="/#features" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/daily-motivation" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Daily Motivation
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/samples" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Samples
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Free trial shuru karo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Legal</p>
            <ul className="space-y-1 text-sm text-ink-soft">
              <li>
                <Link href="/privacy" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  Refunds
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Support</p>
            <ul className="space-y-1 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white py-2 min-h-[44px] inline-flex items-center break-all"
                >
                  {email}
                </a>
              </li>
              {crisis.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="hover:text-white py-2 min-h-[44px] inline-flex items-center text-xs"
                  >
                    {c.label}: {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col items-center gap-3 text-xs text-muted">
          <p className="text-center text-sm text-white/80">
            Made in India with <span className="text-rose-400">❤️</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-center">
            <p>© {new Date().getFullYear()} RIZN — aapki life change hone ka reason</p>
            <p>Not a medical or therapy service</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
