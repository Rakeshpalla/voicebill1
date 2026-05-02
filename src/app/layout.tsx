import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import PostHogProvider from "@/components/growth/PostHogProvider";
import StructuredData from "./structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://voicebill1.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VoiceBill — Voice-to-Invoice for Plumbers, HVAC & Electricians | Get Paid Same Day",
    template: "%s | VoiceBill",
  },
  description:
    "Stop typing invoices. Talk for 30 seconds — VoiceBill AI creates a professional invoice + Stripe payment link instantly. Used by 450+ plumbers, HVAC techs & electricians across 12 countries. Join the waitlist free.",
  keywords: [
    // High-intent buying keywords
    "best invoice app for plumbers",
    "invoice app for contractors",
    "voice to invoice app",
    "contractor invoice software",
    "invoice app for tradespeople",
    "automated invoicing for electricians",
    "HVAC invoice software",
    "plumber invoice app",
    "field service invoicing app",
    "get paid faster as a contractor",
    "same day payment for contractors",
    "AI invoice generator for tradespeople",
    // Long-tail buying intent
    "how to invoice faster as a plumber",
    "best billing app for HVAC technicians",
    "electrician billing software with payment link",
    "voice invoice generator for contractors",
    "invoice from phone for tradespeople",
    "no typing invoice app for field workers",
    "Stripe invoicing for contractors",
    "contractor invoice app with payment",
    // Geo-targeted
    "plumber invoice app UK",
    "HVAC invoice app USA",
    "electrician billing software Australia",
    "contractor billing app Canada",
    "trade pro invoicing India",
    "invoice app for tradespeople UAE",
  ],
  authors: [{ name: "VoiceBill" }],
  creator: "VoiceBill",
  publisher: "VoiceBill",
  openGraph: {
    title: "VoiceBill — Talk for 30 Seconds. Get Paid Same Day.",
    description:
      "450+ trade pros use VoiceBill to turn a voice note into a professional invoice + Stripe pay link in seconds. No typing. No laptop. No chasing payments. Join the waitlist free.",
    type: "website",
    url: siteUrl,
    locale: "en_US",
    siteName: "VoiceBill",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoiceBill — Voice-to-Invoice app for plumbers, HVAC techs and electricians",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceBill — Stop Typing Invoices. Just Talk.",
    description:
      "Turn a 30-second voice note into a professional invoice + Stripe pay link. Built for plumbers, HVAC techs & electricians. 450+ pros across 12 countries. Join free.",
    images: ["/og-image.png"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VoiceBill",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": `${siteUrl}`,
      "en-GB": `${siteUrl}`,
      "en-AU": `${siteUrl}`,
      "en-CA": `${siteUrl}`,
      "en-IN": `${siteUrl}`,
      "en-AE": `${siteUrl}`,
      "x-default": `${siteUrl}`,
    },
  },
  verification: {
    google: "a94f32d41bf64ec6",
  },
  category: "business",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF4F00" },
    { media: "(prefers-color-scheme: dark)",  color: "#0d2238" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VoiceBill" />
        <meta name="application-name" content="VoiceBill" />
        <meta name="msapplication-TileColor" content="#FF4F00" />

        {/* hreflang — global availability signals */}
        <link rel="alternate" hrefLang="en-US" href={siteUrl} />
        <link rel="alternate" hrefLang="en-GB" href={siteUrl} />
        <link rel="alternate" hrefLang="en-AU" href={siteUrl} />
        <link rel="alternate" hrefLang="en-CA" href={siteUrl} />
        <link rel="alternate" hrefLang="en-IN" href={siteUrl} />
        <link rel="alternate" hrefLang="en-AE" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />

        <StructuredData />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        {children}
        <Analytics />
        {/* PostHog — useSearchParams requires Suspense boundary */}
        <Suspense fallback={null}>
          <PostHogProvider />
        </Suspense>
      </body>
    </html>
  );
}
