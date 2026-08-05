"use client";

import { forwardRef } from "react";

type AuthFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
  icon?: React.ReactNode;
};

export const AuthField = forwardRef<HTMLInputElement, AuthFieldProps>(
  ({ label, hint, error, icon, className = "", id, ...props }, ref) => {
    const fieldId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label htmlFor={fieldId} className="block text-sm font-medium text-white/90">
          {label}
        </label>
        <div className="relative">
          {icon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={fieldId}
            className={`w-full rounded-xl border bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/35 transition-all focus:border-gold/50 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-gold/20 ${
              icon ? "pl-11" : ""
            } ${error ? "border-red-400/50" : "border-white/10"} ${className}`}
            {...props}
          />
        </div>
        {hint && !error && <p className="text-xs text-white/45">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);

AuthField.displayName = "AuthField";

export function AuthButton({
  children,
  loading,
  disabled,
  type = "submit",
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  variant?: "primary" | "secondary";
  onClick?: () => void;
}) {
  const base =
    "relative flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-gold text-black hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
      : "border border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${styles}`}
    >
      {loading ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between text-xs font-medium text-white/50">
        <span>
          Step {step} of {total}
        </span>
        <span>{Math.round((step / total) * 100)}%</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
