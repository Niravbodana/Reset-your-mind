"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, Wordmark } from "./Logo";

const links = [
  { href: "/#feel", label: "Feel" },
  { href: "/#problems", label: "Problems" },
  { href: "/#day", label: "Day" },
  { href: "/pricing", label: "Plans" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 md:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="w-9 h-9" />
          <Wordmark />
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/signup" className="btn-primary px-5 py-2.5 rounded-xl text-sm">
            Start free
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/90 px-4 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-ink-soft py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="btn-primary text-center py-3 rounded-xl text-sm"
            onClick={() => setOpen(false)}
          >
            Start free
          </Link>
        </div>
      )}
    </header>
  );
}
