import type { AppState, UserProfile, Pulse, MoodCheckin, FamilyMember } from "./types";

const KEY = "rizn_app_v1";
const LOGGED_OUT_KEY = "rizn_logged_out";

export function emptyState(): AppState {
  return { user: null, pulses: [], moods: [], family: [], analytics: { events: [] } };
}

export function isSessionLoggedOut(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(LOGGED_OUT_KEY) === "1";
}

export function setSessionLoggedOut(loggedOut: boolean) {
  if (typeof window === "undefined") return;
  if (loggedOut) sessionStorage.setItem(LOGGED_OUT_KEY, "1");
  else sessionStorage.removeItem(LOGGED_OUT_KEY);
}

export function peekState(): AppState {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) } as AppState;
  } catch {
    return emptyState();
  }
}

export function loadState(): AppState {
  if (typeof window === "undefined") return emptyState();
  if (isSessionLoggedOut()) return emptyState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyState();
    return { ...emptyState(), ...JSON.parse(raw) } as AppState;
  } catch {
    return emptyState();
  }
}

export function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function track(state: AppState, name: string, meta?: string): AppState {
  const next = {
    ...state,
    analytics: {
      events: [...state.analytics.events, { name, at: new Date().toISOString(), meta }].slice(-200),
    },
  };
  saveState(next);
  return next;
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function upsertUser(state: AppState, user: UserProfile): AppState {
  const next = track({ ...state, user }, "user_upsert", user.email);
  saveState(next);
  return next;
}

export function setPulses(state: AppState, pulses: Pulse[]): AppState {
  const next = { ...state, pulses };
  saveState(next);
  return next;
}

export function addMood(state: AppState, mood: MoodCheckin): AppState {
  const next = track({ ...state, moods: [mood, ...state.moods].slice(0, 60) }, "mood_checkin", String(mood.score));
  saveState(next);
  return next;
}

export function setFamily(state: AppState, family: FamilyMember[]): AppState {
  const next = { ...state, family };
  saveState(next);
  return next;
}

/** Sign out without deleting preview data — login works again on same device. */
export function softLogout() {
  setSessionLoggedOut(true);
}

/** Wipe all preview data from this browser. */
export function clearPreviewData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
  sessionStorage.removeItem(LOGGED_OUT_KEY);
}
