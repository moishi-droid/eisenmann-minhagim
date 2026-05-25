import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { getEntry, getAllEntries } from "@/lib/content";
import AudioPlayer from "@/components/AudioPlayer";

export async function generateStaticParams() {
  const entries = getAllEntries();
  const langs = ["en", "he", "nl"];
  return langs.flatMap((lang) => entries.map((e) => ({ lang, slug: e.slug })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const entry = getEntry(slug);
  if (!entry) return {};
  const locale = lang as Locale;
  const name = entry.name[locale] || entry.name.en;
  const description = entry.description[locale] || entry.description.en;
  return {
    title: name,
    description: description || `Eisenmann family customs for ${name}.`,
    openGraph: {
      title: `${name} — Eisenmann Family Minhagim`,
      description: description || `Eisenmann family customs for ${name}.`,
      locale: lang,
    },
  };
}

export default async function EntryPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const entry = getEntry(slug);
  if (!entry) notFound();

  const locale = lang as Locale;
  const dict = (await getDictionary(locale)) as Record<string, Record<string, string>>;
  const categoryLabel = entry.category === "holiday" ? dict.nav.holidays : dict.nav.lifecycle;
  const name = entry.name[locale] || entry.name.en;
  const description = entry.description[locale] || entry.description.en;

  return (
    <div className="max-w-[680px] mx-auto px-6 py-10">
      {/* Back link */}
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1.5 text-[0.78rem] text-ink-light hover:text-ink-soft transition-colors mb-8"
        aria-label={`Back to all ${categoryLabel}`}
      >
        <span aria-hidden="true">{lang === "he" ? "→" : "←"}</span>
        <span>All {categoryLabel}</span>
      </Link>

      {/* Entry header — dark ink band */}
      <div className="rounded-[12px] overflow-hidden border border-rule shadow-[0_4px_24px_rgba(42,26,8,0.07)] mb-8">
        <div className="bg-ink px-10 py-9 text-white">
          <p className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-orange mb-2">
            {categoryLabel}
          </p>
          <h1 className="font-serif text-[2.1rem] font-bold mb-2 leading-tight">
            {name}
          </h1>
          {description && (
            <p className="text-white/40 text-[0.87rem] font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Customs */}
        <div className="bg-cream px-10 py-7">
          {entry.customs.length === 0 ? (
            <div className="text-center py-8" role="status">
              <p className="font-serif italic text-ink-mid text-[1rem] mb-1">
                {dict.entry.no_customs_heading}
              </p>
              <p className="text-ink-light text-sm">{dict.entry.no_customs_body}</p>
            </div>
          ) : (
            <ul className="space-y-5" aria-label={`Customs for ${name}`}>
              {entry.customs.map((custom) => (
                <li
                  key={custom.id}
                  className="bg-surface rounded-[10px] border border-rule px-6 py-5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="font-serif text-[1.05rem] text-ink">{custom.title}</h2>
                    {custom.category && (
                      <span
                        className="text-[0.63rem] font-semibold tracking-[0.09em] uppercase bg-orange-pale text-orange px-2 py-0.5 rounded-full shrink-0 ml-3"
                        aria-label={`Category: ${custom.category}`}
                      >
                        {custom.category}
                      </span>
                    )}
                  </div>
                  <p className="text-ink-soft text-[0.86rem] leading-[1.72] mb-4">
                    {custom.description}
                  </p>
                  {custom.audio && custom.audio.length > 0 && (
                    <div className="space-y-3" aria-label="Audio recordings">
                      {custom.audio.map((recording) => (
                        <AudioPlayer
                          key={recording.id}
                          recording={recording}
                          recordedByLabel={dict.entry.recorded_by}
                          downloadLabel={dict.entry.download}
                        />
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
