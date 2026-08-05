"use client";

import Link from "next/link";
import { BrandLockup } from "./Logo";
import { useSiteConfig } from "@/context/SiteConfigContext";

export function Footer() {
  const config = useSiteConfig();
  const email = config.marketing.supportEmail || "hello@rizn.app";
  const crisis = config.marketing.crisisHelpline || "9152987821";

  return (
    <footer className="border-t border-white/10 relative z-10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <BrandLockup />
            <p className="text-sm text-ink-soft leading-relaxed mt-4">
              RIZN — aapki life change ka reason. Daily motivation + EMI reminders, India ke liye.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/#emi-reminder" className="hover:text-white">EMI Reminder</Link></li>
              <li><Link href="/#notifications" className="hover:text-white">Notifications</Link></li>
              <li><Link href="/pricing" className="hover:text-white">₹99 Plan</Link></li>
              <li><Link href="/samples" className="hover:text-white">Samples</Link></li>
              <li><Link href="/signup" className="hover:text-white">Join now</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href={`mailto:${email}`} className="hover:text-white">{email}</a></li>
              <li className="text-xs text-muted">Crisis support: iCall {crisis}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} RIZN — aapki life change ka reason</p>
          <p>Not a medical or therapy service</p>
        </div>
      </div>
    </footer>
  );
}
