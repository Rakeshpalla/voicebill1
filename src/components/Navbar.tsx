"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d2238]/95 backdrop-blur-md shadow-xl shadow-black/20" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav
        className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group" aria-label="VoiceBill Invoicing home">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-black text-base group-hover:scale-110 transition-transform duration-200">
            V
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            VoiceBill
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {[
            { label: "Problem", href: "#problem" },
            { label: "How It Works", href: "#process" },
            { label: "Reviews", href: "#social-proof" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-150"
            >
              {label}
            </a>
          ))}
          <a
            href="#waitlist"
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors duration-150 shadow-lg shadow-orange-500/20"
          >
            Join Waitlist
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white/70 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d2238]/98 backdrop-blur-md border-t border-white/10"
          >
            <div className="px-5 py-4 space-y-3">
              {[
                { label: "Problem", href: "#problem" },
                { label: "How It Works", href: "#process" },
                { label: "Reviews", href: "#social-proof" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-white/70 hover:text-white py-2 text-base font-medium transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#waitlist"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors mt-2"
              >
                Join Waitlist ⚡
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
