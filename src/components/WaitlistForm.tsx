"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ErrorType = "duplicate" | "generic" | null;

export default function WaitlistForm({ size = "default" }: { size?: "default" | "large" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState<ErrorType>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const setErr = (msg: string, type: ErrorType = "generic") => {
    setError(msg);
    setErrorType(type);
  };

  const clearErr = () => {
    setError("");
    setErrorType(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setErr("Please enter a valid email address.");
      return;
    }
    clearErr();
    setLoading(true);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.status === 409) {
        setErr("This email is already on the waitlist — we'll be in touch soon.", "duplicate");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setErr(data?.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setErr("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isLarge = size === "large";

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center gap-2 mb-3">
        <Badge className="bg-orange-500 hover:bg-orange-500 text-white text-xs font-bold px-3 py-1 pulse-orange">
          ⚡ PRIORITY ACCESS
        </Badge>
        <span className="text-slate-400 text-sm">Only 50 spots left</span>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border-2 border-green-400 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-xl font-bold text-green-800 mb-2">You&apos;re officially on the list.</h3>
            <p className="text-green-700 text-sm leading-relaxed">
              We&apos;ve reserved your early access spot for <strong>{email}</strong>.
              When VoiceBill opens its doors, you&apos;ll be among the very first to get in —
              ahead of the public queue.
            </p>
            <div className="mt-4 pt-4 border-t border-green-200">
              <p className="text-green-600 text-xs leading-relaxed">
                No action needed. We&apos;ll reach out personally when your access is ready.
                Until then — keep doing great work.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="form" className="flex flex-col gap-3">
            <form
              onSubmit={handleSubmit}
              className={`flex flex-col sm:flex-row gap-3 ${isLarge ? "sm:gap-4" : ""}`}
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); clearErr(); }}
                  className={`w-full bg-white border-2 rounded-xl text-slate-900 placeholder-slate-400 font-medium transition-colors ${
                    isLarge ? "h-14 text-lg px-5" : "h-12 px-4"
                  } ${
                    errorType === "duplicate"
                      ? "border-amber-400 focus:border-amber-500"
                      : errorType === "generic"
                      ? "border-red-400 focus:border-red-500"
                      : "border-slate-200 focus:border-blue-600"
                  }`}
                  aria-label="Email address"
                  aria-describedby={error ? "waitlist-error" : undefined}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className={`bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold rounded-xl transition-all duration-150 shadow-lg shadow-orange-200 whitespace-nowrap ${
                  isLarge ? "h-14 px-8 text-lg" : "h-12 px-6"
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Locking in...
                  </span>
                ) : (
                  "Get Early Access →"
                )}
              </Button>
            </form>

            {/* Error banner — always visible regardless of background */}
            <AnimatePresence>
              {error && (
                <motion.div
                  id="waitlist-error"
                  role="alert"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className={`flex items-start gap-3 rounded-xl px-4 py-3 border ${
                    errorType === "duplicate"
                      ? "bg-amber-50 border-amber-300 text-amber-800"
                      : "bg-red-50 border-red-300 text-red-800"
                  }`}
                >
                  <span className="text-lg leading-none mt-0.5" aria-hidden>
                    {errorType === "duplicate" ? "👋" : "⚠️"}
                  </span>
                  <p className="text-sm font-medium leading-snug">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {!submitted && (
        <p className="text-slate-400 text-xs mt-4 flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          No spam. No credit card. Unsubscribe anytime.
        </p>
      )}
    </div>
  );
}
