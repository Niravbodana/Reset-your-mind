"use client";

import Link from "next/link";
import { BrandLockup } from "./Logo";
import { RegionSwitch } from "./RegionSwitch";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { crisisResources } from "@/lib/locale";

export function Footer() {
  const config = useSiteConfig();
  const { region } = useLocale();
  const email = config.marketing.supportEmail || "hello@rizn.app";
  const crisis = crisisResources(region);

  return (
    <footer className="border-t border-white/10 relative z-10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="mb-8">
          <RegionSwitch />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLockup />
            <p className="text-sm text-ink-soft leading-relaxed mt-4">
              {region === "IN"
                ? "Daily motivation + bill/EMI reminders — India se lekar duniya tak."
                : "Daily motivation + bill reminders for busy lives — available worldwide."}
            </p>
            <p className="text-xs text-gold-light mt-2">🇮🇳 India · 🌍 Worldwide</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-1 text-sm text-ink-soft">
              <li>
                <Link href="/emi-reminder" className="hover:text-white py-2 min-h-[44px] inline-flex items-center">
                  {region === "IN" ? "EMI / Bill Reminder" : "Bill Reminders"}
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
                  Start free trial
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
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>
            © {new Date().getFullYear()} RIZN —{" "}
            {region === "IN" ? "aapki life change ka reason" : "your reason for life change"}
          </p>
          <p>Not a medical or therapy service · Worldwide</p>
        </div>
      </div>
    </footer>
  );
}
