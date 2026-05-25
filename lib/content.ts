import fs from "fs";
import path from "path";

export type AudioRecording = {
  id: string;
  title: string;
  recordedBy: string;
  year?: number;
  file: string; // filename only — lives in /public/audio/
  description?: string;
};

export type Custom = {
  id: string;
  title: string;
  description: string;
  category?: "prayer" | "food" | "ritual" | "song" | "other";
  audio?: AudioRecording[];
};

export type LocalizedString = {
  en: string;
  he: string;
  nl: string;
};

export type Entry = {
  id: string;
  slug: string;
  category: "holiday" | "lifecycle";
  order: number;
  name: LocalizedString;
  description: LocalizedString;
  customs: Custom[];
};

// Runs only at build time (SSG) — safe to use fs here
function loadDir(dir: string): Entry[] {
  const folder = path.join(process.cwd(), "content", dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        return JSON.parse(
          fs.readFileSync(path.join(folder, f), "utf-8")
        ) as Entry;
      } catch (err) {
        console.error(`[content] Failed to parse ${f}:`, err);
        return null;
      }
    })
    .filter((e): e is Entry => e !== null && typeof e.slug === "string")
    .sort((a, b) => a.order - b.order);
}

export function getAllEntries(): Entry[] {
  return [...loadDir("holidays"), ...loadDir("lifecycle")];
}

export function getHolidays(): Entry[] {
  return loadDir("holidays");
}

export function getLifecycleEvents(): Entry[] {
  return loadDir("lifecycle");
}

export function getEntry(slug: string): Entry | undefined {
  return getAllEntries().find((e) => e.slug === slug);
}

export function getAdjacentEntries(
  slug: string,
  category: "holiday" | "lifecycle"
): { prev: Entry | null; next: Entry | null } {
  const entries = category === "holiday" ? getHolidays() : getLifecycleEvents();
  const idx = entries.findIndex((e) => e.slug === slug);
  return {
    prev: idx > 0 ? entries[idx - 1] : null,
    next: idx < entries.length - 1 ? entries[idx + 1] : null,
  };
}
