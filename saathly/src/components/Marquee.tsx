"use client";

const items = [
  "✨ 12,000+ lives transformed",
  "💰 Finance · Health · Love · Career",
  "📱 6 personalized messages daily",
  "🇮🇳 Hinglish · Hindi · English",
  "🎁 7-day FREE trial",
  "⭐ 4.9 rating",
  "👨‍👩‍👧 Parivaar Plan — pure ghar ke liye",
  "🔥 Real people, real change",
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-gold/20 py-4 bg-gold/10 backdrop-blur-sm">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10" />

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
