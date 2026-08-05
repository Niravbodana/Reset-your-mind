import Link from "next/link";
import { Logo, Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 relative z-10 bg-black/60">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-[1.35rem]" />
            </div>
            <p className="text-sm text-ink-soft leading-relaxed">
              Personalized daily motivation for busy lives in India.
            </p>
            <p className="text-xs text-muted mt-3">Mobile app — coming soon</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/#notifications" className="hover:text-white">Notifications</Link></li>
              <li><Link href="/#app" className="hover:text-white">Mobile app</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/signup" className="hover:text-white">Early access</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/admin" className="hover:text-white text-muted">Admin</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="mailto:hello@rizn.app" className="hover:text-white">hello@rizn.app</a></li>
              <li className="text-xs text-muted">Crisis support: iCall 9152987821</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} RIZN</p>
          <p>Not a medical or therapy service</p>
        </div>
      </div>
    </footer>
  );
}
