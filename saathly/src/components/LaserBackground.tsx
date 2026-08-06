"use client";

export function LaserBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030306]" />

      {/* Aurora mesh — Gemini-style animatic layers */}
      <div className="animatic-orb animatic-orb-1" />
      <div className="animatic-orb animatic-orb-2" />
      <div className="animatic-orb animatic-orb-3" />
      <div className="animatic-orb animatic-orb-4" />

      {/* Flowing gradient sheet */}
      <div className="animatic-mesh" />

      {/* Subtle star / noise grain */}
      <div className="absolute inset-0 animatic-noise opacity-[0.35]" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent)",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,3,6,0.85)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
    </div>
  );
}
