"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

const members = [
  { role: "Papa", focus: "Health" },
  { role: "Maa", focus: "Mind" },
  { role: "Partner", focus: "Career" },
  { role: "You", focus: "Finance" },
];

export function ParivaarPlanVisual() {
  const config = useSiteConfig();
  const price = config.features.earlyBirdActive
    ? config.marketing.earlyBirdPriceParivaar
    : config.marketing.launchPriceParivaar;
  const perPerson = Math.round(price / 4);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="soft-card rounded-2xl p-8 md:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-gold-light text-sm font-semibold mb-3">
              <Users size={18} />
              Parivaar Plan
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Pure ghar ke liye — 4 log, ek plan
            </h2>
            <p className="text-ink-soft text-sm mb-6 leading-relaxed">
              Alag alag goals, alag messages — preview me seat list save karo. Full separate profiles
              aur shared dashboard app launch pe.
            </p>
            <p className="text-3xl font-bold text-white mb-1">
              ₹{price}
              <span className="text-base font-normal text-muted">/month</span>
            </p>
            <p className="text-sm text-gold-light mb-6">~₹{perPerson} per person</p>
            <Link href="/signup?plan=parivaar" className="btn-primary inline-flex px-6 py-3 rounded-xl text-sm">
              Parivaar waitlist join karo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {members.map((m) => (
              <div key={m.role} className="rounded-xl border border-white/10 bg-black/30 p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-2 text-lg">
                  {m.role[0]}
                </div>
                <p className="font-semibold text-white text-sm">{m.role}</p>
                <p className="text-xs text-muted mt-1">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
