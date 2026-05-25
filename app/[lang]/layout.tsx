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
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Eisenmann Family Minhagim",
  description:
    "The customs and traditions of the Eisenmann family — Yekke Jews from the Netherlands.",
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
        <Nav lang={lang as Locale} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rule py-8 text-center">
          <p className="font-serif italic text-sm text-ink-light">
            Preserving the Eisenmann family minhagim for generations to come.
          </p>
        </footer>
      </body>
    </html>
  );
}
