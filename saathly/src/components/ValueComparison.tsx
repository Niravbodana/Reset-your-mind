"use client";

import { useSiteConfig } from "@/context/SiteConfigContext";
import { useLocale } from "@/context/LocaleContext";
import { formatMoney } from "@/lib/locale";
import { personalMonthlyPrice } from "@/lib/pricing";

export function ValueComparison() {
  const config = useSiteConfig();
  const { currency, region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const price = personalMonthlyPrice(config, currency);
  const launch =
    currency === "USD"
      ? config.marketing.launchPricePersonalUsd
      : config.marketing.launchPricePersonal;
  const priceLabel = formatMoney(price, currency);
  const launchLabel = formatMoney(launch, currency);

  const rows = isIN
    ? [
        {
          item: "Daily chai (₹30 × 30)",
          cost: "₹900/mo",
          note: "Habit spend, not personalized",
          rizn: false,
        },
        {
          item: "Professional counselling (1 session)",
          cost: "₹2,000+",
          note: "Clinical support — RIZN is not a substitute",
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
          cost: "",
          note: "Daily messages + EMI reminders + your schedule — naam ke saath",
          rizn: true,
        },
      ]
    : [
        {
          item: "Daily coffee ($5 × 30)",
          cost: "$150/mo",
          note: "Habit spend, not personalized",
          rizn: false,
        },
        {
          item: "One therapy session",
          cost: "$100+",
          note: "Clinical support — RIZN is not a substitute",
          rizn: false,
        },
        {
          item: "Generic quote apps",
          cost: "Free",
          note: "No name, no timing, no action",
          rizn: false,
        },
        {
          item: "RIZN Personal",
          cost: "",
          note: "Daily messages + bill reminders + your schedule — with your name",
          rizn: true,
        },
      ];

  return (
    <section className="py-14 sm:py-16 md:py-20 border-y border-white/5 bg-bg-elevated/40">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="section-label mb-3">Value</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            {isIN ? (
              <>
                Sirf {priceLabel} — kya milega?
              </>
            ) : (
              <>
                Just {priceLabel} — what you get
              </>
            )}
          </h2>
          <p className="text-ink-soft text-sm">
            {config.features.earlyBirdActive && launch > price && (
              <span className="text-gold-light font-semibold">
                {isIN
                  ? `Limited offer ${priceLabel} · Regular ${launchLabel}`
                  : `Early access ${priceLabel} · Regular ${launchLabel}`}
                &nbsp;·&nbsp;
              </span>
            )}
            {isIN
              ? "Daily habit nudges — chai se sasta, quotes se zyada personal"
              : "Daily habit nudges — less than a coffee, more personal than quotes"}
          </p>
        </div>

        <div className="md:hidden space-y-3">
          {rows.map((r) => (
            <div
              key={r.item}
              className={`rounded-2xl p-4 border ${r.rizn ? "border-gold/30 bg-gold/5 premium-card" : "border-white/10 soft-card"}`}
            >
              <p className="font-semibold text-white text-sm">{r.item}</p>
              <p className="text-ink-soft text-sm mt-1">
                {r.rizn ? `${priceLabel}` : r.cost}
              </p>
              <p className="text-xs text-muted mt-2">{r.note}</p>
            </div>
          ))}
        </div>

        <div className="hidden md:block overflow-x-auto premium-card rounded-2xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-muted">
                <th className="pb-3 px-4 pt-4 font-semibold">Option</th>
                <th className="pb-3 px-4 pt-4 font-semibold">Cost</th>
                <th className="pb-3 px-4 pt-4 font-semibold">
                  {isIN ? "RIZN jaisa?" : "Like RIZN?"}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.item}
                  className={`border-b border-white/5 last:border-0 ${r.rizn ? "bg-gold/5" : ""}`}
                >
                  <td className="py-4 px-4 text-white font-medium">{r.item}</td>
                  <td className="py-4 px-4 text-ink-soft">
                    {r.rizn ? `${priceLabel}` : r.cost}
                  </td>
                  <td className="py-4 px-4 text-ink-soft">{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
