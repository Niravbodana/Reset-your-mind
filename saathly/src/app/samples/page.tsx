"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MESSAGE_BANK, getMessageBankStats } from "@/lib/message-bank";
import { DEMO_NAME } from "@/lib/constants";
import { AREA_LABELS } from "@/lib/templates";
import { formatCustomerName } from "@/lib/message-format";
import type { Language, LifeArea } from "@/lib/types";

const langs = ["hinglish", "hindi", "english"] as const;
const PAGE_SIZE = 48;
const TOTAL = getMessageBankStats().total;

function fillName(text: string, name: string, lang: (typeof langs)[number]) {
  const display =
    lang === "english" ? name.trim() || DEMO_NAME : formatCustomerName(name.trim() || DEMO_NAME, lang);
  return text.replaceAll("{name}", display);
}

export default function SamplesPage() {
  const [name, setName] = useState(DEMO_NAME);
  const [lang, setLang] = useState<(typeof langs)[number]>("hinglish");
  const [filter, setFilter] = useState<string>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => (filter === "all" ? MESSAGE_BANK : MESSAGE_BANK.filter((m) => m.area === filter)),
    [filter]
  );

  const shown = filtered.slice(0, visible);

  return (
    <div className="pt-28 pb-24 px-4">
      <div className="max-w-3xl mx-auto mb-10">
        <h1 className="font-display text-4xl font-bold mb-2">Message samples</h1>
        <p className="text-ink-soft text-sm mb-2">
          <strong className="text-gold-light">{TOTAL.toLocaleString('en-IN')}+</strong> respectful unique messages — har din naya, naam ke
          saath respect (Priya ji, Rahul ji).
        </p>
        <p className="text-xs text-muted mb-6">
          Kabhi repeat nahi jab tak poora pool complete na ho — phir fresh cycle.
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
            onClick={() => {
              setFilter("all");
              setVisible(PAGE_SIZE);
            }}
            className={`px-3 py-1 rounded-full text-xs ${filter === "all" ? "bg-gold/20 text-gold-light" : "text-muted"}`}
          >
            All ({TOTAL})
          </button>
          {(Object.keys(AREA_LABELS) as LifeArea[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                setFilter(a);
                setVisible(PAGE_SIZE);
              }}
              className={`px-3 py-1 rounded-full text-xs ${filter === a ? "bg-gold/20 text-gold-light" : "text-muted"}`}
            >
              {AREA_LABELS[a]}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {shown.map((m) => (
          <article key={m.id} className="soft-card rounded-2xl p-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="text-[10px] uppercase tracking-wide text-gold-light">{m.area}</p>
              <p className="text-[10px] text-muted capitalize">{m.slot}</p>
            </div>
            <p className="text-[15px] leading-relaxed text-white">{fillName(m[lang], name, lang)}</p>
            <p className="mt-3 text-xs text-white/45">
              <span className="text-gold-light/80">Action:</span> {m.microAction}
            </p>
          </article>
        ))}
      </div>

      {visible < filtered.length && (
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:border-gold/30 hover:bg-white/10"
          >
            Load more ({shown.length} of {filtered.length})
          </button>
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/signup" className="btn-primary inline-flex px-8 py-3 rounded-xl text-sm">
          Mere naam ke messages chahiye
        </Link>
      </div>
    </div>
  );
}
