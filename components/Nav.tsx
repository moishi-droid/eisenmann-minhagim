"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/dictionaries";

const labels: Record<Locale, { home: string; holidays: string; lifecycle: string }> = {
  en: { home: "Home", holidays: "Holidays", lifecycle: "Lifecycle" },
  he: { home: "בית", holidays: "חגים", lifecycle: "מחזור החיים" },
  nl: { home: "Home", holidays: "Feestdagen", lifecycle: "Levenscyclus" },
};

export default function Nav({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const t = labels[lang];

  return (
    <nav className="border-b border-stone-200 bg-white">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href={`/${lang}`} className="font-semibold text-stone-800 text-sm tracking-tight">
          Eisenmann Minhagim
        </Link>
        <div className="flex gap-1">
          {(["en", "he", "nl"] as Locale[]).map((l) => (
            <Link
              key={l}
              href={pathname.replace(`/${lang}`, `/${l}`)}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                l === lang
                  ? "bg-stone-900 text-white"
                  : "text-stone-500 hover:text-stone-800"
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
