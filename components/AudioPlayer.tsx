"use client";

import type { AudioRecording } from "@/lib/content";

export default function AudioPlayer({
  recording,
  recordedByLabel,
  downloadLabel,
}: {
  recording: AudioRecording;
  recordedByLabel: string;
  downloadLabel: string;
}) {
  const src = `/audio/${recording.file}`;

  return (
    <div className="bg-cream border border-rule rounded-[8px] px-4 py-3.5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[0.82rem] font-medium text-ink">{recording.title}</p>
          <p className="text-[0.7rem] text-ink-light mt-0.5">
            {recordedByLabel}: {recording.recordedBy}
            {recording.year && ` · ${recording.year}`}
          </p>
          {recording.description && (
            <p className="text-[0.7rem] text-ink-mid mt-1">{recording.description}</p>
          )}
        </div>
        <a
          href={src}
          download={recording.file}
          aria-label={`Download ${recording.title}`}
          className="text-[0.7rem] text-orange hover:text-ink-soft underline underline-offset-2 shrink-0 ml-4 transition-colors"
        >
          {downloadLabel}
        </a>
      </div>
      <audio
        controls
        className="w-full h-8"
        src={src}
        preload="metadata"
        aria-label={`${recording.title} — recorded by ${recording.recordedBy}${recording.year ? ` in ${recording.year}` : ""}`}
      />
    </div>
  );
}
