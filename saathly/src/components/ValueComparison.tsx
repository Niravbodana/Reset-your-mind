"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";

const rows = [
  {
    item: "Daily chai (₹30 × 30)",
    cost: "₹900/mo",
    rizn: false,
  },
  {
    item: "One therapy session",
    cost: "₹2,000+",
    rizn: false,
  },
  {
    item: "Generic quote apps",
    cost: "Free",
    note: "No naam, no timing, no action",
    rizn: false,
  },
  {
    item: "RIZN Personal",
    cost: "₹99/mo",
    note: "6 naam-wale messages + actions roz",
    rizn: true,
  },
];

export function ValueComparison() {
  const config = useSiteConfig();
  const price = config.features.earlyBirdActive
    ? config.marketing.earlyBirdPricePersonal
    : config.marketing.launchPricePersonal;
  const launch = config.marketing.launchPricePersonal;

  return (
    <section className="py-16 md:py-20 border-y border-white/5 bg-bg-elevated/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="section-label mb-3">Value</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            ₹{price}/month — kya milta hai?
          </h2>
          <p className="text-ink-soft text-sm">
            {config.features.earlyBirdActive && launch > price && (
              <span className="text-gold-light font-semibold">
                Early bird ₹{price} · Launch pe ₹{launch} &nbsp;·&nbsp;
              </span>
            )}
            Roz 6 personal messages — chai se sasta, therapy se practical
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-muted">
                <th className="pb-3 font-semibold">Option</th>
                <th className="pb-3 font-semibold">Cost</th>
                <th className="pb-3 font-semibold">RIZN jaisa?</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.item}
                  className={`border-b border-white/5 ${r.rizn ? "bg-gold/5" : ""}`}
                >
                  <td className="py-4 pr-4 text-white font-medium">{r.item}</td>
                  <td className="py-4 pr-4 text-ink-soft">
                    {r.rizn ? `₹${price}/mo` : r.cost}
                  </td>
                  <td className="py-4 text-ink-soft">{r.note || (r.rizn ? "✓ Naam + timing + action" : "—")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
