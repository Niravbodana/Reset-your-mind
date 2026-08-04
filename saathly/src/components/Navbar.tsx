"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#how-it-works", label: "Kaise kaam karta hai" },
  { href: "/#stories", label: "Kahaniayan" },
  { href: "/pricing", label: "Plans" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Image
              src="/logo.png"
              alt="NaamSaath logo"
              width={42}
              height={42}
              className="rounded-2xl"
            />
          </motion.div>
          <div className="leading-none">
            <span className="font-display text-2xl font-semibold gradient-gold tracking-tight">
              NaamSaath
            </span>
            <span className="block text-[9px] text-muted tracking-[0.2em] uppercase mt-0.5">
              Premium Life Companion
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm text-muted hover:text-champagne transition-colors group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/signup" className="btn-primary px-6 py-2.5 rounded-full text-sm">
              7 Din Free Try Karo
            </Link>
          </motion.div>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gold/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
