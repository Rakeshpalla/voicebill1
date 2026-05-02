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
                  Built for the People Who{" "}
                  <span className="text-[#1a3a5c]">Actually Keep the World Running</span>
                </h2>

                <div className="space-y-5 text-slate-600 text-base leading-relaxed mb-8">
                  <p>
                    My uncle is a master plumber. Twenty years in the trade, never missed a job.
                    Every Sunday evening he&apos;d sit at the kitchen table squinting at a laptop,
                    trying to remember what he charged on Thursday. An hour gone. Sometimes two.
                    Occasionally he&apos;d skip the invoice entirely and just absorb the loss.
                  </p>
                  <p>
                    He is brilliant at his craft. He is not brilliant at spreadsheets.
                    And honestly, he shouldn&apos;t have to be.
                    That is not a personal failing. That is a{" "}
                    <strong className="text-slate-800">broken system</strong> designed by people
                    who have never worked a job site in their lives.
                  </p>
                  <p>
                    So I built VoiceBill. You finish the job, you speak for 20 seconds, the invoice
                    is done and sent before you start the van. No laptop. No forms. No Sunday evenings
                    lost to paperwork.{" "}
                    <strong className="text-slate-800">
                      If you work with your hands, you deserve tools that work as hard as you do.
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#1a3a5c] flex items-center justify-center text-white font-black text-lg">
                    🛠️
                  </div>
                  <div>
                    <p className="font-black text-slate-800">The Founder</p>
                    <p className="text-slate-500 text-sm">VoiceBill Invoicing</p>
                    <div className="flex items-center gap-4 mt-1.5">
                      <a
                        href="https://www.linkedin.com/in/build-beyond/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[#1a3a5c] hover:text-[#FF4F00] text-xs font-semibold transition-colors"
                        aria-label="Founder LinkedIn profile"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                      <a
                        href="mailto:sharmapal.storage@gmail.com"
                        className="flex items-center gap-1.5 text-[#1a3a5c] hover:text-[#FF4F00] text-xs font-semibold transition-colors"
                        aria-label="Founder email"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        Get in Touch
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        id="waitlist"
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
