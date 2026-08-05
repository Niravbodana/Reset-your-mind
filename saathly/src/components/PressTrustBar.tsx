const brands = [
  "Featured mindset",
  "India Wellness",
  "Startup India",
  "Digital Bharat",
  "Forbes India",
  "YourStory",
];

export function PressTrustBar() {
  return (
    <section className="py-8 border-y border-gold/10 bg-black/50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.2em] text-muted mb-5">
          Trusted by 47,000+ Indians across 120+ cities
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {brands.map((b) => (
            <span
              key={b}
              className="text-sm md:text-base font-display font-semibold text-white/25 hover:text-gold/60 transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
