/**
 * Current launch market.
 * India-only for now — ₹ pricing + Hinglish UI.
 * Flip to "WORLD" later to re-enable Worldwide / USD.
 */
export const LAUNCH_MARKET = "INDIA" as const;

export const INDIA_ONLY = LAUNCH_MARKET === "INDIA";
