"use client";

import Link from "next/link";
import { BrandLockup } from "@/components/Logo";
import { getMessageBankStats } from "@/lib/message-bank";

const BENEFITS = [
  `${getMessageBankStats().total}+ unique messages — aapke naam ke saath`,
  "EMI reminders — 1 din pehle, bank/NBFC naam ke saath",
  "Dashboard se sab control — pause, edit, delete",
];

export function AuthShell({
  children,
  title,
  subtitle,
  footer,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
}) {
  return (
    <div className="min-h-[100dvh]">
      <div className="mx-auto grid min-h-[100dvh] max-w-6xl lg:grid-cols-[1fr_1.05fr]">
        <aside className="relative hidden overflow-hidden border-r border-white/10 lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/animatic-after-hope.jpg)" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/95 via-[#0a0a0f]/80 to-[#0a0a0f]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />

          <div className="relative z-10 p-10 xl:p-12">
            <Link href="/" className="inline-block">
              <BrandLockup size="default" />
            </Link>
          </div>

          <div className="relative z-10 space-y-8 p-10 xl:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold/90">
                Aapki life change ka reason
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white xl:text-4xl">
                Har din thoda better.
                <br />
                <span className="text-gold">₹99/month.</span>
              </h2>
            </div>

            <ul className="space-y-4">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gold/80">
                Demo example
              </p>
              <p className="text-sm italic text-white/70">
                &ldquo;Pehle sirf tension thi. Ab roz ek message aata hai — lagta hai koi saath hai.&rdquo;
              </p>
              <p className="mt-2 text-xs font-medium text-gold/80">— Sample story (not a real review)</p>
            </div>
          </div>
        </aside>

        <div className="flex flex-col justify-start sm:justify-center safe-area-pt safe-area-px py-8 sm:py-12 lg:px-14 xl:px-16 overflow-y-auto">
          <div className="mb-6 sm:mb-8 lg:hidden">
            <Link href="/">
              <BrandLockup size="sm" />
            </Link>
          </div>

          <div className="mx-auto w-full max-w-md pb-8">
            {(title || subtitle) && (
              <div className="mb-6 sm:mb-8">
                {title && (
                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{subtitle}</p>
                )}
              </div>
            )}

            {children}

            {footer && <div className="mt-8 border-t border-white/10 pt-6">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
