/**
 * India launch flow audit — simulates many customer profiles locally
 * and hits public APIs. Run: node scripts/india-flow-audit.mjs
 */

const BASE = process.env.RIZN_BASE || "http://127.0.0.1:3000";
const issues = [];
const ok = [];

function assert(cond, msg) {
  if (cond) ok.push(msg);
  else issues.push(msg);
}

async function json(path, init) {
  const res = await fetch(`${BASE}${path}`, init);
  const text = await res.text();
  let body = null;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  return { res, body };
}

// --- Unit-ish checks via dynamic import of built logic isn't available;
// so we validate HTML/API contracts + simulate 50 diverse waitlist signups.

const NAMES = [
  "Priya Sharma",
  "Rahul Patel",
  "Ananya Iyer",
  "Vikram Singh",
  "Sneha Reddy",
  "Amit Kumar",
  "Fatima Khan",
  "Arjun Mehta",
  "Kavya Nair",
  "Rohit Joshi",
];

async function main() {
  console.log("India flow audit @", BASE);

  const home = await fetch(`${BASE}/`);
  assert(home.ok, "GET / ok");
  const homeHtml = await home.text();
  assert(homeHtml.includes("Made in India"), "Homepage/footer has Made in India");
  assert(!homeHtml.includes("$2.99") || homeHtml.includes("₹"), "Home prefers ₹ (or no bare USD hero)");
  assert(homeHtml.includes("aapki life change hone ka reason"), "Tagline present");

  for (const path of ["/signup", "/login", "/pricing", "/dashboard", "/billing", "/settings", "/emi-reminders", "/faq"]) {
    const r = await fetch(`${BASE}${path}`);
    assert(r.ok || r.status === 200, `GET ${path} → ${r.status}`);
  }

  // 50 diverse waitlist signups (stand-in for many customers)
  const areasPool = [["finance", "mind"], ["health", "career"], ["love", "family"], ["finance", "health", "mind"]];
  const langs = ["hinglish", "hindi", "english"];
  let created = 0;
  for (let i = 0; i < 50; i++) {
    const name = `${NAMES[i % NAMES.length]} ${i}`;
    const email = `india.customer.${Date.now()}.${i}@test.rizn.local`;
    const { res, body } = await json("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        plan: "personal",
        areas: areasPool[i % areasPool.length],
        language: langs[i % langs.length],
        authProvider: i % 3 === 0 ? "google" : "email",
      }),
    });
    if (res.ok) created++;
    else issues.push(`Waitlist fail #${i}: ${res.status} ${JSON.stringify(body)}`);
  }
  assert(created >= 45, `Waitlist created ${created}/50`);

  const pub = await json("/api/settings/public");
  assert(pub.res.ok, "Public settings ok");
  assert(pub.body?.marketing?.earlyBirdPricePersonal === 99 || pub.body?.marketing?.earlyBirdPricePersonal > 0, "INR personal price present");

  const signup = await (await fetch(`${BASE}/signup`)).text();
  assert(signup.includes("signup") || signup.includes("RIZN"), "Signup page renders");

  console.log("\n=== PASS", ok.length, "===");
  ok.forEach((m) => console.log(" ✓", m));
  console.log("\n=== ISSUES", issues.length, "===");
  issues.forEach((m) => console.log(" ✗", m));

  if (issues.length) process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
