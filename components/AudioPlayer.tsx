"use client";

import { useRef, useState, useEffect } from "react";
import type { AudioRecording } from "@/lib/content";

function formatTime(secs: number): string {
  if (!isFinite(secs) || secs < 0) return "0:00";
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

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
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => { setIsPlaying(false); setCurrentTime(0); };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Number(e.target.value);
  };

  return (
    <div className="bg-cream border border-rule rounded-[8px] px-4 py-3.5">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        aria-label={`${recording.title} — ${recordedByLabel}: ${recording.recordedBy}${recording.year ? ` · ${recording.year}` : ""}`}
      />

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

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="shrink-0 w-7 h-7 rounded-full bg-orange hover:opacity-80 flex items-center justify-center text-white transition-opacity"
        >
          {isPlaying ? (
            <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
              <rect x="0" y="0" width="3" height="11" rx="0.5" />
              <rect x="6" y="0" width="3" height="11" rx="0.5" />
            </svg>
          ) : (
            <svg width="9" height="11" viewBox="0 0 9 11" fill="currentColor" aria-hidden="true">
              <path d="M1 0.5 L8.5 5.5 L1 10.5 Z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={duration || 1}
          step={0.01}
          value={currentTime}
          onChange={handleSeek}
          aria-label="Seek"
          className="flex-1 h-[3px] rounded-full cursor-pointer"
          style={{ accentColor: "#C4481A" }}
        />

        <span className="text-[0.68rem] text-ink-mid tabular-nums shrink-0 min-w-[2.8rem] text-right">
          {duration > 0
            ? `${formatTime(currentTime)} / ${formatTime(duration)}`
            : formatTime(currentTime)}
        </span>
      </div>
    </div>
  );
}
