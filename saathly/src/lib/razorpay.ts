import crypto from "crypto";

/** One-time order payment signature */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  if (!orderId || !paymentId || !signature || !secret) return false;
  const body = `${orderId}|${paymentId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
}

/**
 * Subscription auth payment signature
 * Docs: hmac_sha256(payment_id + "|" + subscription_id, secret)
 */
export function verifySubscriptionSignature(
  paymentId: string,
  subscriptionId: string,
  signature: string,
  secret: string
): boolean {
  if (!paymentId || !subscriptionId || !signature || !secret) return false;
  const body = `${paymentId}|${subscriptionId}`;
  const expected = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return expected === signature;
}

export function verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean {
  if (!rawBody || !signature || !secret) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return expected === signature;
}

export function razorpayAuthHeader(keyId: string, keySecret: string) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`;
}

export async function razorpayFetch(
  path: string,
  keyId: string,
  keySecret: string,
  init?: RequestInit
) {
  return fetch(`https://api.razorpay.com/v1${path}`, {
    ...init,
    headers: {
      Authorization: razorpayAuthHeader(keyId, keySecret),
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}
