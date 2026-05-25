"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] || "en";

  return (
    <div className="max-w-[680px] mx-auto px-6 py-24 text-center">
      <p className="text-[0.65rem] font-semibold tracking-[0.14em] uppercase text-orange mb-5">
        Something went wrong
      </p>
      <h2 className="font-serif text-[2rem] font-bold text-ink mb-4 leading-tight">
        An unexpected error occurred
      </h2>
      <p className="text-ink-soft text-[0.9rem] leading-relaxed mb-10 max-w-[400px] mx-auto">
        We apologize for the interruption. You can try again or return home.
      </p>
      <div className="flex items-center justify-center gap-5">
        <button
          onClick={reset}
          className="text-[0.82rem] text-orange hover:text-ink-soft underline underline-offset-2 transition-colors"
        >
          Try again
        </button>
        <span className="text-rule" aria-hidden="true">·</span>
        <Link
          href={`/${lang}`}
          className="inline-flex items-center gap-1.5 text-[0.82rem] text-orange hover:text-ink-soft underline underline-offset-2 transition-colors"
        >
          <span aria-hidden="true">←</span>
          Return home
        </Link>
      </div>
    </div>
  );
}
