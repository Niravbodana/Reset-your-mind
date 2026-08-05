import Link from "next/link";
import { Logo, Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 relative z-10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-[1.35rem]" />
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              Your name. Your nudge. Your rise.
            </p>
            <p className="text-xs text-muted mt-2">Made with ❤️ in India</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/pricing" className="hover:text-gold-light">Plans</Link></li>
              <li><Link href="/programs" className="hover:text-gold-light">Programs</Link></li>
              <li><Link href="/signup" className="hover:text-gold-light">Free trial</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/privacy" className="hover:text-gold-light">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-gold-light">Terms</Link></li>
              <li><Link href="/refund" className="hover:text-gold-light">Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-gold-light">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Support</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="mailto:hello@rizn.app" className="hover:text-gold-light">hello@rizn.app</a></li>
              <li className="text-xs">Crisis helpline: iCall 9152987821</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} RIZN · All rights reserved</p>
          <p>Not a therapist or medical service</p>
        </div>
      </div>
    </footer>
  );
}
