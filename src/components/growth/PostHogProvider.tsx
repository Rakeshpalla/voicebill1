"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// ---------------------------------------------------------------------------
// PostHog boilerplate — replace NEXT_PUBLIC_POSTHOG_KEY in .env.local
// ---------------------------------------------------------------------------

declare global {
  interface Window {
    posthog?: {
      capture: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string, properties?: Record<string, unknown>) => void;
      init: (key: string, options: Record<string, unknown>) => void;
      startSessionRecording: () => void;
    };
  }
}

function loadPostHog(key: string) {
  if (typeof window === "undefined" || window.posthog) return;

  // Inline loader — no extra package required
  const script = document.createElement("script");
  script.src = "https://us.i.posthog.com/static/array.js";
  script.async = true;
  script.onload = () => {
    window.posthog?.init(key, {
      api_host: "https://us.i.posthog.com",
      person_profiles: "identified_only",
      // Session recording
      session_recording: {
        maskAllInputs: true,        // GDPR-safe: masks emails/text inputs
        maskInputOptions: { password: true },
      },
      autocapture: true,            // clicks, form submits, page views
      capture_pageview: false,      // we fire pageviews manually below
    });
  };
  document.head.appendChild(script);
}

// ---------------------------------------------------------------------------
// Typed event helpers — import these anywhere you need tracking
// ---------------------------------------------------------------------------

export function trackEvent(event: string, props?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.posthog) {
    window.posthog.capture(event, props);
  }
}

export const Events = {
  WAITLIST_CLICK:        "waitlist_button_clicked",
  WAITLIST_SUCCESS:      "waitlist_signup_success",
  WAITLIST_DUPLICATE:    "waitlist_duplicate_attempt",
  ROI_CALCULATOR_USED:   "roi_calculator_used",
  VOICE_DEMO_VIEWED:     "voice_demo_section_viewed",
  TEMPLATE_DOWNLOAD:     "invoice_template_downloaded",
  HERO_CTA_CLICKED:      "hero_cta_clicked",
} as const;

// ---------------------------------------------------------------------------
// Provider component — mount in layout.tsx
// ---------------------------------------------------------------------------

export default function PostHogProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) {
      console.warn("[VoiceBill] NEXT_PUBLIC_POSTHOG_KEY not set — PostHog disabled.");
      return;
    }
    loadPostHog(key);
  }, []);

  // Manual pageview on route change
  useEffect(() => {
    if (typeof window !== "undefined" && window.posthog) {
      window.posthog.capture("$pageview", {
        $current_url: window.location.href,
        path: pathname,
        search: searchParams.toString(),
      });
    }
  }, [pathname, searchParams]);

  return null;
}
