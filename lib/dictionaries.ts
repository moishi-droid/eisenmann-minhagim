import "server-only";
import { LOCALES, DEFAULT_LOCALE } from "./locales";
import type { Locale } from "./locales";

export type { Locale };
export { LOCALES, DEFAULT_LOCALE };

const dictionaries: Record<Locale, () => Promise<Record<string, unknown>>> = {
  en: () => import("../messages/en.json").then((m) => m.default),
  he: () => import("../messages/he.json").then((m) => m.default),
  nl: () => import("../messages/nl.json").then((m) => m.default),
};

export const hasLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as Locale);

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
