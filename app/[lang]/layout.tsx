import type { Metadata } from "next";
import { Libre_Baskerville, Inter } from "next/font/google";
import "../globals.css";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";

const baskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-baskerville",
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://eisenmann-minhagim.com"),
  title: {
    default: "Eisenmann Family Minhagim",
    template: "%s — Eisenmann Family Minhagim",
  },
  description:
    "The customs and traditions of the Eisenmann family — Yekke Jews from the Netherlands and the German-Jewish tradition. Explore our preserved minhagim across holidays and lifecycle events.",
  openGraph: {
    siteName: "Eisenmann Family Minhagim",
    type: "website",
  },
};

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "he" }, { lang: "nl" }];
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dir = lang === "he" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${baskerville.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        {/* Skip to content — hidden until focused, for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:rounded focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        <Nav lang={lang as Locale} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <footer className="border-t border-rule py-8 text-center">
          <p className="font-serif italic text-sm text-ink-light">
            Preserving the Eisenmann family minhagim for generations to come.
          </p>
        </footer>
      </body>
    </html>
  );
}
