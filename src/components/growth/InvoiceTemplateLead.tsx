"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

const templates = [
  {
    id: "plumber",
    trade: "Plumber",
    emoji: "🔧",
    color: "from-blue-600 to-blue-800",
    accent: "text-blue-400",
    border: "border-blue-200",
    bg: "bg-blue-50",
    fields: [
      { label: "Job Description", value: "Replaced kitchen mixer tap + supply lines" },
      { label: "Labour",          value: "1.5 hrs × $125/hr = $187" },
      { label: "Parts",           value: "Moen Arbor faucet + fittings = $207" },
      { label: "Total",           value: "$394", bold: true },
    ],
  },
  {
    id: "hvac",
    trade: "HVAC Tech",
    emoji: "❄️",
    color: "from-cyan-600 to-cyan-800",
    accent: "text-cyan-400",
    border: "border-cyan-200",
    bg: "bg-cyan-50",
    fields: [
      { label: "Job Description", value: "AC service + refrigerant top-up" },
      { label: "Labour",          value: "2 hrs × $110/hr = $220" },
      { label: "Parts",           value: "R-410A refrigerant + filter = $145" },
      { label: "Total",           value: "$365", bold: true },
    ],
  },
  {
    id: "electrician",
    trade: "Electrician",
    emoji: "⚡",
    color: "from-yellow-500 to-orange-600",
    accent: "text-yellow-500",
    border: "border-yellow-200",
    bg: "bg-yellow-50",
    fields: [
      { label: "Job Description", value: "Consumer unit upgrade (18-way)" },
      { label: "Labour",          value: "4 hrs × $95/hr = $380" },
      { label: "Parts",           value: "Hager MCB board + breakers = $310" },
      { label: "Total",           value: "$690", bold: true },
    ],
  },
];

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function InvoiceTemplateLead() {
  const [active, setActive] = useState("plumber");
  const [downloaded, setDownloaded] = useState(false);
  const tmpl = templates.find((t) => t.id === active)!;

  function handleDownload() {
    // Track with PostHog
    if (typeof window !== "undefined" && window.posthog) {
      (window as any).posthog.capture("invoice_template_downloaded", { trade: active });
    }

    // Generate plain-text template as a downloadable .txt file
    const lines = [
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      `  INVOICE — ${tmpl.trade.toUpperCase()} TEMPLATE`,
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
      "",
      "  YOUR BUSINESS NAME:  ____________________",
      "  CLIENT NAME:         ____________________",
      "  CLIENT ADDRESS:      ____________________",
      "  INVOICE DATE:        ____________________",
      "  INVOICE #:           ____________________",
      "",
      "  ─────────────────────────────────────────",
      "  LINE ITEMS",
      "  ─────────────────────────────────────────",
      ...tmpl.fields.map((f) => `  ${f.label.padEnd(20)} ${f.value}`),
      "",
      "  ─────────────────────────────────────────",
      "  PAYMENT DUE WITHIN 7 DAYS",
      "  Bank transfer / card link attached",
      "  ─────────────────────────────────────────",
      "",
      "  💡 Want this auto-generated in 30 seconds?",
      "  Join VoiceBill — voicebill1.vercel.app",
      "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    ].join("\n");

    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `voicebill-${active}-invoice-template.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setDownloaded(true);
  }

  return (
    <section
      className="py-24 sm:py-32 px-5 sm:px-8"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)" }}
      aria-labelledby="template-heading"
      id="templates"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Free Download · No Email Required
            </span>
            <h2
              id="template-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              Free Invoice Templates{" "}
              <span className="text-[#1a3a5c]">for Trade Pros</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Download a ready-to-use invoice template for your trade — or let VoiceBill
              generate one in 30 seconds, automatically, forever.
            </p>
          </div>
        </ScrollReveal>

        {/* Trade selector tabs */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActive(t.id); setDownloaded(false); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold border-2 transition-all duration-200 ${
                  active === t.id
                    ? "bg-[#1a3a5c] text-white border-[#1a3a5c] shadow-lg"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                }`}
                aria-pressed={active === t.id}
              >
                <span>{t.emoji}</span>
                {t.trade}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoice preview */}
          <ScrollReveal delay={0.15}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden"
              >
                {/* Template header */}
                <div
                  className={`bg-gradient-to-r ${tmpl.color} px-7 py-5 flex items-center gap-3`}
                >
                  <span className="text-2xl">{tmpl.emoji}</span>
                  <div>
                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Invoice Template</p>
                    <p className="text-white font-black text-lg">{tmpl.trade}</p>
                  </div>
                  <span className="ml-auto bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FREE
                  </span>
                </div>

                {/* Template body */}
                <div className="p-7">
                  <div className="flex justify-between text-xs text-slate-400 uppercase tracking-widest mb-5 font-bold">
                    <span>INVOICE #____</span>
                    <span>DATE: ________</span>
                  </div>
                  <div className="space-y-3 mb-6">
                    {tmpl.fields.map((f) => (
                      <div
                        key={f.label}
                        className={`flex justify-between items-center py-2.5 px-3 rounded-xl ${
                          f.bold ? `${tmpl.bg} ${tmpl.border} border` : "bg-slate-50"
                        }`}
                      >
                        <span className={`text-sm ${f.bold ? "font-black text-slate-800" : "text-slate-500"}`}>
                          {f.label}
                        </span>
                        <span className={`text-sm font-bold ${f.bold ? tmpl.accent : "text-slate-700"}`}>
                          {f.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 pt-5 flex items-center justify-between text-xs text-slate-400">
                    <span>Payment due within 7 days</span>
                    <span className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full">
                      + Pay link
                    </span>
                  </div>
                </div>

                {/* Download button */}
                <div className="px-7 pb-7">
                  <button
                    onClick={handleDownload}
                    className="w-full py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 border-2"
                    style={downloaded
                      ? { background: "#f0fdf4", borderColor: "#86efac", color: "#166534" }
                      : { background: "#1a3a5c", borderColor: "#1a3a5c", color: "#fff" }
                    }
                    aria-label={`Download free ${tmpl.trade} invoice template`}
                  >
                    {downloaded ? (
                      <>✅ Downloaded! Check your folder</>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download Free {tmpl.trade} Template
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>

          {/* Upgrade pitch */}
          <ScrollReveal delay={0.2}>
            <div
              className="rounded-3xl p-8 sm:p-10 flex flex-col justify-between h-full border border-blue-400/20"
              style={{ background: "linear-gradient(145deg, #0d2238 0%, #1a3a5c 100%)" }}
            >
              <div>
                <div className="text-3xl mb-4">🎙️</div>
                <h3 className="text-2xl font-black text-white mb-3 leading-tight">
                  Or skip the template entirely.
                </h3>
                <p className="text-blue-200/70 text-base leading-relaxed mb-6">
                  Templates are a start. But you still have to fill them in manually — every single job.
                  VoiceBill generates the{" "}
                  <strong className="text-white">entire invoice from your voice</strong>, with line items,
                  totals, and a Stripe pay link, in under 30 seconds.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "No template to fill in — ever again",
                    "Works in USD, GBP, AUD, EUR, AED, INR",
                    "Sends the invoice + payment link instantly",
                    "Works with gloves on, in sunlight",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-blue-100/80">
                      <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <WaitlistForm size="default" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
