import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllPaths,
  getTrade,
  getLocation,
  localRate,
  localizePrice,
  TRADES,
  LOCATIONS,
} from "@/data/seo-pages";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import WaitlistForm from "@/components/WaitlistForm";

const SITE_URL = "https://voicebill1.vercel.app";

export async function generateStaticParams() {
  return getAllPaths();
}

type PageParams = Promise<{ trade: string; location: string }>;

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { trade: tradeSlug, location: locationSlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(locationSlug);
  if (!trade || !location) return {};

  const url = `${SITE_URL}/invoice-template/${trade.slug}/${location.slug}`;
  const title = `Free Invoice Template for ${trade.pluralName} in ${location.city} | VoiceBill`;
  const description = `Free professional invoice template for ${trade.pluralName.toLowerCase()} in ${location.city}, ${location.country}. Includes ${location.currency} pricing, sample line items, and tax fields. Skip the typing — VoiceBill creates yours by voice in 30 seconds.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "VoiceBill",
    },
    twitter: { card: "summary_large_image", title, description },
    keywords: [
      `invoice template for ${trade.name.toLowerCase()}s ${location.city}`,
      `${trade.name.toLowerCase()} invoice ${location.country}`,
      `free ${trade.name.toLowerCase()} invoice template`,
      `${trade.name.toLowerCase()} billing ${location.city}`,
      `how to invoice as a ${trade.name.toLowerCase()} in ${location.city}`,
      `${trade.name.toLowerCase()} hourly rate ${location.city}`,
    ],
  };
}

export default async function InvoiceTemplatePage({
  params,
}: {
  params: PageParams;
}) {
  const { trade: tradeSlug, location: locationSlug } = await params;
  const trade = getTrade(tradeSlug);
  const location = getLocation(locationSlug);

  if (!trade || !location) notFound();

  const [lowRate, highRate] = localRate(trade, location);
  const sampleItems = trade.sampleLineItems.map((it) => ({
    ...it,
    localPrice: localizePrice(it.price, location),
  }));
  const subtotal = sampleItems.reduce((s, i) => s + i.localPrice, 0);
  const tax = Math.round(subtotal * 0.085);
  const total = subtotal + tax;

  const otherCities = LOCATIONS.filter((l) => l.slug !== location.slug).slice(0, 8);
  const otherTrades = TRADES.filter((t) => t.slug !== trade.slug).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `Free Invoice Template for ${trade.pluralName} in ${location.city}`,
    description: `Professional invoice template with ${location.currency} pricing for ${trade.pluralName.toLowerCase()} in ${location.city}.`,
    author: { "@type": "Organization", name: "VoiceBill" },
    publisher: {
      "@type": "Organization",
      name: "VoiceBill",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-192.png` },
    },
    datePublished: "2026-05-02",
    mainEntityOfPage: `${SITE_URL}/invoice-template/${trade.slug}/${location.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="bg-white">
        {/* Hero */}
        <section
          className="pt-28 pb-16 px-5 sm:px-8"
          style={{ background: "linear-gradient(145deg, #0d2238 0%, #1a3a5c 60%, #1e4976 100%)" }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-2xl">{trade.emoji}</span>
              <span className="text-white/90 text-sm font-medium">
                {trade.pluralName} · {location.city}, {location.region}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
              Free Invoice Template for{" "}
              <span className="text-orange-400">{trade.pluralName}</span>
              <br />
              in {location.city}
            </h1>
            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8">
              Built for {trade.pluralName.toLowerCase()} who charge{" "}
              <strong className="text-white">
                {location.currencySymbol}
                {lowRate}–{location.currencySymbol}
                {highRate}/hr
              </strong>{" "}
              in {location.city}. Includes {location.currency} pricing, tax fields, and a{" "}
              {trade.name.toLowerCase()}-specific line item structure. Or skip the typing entirely with
              voice-to-invoice.
            </p>
            <div className="flex justify-center">
              <WaitlistForm size="large" />
            </div>
            <p className="text-blue-200/60 text-xs mt-3">
              Join 450+ trade pros · No credit card · Free early access
            </p>
          </div>
        </section>

        {/* Sample invoice */}
        <section className="py-16 px-5 sm:px-8 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Sample {trade.name} Invoice — {location.city} Pricing
            </h2>
            <p className="text-slate-600 mb-8">
              Use this as a starting structure. All amounts in{" "}
              <strong>{location.currency}</strong> reflecting typical {location.city} market rates.
            </p>

            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
              <div className="flex justify-between items-start mb-8 pb-6 border-b">
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Invoice
                  </p>
                  <p className="text-2xl font-black text-slate-900 mt-1">#1042</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-800">
                    Your {trade.name} Business
                  </p>
                  <p className="text-sm text-slate-500">{location.city}, {location.region}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {sampleItems.map((item) => (
                  <div
                    key={item.description}
                    className="flex justify-between text-slate-700 text-sm"
                  >
                    <span>{item.description}</span>
                    <span className="font-medium">
                      {location.currencySymbol}
                      {item.localPrice.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal</span>
                  <span>
                    {location.currencySymbol}
                    {subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Tax (8.5%)</span>
                  <span>
                    {location.currencySymbol}
                    {tax.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t">
                  <span>Total Due</span>
                  <span>
                    {location.currencySymbol}
                    {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full mt-6 bg-orange-500 text-white text-sm font-bold py-3 rounded-xl">
                Send Invoice + Stripe Pay Link →
              </button>
            </div>
          </div>
        </section>

        {/* Pain points */}
        <section className="py-16 px-5 sm:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
              Why Most {trade.pluralName} in {location.city} Hate Invoicing
            </h2>
            <p className="text-slate-600 mb-8">
              These are the real billing headaches we hear from {trade.name.toLowerCase()}s working in {location.city} every week:
            </p>
            <ul className="space-y-4">
              {trade.painPoints.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl p-5"
                >
                  <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                  <span className="text-slate-700">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* VoiceBill CTA */}
        <section className="py-16 px-5 sm:px-8 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Or Skip the Template Entirely
            </h2>
            <p className="text-slate-700 text-lg mb-3">
              Talk for 30 seconds. VoiceBill AI creates a professional {trade.name.toLowerCase()} invoice — with{" "}
              {location.currency} pricing, tax, and a Stripe pay link — and sends it to your{" "}
              {location.city} client before you start your engine.
            </p>
            <p className="text-slate-600 mb-8">
              Built specifically for {trade.jobTypes.slice(0, 3).join(", ")}, and{" "}
              {trade.jobTypes[3]} jobs.
            </p>
            <div className="flex justify-center">
              <WaitlistForm size="large" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-5 sm:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-8">
              {trade.name} Invoicing FAQ — {location.city}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  What hourly rate should a {trade.name.toLowerCase()} charge in {location.city}?
                </h3>
                <p className="text-slate-600">
                  Most {trade.pluralName.toLowerCase()} in {location.city} charge between{" "}
                  {location.currencySymbol}
                  {lowRate} and {location.currencySymbol}
                  {highRate} per hour, depending on experience, license tier, and job complexity.
                  Specialized work (e.g., {trade.jobTypes[2]}) commands the upper end of that range.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Do I need to charge tax on a {trade.name.toLowerCase()} invoice in {location.country}?
                </h3>
                <p className="text-slate-600">
                  Yes — most {trade.name.toLowerCase()} services in {location.country} are subject to
                  sales tax, VAT, or GST depending on your jurisdiction. Check with{" "}
                  {location.country === "United States"
                    ? `your ${location.region} state Department of Revenue`
                    : location.country === "United Kingdom"
                    ? "HMRC for VAT registration thresholds"
                    : location.country === "Australia"
                    ? "the ATO for GST requirements"
                    : "the CRA for HST/GST guidance"}{" "}
                  for current rates.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  How fast should I send a {trade.name.toLowerCase()} invoice after a job?
                </h3>
                <p className="text-slate-600">
                  Same day. Industry data shows {trade.pluralName.toLowerCase()} who invoice within 1
                  hour of job completion get paid 3x faster than those who wait until evening or
                  weekend. With VoiceBill, you can send the invoice from the driveway before leaving.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">
                  Can I use this template for any {trade.name.toLowerCase()} job?
                </h3>
                <p className="text-slate-600">
                  Yes — the structure works for {trade.jobTypes.join(", ")}. Adjust line items based on
                  parts used, labor hours, and any travel or emergency call-out fees specific to your
                  {location.city} service area.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal links */}
        <section className="py-16 px-5 sm:px-8 bg-slate-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              {trade.name} Invoice Templates in Other Cities
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
              {otherCities.map((l) => (
                <Link
                  key={l.slug}
                  href={`/invoice-template/${trade.slug}/${l.slug}`}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 hover:border-orange-400 hover:text-orange-600 transition-colors"
                >
                  {trade.name} · {l.city}
                </Link>
              ))}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
              Invoice Templates for Other Trades in {location.city}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {otherTrades.map((t) => (
                <Link
                  key={t.slug}
                  href={`/invoice-template/${t.slug}/${location.slug}`}
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 hover:border-orange-400 hover:text-orange-600 transition-colors flex items-center gap-2"
                >
                  <span>{t.emoji}</span>
                  <span>{t.name} · {location.city}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </>
  );
}
