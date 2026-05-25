import { notFound } from "next/navigation";
import { hasLocale, getDictionary, type Locale } from "@/lib/dictionaries";
import { getEntry, getAllEntries } from "@/lib/content";
import AudioPlayer from "@/components/AudioPlayer";

export async function generateStaticParams() {
  const entries = getAllEntries();
  const langs = ["en", "he", "nl"];
  return langs.flatMap((lang) => entries.map((e) => ({ lang, slug: e.slug })));
}

export default async function EntryPage({ params }: PageProps<"/[lang]/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const entry = getEntry(slug);
  if (!entry) notFound();

  const locale = lang as Locale;
  const dict = (await getDictionary(locale)) as Record<string, Record<string, string>>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-sm text-stone-400 uppercase tracking-widest mb-1">
          {entry.category === "holiday" ? dict.nav.holidays : dict.nav.lifecycle}
        </p>
        <h1 className="text-3xl font-semibold text-stone-900 mb-3">
          {entry.name[locale]}
        </h1>
        {entry.description[locale] && (
          <p className="text-stone-500 leading-relaxed">{entry.description[locale]}</p>
        )}
      </div>

      {entry.customs.length === 0 ? (
        <div className="rounded-lg border border-dashed border-stone-300 p-8 text-center">
          <p className="font-medium text-stone-500 mb-2">{dict.entry.no_customs_heading}</p>
          <p className="text-sm text-stone-400">{dict.entry.no_customs_body}</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {entry.customs.map((custom) => (
            <li key={custom.id} className="rounded-lg border border-stone-200 bg-white p-6">
              <h2 className="text-lg font-semibold text-stone-800 mb-2">{custom.title}</h2>
              {custom.category && (
                <span className="inline-block text-xs bg-stone-100 text-stone-500 rounded px-2 py-0.5 mb-3 capitalize">
                  {custom.category}
                </span>
              )}
              <p className="text-stone-600 leading-relaxed text-sm">{custom.description}</p>
              {custom.audio && custom.audio.length > 0 && (
                <div className="mt-4 space-y-3">
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
  );
}
