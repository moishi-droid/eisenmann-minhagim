import fs from "fs";
import path from "path";

export type AudioRecording = {
  id: string;
  title: string;
  recordedBy: string;
  year?: number;
  file: string; // filename in /public/audio/
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

function loadDir(dir: string): Entry[] {
  const folder = path.join(process.cwd(), "content", dir);
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(folder, f), "utf-8")) as Entry)
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
