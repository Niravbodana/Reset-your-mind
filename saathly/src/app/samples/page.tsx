"use client";

import { useState } from "react";
import Link from "next/link";
import { MESSAGE_SAMPLES, fillSample } from "@/lib/message-samples";
import { DEMO_NAME } from "@/lib/constants";
import { AREA_LABELS } from "@/lib/templates";
import { formatCustomerName } from "@/lib/message-format";
import type { Language, LifeArea } from "@/lib/types";

const langs = ["hinglish", "hindi", "english"] as const;

export default function SamplesPage() {
  const [name, setName] = useState(DEMO_NAME);
  const [lang, setLang] = useState<(typeof langs)[number]>("hinglish");
  const [filter, setFilter] = useState<string>("all");

  const filtered =
    filter === "all" ? MESSAGE_SAMPLES : MESSAGE_SAMPLES.filter((m) => m.area === filter);

  return (
    <div className="pt-28 pb-24 px-4">
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="font-display text-4xl font-bold mb-2">Message samples</h1>
        <p className="text-ink-soft text-sm mb-6">
          50+ unique style messages — har din naya, naam ke saath respect (Priya ji, Anand ji).
        </p>
        <div className="flex flex-wrap gap-3 mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-xl border border-white/10 bg-black/40 px-4 py-2 text-sm"
          />
          {langs.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLang(l)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize ${
                lang === l ? "bg-gold text-black" : "bg-white/5 text-muted"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full text-xs ${filter === "all" ? "bg-gold/20 text-gold-light" : "text-muted"}`}
          >
            All
          </button>
          {(Object.keys(AREA_LABELS) as LifeArea[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setFilter(a)}
              className={`px-3 py-1 rounded-full text-xs ${filter === a ? "bg-gold/20 text-gold-light" : "text-muted"}`}
            >
              {AREA_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {filtered.map((m) => (
          <article key={m.id} className="soft-card rounded-2xl p-5">
            <p className="text-[10px] uppercase tracking-wide text-gold-light mb-2">{m.area}</p>
            <p className="text-[15px] leading-relaxed text-white">
              {fillSample(
                m[lang],
                lang === "english"
                  ? name.trim() || DEMO_NAME
                  : formatCustomerName(name.trim() || DEMO_NAME, lang as Language)
              )}
            </p>
          </article>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link href="/signup" className="btn-primary inline-flex px-8 py-3 rounded-xl text-sm">
          Mere naam ke messages chahiye
        </Link>
      </div>
    </div>
  );
}
