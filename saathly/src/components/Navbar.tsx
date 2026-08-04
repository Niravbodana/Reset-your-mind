"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#how-it-works", label: "Kaise kaam karta hai" },
  { href: "/#stories", label: "Kahaniayan" },
  { href: "/pricing", label: "Plans" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/logo.png"
            alt="Saathly logo"
            width={40}
            height={40}
            className="rounded-xl group-hover:scale-105 transition-transform"
          />
          <span className="font-display text-xl font-semibold gradient-gold">Saathly</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-gold-light transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/signup" className="btn-primary px-5 py-2.5 rounded-full text-sm">
            7 Din Free Try Karo
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden text-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-gold/10 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-gold-light py-2"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/signup"
            className="btn-primary px-5 py-3 rounded-full text-center text-sm"
            onClick={() => setOpen(false)}
          >
            7 Din Free Try Karo
          </Link>
        </div>
      )}
    </header>
  );
}
