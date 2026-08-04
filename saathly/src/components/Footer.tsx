import Link from "next/link";
import { Logo, Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg-soft/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <Logo className="w-8 h-8" />
              <Wordmark className="text-[1.4rem]" />
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">
              Roz tumhare naam ke saath — taaki busy life me mind stable rahe, aur aage badhte raho.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Product</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <Link href="/#problems" className="hover:text-ink">
                  Kiske liye
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-ink">
                  Plans
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-ink">
                  Free trial
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Care</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>
                <a href="mailto:hello@humsafar.app" className="hover:text-ink">
                  hello@humsafar.app
                </a>
              </li>
              <li className="text-xs leading-relaxed">
                Crisis support: iCall 9152987821 · Vandrevala 9999666555
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted">
          <p>© {new Date().getFullYear()} Humsafar</p>
          <p>Made for hardworking people who deserve a calm mind</p>
        </div>
      </div>
    </footer>
  );
}
