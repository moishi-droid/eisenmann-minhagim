import "server-only";

export type Locale = "en" | "he" | "nl";

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../messages/en.json").then((m) => m.default),
  he: () => import("../messages/he.json").then((m) => m.default),
  nl: () => import("../messages/nl.json").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
