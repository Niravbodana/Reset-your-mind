"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useLocale } from "@/context/LocaleContext";
import { billsForMonth, isPaidThisCycle } from "@/lib/bills";

export function BillCalendar({ className = "" }: { className?: string }) {
  const { state } = useApp();
  const { region, preferEnglish } = useLocale();
  const isIN = region === "IN" && !preferEnglish;
  const now = new Date();
  const [cursor, setCursor] = useState(() => new Date(now.getFullYear(), now.getMonth(), 1));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const days = useMemo(
    () => billsForMonth(state.user?.emiReminders, year, month),
    [state.user?.emiReminders, year, month]
  );

  const startWeekday = new Date(year, month, 1).getDay();
  const monthLabel = cursor.toLocaleDateString(isIN ? "en-IN" : "en-US", {
    month: "long",
    year: "numeric",
  });
  const today = now.getDate();
  const isThisMonth = now.getFullYear() === year && now.getMonth() === month;
  const prefix = isIN ? "₹" : "$";

  const selectedBills = days.filter((d) => d.bills.length > 0);

  return (
    <div className={`soft-card rounded-2xl p-4 sm:p-5 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-4">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="min-h-10 min-w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} />
        </button>
        <p className="font-semibold text-white text-sm">{monthLabel}</p>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="min-h-10 min-w-10 flex items-center justify-center rounded-xl hover:bg-white/5 text-white"
          aria-label="Next month"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {(isIN ? ["S", "M", "T", "W", "T", "F", "S"] : ["S", "M", "T", "W", "T", "F", "S"]).map(
          (d, i) => (
            <div key={`${d}-${i}`} className="text-center text-[10px] text-muted py-1">
              {d}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startWeekday }).map((_, i) => (
          <div key={`e-${i}`} className="aspect-square" />
        ))}
        {days.map(({ day, bills }) => {
          const has = bills.length > 0;
          const allPaid = has && bills.every((b) => isPaidThisCycle(b));
          const isToday = isThisMonth && day === today;
          return (
            <div
              key={day}
              className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs relative ${
                has
                  ? allPaid
                    ? "bg-success/15 border border-success/30 text-success"
                    : "bg-gold/15 border border-gold/35 text-gold-light"
                  : "text-white/50"
              } ${isToday ? "ring-1 ring-white/40" : ""}`}
              title={bills.map((b) => b.label).join(", ")}
            >
              <span className="font-medium">{day}</span>
              {has && <span className="w-1 h-1 rounded-full bg-current mt-0.5" />}
            </div>
          );
        })}
      </div>

      {selectedBills.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t border-white/10 pt-3">
          {selectedBills.slice(0, 6).map(({ day, bills }) =>
            bills.map((b) => (
              <li key={`${day}-${b.id}`} className="flex justify-between gap-2 text-xs">
                <span className="text-white truncate">
                  {day} · {b.label}
                </span>
                <span className="text-ink-soft shrink-0">
                  {prefix}
                  {b.amount.toLocaleString(isIN ? "en-IN" : "en-US")}
                  {isPaidThisCycle(b) ? " ✓" : ""}
                </span>
              </li>
            ))
          )}
        </ul>
      ) : (
        <p className="mt-4 text-xs text-muted text-center">
          {isIN ? "Is mahine koi bill date set nahi" : "No bill dates set this month"}
        </p>
      )}
    </div>
  );
}
