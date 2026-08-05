"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "./Logo";
import { useApp } from "@/context/AppContext";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { formatPersonalPrice } from "@/lib/pricing";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useApp();
  const config = useSiteConfig();
  const { currency, region } = useLocale();
  const priceLabel = formatPersonalPrice(config, currency);
  const links = [
    { href: "/#hero", label: "Home" },
    { href: "/#emi-reminder", label: region === "IN" ? "EMI / Bills" : "Bills" },
    { href: "/samples", label: "Messages" },
    { href: "/pricing", label: `${priceLabel} Plan` },
    { href: "/faq", label: "FAQ" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 safe-area-pt transition-all duration-300 ${
        scrolled || open
          ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between py-3 md:px-6 safe-area-px">
        <Link href="/" className="flex items-center min-w-0" onClick={() => setOpen(false)}>
          <BrandLockup size="sm" />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          {!state.user && (
            <Link href="/login" className="text-sm font-medium text-ink-soft hover:text-white">
              Sign in
            </Link>
          )}
          {state.user ? (
            <>
              <Link href="/settings" className="text-sm font-medium text-ink-soft hover:text-white">
                Settings
              </Link>
              <Link href="/dashboard" className="btn-primary px-5 py-2.5 rounded-xl text-sm">
                Dashboard
              </Link>
            </>
          ) : (
            <Link href="/signup" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold">
              Join {priceLabel}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="md:hidden flex items-center justify-center min-h-11 min-w-11 -mr-1 text-white rounded-xl hover:bg-white/5"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/98 px-0 py-2 flex flex-col safe-area-px max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 py-3.5 min-h-[48px] flex items-center text-[15px] font-medium border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!state.user && (
            <Link
              href="/login"
              className="text-white/90 py-3.5 min-h-[48px] flex items-center text-[15px] font-medium border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              Sign in
            </Link>
          )}
          {state.user && (
            <Link
              href="/settings"
              className="text-white/90 py-3.5 min-h-[48px] flex items-center text-[15px] font-medium border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              Settings
            </Link>
          )}
          <div className="pt-4 pb-3">
            <Link
              href={state.user ? "/dashboard" : "/signup"}
              className="btn-primary block text-center py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
              onClick={() => setOpen(false)}
            >
              {state.user ? "Dashboard" : `Join ${priceLabel} — Start free`}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
