/** Soft haptic feedback — no-op when unsupported */
export function haptic(style: "light" | "medium" | "success" = "light") {
  if (typeof window === "undefined") return;
  try {
    const nav = navigator as Navigator & { vibrate?: (p: number | number[]) => boolean };
    if (!nav.vibrate) return;
    if (style === "success") nav.vibrate([12, 40, 12]);
    else if (style === "medium") nav.vibrate(18);
    else nav.vibrate(8);
  } catch {
    /* ignore */
  }
}
