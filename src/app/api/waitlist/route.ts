import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/waitlist";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body  = await req.json();
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

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[VoiceBill] Waitlist error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
