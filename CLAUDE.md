# Eisenmann Minhagim

A website preserving the customs (minhagim) of the Eisenmann family — Yekke Jews from the Netherlands.

## Stack

- **Next.js 16** (App Router) · TypeScript · Tailwind CSS
- **Routing:** `app/[lang]/` with `proxy.ts` for locale detection
- **Content:** JSON files in `content/holidays/` and `content/lifecycle/`
- **Audio:** Files go in `public/audio/`
- **i18n:** Native Next.js dictionary pattern — `messages/en.json`, `messages/he.json`, `messages/nl.json`
- **Hosting:** Vercel · Domain: eisenmann-minhagim.com

## Key conventions

- **Adding a custom:** Edit the relevant JSON file in `content/`. Add an object to the `customs` array.
- **Adding audio:** Drop the file in `public/audio/`, then add an `audio` entry in the custom's JSON.
- **Adding a new holiday/lifecycle event:** Create a new JSON file in `content/holidays/` or `content/lifecycle/`.
- **`proxy.ts`** is the Next.js 16 equivalent of middleware — do not rename it to `middleware.ts`.
- All params are async in Next.js 16: always `await params` before destructuring.
- Use `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` TypeScript helpers for route typing.

## Content schema

```ts
type Custom = {
  id: string;
  title: string;
  description: string;
  category?: "prayer" | "food" | "ritual" | "song" | "other";
  audio?: AudioRecording[];
};

type AudioRecording = {
  id: string;
  title: string;
  recordedBy: string;
  year?: number;
  file: string;           // filename only, file lives in /public/audio/
  description?: string;
};
```

## Content pipeline (how to add new material)

1. User provides voice note or transcript
2. Claude transcribes / formats → adds to correct JSON file
3. `git add . && git commit -m "add: [description]"`
4. Vercel auto-deploys on push to main

## Languages

- English: `messages/en.json` (complete)
- Hebrew: `messages/he.json` (strings ready, RTL handled via `dir="rtl"`)
- Dutch: `messages/nl.json` (strings ready)

## Development

```bash
npm run dev   # starts on localhost:3000
```
