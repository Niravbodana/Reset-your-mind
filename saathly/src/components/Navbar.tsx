"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandLockup } from "./Logo";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { LanguageSelect } from "./LanguageSelect";
import { DemoModeBanner } from "./DemoModeBanner";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { state } = useApp();
  const { t } = useLocale();
  const marketingLinks = [
    { href: "/#hero", label: t("nav.home") },
    { href: "/#features", label: t("nav.features") },
    { href: "/#transform", label: "Before & After" },
    { href: "/#how", label: "How it works" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/faq", label: t("nav.faq") },
  ];
  const appLinks = [
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/emi-reminders", label: "Bills" },
    { href: "/billing", label: "Plan" },
    { href: "/settings", label: t("nav.settings") },
    { href: "/programs", label: "Programs" },
    { href: "/family", label: "Family" },
  ];
  const links = state.user ? appLinks : marketingLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-menu-open", open);
    return () => document.body.classList.remove("nav-menu-open");
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 safe-area-pt transition-all duration-300 ${
        scrolled || open
          ? "bg-black/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-lg shadow-black/20"
          : "bg-black/40 backdrop-blur-md"
      }`}
    >
      <DemoModeBanner />
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between py-3 md:px-6 safe-area-px"
        aria-label="Main navigation"
      >
        <Link href="/" className="flex items-center min-w-0" onClick={() => setOpen(false)}>
          <BrandLockup size="sm" />
        </Link>

        <div className="hidden md:flex items-center gap-3 lg:gap-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <LanguageSelect compact />
          {!state.user && (
            <Link href="/login" className="text-sm font-medium text-ink-soft hover:text-white">
              {t("nav.signin")}
            </Link>
          )}
          {state.user ? (
            <Link href="/dashboard" className="btn-primary px-5 py-2.5 rounded-xl text-sm">
              {t("nav.dashboard")}
            </Link>
          ) : (
            <Link href="/signup" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-bold">
              Start free trial
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center gap-1.5">
          <LanguageSelect compact />
          <button
            type="button"
            className="flex items-center justify-center min-h-11 min-w-11 -mr-1 text-white rounded-xl hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
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
              href="/faq"
              className="text-white/90 py-3.5 min-h-[48px] flex items-center text-[15px] font-medium border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              FAQ
            </Link>
          )}
          <div className="pt-4 pb-3">
            <Link
              href={state.user ? "/dashboard" : "/signup"}
              className="btn-primary block text-center py-3.5 rounded-xl text-sm font-bold min-h-[48px]"
              onClick={() => setOpen(false)}
            >
              {state.user ? t("nav.dashboard") : "Start free trial"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
