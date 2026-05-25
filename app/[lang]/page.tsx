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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900 mb-3">
          {dict.home.title}
        </h1>
        <p className="text-lg text-stone-500 mb-6">{dict.home.subtitle}</p>
        <p className="text-stone-600 leading-relaxed max-w-xl mx-auto text-sm">
          {dict.home.description}
        </p>
      </header>

      <Section
        heading={dict.home.holidays_heading}
        entries={holidays}
        locale={locale}
        lang={lang}
        noCustomsLabel={dict.home.no_customs}
      />

      <Section
        heading={dict.home.lifecycle_heading}
        entries={lifecycle}
        locale={locale}
        lang={lang}
        noCustomsLabel={dict.home.no_customs}
      />
    </div>
  );
}

function Section({
  heading,
  entries,
  locale,
  lang,
  noCustomsLabel,
}: {
  heading: string;
  entries: Entry[];
  locale: Locale;
  lang: string;
  noCustomsLabel: string;
}) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-semibold text-stone-700 mb-4 pb-2 border-b border-stone-200">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link
              href={`/${lang}/${entry.slug}`}
              className="flex items-center justify-between p-4 rounded-lg border border-stone-200 bg-white hover:border-stone-400 hover:shadow-sm transition-all"
            >
              <span className="font-medium text-stone-800">{entry.name[locale]}</span>
              <span className="text-xs text-stone-400">
                {entry.customs.length === 0
                  ? noCustomsLabel
                  : `${entry.customs.length} custom${entry.customs.length !== 1 ? "s" : ""}`}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
