/** Customer promise: every message must feel respectful. Patterns we never use. */
export const DISALLOWED_MESSAGE_PATTERNS = [
  /\buth\s*jao\b/i,
  /\butho\b/i,
  /\bmat\s+karo\b/i,
  /\bmat\s+kar[o]?\b/i,
  /\bbillionaire\b/i,
  /\bbikul\b/i,
  /\bbakwas\b/i,
  /\bbhool\s+gaye\b/i,
  /\blate\s+fee\s+se\s+bacho\b/i,
  /\btu\s+enough\b/i,
  /\btu\s+capable\b/i,
  /\bprove\s+1\s+action\b/i,
  /\bnon-negotiable\b/i,
  /\bmachine\s+nahi\b/i,
  /\bpanic\s+band\b/i,
] as const;

export function isRespectfulMessage(text: string): boolean {
  return !DISALLOWED_MESSAGE_PATTERNS.some((re) => re.test(text));
}

export function assertRespectfulMessages(messages: { id: string; hinglish: string }[]): void {
  for (const m of messages) {
    if (!isRespectfulMessage(m.hinglish)) {
      throw new Error(`Disrespectful message detected: ${m.id}`);
    }
  }
}

/** RIZN customer promise — embedded in product culture. */
export const CUSTOMER_PROMISE =
  "Not a single customer who joins us should ever feel disappointed. Every message, every feature, every rupee of ₹99 must feel worth it.";
