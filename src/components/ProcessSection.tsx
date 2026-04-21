"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    icon: "🎙️",
    title: "Tap the Button",
    subtitle: "One tap. No login screen. No menu.",
    detail:
      "Open VoiceBill, hit the big orange button. It's designed for job-site conditions — gloves on, sun in your face. Works every time.",
    color: "from-blue-600 to-blue-800",
    accent: "text-blue-400",
  },
  {
    number: "02",
    icon: "🗣️",
    title: "Speak Naturally",
    subtitle: "No format. No commands. Just talk.",
    detail:
      "Say something like: \"Replaced bedroom radiator, 2 hours labour, Stelrad 600×900 panel, TRV valves, client is James at 14 Birchwood Close.\" That's it.",
    color: "from-orange-500 to-orange-700",
    accent: "text-orange-400",
  },
  {
    number: "03",
    icon: "⚡",
    title: "AI Does Everything",
    subtitle: "Invoice. Payment link. Done.",
    detail:
      "Our AI parses your voice, generates a professional invoice with line items, tax, and your business details — then attaches a Stripe link and sends it to your client.",
    color: "from-green-500 to-green-700",
    accent: "text-green-400",
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
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function ProcessSection() {
  return (
    <section
      className="py-20 sm:py-28 px-5 sm:px-8 bg-white"
      aria-labelledby="process-heading"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block bg-blue-100 text-[#1a3a5c] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              The Voice-to-Wealth Process
            </span>
            <h2
              id="process-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              From Job Done to{" "}
              <span className="text-[#1a3a5c]">Money Sent</span>
              <br />
              in Under 60 Seconds
            </h2>
            <p className="text-slate-500 text-lg">
              Three stupid-simple steps. No training required. If you can leave a voicemail, you
              can use VoiceBill.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div
            className="hidden lg:block absolute top-16 left-[calc(16.666%+16px)] right-[calc(16.666%+16px)] h-0.5 bg-gradient-to-r from-blue-200 via-orange-200 to-green-200 z-0"
            aria-hidden
          />

          {steps.map(({ number, icon, title, subtitle, detail, color, accent }, i) => (
            <ScrollReveal key={title} delay={i * 0.12}>
              <div className="relative bg-white border-2 border-slate-100 hover:border-blue-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl group h-full flex flex-col">
                {/* Step number bubble */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  {icon}
                </div>
                <div className={`text-xs font-black uppercase tracking-widest ${accent} mb-2`}>
                  Step {number}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-1">{title}</h3>
                <p className="text-sm font-semibold text-slate-500 mb-4">{subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed flex-1">
                  {detail}
                </p>

                {/* Arrow for desktop */}
                {i < 2 && (
                  <div
                    className="hidden lg:flex absolute -right-4 top-16 z-10 w-8 h-8 bg-white border-2 border-slate-200 rounded-full items-center justify-center shadow-sm"
                    aria-hidden
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Voice sample callout */}
        <ScrollReveal delay={0.2}>
          <div
            className="mt-12 rounded-3xl p-8 sm:p-10 border border-blue-200/50"
            style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%)" }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-shrink-0 w-14 h-14 bg-[#1a3a5c] rounded-2xl flex items-center justify-center text-2xl shadow-md">
                🎤
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-[#1a3a5c] mb-1">
                  Example Voice Input
                </p>
                <p className="text-slate-800 font-medium text-lg leading-relaxed">
                  &ldquo;Replaced bedroom radiator, 2 hours labour, Stelrad 600×900 panel, TRV valves fitted, client is James at 14 Birchwood Close.&rdquo;
                </p>
              </div>
              <div className="flex-shrink-0 bg-white border-2 border-green-300 rounded-2xl px-5 py-4 text-center shadow-sm">
                <div className="text-2xl font-black text-green-600">£301</div>
                <div className="text-xs text-green-700 font-semibold">Invoice ready</div>
                <div className="text-[10px] text-slate-400 mt-0.5">in 4 seconds</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
