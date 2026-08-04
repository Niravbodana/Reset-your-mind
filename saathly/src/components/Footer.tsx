import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 bg-surface/50 mt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.png" alt="Saathly" width={36} height={36} className="rounded-lg" />
              <span className="font-display text-lg gradient-gold font-semibold">Saathly</span>
            </div>
            <p className="text-muted text-sm max-w-sm leading-relaxed">
              Har ghante tumhare naam ke saath — finance, health, love, career. Zindagi badalne wali
              motivation, sirf tumhare liye.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold-light mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <Link href="/#how-it-works" className="hover:text-foreground transition-colors">
                  Kaise kaam karta hai
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Plans & Pricing
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-foreground transition-colors">
                  Free Trial
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gold-light mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href="mailto:hello@saathly.in" className="hover:text-foreground transition-colors">
                  hello@saathly.in
                </a>
              </li>
              <li className="text-xs leading-relaxed">
                Ye app therapist nahi hai. Emergency me helpline: iCall 9152987821
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Saathly. Sab rights reserved.</p>
          <p>Made with ❤️ for hardworking India</p>
        </div>
      </div>
    </footer>
  );
}
