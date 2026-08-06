"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { getMessageBankStats } from "@/lib/message-bank";
import { HeroCounter } from "./HeroCounter";
import { HeroPhoneShowcase } from "./HeroPhoneShowcase";

const MESSAGE_COUNT = getMessageBankStats().total;

export function Hero() {
  const config = useSiteConfig();
  const trialDays = config.marketing.trialDays || 7;
  const members = Math.max(config.waitlistCount, 52);

  const trustBadges = [
    `${trialDays}-Day Free Trial`,
    "₹0 Today",
    "Cancel Anytime",
  ];

  return (
    <section id="hero" className="hero-dark relative overflow-x-hidden">
      {/* Background */}
      <div className="hero-dark-bg" aria-hidden>
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-particles" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 md:px-6 page-top pb-8 sm:pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* LEFT */}
          <div className="min-w-0 z-10">
            <h1 className="font-display text-[2rem] sm:text-[2.65rem] md:text-[3.15rem] lg:text-[3.35rem] font-bold leading-[1.08] tracking-[-0.035em] mb-5 text-ink">
              Small reminders.
              <br />
              <span className="text-gold-light">Better life.</span>
            </h1>

            <p className="text-[15px] sm:text-lg text-ink-soft max-w-md leading-relaxed mb-8">
              Daily personalized reminders for habits, bills, health, and control — with your name.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Link
                href="/signup"
                className="btn-primary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-bold w-full sm:w-auto min-h-[52px]"
              >
                Start {trialDays}-Day Free Trial
                <ArrowRight size={18} className="shrink-0" aria-hidden />
              </Link>
              <Link
                href="/#demo"
                className="btn-secondary inline-flex items-center justify-center px-7 py-4 rounded-2xl text-[15px] font-semibold w-full sm:w-auto min-h-[52px]"
              >
                See Demo
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {trustBadges.map((badge) => (
                <span key={badge} className="hero-trust-pill">
                  <Check size={12} className="text-gold-light shrink-0" strokeWidth={2.5} aria-hidden />
                  {badge}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-ink">
                  <HeroCounter end={members} suffix="+" />
                </p>
                <p className="text-xs text-muted mt-0.5">Early members</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-ink">
                  <HeroCounter end={MESSAGE_COUNT} suffix="+" />
                </p>
                <p className="text-xs text-muted mt-0.5">Personalized messages</p>
              </div>
              <div>
                <p className="font-display text-xl sm:text-2xl font-bold text-ink">1 day</p>
                <p className="text-xs text-muted mt-0.5">Early bill alerts</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative w-full min-w-0 z-10" id="demo">
            <HeroPhoneShowcase />
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="hero-bottom-strip relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-muted">
          {["No Spam", "Cancel Anytime", "₹0 Today", "Secure Payments", "Made in India"].map(
            (item, i, arr) => (
              <span key={item} className="inline-flex items-center gap-2">
                {item}
                {i < arr.length - 1 && <span className="text-white/20 hidden sm:inline" aria-hidden>·</span>}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
