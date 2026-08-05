"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, Settings } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { AREA_LABELS } from "@/lib/templates";
import type { Language, LifeArea } from "@/lib/types";
import {
  ANCHOR_FIELDS,
  DEFAULT_INTERVAL,
  DEFAULT_SLEEP,
  DEFAULT_WAKE,
  PULSE_INTERVAL_OPTIONS,
  type PulseIntervalMinutes,
  type ScheduleAnchors,
} from "@/lib/schedule-config";
import { countTodaysPulses, migrateUserSchedule } from "@/lib/scheduler";

const languages: { id: Language; label: string }[] = [
  { id: "hinglish", label: "Hinglish" },
  { id: "hindi", label: "Hindi" },
  { id: "english", label: "English" },
];

const areaIds = Object.keys(AREA_LABELS) as LifeArea[];

function SettingsContent() {
  const searchParams = useSearchParams();
  const welcome = searchParams.get("welcome") === "1";
  const { state, patchUser, refreshPulses } = useApp();
  const { ready } = useRequireAuth();
  const user = state.user ? migrateUserSchedule(state.user) : null;

  const [saved, setSaved] = useState(false);
  const [wakeTime, setWakeTime] = useState(user?.wakeTime ?? DEFAULT_WAKE);
  const [sleepTime, setSleepTime] = useState(user?.sleepTime ?? DEFAULT_SLEEP);
  const [interval, setInterval] = useState<PulseIntervalMinutes>(
    user?.pulseIntervalMinutes ?? DEFAULT_INTERVAL
  );
  const [language, setLanguage] = useState<Language>(user?.language ?? "hinglish");
  const [softMode, setSoftMode] = useState(user?.softMode ?? false);
  const [areas, setAreas] = useState<LifeArea[]>(user?.areas ?? ["mind"]);
  const [anchors, setAnchors] = useState<ScheduleAnchors>(user?.scheduleAnchors ?? {});
  const [enabledAnchors, setEnabledAnchors] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ANCHOR_FIELDS.forEach((f) => {
      init[f.key] = Boolean(user?.scheduleAnchors?.[f.key]);
    });
    return init;
  });

  if (!ready || !user) {
    return <div className="page-top text-center text-muted">Loading…</div>;
  }

  const previewCount = countTodaysPulses({
    ...user,
    wakeTime,
    sleepTime,
    pulseIntervalMinutes: interval,
    scheduleAnchors: buildAnchors(anchors, enabledAnchors),
    softMode,
  });

  const toggleArea = (id: LifeArea) => {
    setAreas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const save = () => {
    const scheduleAnchors = buildAnchors(anchors, enabledAnchors);
    patchUser({
      wakeTime,
      sleepTime,
      wakeHour: parseInt(wakeTime.split(":")[0], 10),
      sleepHour: parseInt(sleepTime.split(":")[0], 10),
      pulseIntervalMinutes: interval,
      scheduleAnchors,
      language,
      softMode,
      areas,
    });
    refreshPulses();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-top pb-20 px-4">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <Settings size={22} className="text-gold-light" />
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Settings</h1>
        </div>
        {welcome && (
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-4 mb-6 text-sm text-ink-soft">
            <p className="font-semibold text-white mb-1">Pehli baar? Do steps</p>
            <p className="text-xs">
              1) <Link href="/emi-reminders" className="text-gold-light underline">EMI reminder</Link> set karo ·
              2) Schedule save karo — phir dashboard pe messages dikhenge.
            </p>
          </div>
        )}

        <Link
          href="/emi-reminders"
          className="block soft-card rounded-2xl p-4 mb-5 border border-gold/20 hover:border-gold/40 transition-colors"
        >
          <p className="text-sm font-semibold text-white">EMI Reminders</p>
          <p className="text-xs text-ink-soft mt-1">
            {(user.emiReminders?.length ?? 0) > 0
              ? `${user.emiReminders!.length} EMI set — 1 din pehle alert`
              : "Amount, date, bank add karo — 1 din pehle notification"}
          </p>
        </Link>

        <section className="soft-card rounded-2xl p-5 mb-5 space-y-4">
          <h2 className="font-semibold text-white text-sm">Message frequency</h2>
          <p className="text-xs text-muted">Wake se sleep ke beech kitne gap pe pulse aaye</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {PULSE_INTERVAL_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setInterval(opt.value)}
                className={`rounded-xl border px-3 py-3 text-sm font-medium min-h-[48px] ${
                  interval === opt.value ? "border-gold bg-accent-soft text-white" : "border-white/10 text-muted"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </section>

        <section className="soft-card rounded-2xl p-5 mb-5 space-y-4">
          <h2 className="font-semibold text-white text-sm">Active hours</h2>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs text-muted">
              Wake up
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-base text-white min-h-[48px]"
              />
            </label>
            <label className="block text-xs text-muted">
              Sleep
              <input
                type="time"
                value={sleepTime}
                onChange={(e) => setSleepTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3 py-3 text-base text-white min-h-[48px]"
              />
            </label>
          </div>
        </section>

        <section className="soft-card rounded-2xl p-5 mb-5 space-y-3">
          <h2 className="font-semibold text-white text-sm">Daily reminders (optional)</h2>
          <p className="text-xs text-muted mb-2">In times pe extra personalized nudge milega</p>
          {ANCHOR_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-3 py-3 min-h-[56px] border-b border-white/5 last:border-0">
              <input
                type="checkbox"
                checked={enabledAnchors[field.key] ?? false}
                onChange={(e) => {
                  setEnabledAnchors((p) => ({ ...p, [field.key]: e.target.checked }));
                  if (e.target.checked && !anchors[field.key]) {
                    setAnchors((p) => ({ ...p, [field.key]: field.defaultTime }));
                  }
                }}
                className="h-5 w-5 rounded accent-gold shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white">{field.label}</p>
                <p className="text-xs text-muted">{field.hint}</p>
              </div>
              <input
                type="time"
                disabled={!enabledAnchors[field.key]}
                value={anchors[field.key] ?? field.defaultTime ?? "12:00"}
                onChange={(e) => setAnchors((p) => ({ ...p, [field.key]: e.target.value }))}
                className="rounded-lg border border-white/10 bg-black/40 px-2 py-2.5 text-base disabled:opacity-40 min-h-[44px]"
              />
            </div>
          ))}
        </section>

        <section className="soft-card rounded-2xl p-5 mb-5 space-y-4">
          <h2 className="font-semibold text-white text-sm">Focus areas (max 3)</h2>
          <div className="flex flex-wrap gap-2">
            {areaIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => toggleArea(id)}
                className={`px-4 py-2.5 rounded-full text-sm min-h-[44px] ${
                  areas.includes(id) ? "bg-gold text-black" : "bg-white/5 text-muted"
                }`}
              >
                {AREA_LABELS[id]}
              </button>
            ))}
          </div>
        </section>

        <section className="soft-card rounded-2xl p-5 mb-5 space-y-4">
          <h2 className="font-semibold text-white text-sm">Language & mode</h2>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => setLanguage(lang.id)}
                className={`px-4 py-2.5 rounded-full text-sm min-h-[44px] ${
                  language === lang.id ? "bg-gold text-black" : "bg-white/5 text-muted"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm text-ink-soft cursor-pointer min-h-[48px]">
            <input
              type="checkbox"
              checked={softMode}
              onChange={(e) => setSoftMode(e.target.checked)}
              className="h-5 w-5 accent-gold"
            />
            Soft mode — gentler messages, max 4 today
          </label>
        </section>

        <div className="soft-card rounded-xl p-4 mb-5 border border-gold/20 text-sm">
          <p className="text-white font-medium">Aaj ke messages</p>
          <p className="text-xs text-ink-soft mt-1">
            ~<strong className="text-gold-light">{previewCount}</strong> messages between {wakeTime} and{" "}
            {sleepTime}
            {softMode ? " (soft mode)" : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={save}
          className="btn-primary w-full py-3.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[52px]"
        >
          {saved ? (
            <>
              <Check size={16} /> Saved
            </>
          ) : (
            "Save settings"
          )}
        </button>

        <Link
          href="/dashboard"
          className="flex items-center justify-center text-center text-sm text-muted mt-6 hover:text-white min-h-[48px]"
        >
          ← Dashboard
        </Link>
      </div>
    </div>
  );
}

function buildAnchors(anchors: ScheduleAnchors, enabled: Record<string, boolean>): ScheduleAnchors {
  const out: ScheduleAnchors = {};
  for (const field of ANCHOR_FIELDS) {
    if (enabled[field.key] && anchors[field.key]) {
      out[field.key] = anchors[field.key];
    }
  }
  return out;
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div className="page-top text-center text-muted">Loading…</div>}>
      <SettingsContent />
    </Suspense>
  );
}
