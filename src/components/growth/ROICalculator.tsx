"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

function useCountUp(target: number, duration = 1.2) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, duration]);
  return display;
}

function AnimatedNumber({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const count = useCountUp(value);
  return (
    <span>
      {prefix}
      {count.toLocaleString()}
    </span>
  );
}

export default function ROICalculator() {
  const [hourlyRate, setHourlyRate] = useState(125);
  const [invoicesPerWeek, setInvoicesPerWeek] = useState(5);
  const [hasInteracted, setHasInteracted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // (invoices/week × 20 min × rate/hr) × 52 weeks
  const minutesPerInvoice = 20;
  const yearlyLoss = Math.round(
    invoicesPerWeek * (minutesPerInvoice / 60) * hourlyRate * 52
  );
  const monthlyLoss = Math.round(yearlyLoss / 12);
  const hoursPerYear = Math.round(invoicesPerWeek * (minutesPerInvoice / 60) * 52);

  const handleChange = (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(Number(e.target.value));
    setHasInteracted(true);
    if (typeof window !== "undefined" && (window as any).posthog) {
      (window as any).posthog.capture("roi_calculator_used", {
        hourly_rate: hourlyRate,
        invoices_per_week: invoicesPerWeek,
        yearly_loss: yearlyLoss,
      });
    }
  };

  return (
    <section
      className="py-24 sm:py-32 px-5 sm:px-8 bg-white"
      aria-labelledby="roi-heading"
      id="calculator"
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
              Free ROI Calculator
            </span>
            <h2
              id="roi-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-4"
            >
              How Much Is Manual Billing{" "}
              <span className="text-red-500">Costing You?</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              The average trade pro spends 20 minutes per invoice. At your hourly rate, that adds up fast.
            </p>
          </div>

          {/* Calculator card */}
          <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl shadow-slate-100">
            {/* Inputs */}
            <div className="bg-slate-50 p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 gap-8 border-b border-slate-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Your Hourly Rate
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                  <input
                    type="number"
                    min={20}
                    max={500}
                    value={hourlyRate}
                    onChange={handleChange(setHourlyRate)}
                    className="w-full pl-9 pr-4 py-4 text-2xl font-black text-slate-900 bg-white border-2 border-slate-200 focus:border-[#FF4F00] rounded-2xl outline-none transition-colors"
                    aria-label="Your hourly rate in dollars"
                  />
                </div>
                <input
                  type="range"
                  min={20}
                  max={300}
                  step={5}
                  value={hourlyRate}
                  onChange={handleChange(setHourlyRate)}
                  className="w-full mt-3 accent-orange-500"
                  aria-label="Hourly rate slider"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>$20</span><span>$300/hr</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                  Invoices Per Week
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={invoicesPerWeek}
                    onChange={handleChange(setInvoicesPerWeek)}
                    className="w-full px-4 py-4 text-2xl font-black text-slate-900 bg-white border-2 border-slate-200 focus:border-[#FF4F00] rounded-2xl outline-none transition-colors"
                    aria-label="Number of invoices per week"
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={invoicesPerWeek}
                  onChange={handleChange(setInvoicesPerWeek)}
                  className="w-full mt-3 accent-orange-500"
                  aria-label="Invoices per week slider"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1">
                  <span>1</span><span>30/week</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white p-8 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-5 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Hours Wasted / Year</p>
                  <p className="text-3xl font-black text-slate-700 tabular-nums">
                    {hasInteracted || inView ? <AnimatedNumber value={hoursPerYear} prefix="" /> : `${hoursPerYear}`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">hrs of your life</p>
                </div>
                <div className="text-center p-5 rounded-2xl bg-red-50 border border-red-100">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-2">Monthly Loss</p>
                  <p className="text-3xl font-black text-red-500 tabular-nums">
                    {hasInteracted || inView ? <AnimatedNumber value={monthlyLoss} /> : `$${monthlyLoss.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-red-300 mt-1">every month</p>
                </div>
                <div className="text-center p-5 rounded-2xl bg-red-500 border border-red-600">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-200 mb-2">Yearly Loss</p>
                  <p className="text-3xl font-black text-white tabular-nums">
                    {hasInteracted || inView ? <AnimatedNumber value={yearlyLoss} /> : `$${yearlyLoss.toLocaleString()}`}
                  </p>
                  <p className="text-xs text-red-200 mt-1">gone forever</p>
                </div>
              </div>

              {/* Big loss statement */}
              <motion.div
                key={yearlyLoss}
                initial={{ scale: 0.97, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-6 text-center mb-8"
                style={{ background: "linear-gradient(135deg, #1a0000 0%, #3d0000 100%)" }}
              >
                <p className="text-red-300 text-sm font-bold uppercase tracking-widest mb-2">Your Reality Check</p>
                <p className="text-white text-xl sm:text-2xl font-black leading-tight">
                  You are losing{" "}
                  <span className="text-red-400 text-3xl sm:text-4xl">
                    ${yearlyLoss.toLocaleString()}
                  </span>{" "}
                  per year
                  <br />
                  <span className="text-red-200/70 text-base font-medium">
                    doing paperwork that VoiceBill handles in 30 seconds.
                  </span>
                </p>
              </motion.div>

              {/* CTA */}
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-5">
                  Stop the bleed. Join the waitlist — it&apos;s free.
                </p>
                <div className="flex justify-center">
                  <WaitlistForm size="large" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
