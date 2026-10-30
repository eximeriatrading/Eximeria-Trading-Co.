import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { EMPTY_ENQUIRY, validateEnquiry, type Enquiry } from "@/lib/enquiry";

export const runtime = "nodejs";

// Simple per-IP rate limit (5 enquiries / 10 min). In-memory, so it resets on redeploy
// and isn't shared across serverless instances — good enough to blunt casual abuse.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Strip CR/LF so user input can never inject extra mail headers (e.g. via the subject).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT || 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: SMTP_SECURE ? SMTP_SECURE === "true" : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many enquiries. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Partial<Enquiry>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Keep only known string fields.
  const data = { ...EMPTY_ENQUIRY };
  for (const key of Object.keys(EMPTY_ENQUIRY) as (keyof Enquiry)[]) {
    const v = body[key];
    if (typeof v === "string") data[key] = v.trim();
  }

  // Honeypot filled: pretend success so bots don't retry.
  if (data.website) return NextResponse.json({ ok: true });

  const errors = validateEnquiry(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please correct the highlighted fields.", errors }, { status: 422 });
  }

  const transport = getTransport();
  if (!transport) {
    console.error("[contact] SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in .env.local");
    return NextResponse.json(
      { error: "Our enquiry inbox isn't configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from = process.env.CONTACT_FROM || `"Eximeria Trading Co." <${process.env.SMTP_USER}>`;

  const rows: [string, string][] = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Company", data.company || "—"],
    ["I am a", data.role],
    ["Product category", data.category || "—"],
    ["Service", data.service || "—"],
  ];

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;color:#0e0f14">
      <div style="background:#0e0f14;padding:20px 24px;border-bottom:3px solid #ce9117">
        <span style="color:#ce9117;font-size:11px;letter-spacing:2px;text-transform:uppercase">New website enquiry</span>
        <h2 style="color:#fff;margin:6px 0 0;font-size:20px">${esc(data.fullName)} · ${esc(data.role)}</h2>
      </div>
      <table style="width:100%;border-collapse:collapse;margin:16px 0">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;background:#f6ede2;font-weight:bold;width:160px;font-size:13px">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;font-size:14px">${esc(v)}</td></tr>`
          )
          .join("")}
      </table>
      <h3 style="font-size:14px;margin:20px 0 8px">Enquiry details</h3>
      <div style="white-space:pre-wrap;background:#f3eee4;padding:16px;border-radius:4px;font-size:14px;line-height:1.6">${esc(data.message)}</div>
      <p style="font-size:12px;color:#6b6f78;margin-top:20px">Reply directly to this email to respond to ${esc(data.fullName)}.</p>
    </div>`;

  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nEnquiry details:\n${data.message}`;

  try {
    await transport.sendMail({
      from,
      to,
      replyTo: { name: oneLine(data.fullName), address: data.email },
      subject: oneLine(`New enquiry: ${data.role}${data.category ? ` · ${data.category}` : ""} · ${data.fullName}`),
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Failed to send enquiry email:", err);
    return NextResponse.json(
      { error: "We couldn't send your enquiry right now. Please try again or email us directly." },
      { status: 502 }
    );
  }

  // Confirmation to the enquirer. It deliberately does not echo their message, so the form
  // can't be used to relay arbitrary text to someone else's inbox.
  // Failure here shouldn't fail the request — the team already has the enquiry.
  if (process.env.SEND_AUTO_REPLY !== "false") {
    try {
      await transport.sendMail({
        from,
        to: data.email,
        replyTo: to,
        subject: "We've received your enquiry | Eximeria Trading Co.",
        text: `Hi ${data.fullName},\n\nThanks for contacting Eximeria Trading Co. A trade specialist will reply within 24 hours (Mon–Sat, 9:00 AM – 7:00 PM IST).\n\nNeed to add anything? Just reply to this email.\n\n— Eximeria Trading Co.`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;color:#0e0f14">
            <div style="background:#0e0f14;padding:20px 24px;border-bottom:3px solid #ce9117">
              <h2 style="color:#fff;margin:0;font-size:20px">Thanks, ${esc(data.fullName.split(" ")[0])}. We've got your enquiry.</h2>
            </div>
            <p style="font-size:15px;line-height:1.6">A trade specialist will reply within <strong>24 hours</strong> (Mon–Sat, 9:00 AM – 7:00 PM IST).</p>
            <p style="font-size:14px;line-height:1.6">Need to add anything? Just reply to this email.</p>
            <p style="font-size:14px;margin-top:24px">— Eximeria Trading Co.</p>
          </div>`,
      });
    } catch (err) {
      console.warn("[contact] Auto-reply failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
