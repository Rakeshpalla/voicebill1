export type Trade = {
  slug: string;
  name: string;
  pluralName: string;
  emoji: string;
  hourlyRateUSD: [number, number];
  sampleLineItems: { description: string; price: number }[];
  painPoints: string[];
  jobTypes: string[];
};

export type Location = {
  slug: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
  rateMultiplier: number;
};

export const TRADES: Trade[] = [
  {
    slug: "plumber",
    name: "Plumber",
    pluralName: "Plumbers",
    emoji: "🔧",
    hourlyRateUSD: [85, 200],
    sampleLineItems: [
      { description: "Kitchen faucet replacement (Moen Arbor)", price: 189 },
      { description: "Labor (1.5 hrs)", price: 187 },
      { description: "Supply lines + plumber's putty", price: 18 },
    ],
    painPoints: [
      "Typing invoices after a 10-hour shift on your knees",
      "Forgetting which fittings you used on Tuesday's job",
      "Chasing payment 14 days after a leaky pipe emergency",
    ],
    jobTypes: ["leak repair", "drain cleaning", "water heater install", "pipe replacement", "fixture install"],
  },
  {
    slug: "hvac-technician",
    name: "HVAC Technician",
    pluralName: "HVAC Technicians",
    emoji: "❄️",
    hourlyRateUSD: [95, 220],
    sampleLineItems: [
      { description: "AC compressor diagnostic", price: 125 },
      { description: "Refrigerant recharge (R-410A, 2lbs)", price: 180 },
      { description: "Labor (2 hrs)", price: 250 },
    ],
    painPoints: [
      "Logging service calls between 6 AC repairs in 95° heat",
      "Misplacing refrigerant tracking forms",
      "Losing track of warranty work vs billable work",
    ],
    jobTypes: ["AC repair", "furnace install", "duct cleaning", "thermostat replacement", "preventive maintenance"],
  },
  {
    slug: "electrician",
    name: "Electrician",
    pluralName: "Electricians",
    emoji: "⚡",
    hourlyRateUSD: [90, 210],
    sampleLineItems: [
      { description: "Panel upgrade (200A breaker)", price: 1850 },
      { description: "Labor (6 hrs)", price: 720 },
      { description: "Permit + inspection coordination", price: 175 },
    ],
    painPoints: [
      "Tracking permit numbers across 4 active job sites",
      "Itemizing parts on a complex panel upgrade from memory",
      "Getting paid before your supplier invoice is due",
    ],
    jobTypes: ["panel upgrade", "outlet install", "lighting install", "rewiring", "EV charger install"],
  },
  {
    slug: "roofer",
    name: "Roofer",
    pluralName: "Roofers",
    emoji: "🏠",
    hourlyRateUSD: [75, 180],
    sampleLineItems: [
      { description: "Asphalt shingle replacement (24 sq)", price: 8400 },
      { description: "Underlayment + ice & water shield", price: 920 },
      { description: "Labor (16 hrs, 2 person crew)", price: 2400 },
    ],
    painPoints: [
      "Calculating square footage and material costs after a long roof tear-off",
      "Storm-chasing customers want immediate quotes on the spot",
      "Insurance payment delays kill cash flow on big jobs",
    ],
    jobTypes: ["shingle replacement", "leak repair", "gutter install", "storm damage repair", "skylight install"],
  },
  {
    slug: "carpenter",
    name: "Carpenter",
    pluralName: "Carpenters",
    emoji: "🪚",
    hourlyRateUSD: [70, 160],
    sampleLineItems: [
      { description: "Custom oak shelving (8 ft)", price: 685 },
      { description: "Hardware + finish materials", price: 145 },
      { description: "Labor (8 hrs)", price: 720 },
    ],
    painPoints: [
      "Pricing custom work fairly without an itemized bid in front of you",
      "Tracking material markup on bespoke jobs",
      "Forgetting to bill for design consultation time",
    ],
    jobTypes: ["custom shelving", "deck build", "trim install", "cabinet repair", "framing"],
  },
  {
    slug: "landscaper",
    name: "Landscaper",
    pluralName: "Landscapers",
    emoji: "🌱",
    hourlyRateUSD: [50, 120],
    sampleLineItems: [
      { description: "Lawn aeration + overseed (1/4 acre)", price: 295 },
      { description: "Premium grass seed (10 lbs)", price: 85 },
      { description: "Labor (3 hrs)", price: 180 },
    ],
    painPoints: [
      "Invoicing 8 weekly maintenance customers every Friday night",
      "Charging extra for bagged clippings without an awkward conversation",
      "Tracking seasonal contracts vs one-off jobs",
    ],
    jobTypes: ["lawn maintenance", "tree removal", "irrigation install", "hardscape", "garden design"],
  },
  {
    slug: "painter",
    name: "Painter",
    pluralName: "Painters",
    emoji: "🎨",
    hourlyRateUSD: [55, 130],
    sampleLineItems: [
      { description: "Interior paint (3 bedrooms, Sherwin-Williams)", price: 1850 },
      { description: "Prep, primer, and supplies", price: 320 },
      { description: "Labor (14 hrs)", price: 1120 },
    ],
    painPoints: [
      "Quoting square footage accurately on multi-room projects",
      "Tracking paint brand, color codes, and finish for warranty calls",
      "Justifying premium pricing for prep work clients don't see",
    ],
    jobTypes: ["interior painting", "exterior painting", "cabinet refinishing", "wallpaper removal", "trim work"],
  },
  {
    slug: "general-contractor",
    name: "General Contractor",
    pluralName: "General Contractors",
    emoji: "🛠️",
    hourlyRateUSD: [85, 250],
    sampleLineItems: [
      { description: "Bathroom remodel - Phase 1 (demo + plumbing rough)", price: 4200 },
      { description: "Materials (tile, vanity, fixtures)", price: 2850 },
      { description: "Subcontractor coordination + project mgmt", price: 1400 },
    ],
    painPoints: [
      "Itemizing progress invoices across multi-week projects",
      "Tracking change orders that clients verbally approve on-site",
      "Coordinating draws with multiple subs without dropping the ball",
    ],
    jobTypes: ["bathroom remodel", "kitchen remodel", "addition", "basement finish", "whole-home renovation"],
  },
];

