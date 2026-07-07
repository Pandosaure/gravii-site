import { type NextRequest, NextResponse } from "next/server";

// Design-partner interest capture (BUILDER-2 mission 2.1). The /register form POSTs
// here; we validate and drop spam server-side, then forward to a Google Apps Script
// webhook (URL in REGISTER_WEBHOOK_URL, set in Vercel env - NEVER committed) that
// appends a row to Tommy's Sheet and emails him. Keeping the webhook server-side
// hides it from the client and lets us honeypot + validate before anything reaches
// the Sheet. No database, no analytics - one named lead, straight to where Tommy reads.

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cap = (v: unknown, n: number) => (typeof v === "string" ? v.trim().slice(0, n) : "");

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  // Honeypot: a real person never fills the hidden "company_website" field. If it is
  // set, accept silently (don't tip off the bot) and drop - never reaches the Sheet.
  if (cap(body.company_website, 200)) return NextResponse.json({ ok: true });

  const name = cap(body.name, 120);
  const email = cap(body.email, 200);
  const firm = cap(body.firm, 160);
  const role = cap(body.role, 120);
  const message = cap(body.message, 2000);
  const source = cap(body.source, 200) || "gravii.app";

  if (!name || !firm || !role) {
    return NextResponse.json({ error: "Please fill in your name, firm and role." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid work email." }, { status: 400 });
  }

  const webhook = process.env.REGISTER_WEBHOOK_URL;
  if (!webhook) {
    // Not wired yet - the form surfaces a mailto fallback so no lead is ever lost.
    console.error("register: REGISTER_WEBHOOK_URL is not set");
    return NextResponse.json({ error: "unconfigured" }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        firm,
        role,
        message,
        source,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) {
      console.error("register: webhook responded", res.status);
      return NextResponse.json({ error: "delivery" }, { status: 502 });
    }
  } catch (e) {
    console.error("register: webhook post failed", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "delivery" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
