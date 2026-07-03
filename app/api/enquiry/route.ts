import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Enquiry route handler (trial). Validates the payload and returns success.
 * For the trial it just logs to the server console; if a RESEND_API_KEY env var
 * is present it will email the team, otherwise that step is skipped silently.
 *
 * PHASE 2: point this at the real pipeline — WhatsApp Business API, a CRM/lead
 * dashboard, and confirmed transactional email. The client-side contract
 * (POST JSON → { ok: true }) stays identical, so the form never changes.
 */

const enquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email is required"),
  dates: z.string().optional().default(""),
  message: z.string().optional().default(""),
  presetExperience: z.string().optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const enquiry = parsed.data;

  // Trial behaviour: log the lead. Swap for a durable store in phase 2.
  console.log("[enquiry]", {
    ...enquiry,
    receivedAt: new Date().toISOString(),
  });

  // Optional email via Resend if configured. No key → skip, still succeed.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? "Munnar 360 <onboarding@resend.dev>",
          to: [process.env.ENQUIRY_TO ?? "hello@example.com"],
          subject: `New enquiry — ${enquiry.name}${
            enquiry.presetExperience ? ` (${enquiry.presetExperience})` : ""
          }`,
          text: [
            `Name: ${enquiry.name}`,
            `Email: ${enquiry.email}`,
            `Dates: ${enquiry.dates || "—"}`,
            enquiry.presetExperience ? `Interest: ${enquiry.presetExperience}` : "",
            "",
            enquiry.message || "(no message)",
          ]
            .filter(Boolean)
            .join("\n"),
        }),
      });
    } catch (err) {
      // Don't fail the visitor's submission if email delivery hiccups.
      console.error("[enquiry] email send failed", err);
    }
  }

  return NextResponse.json({ ok: true });
}
