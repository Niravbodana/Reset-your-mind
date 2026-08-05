"use client";

import { useApp } from "@/context/AppContext";
import Link from "next/link";

export default function AdminPage() {
  const { state, trackEvent } = useApp();
  const events = [...state.analytics.events].reverse().slice(0, 40);

  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-3xl font-bold mb-2">Admin</h1>
        <p className="text-sm text-ink-soft mb-8">Phase S + T — local CMS/analytics view (demo).</p>

        <div className="grid sm:grid-cols-3 gap-3 mb-8">
          <div className="soft-card rounded-2xl p-4">
            <p className="text-xs text-muted">User</p>
            <p className="font-semibold mt-1">{state.user?.name || "—"}</p>
          </div>
          <div className="soft-card rounded-2xl p-4">
            <p className="text-xs text-muted">Pulses stored</p>
            <p className="font-semibold mt-1">{state.pulses.length}</p>
          </div>
          <div className="soft-card rounded-2xl p-4">
            <p className="text-xs text-muted">Events</p>
            <p className="font-semibold mt-1">{state.analytics.events.length}</p>
          </div>
        </div>

        <div className="soft-card rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Recent events</h2>
            <button type="button" className="text-xs text-laser-2" onClick={() => trackEvent("admin_ping")}>
              Ping event
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-auto">
            {events.map((e, i) => (
              <div key={`${e.at}-${i}`} className="text-xs flex justify-between gap-3 border-b border-white/5 py-2">
                <span className="text-white">{e.name}</span>
                <span className="text-muted truncate">{e.meta}</span>
                <span className="text-muted shrink-0">{new Date(e.at).toLocaleString()}</span>
              </div>
            ))}
            {!events.length && <p className="text-sm text-muted">No events yet.</p>}
          </div>
        </div>

        <p className="text-xs text-muted mb-4">
          Production CMS = Supabase table editor + `/api/admin` with role check. WhatsApp/AI/mobile hooks in PHASES.md Q/W/X.
        </p>
        <Link href="/dashboard" className="text-sm text-laser-2">← Dashboard</Link>
      </div>
    </div>
  );
}
