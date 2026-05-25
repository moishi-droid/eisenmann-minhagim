"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/dictionaries";

const locales: Locale[] = ["en", "he", "nl"];

const localeLabels: Record<Locale, string> = {
  en: "English",
  he: "עברית",
  nl: "Nederlands",
};

export default function Nav({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Site navigation" className="bg-cream border-b border-rule">
      <div className="max-w-[760px] mx-auto px-6 h-[50px] flex items-center justify-between">
        <Link
          href={`/${lang}`}
          aria-label="Eisenmann Family Minhagim — home"
          className="font-serif text-[1rem] text-ink hover:text-ink-soft transition-colors"
        >
          Eisenmann Minhagim
        </Link>
        <div role="group" aria-label="Change language" className="flex gap-5">
          {locales.map((l) => (
            <Link
              key={l}
              href={pathname.replace(`/${lang}`, `/${l}`)}
              aria-label={localeLabels[l]}
              aria-current={l === lang ? "true" : undefined}
              className={`text-[0.72rem] font-semibold tracking-[0.06em] transition-colors ${
                l === lang ? "text-orange" : "text-ink-light hover:text-ink-soft"
              }`}
            >
              {l.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
