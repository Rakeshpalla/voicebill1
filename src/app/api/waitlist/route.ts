import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { addToWaitlist } from "@/lib/waitlist";
import {
  confirmationEmailHtml,
  confirmationEmailText,
} from "@/lib/emails/confirmationEmail";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      undefined;

    const result = addToWaitlist(email, ip);

    if (result.duplicate) {
      return NextResponse.json(
        { error: "You're already on the waitlist! We'll be in touch." },
        { status: 409 }
      );
    }

    // Send confirmation email via Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const { data: emailData, error: emailError } = await resend.emails.send({
        from: "VoiceBill Invoicing <onboarding@resend.dev>",
        to: email,
        subject: "⚡ You're on the VoiceBill waitlist — here's what's next",
        html: confirmationEmailHtml(email),
        text: confirmationEmailText(email),
        replyTo: "sharmapal.storage@gmail.com",
      });
      if (emailError) {
        console.error("[VoiceBill] Resend error:", JSON.stringify(emailError));
      } else {
        console.log("[VoiceBill] Email sent:", emailData?.id);
      }
    } else {
      console.warn("[VoiceBill] RESEND_API_KEY not set — skipping confirmation email.");
    }

    return NextResponse.json({ ok: true, message: "Added to waitlist." });
  } catch (err) {
    console.error("[VoiceBill] Waitlist API error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
