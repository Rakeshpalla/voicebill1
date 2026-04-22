import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import PostHogProvider from "@/components/growth/PostHogProvider";
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
    default: "VoiceBill — Voice-to-Invoice for Trade Pros | Automated Contractor Billing",
    template: "%s | VoiceBill",
  },
  description:
    "Zero-entry invoicing for plumbers, HVAC techs & electricians. Turn a 30-second voice note into a professional invoice with Stripe payment link. Automated contractor billing worldwide.",
  keywords: [
    "voice to invoice for trade pros",
    "automated contractor billing",
    "zero entry invoicing",
    "voice invoicing for plumbers",
    "hands-free billing for HVAC",
    "electrical contractor invoice automation",
    "field service invoice app",
    "contractor billing software",
    "invoice generator for tradespeople",
    "global voice invoicing app",
    "plumber invoice app UK",
    "HVAC invoice app USA",
    "electrician billing software Australia",
    "trade pro invoicing India",
  ],
  authors: [{ name: "VoiceBill Invoicing" }],
  creator: "VoiceBill",
  publisher: "VoiceBill",
  openGraph: {
    title: "VoiceBill — Just Talk. We'll Invoice. | Voice-to-Invoice for Trade Pros",
    description:
      "Automated contractor billing in 30 seconds. Turn a voice note into a professional invoice + Stripe pay link. Built for plumbers, HVAC techs & electricians worldwide.",
    type: "website",
    url: siteUrl,
    locale: "en_US",
    siteName: "VoiceBill — Global Voice Invoicing",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoiceBill — Global Voice Invoicing for Trade Professionals",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoiceBill — Zero-Entry Invoicing for Trade Pros",
    description:
      "Stop typing invoices. Just talk — AI generates your invoice + Stripe pay link in 30 seconds. Automated contractor billing worldwide.",
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
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
