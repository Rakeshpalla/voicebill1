import { MetadataRoute } from "next";
import { TRADES, LOCATIONS } from "@/data/seo-pages";

const SITE_URL = "https://voicebill1.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homepage: MetadataRoute.Sitemap[number] = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  };

  const templateIndex: MetadataRoute.Sitemap[number] = {
    url: `${SITE_URL}/invoice-template`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  };

  const programmaticPages: MetadataRoute.Sitemap = TRADES.flatMap((trade) =>
    LOCATIONS.map((location) => ({
      url: `${SITE_URL}/invoice-template/${trade.slug}/${location.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [homepage, templateIndex, ...programmaticPages];
}
