import { Metadata } from "next";
import Link from "next/link";
import { TRADES, LOCATIONS } from "@/data/seo-pages";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WaitlistForm from "@/components/WaitlistForm";

const SITE_URL = "https://voicebill1.vercel.app";

export const metadata: Metadata = {
  title: "Free Invoice Templates for Trade Pros | VoiceBill",
  description:
    "Free professional invoice templates for plumbers, HVAC techs, electricians, roofers, and more — localized for cities across the US, UK, Australia, and Canada. Or skip typing entirely with voice-to-invoice.",
  alternates: { canonical: `${SITE_URL}/invoice-template` },
  keywords: [
    "free invoice template for contractors",
    "trade pro invoice templates",
    "plumber invoice template",
    "HVAC invoice template",
    "electrician invoice template",
    "contractor billing template",
  ],
};

export default function InvoiceTemplateIndex() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <section
          className="pt-28 pb-16 px-5 sm:px-8"
          style={{ background: "linear-gradient(145deg, #0d2238 0%, #1a3a5c 60%, #1e4976 100%)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
              Free Invoice Templates for{" "}
              <span className="text-orange-400">Trade Pros</span>
            </h1>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
              Localized invoice templates for {TRADES.length} trades across {LOCATIONS.length} cities.
              Or skip the typing — talk for 30 seconds, VoiceBill creates your invoice + Stripe pay
              link.
            </p>
            <div className="flex justify-center">
              <WaitlistForm size="large" />
            </div>
          </div>
        </section>

        <section className="py-16 px-5 sm:px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            {TRADES.map((trade) => (
              <div key={trade.slug} className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                  <span className="text-3xl">{trade.emoji}</span>
                  {trade.name} Invoice Templates
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {LOCATIONS.map((loc) => (
                    <Link
                      key={loc.slug}
                      href={`/invoice-template/${trade.slug}/${loc.slug}`}
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
                    >
                      {loc.city}, {loc.countryCode}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
