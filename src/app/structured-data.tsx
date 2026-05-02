const siteUrl = "https://voicebill1.vercel.app";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VoiceBill",
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Android, Web",
    url: siteUrl,
    description:
      "VoiceBill turns a 30-second voice note into a professional invoice with a Stripe payment link. Built for plumbers, HVAC technicians, and electricians who want to get paid same day without typing.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free early access — join the waitlist",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Voice-to-invoice in 30 seconds",
      "Automatic Stripe payment link generation",
      "Professional invoice PDF creation",
      "Works for plumbers, HVAC techs, electricians",
      "No typing required",
      "Same-day payment collection",
    ],
    screenshot: `${siteUrl}/og-image.png`,
    author: {
      "@type": "Organization",
      name: "VoiceBill",
      url: siteUrl,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VoiceBill",
    url: siteUrl,
    logo: `${siteUrl}/icons/icon-192.png`,
    description:
      "VoiceBill is a voice-powered invoicing platform for trade professionals. Plumbers, HVAC techs, and electricians use VoiceBill to create invoices and collect payment in under 30 seconds.",
    foundingDate: "2025",
    areaServed: ["US", "GB", "AU", "CA", "IN", "AE"],
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "English",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does VoiceBill work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Simply tap the record button and describe your job out loud — for example, 'Replaced kitchen faucet, 1.5 hours labor, Moen parts.' VoiceBill AI instantly generates a professional invoice and a Stripe payment link you can send to your client in seconds.",
        },
      },
      {
        "@type": "Question",
        name: "Who is VoiceBill for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VoiceBill is built for independent trade professionals — plumbers, HVAC technicians, electricians, and other field service workers who want to stop wasting time typing invoices and start getting paid same day.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can I create an invoice with VoiceBill?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under 30 seconds. You talk, VoiceBill listens, and a professional invoice with a Stripe payment link is ready before you start your engine.",
        },
      },
      {
        "@type": "Question",
        name: "Is VoiceBill free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VoiceBill is currently in early access. Join the waitlist to get free early access and be among the first trade pros to use voice-to-invoice billing.",
        },
      },
      {
        "@type": "Question",
        name: "Does VoiceBill work worldwide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. VoiceBill is used by 450+ trade professionals across 12 countries including the USA, UK, Australia, Canada, India, and UAE.",
        },
      },
      {
        "@type": "Question",
        name: "How do clients pay invoices sent through VoiceBill?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "VoiceBill generates a Stripe payment link with every invoice. Clients click the link on their phone and pay instantly with card — no account needed.",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "VoiceBill — Voice-to-Invoice for Trade Professionals",
    url: siteUrl,
    description:
      "Join 450+ plumbers, HVAC techs, and electricians using VoiceBill to turn a 30-second voice note into a professional invoice + Stripe payment link. Get paid same day.",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", ".hero-description"],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ],
    },
  },
];

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
