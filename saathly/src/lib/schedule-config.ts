export type PulseIntervalMinutes = 30 | 60 | 120 | 180 | 240;

export const PULSE_INTERVAL_OPTIONS: { value: PulseIntervalMinutes; label: string }[] = [
  { value: 30, label: "Every 30 minutes" },
  { value: 60, label: "Every 1 hour" },
  { value: 120, label: "Every 2 hours" },
  { value: 180, label: "Every 3 hours" },
  { value: 240, label: "Every 4 hours" },
];

/** HH:mm 24h */
export type TimeString = string;

export type ScheduleAnchors = {
  breakfast?: TimeString;
  lunch?: TimeString;
  dinner?: TimeString;
  medicine?: TimeString;
  gym?: TimeString;
  yoga?: TimeString;
  water?: TimeString;
};

export const ANCHOR_FIELDS: {
  key: keyof ScheduleAnchors;
  label: string;
  hint: string;
  defaultTime?: TimeString;
}[] = [
  { key: "breakfast", label: "Breakfast", hint: "Morning meal reminder", defaultTime: "08:30" },
  { key: "lunch", label: "Lunch", hint: "Midday fuel break", defaultTime: "13:00" },
  { key: "dinner", label: "Dinner", hint: "Evening meal wind-down", defaultTime: "20:00" },
  { key: "medicine", label: "Medicine", hint: "Pills / supplements (optional)", defaultTime: "09:30" },
  { key: "gym", label: "Gym / workout", hint: "Move your body", defaultTime: "07:00" },
  { key: "yoga", label: "Yoga / stretch", hint: "Mind-body reset", defaultTime: "06:30" },
  { key: "water", label: "Water check", hint: "Hydration nudge", defaultTime: "11:00" },
];

export const DEFAULT_WAKE = "09:00";
export const DEFAULT_SLEEP = "21:00";
export const DEFAULT_INTERVAL: PulseIntervalMinutes = 120;

export function defaultAnchors(): ScheduleAnchors {
  return {
    lunch: "13:00",
    dinner: "20:00",
  };
}

export function parseTimeToMinutes(time: TimeString): number {
  const [h, m] = time.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}

export function minutesToTimeString(total: number): TimeString {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function formatTimeLabel(time: TimeString): string {
  const mins = parseTimeToMinutes(time);
  const h24 = Math.floor(mins / 60) % 24;
  const m = mins % 60;
  const ampm = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return m === 0 ? `${h12}:00 ${ampm}` : `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function intervalLabel(minutes: PulseIntervalMinutes): string {
  const opt = PULSE_INTERVAL_OPTIONS.find((o) => o.value === minutes);
  return opt?.label.replace("Every ", "") ?? `${minutes} min`;
}
