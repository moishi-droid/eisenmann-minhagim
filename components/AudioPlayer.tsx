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
    <div className="rounded-md bg-stone-50 border border-stone-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-sm font-medium text-stone-800">{recording.title}</p>
          <p className="text-xs text-stone-400 mt-0.5">
            {recordedByLabel}: {recording.recordedBy}
            {recording.year && ` · ${recording.year}`}
          </p>
          {recording.description && (
            <p className="text-xs text-stone-500 mt-1">{recording.description}</p>
          )}
        </div>
        <a
          href={src}
          download={recording.file}
          className="text-xs text-stone-500 hover:text-stone-800 underline underline-offset-2 shrink-0 ml-4"
        >
          {downloadLabel}
        </a>
      </div>
      <audio controls className="w-full h-8" src={src} preload="metadata" />
    </div>
  );
}
