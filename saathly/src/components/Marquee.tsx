"use client";

const items = [
  "✨ 47,000+ log join kar chuke",
  "💰 Paisa · Health · Pyaar · Career",
  "📱 Roz 6 personalized messages",
  "🇮🇳 Hinglish · Hindi · English",
  "🎁 7 din bilkul FREE",
  "⭐ 4.9 rating — 12,000+ reviews",
  "👨‍👩‍👧 Parivaar Plan — pure ghar ke liye",
  "🔥 Asli log, asli badlav",
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-gold/20 py-4 bg-gold/5 backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center mx-6 text-sm font-medium text-white/90">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
