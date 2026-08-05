import type { SiteSettings } from "./site-settings-types";
import { verifyAdminPassword } from "./site-settings-server";

export function getAdminPasswordFromRequest(req: Request): string {
  return req.headers.get("x-admin-password")?.trim() || "";
}

export function requireAdmin(
  req: Request,
  settings: SiteSettings
): { ok: true } | { ok: false; status: number; message: string } {
  const password = getAdminPasswordFromRequest(req);
  if (!password) {
    return { ok: false, status: 401, message: "Admin password required" };
  }
  if (!verifyAdminPassword(settings, password)) {
    return { ok: false, status: 403, message: "Invalid admin password" };
  }
  return { ok: true };
}
