export function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="40" height="40" rx="11" fill="#0c0c12" stroke="url(#g)" strokeWidth="1.5" />
      <path
        d="M12 28V12h7.2c3.4 0 5.5 1.9 5.5 4.7 0 2.1-1.1 3.6-2.9 4.2L27 28h-4.2l-4.4-6.2H16V28H12Zm4-9.6h3c1.5 0 2.4-.8 2.4-2s-.9-2-2.4-2H16v4Z"
        fill="#fff"
      />
      <path d="M8 31h24" stroke="#c9a227" strokeWidth="2" strokeLinecap="round" />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="40" y2="40">
          <stop stopColor="#c9a227" />
          <stop offset="0.5" stopColor="#e8c547" />
          <stop offset="1" stopColor="#9a7b1a" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display text-[1.55rem] font-bold tracking-[0.12em] text-white ${className}`}
    >
      RIZN
    </span>
  );
}