export const LOCATIONS: Location[] = [
  // United States
  { slug: "new-york", city: "New York", region: "New York", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.4 },
  { slug: "los-angeles", city: "Los Angeles", region: "California", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.3 },
  { slug: "chicago", city: "Chicago", region: "Illinois", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.1 },
  { slug: "houston", city: "Houston", region: "Texas", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 0.95 },
  { slug: "phoenix", city: "Phoenix", region: "Arizona", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.0 },
  { slug: "philadelphia", city: "Philadelphia", region: "Pennsylvania", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.05 },
  { slug: "san-antonio", city: "San Antonio", region: "Texas", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 0.9 },
  { slug: "san-diego", city: "San Diego", region: "California", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.25 },
  { slug: "dallas", city: "Dallas", region: "Texas", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.0 },
  { slug: "austin", city: "Austin", region: "Texas", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.05 },
  { slug: "miami", city: "Miami", region: "Florida", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.15 },
  { slug: "seattle", city: "Seattle", region: "Washington", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.3 },
  { slug: "denver", city: "Denver", region: "Colorado", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.1 },
  { slug: "boston", city: "Boston", region: "Massachusetts", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.35 },
  { slug: "atlanta", city: "Atlanta", region: "Georgia", country: "United States", countryCode: "US", currency: "USD", currencySymbol: "$", rateMultiplier: 1.0 },
  // United Kingdom
  { slug: "london", city: "London", region: "England", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", rateMultiplier: 0.85 },
  { slug: "manchester", city: "Manchester", region: "England", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", rateMultiplier: 0.65 },
  { slug: "birmingham", city: "Birmingham", region: "England", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", rateMultiplier: 0.6 },
  { slug: "leeds", city: "Leeds", region: "England", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", rateMultiplier: 0.6 },
  { slug: "glasgow", city: "Glasgow", region: "Scotland", country: "United Kingdom", countryCode: "GB", currency: "GBP", currencySymbol: "£", rateMultiplier: 0.55 },
  // Australia
  { slug: "sydney", city: "Sydney", region: "New South Wales", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "A$", rateMultiplier: 1.5 },
  { slug: "melbourne", city: "Melbourne", region: "Victoria", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "A$", rateMultiplier: 1.4 },
  { slug: "brisbane", city: "Brisbane", region: "Queensland", country: "Australia", countryCode: "AU", currency: "AUD", currencySymbol: "A$", rateMultiplier: 1.3 },
  // Canada
  { slug: "toronto", city: "Toronto", region: "Ontario", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "C$", rateMultiplier: 1.25 },
  { slug: "vancouver", city: "Vancouver", region: "British Columbia", country: "Canada", countryCode: "CA", currency: "CAD", currencySymbol: "C$", rateMultiplier: 1.3 },
];

export function getTrade(slug: string): Trade | undefined {
  return TRADES.find((t) => t.slug === slug);
}

export function getLocation(slug: string): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function localRate(trade: Trade, location: Location): [number, number] {
  return [
    Math.round(trade.hourlyRateUSD[0] * location.rateMultiplier),
    Math.round(trade.hourlyRateUSD[1] * location.rateMultiplier),
  ];
}

export function localizePrice(usd: number, location: Location): number {
  return Math.round(usd * location.rateMultiplier);
}

export function getAllPaths(): { trade: string; location: string }[] {
  return TRADES.flatMap((t) =>
    LOCATIONS.map((l) => ({ trade: t.slug, location: l.slug }))
  );
}
