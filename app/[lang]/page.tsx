import { notFound } from "next/navigation";
import Link from "next/link";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { getHolidays, getLifecycleEvents } from "@/lib/content";
import type { Entry } from "@/lib/content";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = (await getDictionary(lang as Locale)) as Record<string, Record<string, string>>;
  const holidays = getHolidays();
  const lifecycle = getLifecycleEvents();
  const locale = lang as Locale;

  return (
    <div className="max-w-[760px] mx-auto px-6">
      {/* Hero */}
      <header className="text-center py-20 border-b border-rule">
        <p className="font-serif italic text-orange text-[1rem] mb-4">
          The Eisenmann Family
        </p>
        <h1 className="font-serif text-[2.8rem] font-bold leading-[1.15] tracking-[-0.01em] text-ink mb-5">
          {dict.home.title.replace("Eisenmann Family ", "")}
        </h1>
        {/* decorative dot-rule */}
        <div className="flex items-center justify-center gap-3 mb-5 mx-auto w-[120px]">
          <div className="flex-1 h-px bg-rule" />
          <div className="w-[5px] h-[5px] rounded-full bg-orange shrink-0" />
          <div className="flex-1 h-px bg-rule" />
        </div>
        <p className="text-ink-soft leading-[1.8] text-[0.95rem] max-w-[520px] mx-auto">
          {dict.home.description}
        </p>
      </header>

      {/* Holidays */}
      <Chapter heading={dict.home.holidays_heading} />
      <EntryGrid entries={holidays} locale={locale} lang={lang} noCustomsLabel={dict.home.no_customs} />

      {/* Lifecycle */}
      <Chapter heading={dict.home.lifecycle_heading} />
      <EntryGrid entries={lifecycle} locale={locale} lang={lang} noCustomsLabel={dict.home.no_customs} />

      <div className="pb-16" />
    </div>
  );
}

function Chapter({ heading }: { heading: string }) {
  return (
    <div className="flex items-center gap-4 mt-12 mb-5">
      <h2 className="font-serif italic text-[1.25rem] text-ink-soft whitespace-nowrap">
        {heading}
      </h2>
      <div className="flex-1 h-px bg-rule" />
    </div>
  );
}

function EntryGrid({
  entries,
  locale,
  lang,
  noCustomsLabel,
}: {
  entries: Entry[];
  locale: Locale;
  lang: string;
  noCustomsLabel: string;
}) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[10px]">
      {entries.map((entry) => {
        const hasCustums = entry.customs.length > 0;
        return (
          <li key={entry.id}>
            <Link
              href={`/${lang}/${entry.slug}`}
              className={`flex items-center justify-between px-[1.4rem] py-[1.1rem] rounded-[10px] border transition-all ${
                hasCustums
                  ? "bg-cream border-rule hover:border-orange hover:shadow-[0_2px_12px_rgba(196,72,26,0.12)]"
                  : "bg-surface border-transparent hover:bg-surface-2 hover:shadow-[0_2px_10px_rgba(42,26,8,0.08)]"
              }`}
            >
              <span className="font-serif text-[0.97rem] text-ink">
                {entry.name[locale]}
              </span>
              <span className={`text-[0.7rem] ${hasCustums ? "text-orange font-semibold" : "text-ink-light"}`}>
                {hasCustums
                  ? `${entry.customs.length} custom${entry.customs.length !== 1 ? "s" : ""}`
                  : noCustomsLabel}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
