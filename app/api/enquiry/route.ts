import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_MESSAGE_LENGTH = 1500;
const MAX_DATES_LENGTH = 120;
const MAX_PRESET_LENGTH = 120;

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120, "Name is too long"),
  email: z.string().trim().email("A valid email is required"),
  dates: z.string().trim().max(MAX_DATES_LENGTH, "Dates are too long").optional().default(""),
  message: z.string().trim().max(MAX_MESSAGE_LENGTH, "Message is too long").optional().default(""),
  presetExperience: z
    .string()
    .trim()
    .max(MAX_PRESET_LENGTH, "Experience is too long")
    .optional()
    .transform((value) => value || undefined),
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

  console.info("[enquiry] received", {
    receivedAt: new Date().toISOString(),
    nameLength: enquiry.name.length,
    emailDomain: enquiry.email.split("@")[1] ?? "unknown",
    hasDates: enquiry.dates.length > 0,
    hasMessage: enquiry.message.length > 0,
    presetExperience: enquiry.presetExperience ?? "none",
  });

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const enquiryTo = process.env.ENQUIRY_TO?.trim();

  if (resendKey && enquiryTo) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? "Munnar 360 <onboarding@resend.dev>",
          to: [enquiryTo],
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

      if (!response.ok) {
        console.error("[enquiry] email send failed", {
          status: response.status,
          statusText: response.statusText,
        });
      }
    } catch (error) {
      console.error("[enquiry] email send failed", error);
    }
  }

  return NextResponse.json({ ok: true });
}
