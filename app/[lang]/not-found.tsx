"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";
  const isRtl = lang === "he";

  return (
    <div className="max-w-[680px] mx-auto px-6 py-24 text-center">
      <p className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-orange mb-5">
        Page Not Found
      </p>
      <h1 className="font-serif text-[2rem] font-bold text-ink mb-4 leading-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="text-ink-soft text-[0.9rem] leading-relaxed mb-10 max-w-[400px] mx-auto">
        The custom you&apos;re looking for may have moved or hasn&apos;t been recorded yet.
      </p>
      <Link
        href={`/${lang}`}
        className="inline-flex items-center gap-1.5 text-[0.82rem] text-orange hover:text-ink-soft underline underline-offset-2 transition-colors"
      >
        <span aria-hidden="true">{isRtl ? "→" : "←"}</span>
        Back to all minhagim
      </Link>
    </div>
  );
}
