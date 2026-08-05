import Link from "next/link";
import { Logo, Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 relative z-10 bg-black/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-[1.35rem]" />
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              Your name. Your nudge. Your rise. Daily pulses for busy Indian minds.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/#problems" className="hover:text-white">Problems</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Plans</Link></li>
              <li><Link href="/signup" className="hover:text-white">Free trial</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Care</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><a href="mailto:hello@rizn.app" className="hover:text-white">hello@rizn.app</a></li>
              <li className="text-xs">Crisis: iCall 9152987821 · Vandrevala 9999666555</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} RIZN</p>
          <p>See ARCHITECTURE.md for roadmap & legal notes</p>
        </div>
      </div>
    </footer>
  );
}
