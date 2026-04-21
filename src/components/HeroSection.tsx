"use client";

import { motion, type Variants } from "framer-motion";
import WaitlistForm from "./WaitlistForm";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

function WaveformVisual() {
  return (
    <div className="flex items-center justify-center gap-[3px] h-8" aria-hidden>
      {[3, 5, 8, 14, 20, 14, 10, 6, 4, 7, 12, 18, 14, 9, 5, 8, 14, 20, 16, 11, 6, 4].map((h, i) => (
        <span
          key={i}
          className="wave-bar inline-block w-[3px] rounded-full bg-orange-400"
          style={{ height: `${h}px`, animationDelay: `${i * 0.04}s` }}
        />
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(145deg, #0d2238 0%, #1a3a5c 50%, #1e4976 100%)" }}
      aria-label="Hero"
    >
      {/* Background grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      {/* Glowing orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #f97316 0%, #2563a8 60%, transparent 80%)" }}
        aria-hidden
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 pt-24 pb-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 max-w-2xl">
          {/* Trust badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
            </span>
            <span className="text-white/90 text-sm font-medium">Joining 450+ trade pros across 12 countries</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-5"
          >
            Stop Doing{" "}
            <span className="relative">
              <span className="relative z-10 text-orange-400">Paperwork</span>
              <svg
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                aria-hidden
              >
                <path d="M2 6C50 2 150 2 198 6" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            {" "}in Your Truck.
            <br />
            <span className="text-blue-300">Just Talk,</span> We&apos;ll Invoice.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-lg sm:text-xl text-blue-100/80 leading-relaxed mb-8 max-w-xl"
          >
            Zero-entry invoicing for trade pros. Turn a{" "}
            <strong className="text-white font-semibold">30-second voice note</strong> into a
            professional, billable invoice before you even start your engine.{" "}
            <span className="text-orange-300 font-semibold">No typing. No apps. No friction.</span>
          </motion.p>

          {/* Waitlist form */}
          <motion.div custom={3} initial="hidden" animate="visible" variants={fadeUp}>
            <WaitlistForm size="large" />
          </motion.div>

          {/* Social proof */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap items-center gap-6 mt-8"
          >
            {[
              { icon: "🔧", label: "Plumbers" },
              { icon: "❄️", label: "HVAC Techs" },
              { icon: "⚡", label: "Electricians" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/60 text-sm">
                <span className="text-base">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — phone mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.7, ease: "easeOut" }}
          className="flex-shrink-0 w-full max-w-xs lg:max-w-sm"
          aria-hidden
        >
          <div
            className="relative rounded-[2.5rem] p-1 shadow-2xl"
            style={{ background: "linear-gradient(145deg, #ffffff20, #ffffff05)" }}
          >
            <div className="bg-[#0d1f35] rounded-[2.2rem] overflow-hidden border border-white/10">
              {/* Phone status bar */}
              <div className="bg-[#0a1929] px-6 py-3 flex justify-between items-center">
                <span className="text-white/40 text-xs font-mono">9:41 AM</span>
                <div className="w-20 h-5 bg-black/60 rounded-full" />
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
              </div>

              {/* App UI */}
              <div className="px-5 py-6 space-y-4">
                <div className="text-center">
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-1">VoiceBill</p>
                  <p className="text-white font-bold text-lg">Ready to Invoice</p>
                </div>

                {/* Waveform */}
                <div className="bg-blue-900/40 rounded-2xl p-4 border border-blue-700/30">
                  <WaveformVisual />
                  <p className="text-center text-blue-200/60 text-xs mt-3 font-mono">
                    &ldquo;Replaced kitchen faucet, 1.5hrs labor, Moen parts...&rdquo;
                  </p>
                </div>

                {/* Generated invoice preview */}
                <div className="bg-white rounded-2xl p-4 shadow-inner">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-slate-400 text-xs">INVOICE #1042</p>
                      <p className="font-bold text-slate-800 text-sm">Mike&apos;s Plumbing</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-1 rounded-lg">READY</span>
                  </div>
                  <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Moen Arbor kitchen faucet</span>
                      <span>$189</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Labor (1.5 hrs × $125/hr)</span>
                      <span>$187</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Supply lines + plumber&apos;s putty</span>
                      <span>$18</span>
                    </div>
                    <div className="border-t border-slate-100 pt-1.5 flex justify-between text-sm font-bold text-slate-800">
                      <span>Total</span>
                      <span>$394</span>
                    </div>
                  </div>
                  <button className="w-full bg-orange-500 text-white text-xs font-bold py-2.5 rounded-xl">
                    Send Invoice + Pay Link →
                  </button>
                </div>

                <p className="text-center text-white/30 text-[10px]">Generated in 4 seconds ✓</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
