"use client";

import Image from "next/image";

/** Premium hero artwork — photorealistic phone + glass cards (no UI chrome) */
export function HeroPhoneShowcase() {
  return (
    <div className="hero-phone-stage hero-artwork-stage" aria-hidden>
      <div className="hero-phone-glow hero-artwork-glow" />
      <div className="hero-artwork-float mx-auto w-full max-w-[min(420px,92vw)]">
        <Image
          src="/images/rizn-hero-visual-transparent.png"
          alt=""
          width={1024}
          height={1024}
          priority
          className="w-full h-auto drop-shadow-2xl"
          sizes="(max-width: 768px) 92vw, 420px"
        />
      </div>
    </div>
  );
}
