"use client";

export function LaserBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#050508]" />

      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-[#c9a227]/8 blur-[120px]" />
      <div className="absolute top-1/3 right-0 h-[380px] w-[380px] rounded-full bg-[#e8c547]/6 blur-[120px]" />
      <div className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[#9a7b1a]/8 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,8,0.9)_100%)]" />
    </div>
  );
}
