export default function FooterSection() {
  const tradeLinks = [
    { label: "Voice invoicing for Plumbers", href: "#waitlist" },
    { label: "Hands-free billing for HVAC", href: "#waitlist" },
    { label: "Electrical contractor invoice automation", href: "#waitlist" },
    { label: "Field service admin tools", href: "#waitlist" },
    { label: "Contractor paperwork solutions", href: "#waitlist" },
    { label: "Instant invoice generator for trade pros", href: "#waitlist" },
  ];

  return (
    <footer
      className="bg-[#0a1929] text-white py-14 px-5 sm:px-8"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-orange-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                V
              </div>
              <span className="font-black text-xl tracking-tight">VoiceBill</span>
            </div>
            <p className="text-blue-200/60 text-sm leading-relaxed mb-4">
              Zero-entry invoicing for trade professionals. Turn a 30-second voice note into
              a professional, billable invoice before you even start your engine.
            </p>
            <p className="text-blue-200/40 text-xs">
              Built for trade pros worldwide 🌍
            </p>
          </div>

          {/* SEO links */}
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">
              Solutions for Trade Professionals
            </h3>
            <nav aria-label="Trade professional solutions">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tradeLinks.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-blue-200/60 hover:text-orange-400 text-sm transition-colors duration-150 flex items-center gap-1.5"
                    >
                      <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-blue-200/40 text-xs">
            © {new Date().getFullYear()} VoiceBill Invoicing. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-blue-200/40 hover:text-blue-200/70 text-xs transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "VoiceBill Invoicing",
              applicationCategory: "BusinessApplication",
              description:
                "Voice-to-invoice app for trade professionals. Turn a 30-second voice note into a professional invoice with Stripe payment link.",
              operatingSystem: "iOS, Android, Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
                description: "Free early access waitlist",
              },
              audience: {
                "@type": "Audience",
                audienceType: "Plumbers, HVAC Technicians, Electricians, Contractors",
              },
            }),
          }}
        />
      </div>
    </footer>
  );
}
