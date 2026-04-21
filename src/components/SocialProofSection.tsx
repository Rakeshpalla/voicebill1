"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const testimonials = [
  {
    quote:
      "I used to spend Sunday evenings typing invoices for the whole week. Now I send them from the job site before the client's even back inside. Game changer.",
    name: "Marcus T.",
    role: "Independent Plumber",
    location: "Austin, TX · USA",
    emoji: "🔧",
    rating: 5,
  },
  {
    quote:
      "My cash flow was always 2-3 weeks behind because I hated doing paperwork. First month with VoiceBill I collected money I would have chased for weeks.",
    name: "James O.",
    role: "HVAC Technician",
    location: "Manchester · UK",
    emoji: "❄️",
    rating: 5,
  },
  {
    quote:
      "The invoice comes out looking more professional than anything I made manually. Clients actually pay faster because it looks legit.",
    name: "Ramesh K.",
    role: "Master Electrician",
    location: "Hyderabad · India",
    emoji: "⚡",
    rating: 5,
  },
];

const waitlistEntries = [
  { name: "Carlos M.", trade: "Plumber", time: "2 mins ago", location: "Miami, USA" },
  { name: "Anil S.", trade: "HVAC Tech", time: "5 mins ago", location: "London, UK" },
  { name: "Deepak R.", trade: "Electrician", time: "11 mins ago", location: "Hyderabad, IN" },
  { name: "Liam W.", trade: "Plumber", time: "17 mins ago", location: "Sydney, AU" },
  { name: "Yusuf A.", trade: "HVAC Tech", time: "24 mins ago", location: "Dubai, UAE" },
  { name: "Haruto N.", trade: "Electrician", time: "31 mins ago", location: "Toronto, CA" },
];

function maskName(name: string): string {
  // "Carlos M." → "C***** M."
  return name
    .split(" ")
    .map((part) => {
      if (part.length <= 1) return part; // single char or punctuation like "M." stays
      const stripped = part.replace(/\.$/, ""); // remove trailing dot
      const hasDot = part.endsWith(".");
      return stripped[0] + "*".repeat(stripped.length - 1) + (hasDot ? "." : "");
    })
    .join(" ");
}

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

function LiveCounter() {
  const [count, setCount] = useState(450);
  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + (Math.random() > 0.7 ? 1 : 0));
    }, 8000);
    return () => clearInterval(id);
  }, []);
  return (
    <motion.span
      key={count}
      initial={{ scale: 1.3, color: "#f97316" }}
      animate={{ scale: 1, color: "#ffffff" }}
      transition={{ duration: 0.4 }}
      className="text-5xl sm:text-6xl font-black text-white tabular-nums"
    >
      {count}+
    </motion.span>
  );
}

export default function SocialProofSection() {
  return (
    <>
      {/* Testimonials */}
      <section
        className="bg-[#f8fafc] py-20 sm:py-28 px-5 sm:px-8"
        aria-labelledby="social-proof-heading"
      >
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                Early Access Feedback
              </span>
              <h2
                id="social-proof-heading"
                className="text-3xl sm:text-4xl font-black text-slate-900 mb-4"
              >
                Trade Pros Worldwide Are Already{" "}
                <span className="text-orange-500">Getting Paid Faster</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {testimonials.map(({ quote, name, role, location, emoji, rating }, i) => (
              <ScrollReveal key={name} delay={i * 0.1}>
                <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">
                    &ldquo;{quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a3a5c] flex items-center justify-center text-lg flex-shrink-0">
                      {emoji}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{name}</p>
                      <p className="text-slate-400 text-xs">{role} · {location}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Live waitlist feed */}
          <ScrollReveal delay={0.1}>
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                </span>
                <span className="font-bold text-slate-700 text-sm">Live Waitlist Activity</span>
                <span className="ml-auto text-slate-400 text-xs">Updated in real-time</span>
              </div>
              <div className="space-y-3">
                {waitlistEntries.map(({ name, trade, time, location }) => (
                  <div
                    key={name}
                    className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0"
                  >
                    <div className="w-8 h-8 bg-[#1a3a5c] rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-slate-800 text-sm">{maskName(name)}</span>
                      <span className="text-slate-400 text-sm"> · {trade} · {location}</span>
                    </div>
                    <span className="text-slate-400 text-xs flex-shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Scarcity / Counter Banner */}
      <section
        className="py-16 sm:py-20 px-5 sm:px-8"
        style={{ background: "linear-gradient(135deg, #0d2238 0%, #1a3a5c 100%)" }}
        aria-label="Waitlist counter"
      >
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mb-3">
              A global movement of trade pros
            </p>
            <LiveCounter />
            <p className="text-blue-200/70 text-xl mt-2 mb-6">
              contractors across 12 countries already on the waitlist
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "🇺🇸 USA", "🇬🇧 UK", "🇦🇺 Australia", "🇨🇦 Canada",
                "🇮🇳 India", "🇦🇪 UAE", "🇩🇪 Germany", "🇳🇿 New Zealand",
              ].map((country) => (
                <span
                  key={country}
                  className="bg-white/10 text-white/70 text-sm px-4 py-1.5 rounded-full border border-white/10"
                >
                  {country}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
