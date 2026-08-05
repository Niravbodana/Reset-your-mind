"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteSettings } from "@/lib/site-settings-types";
import { DEFAULT_SETTINGS } from "@/lib/site-settings-types";

type Tab = "integrations" | "marketing" | "features" | "waitlist" | "analytics";

export function AdminPanel() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<Tab>("integrations");
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [waitlist, setWaitlist] = useState<{ count: number; entries: unknown[] }>({ count: 0, entries: [] });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const headers = () => ({
    "Content-Type": "application/json",
    "x-admin-password": password,
  });

  const login = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/settings", { headers: headers() });
      if (!res.ok) {
        setMsg("Wrong password");
        return;
      }
      const data = await res.json();
      setSettings(data);
      setAuthed(true);
      const wl = await fetch("/api/admin/waitlist", { headers: headers() });
      if (wl.ok) setWaitlist(await wl.json());
    } catch {
      setMsg("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const save = async () => {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(settings),
      });
      if (!res.ok) {
        setMsg("Save failed");
        return;
      }
      setMsg("Saved successfully");
    } catch {
      setMsg("Save failed");
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto soft-card rounded-2xl p-8">
        <h2 className="font-display text-xl font-bold mb-2">Admin login</h2>
        <p className="text-xs text-muted mb-4">Set RIZN_ADMIN_PASSWORD env var or password saved in admin settings.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 mb-4"
        />
        {msg && <p className="text-sm text-gold-light mb-3">{msg}</p>}
        <button type="button" onClick={login} disabled={loading} className="btn-primary w-full py-3 rounded-xl text-sm">
          {loading ? "…" : "Enter admin"}
        </button>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "integrations", label: "Integrations" },
    { id: "marketing", label: "Marketing & links" },
    { id: "features", label: "Features" },
    { id: "waitlist", label: "Waitlist" },
    { id: "analytics", label: "Analytics" },
  ];

  const field = (
    label: string,
    value: string,
    onChange: (v: string) => void,
    type: "text" | "password" | "url" = "text"
  ) => (
    <label className="block mb-4">
      <span className="text-xs text-muted block mb-1">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm"
      />
    </label>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${
              tab === t.id ? "bg-gold text-black" : "bg-white/5 text-ink-soft"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "integrations" && (
        <div className="soft-card rounded-2xl p-6">
          <h2 className="font-semibold mb-4">Razorpay</h2>
          {field("Key ID", settings.integrations.razorpayKeyId, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, razorpayKeyId: v } })
          )}
          {field(
            "Key Secret",
            settings.integrations.razorpayKeySecret,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, razorpayKeySecret: v } }),
            "password"
          )}
          {field(
            "Webhook Secret",
            settings.integrations.razorpayWebhookSecret,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, razorpayWebhookSecret: v } }),
            "password"
          )}
          {field("Plan ID Personal", settings.integrations.razorpayPlanPersonal, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, razorpayPlanPersonal: v } })
          )}
          {field("Plan ID Parivaar", settings.integrations.razorpayPlanParivaar, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, razorpayPlanParivaar: v } })
          )}

          <h2 className="font-semibold mb-4 mt-8">WhatsApp (Meta Cloud API)</h2>
          {field(
            "Access Token",
            settings.integrations.whatsappToken,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappToken: v } }),
            "password"
          )}
          {field("Phone Number ID", settings.integrations.whatsappPhoneNumberId, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, whatsappPhoneNumberId: v } })
          )}
          {field(
            "Meta Business setup URL",
            settings.integrations.whatsappBusinessUrl,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, whatsappBusinessUrl: v } }),
            "url"
          )}

          <h2 className="font-semibold mb-4 mt-8">Email (Resend)</h2>
          {field(
            "Resend API Key",
            settings.integrations.resendApiKey,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, resendApiKey: v } }),
            "password"
          )}
          {field("From email", settings.integrations.resendFromEmail, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, resendFromEmail: v } })
          )}

          <h2 className="font-semibold mb-4 mt-8">Web Push (VAPID)</h2>
          {field("Public Key", settings.integrations.vapidPublicKey, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, vapidPublicKey: v } })
          )}
          {field(
            "Private Key",
            settings.integrations.vapidPrivateKey,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, vapidPrivateKey: v } }),
            "password"
          )}
          {field("Subject (mailto:)", settings.integrations.vapidSubject, (v) =>
            setSettings({ ...settings, integrations: { ...settings.integrations, vapidSubject: v } })
          )}

          <h2 className="font-semibold mb-4 mt-8">Supabase (optional)</h2>
          {field(
            "Project URL",
            settings.integrations.supabaseUrl,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, supabaseUrl: v } }),
            "url"
          )}
          {field(
            "Anon Key",
            settings.integrations.supabaseAnonKey,
            (v) => setSettings({ ...settings, integrations: { ...settings.integrations, supabaseAnonKey: v } }),
            "password"
          )}
        </div>
      )}

      {tab === "marketing" && (
        <div className="soft-card rounded-2xl p-6">
          {field(
            "Hero video URL (.mp4)",
            settings.marketing.heroVideoUrl,
            (v) => setSettings({ ...settings, marketing: { ...settings.marketing, heroVideoUrl: v } }),
            "url"
          )}
          {field(
            "Site URL",
            settings.marketing.siteUrl,
            (v) => setSettings({ ...settings, marketing: { ...settings.marketing, siteUrl: v } }),
            "url"
          )}
          {field("Support email", settings.marketing.supportEmail, (v) =>
            setSettings({ ...settings, marketing: { ...settings.marketing, supportEmail: v } })
          )}
          {field("Crisis helpline", settings.marketing.crisisHelpline, (v) =>
            setSettings({ ...settings, marketing: { ...settings.marketing, crisisHelpline: v } })
          )}
          {field(
            "Instagram URL",
            settings.marketing.instagramUrl,
            (v) => setSettings({ ...settings, marketing: { ...settings.marketing, instagramUrl: v } }),
            "url"
          )}
          {field(
            "Play Store URL",
            settings.marketing.playStoreUrl,
            (v) => setSettings({ ...settings, marketing: { ...settings.marketing, playStoreUrl: v } }),
            "url"
          )}
          {field(
            "App Store URL",
            settings.marketing.appStoreUrl,
            (v) => setSettings({ ...settings, marketing: { ...settings.marketing, appStoreUrl: v } }),
            "url"
          )}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <label className="block">
              <span className="text-xs text-muted">Early bird Personal ₹</span>
              <input
                type="number"
                value={settings.marketing.earlyBirdPricePersonal}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    marketing: { ...settings.marketing, earlyBirdPricePersonal: Number(e.target.value) },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Launch Personal ₹</span>
              <input
                type="number"
                value={settings.marketing.launchPricePersonal}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    marketing: { ...settings.marketing, launchPricePersonal: Number(e.target.value) },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Early bird Parivaar ₹</span>
              <input
                type="number"
                value={settings.marketing.earlyBirdPriceParivaar}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    marketing: { ...settings.marketing, earlyBirdPriceParivaar: Number(e.target.value) },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm mt-1"
              />
            </label>
            <label className="block">
              <span className="text-xs text-muted">Trial days</span>
              <input
                type="number"
                value={settings.marketing.trialDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    marketing: { ...settings.marketing, trialDays: Number(e.target.value) },
                  })
                }
                className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 text-sm mt-1"
              />
            </label>
          </div>
        </div>
      )}

      {tab === "features" && (
        <div className="soft-card rounded-2xl p-6 space-y-4">
          {(
            [
              ["paymentsEnabled", "Enable Razorpay payments"],
              ["whatsappEnabled", "Enable WhatsApp sending"],
              ["webPushEnabled", "Enable web push prompts"],
              ["emailWaitlistEnabled", "Send Resend email on waitlist signup"],
              ["earlyBirdActive", "Show early bird pricing"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.features[key]}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    features: { ...settings.features, [key]: e.target.checked },
                  })
                }
                className="w-4 h-4"
              />
              <span className="text-sm text-white">{label}</span>
            </label>
          ))}
          <div className="pt-4 border-t border-white/10">
            {field(
              "Admin password",
              settings.adminPassword,
              (v) => setSettings({ ...settings, adminPassword: v }),
              "password"
            )}
          </div>
        </div>
      )}

      {tab === "waitlist" && (
        <div className="soft-card rounded-2xl p-6">
          <p className="text-2xl font-bold text-white mb-2">{waitlist.count} signups</p>
          <p className="text-xs text-muted mb-4">Stored in data/waitlist.json on server</p>
          <div className="max-h-96 overflow-auto space-y-2">
            {(waitlist.entries as { name: string; email: string; plan: string; createdAt: string }[]).map(
              (e, i) => (
                <div key={i} className="text-xs border-b border-white/5 py-2 flex justify-between gap-2">
                  <span className="text-white">{e.name}</span>
                  <span className="text-muted">{e.email}</span>
                  <span className="text-gold-light">{e.plan}</span>
                </div>
              )
            )}
            {!waitlist.count && <p className="text-sm text-muted">No waitlist entries yet.</p>}
          </div>
        </div>
      )}

      {tab === "analytics" && (
        <div className="soft-card rounded-2xl p-6">
          <p className="text-sm text-ink-soft">
            Browser analytics remain in localStorage per user. Server waitlist count: {waitlist.count}.
            Connect PostHog via env or add key here in a future update.
          </p>
          <Link href="/dashboard" className="text-gold-light text-sm mt-4 inline-block">
            → User dashboard preview
          </Link>
        </div>
      )}

      <div className="flex items-center gap-4 mt-6">
        <button type="button" onClick={save} disabled={loading} className="btn-primary px-6 py-3 rounded-xl text-sm">
          {loading ? "Saving…" : "Save all settings"}
        </button>
        {msg && <p className="text-sm text-gold-light">{msg}</p>}
      </div>

      <div className="mt-8 text-xs text-muted space-y-1">
        <p>Webhook URL: {settings.marketing.siteUrl}/api/billing/webhook</p>
        <p>WhatsApp API: POST /api/whatsapp/send</p>
        <p>Public config: GET /api/settings/public</p>
      </div>
    </div>
  );
}
