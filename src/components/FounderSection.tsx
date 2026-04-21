"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WaitlistForm from "./WaitlistForm";

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

export default function FounderSection() {
  return (
    <>
      {/* Founder Note */}
      <section
        className="bg-white py-20 sm:py-28 px-5 sm:px-8"
        aria-labelledby="founder-heading"
      >
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="bg-[#f0f7ff] border-l-4 border-[#1a3a5c] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
              {/* Quote mark */}
              <div
                className="absolute top-4 right-6 text-[120px] font-black text-[#1a3a5c]/5 leading-none select-none pointer-events-none"
                aria-hidden
              >
                &ldquo;
              </div>

              <div className="relative z-10">
                <span className="inline-block bg-[#1a3a5c] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                  A Founder&apos;s Note
                </span>

                <h2
                  id="founder-heading"
                  className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-tight"
                >
                  Built by a Problem Solver for the People Who{" "}
                  <span className="text-[#1a3a5c]">Actually Build the World</span>
                </h2>

                <div className="space-y-4 text-slate-600 text-base leading-relaxed mb-8">
                  <p>
                    I watched my uncle — a master plumber with 20 years of experience — lose a weekend
                    every month to invoice paperwork. He&apos;s one of the best at his craft. He&apos;s
                    terrible at spreadsheets. And that&apos;s not a skill gap — that&apos;s a{" "}
                    <strong className="text-slate-800">tool gap</strong>.
                  </p>
                  <p>
                    VoiceBill isn&apos;t an &ldquo;app for contractors.&rdquo; It&apos;s a tool engineered
                    for people who work with their hands, not keyboards. People who fix things, build
                    things, and keep the city running — but shouldn&apos;t have to be accountants to
                    get paid.
                  </p>
                  <p>
                    We&apos;re building this for every skilled tradesperson on the planet — whether
                    you&apos;re a plumber in Texas, an HVAC tech in Manchester, or an electrician in
                    Hyderabad.{" "}
                    <strong className="text-slate-800">If you work with your hands, this is built for you.</strong>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a3a5c] flex items-center justify-center text-white font-black text-lg">
                    🛠️
                  </div>
                  <div>
                    <p className="font-black text-slate-800">The Founder</p>
                    <p className="text-slate-500 text-sm">VoiceBill Invoicing</p>
                    <p className="text-slate-400 text-xs">Reach us via the waitlist form above</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-20 sm:py-28 px-5 sm:px-8"
        style={{ background: "linear-gradient(145deg, #0d2238 0%, #1a3a5c 60%, #1e4976 100%)" }}
        aria-labelledby="final-cta-heading"
      >
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <div className="text-5xl mb-5">🚀</div>
            <h2
              id="final-cta-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-5"
            >
              Your Next Invoice Should Take{" "}
              <span className="text-orange-400">30 Seconds.</span>
              <br />
              <span className="text-blue-200">Not 2 Hours.</span>
            </h2>
            <p className="text-blue-200/70 text-lg mb-10 max-w-xl mx-auto">
              Join the waitlist today. Priority access goes out first to early sign-ups.
              No credit card. No commitment. Just faster money.
            </p>
            <div className="flex justify-center">
              <WaitlistForm size="large" />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
