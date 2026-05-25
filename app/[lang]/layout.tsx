import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";
import { hasLocale, type Locale } from "@/lib/dictionaries";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

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
    <html lang={lang} dir={dir} className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <Nav lang={lang as Locale} />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 py-6 text-center text-sm text-stone-400">
          Eisenmann Family Minhagim · Preserving our traditions for generations to come.
        </footer>
      </body>
    </html>
  );
}
