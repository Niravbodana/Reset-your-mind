export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="rizn-g" x1="0" y1="0" x2="48" y2="48">
          <stop stopColor="#e8c547" />
          <stop offset="0.5" stopColor="#c9a227" />
          <stop offset="1" stopColor="#9a7b1a" />
        </linearGradient>
        <linearGradient id="rizn-rise" x1="24" y1="32" x2="24" y2="8">
          <stop stopColor="#e8c547" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="#0a0a10" stroke="url(#rizn-g)" strokeWidth="1.75" />
      <path
        d="M14 34V14h8.5c4 0 6.5 2.2 6.5 5.5 0 2.5-1.3 4.2-3.4 4.9L32 34h-5l-5.2-7.3H18.5V34H14Zm4.5-11.5h3.5c1.8 0 2.8-1 2.8-2.4s-1-2.4-2.8-2.4H18.5v4.8Z"
        fill="#fff"
      />
      <path
        d="M30 10l4 6-4 6M34 16H22"
        stroke="url(#rizn-rise)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 37h28" stroke="url(#rizn-g)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-extrabold tracking-[0.14em] text-white ${className}`}
    >
      RIZN
    </span>
  );
}

/** Tagline always directly under RIZN */
export function BrandLockup({ size = "default" }: { size?: "default" | "sm" }) {
  const sm = size === "sm";
  return (
    <div className="flex items-center gap-2.5">
      <Logo className={sm ? "w-9 h-9" : "w-10 h-10"} />
      <div className="flex flex-col leading-none gap-0.5">
        <Wordmark className={sm ? "text-[1.15rem]" : "text-[1.45rem]"} />
        <span
          className={`font-medium text-gold-light/95 tracking-wide leading-tight ${
            sm ? "text-[8px] sm:text-[9px]" : "text-[9px] sm:text-[10px]"
          }`}
        >
          Aapki life change ka reason
        </span>
      </div>
    </div>
  );
}
