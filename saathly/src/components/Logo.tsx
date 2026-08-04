export function Logo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect width="40" height="40" rx="12" fill="#1C1410" />
      <path
        d="M12 26c0-6 3.5-10 8-10s8 4 8 10"
        stroke="#E85D04"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="13" r="3.2" fill="#FFF3E8" />
      <path
        d="M15 26h10"
        stroke="#FFF3E8"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-[1.65rem] leading-none tracking-tight text-ink ${className}`}>
      Humsafar
    </span>
  );
}
