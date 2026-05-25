import type { MetadataRoute } from "next";
import { getAllEntries } from "@/lib/content";

const BASE_URL = "https://eisenmann-minhagim.com";
const LOCALES = ["en", "he", "nl"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllEntries();

  const homePages = LOCALES.map((lang) => ({
    url: `${BASE_URL}/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
  }));

  const entryPages = LOCALES.flatMap((lang) =>
    entries.map((entry) => ({
      url: `${BASE_URL}/${lang}/${entry.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }))
  );

  return [...homePages, ...entryPages];
}
