"use client";

const items = [
  "12,000+ lives transformed",
  "₹99/month — less than a chai",
  "Personalized with YOUR name",
  "Finance · Health · Love · Career",
  "6 messages every day",
  "7-day free trial",
  "Made for hardworking India",
  "Hinglish · Hindi · English",
];

export function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-gold/10 py-4 bg-surface/40">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center mx-8 text-sm text-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-gold/60 mr-3" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
