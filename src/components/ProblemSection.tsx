"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const painPoints = [
  {
    icon: "⏰",
    stat: "2+ hrs",
    label: "Lost per job",
    detail: "Manually typing invoices after a long shift—killing your evenings.",
  },
  {
    icon: "💸",
    stat: "14 days",
    label: "Average payment delay",
    detail: "Paper invoices get lost. Late billing kills cash flow. Jobs pile up.",
  },
  {
    icon: "🤯",
    stat: "68%",
    label: "Contractors burned out",
    detail: "The paperwork load is the #1 reason skilled tradespeople quit solo work.",
  },
];

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ProblemSection() {
  return (
    <section
      className="bg-[#f8fafc] py-20 sm:py-28 px-5 sm:px-8"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              The Real Cost of Manual Billing
            </span>
            <h2
              id="problem-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              Field Service Admin Burnout{" "}
              <span className="text-red-500">Is Stealing</span> Your Time & Money
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              Contractor paperwork stress and delayed billing cash flow are a silent tax on every
              skilled tradesperson working solo. You didn&apos;t train for years to spend nights
              typing invoices.
            </p>
          </div>
        </ScrollReveal>

        {/* Pain point cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          {painPoints.map(({ icon, stat, label, detail }, i) => (
            <ScrollReveal key={label} delay={i * 0.1}>
              <div className="bg-white border border-red-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow text-center h-full">
                <div className="text-4xl mb-3">{icon}</div>
                <div className="text-4xl font-black text-red-500 mb-1">{stat}</div>
                <div className="font-bold text-slate-800 mb-2">{label}</div>
                <p className="text-slate-500 text-sm leading-relaxed">{detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Before vs After */}
        <ScrollReveal>
          <div className="text-center mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              Old Way vs. <span className="text-[#1a3a5c]">VoiceBill Way</span>
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Before */}
          <ScrollReveal delay={0.05}>
            <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEFORE
              </div>
              <h4 className="text-xl font-black text-red-700 mb-6">Manual Typing · 2 Hours Lost</h4>
              <ul className="space-y-4">
                {[
                  "Drive home exhausted after 8 hrs on-site",
                  "Open laptop, hunt for invoice template",
                  "Type job details from memory (make errors)",
                  "Attach PDF, pray the client pays it",
                  "Chase payment 2 weeks later",
                  "Miss the next job while doing admin",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-slate-600 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-red-200/60 rounded-2xl p-4 text-center">
                <span className="text-red-700 font-black text-2xl">$0</span>
                <p className="text-red-600 text-sm font-medium">collected after 3 days</p>
              </div>
            </div>
          </ScrollReveal>

          {/* After */}
          <ScrollReveal delay={0.12}>
            <div
              className="border-2 border-blue-300 rounded-3xl p-8 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #0d2238 0%, #1a3a5c 100%)" }}
            >
              <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                WITH VOICEFLOW
              </div>
              <h4 className="text-xl font-black text-orange-400 mb-6">VoiceBill · 30 Seconds Done</h4>
              <ul className="space-y-4">
                {[
                  "Finish the job, pull out your phone",
                  'Tap once — say "Water heater, 2 hrs, $750"',
                  "AI generates a perfect invoice instantly",
                  "Stripe pay link sent to client in seconds",
                  "Client pays from their phone — same day",
                  "You drive to the next job, already paid",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100/80 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 bg-green-500/20 border border-green-400/30 rounded-2xl p-4 text-center">
                <span className="text-green-400 font-black text-2xl">$750</span>
                <p className="text-green-300 text-sm font-medium">collected before you leave the driveway</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
