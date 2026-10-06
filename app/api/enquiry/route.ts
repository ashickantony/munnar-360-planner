import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_MESSAGE_LENGTH = 1500;
const MAX_DATES_LENGTH = 120;
const MAX_PRESET_LENGTH = 120;
const MAX_REQUEST_LENGTH = 8192;

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
  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not read request body" },
      { status: 400 }
    );
  }

  if (rawBody.length > MAX_REQUEST_LENGTH) {
    return NextResponse.json(
      { ok: false, error: "Request is too large" },
      { status: 413 }
    );
  }

  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 }
    );
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
    hasDates: enquiry.dates.length > 0,
    hasMessage: enquiry.message.length > 0,
  });

  const resendKey = process.env.RESEND_API_KEY?.trim();
  const enquiryTo = process.env.ENQUIRY_TO?.trim();
  const enquiryFrom = process.env.ENQUIRY_FROM?.trim();

  if (!resendKey || !enquiryTo || !enquiryFrom) {
    console.error("[enquiry] email delivery is not configured");
    return NextResponse.json(
      {
        ok: false,
        error: "Enquiries are temporarily unavailable. Please contact us on WhatsApp or by phone.",
      },
      { status: 503 }
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: enquiryFrom,
        to: [enquiryTo],
        subject: `New enquiry — ${enquiry.name}${
          enquiry.presetExperience ? ` (${enquiry.presetExperience})` : ""
        }`,
        text: [
          `Name: ${enquiry.name}`,
          `Email: ${enquiry.email}`,
          `Dates: ${enquiry.dates || "—"}`,
          enquiry.presetExperience
            ? `Interest: ${enquiry.presetExperience}`
            : "",
          "",
          enquiry.message || "(no message)",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("[enquiry] email send failed", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json(
        {
          ok: false,
          error: "We couldn’t deliver your enquiry just now. Please contact us on WhatsApp or by phone.",
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error("[enquiry] email send failed", error);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn’t deliver your enquiry just now. Please contact us on WhatsApp or by phone.",
      },
      { status: 502 }
    );
  }

  console.info("[enquiry] delivered", {
    receivedAt: new Date().toISOString(),
    hasDates: enquiry.dates.length > 0,
    hasMessage: enquiry.message.length > 0,
    presetExperience: enquiry.presetExperience ?? "none",
  });

  return NextResponse.json({ ok: true });
}
