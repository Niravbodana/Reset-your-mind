import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-surface/60 mt-8">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Image src="/logo.png" alt="NaamSaath" width={40} height={40} className="rounded-xl" />
              <div>
                <span className="font-display text-xl gradient-gold font-semibold">NaamSaath</span>
                <span className="block text-[9px] text-muted tracking-[0.2em] uppercase">
                  Premium Life Companion
                </span>
              </div>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed font-light">
              Har ghante tumhare naam ke saath — finance, health, love, career. Zindagi badalne wali
              motivation, sirf tumhare liye.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-gold-light mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-muted font-light">
              <li>
                <Link href="/#how-it-works" className="hover:text-champagne transition-colors">
                  Kaise kaam karta hai
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-champagne transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-champagne transition-colors">
                  Free Trial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-gold-light mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-muted font-light">
              <li>
                <a href="mailto:hello@naamsaath.in" className="hover:text-champagne transition-colors">
                  hello@naamsaath.in
                </a>
              </li>
              <li className="text-xs leading-relaxed">
                Ye app therapist nahi hai. Emergency: iCall 9152987821
              </li>
            </ul>
          </div>
        </div>

        <div className="section-divider my-8" />

        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-muted font-light">
          <p>© {new Date().getFullYear()} NaamSaath. All rights reserved.</p>
          <p>Made with care for hardworking India</p>
        </div>
      </div>
    </footer>
  );
}
