"use client";

/** Cinematic fixed background — aurora, laser rays, stars, floating particles */
export function LaserBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#030306]" />

      {/* Slow rotating aurora spotlight */}
      <div className="bg-aurora-spotlight" />

      {/* Top-down laser ray fan */}
      <div className="bg-laser-rays" />

      {/* Drifting color orbs */}
      <div className="animatic-orb animatic-orb-1" />
      <div className="animatic-orb animatic-orb-2" />
      <div className="animatic-orb animatic-orb-3" />
      <div className="animatic-orb animatic-orb-4" />

      {/* Horizon glow — sunrise energy at page bottom */}
      <div className="bg-horizon-glow" />

      {/* Twinkling star field */}
      <div className="bg-starfield" />

      {/* Floating gold dust particles */}
      <div className="bg-particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className={`bg-particle bg-particle-${i + 1}`} />
        ))}
      </div>

      {/* Flowing mesh + grain */}
      <div className="animatic-mesh" />
      <div className="absolute inset-0 animatic-noise opacity-[0.35]" />

      {/* Perspective grid floor */}
      <div className="bg-perspective-grid" />

      {/* Fine dot grid overlay */}
      <div className="bg-dot-grid" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,3,6,0.82)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/65" />
    </div>
  );
}
