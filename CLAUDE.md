# Eisenmann Minhagim

A website preserving the customs (minhagim) of the Eisenmann family — Yekke Jews from the Netherlands and the German-Jewish tradition. The family is scattered globally; this site is their shared reference for how we pray, what we sing, and how we mark the moments of Jewish life.

**Live site:** https://eisenmann-minhagim.com  
**Repo:** https://github.com/moishi-droid/eisenmann-minhagim  
**Vercel project:** moishi-droids-projects/eisenmann-minhagim  
**Terminal shortcut:** type `minhagim` in any terminal to open Claude in this project

---

## Project status

- [x] Site live at eisenmann-minhagim.com
- [x] All 12 holidays + 4 lifecycle events scaffolded (empty, ready for content)
- [x] English, Hebrew (RTL), Dutch language support
- [x] Audio playback + download
- [ ] Content: customs and audio recordings (added over time via content pipeline)
- [ ] Phase 6: Translate UI strings to Hebrew and Dutch (strings in `messages/` are ready)

---

## Stack

- **Next.js 16** (App Router) · TypeScript · Tailwind CSS v4
- **Fonts:** Libre Baskerville (serif, headings) + Inter (sans, body) via `next/font/google`
- **Routing:** `app/[lang]/` dynamic segment · `proxy.ts` for locale detection/redirect
- **Content:** JSON files in `content/holidays/` and `content/lifecycle/`
- **Audio:** Static files in `public/audio/`, served by Vercel CDN
- **i18n:** Native Next.js dictionary pattern — `messages/en.json`, `messages/he.json`, `messages/nl.json`
- **Hosting:** Vercel (auto-deploys on push to `main`) · Domain: eisenmann-minhagim.com

---

## File structure

```
eisenmann-minhagim/
├── app/
│   ├── [lang]/
│   │   ├── layout.tsx          # locale layout: fonts, html lang/dir, nav, footer
│   │   ├── page.tsx            # home page: hero + holiday/lifecycle grids
│   │   └── [slug]/
│   │       └── page.tsx        # detail page: entry header + customs list
│   ├── globals.css             # Tailwind v4 @theme: color palette + font vars
│   ├── layout.tsx              # minimal root layout (just passes children)
│   └── page.tsx                # root redirect → /en
├── components/
│   ├── Nav.tsx                 # top nav: brand + language switcher (client)
│   └── AudioPlayer.tsx         # audio playback + download (client)
├── content/
│   ├── holidays/               # one JSON file per holiday
│   │   ├── shabbat.json
│   │   ├── rosh-hashana.json
│   │   ├── yom-kippur.json
│   │   ├── sukkot.json
│   │   ├── shemini-atzeret.json
│   │   ├── chanukah.json
│   │   ├── purim.json
│   │   ├── pesach.json
│   │   ├── sefirat-haomer.json
│   │   ├── shavuot.json
│   │   ├── tisha-bav.json
│   │   └── rosh-chodesh.json
│   └── lifecycle/              # one JSON file per lifecycle event
│       ├── birth.json
│       ├── bar-bat-mitzvah.json
│       ├── wedding.json
│       └── mourning.json
├── lib/
│   ├── content.ts              # loadDir(), getHolidays(), getEntry(), etc.
│   └── dictionaries.ts         # getDictionary(), hasLocale(), Locale type
├── messages/
│   ├── en.json                 # English UI strings (complete)
│   ├── he.json                 # Hebrew UI strings (complete)
│   └── nl.json                 # Dutch UI strings (complete)
├── public/
│   └── audio/                  # audio recordings go here (mp3/m4a/wav)
├── proxy.ts                    # Next.js 16 locale detection (= middleware)
├── design-concepts/            # HTML mockups from design phase (ignore)
└── CLAUDE.md                   # this file
```

---

## Content pipeline — how to add new material

This is the core workflow for building up the site over time.

### Step 1 — Record a family member

Record a voice note (iPhone Voice Memos is fine) of a family member:
- Describing a custom ("on Pesach we always...")
- Singing a tune (Kol Nidrei, a Shabbat zemer, etc.)

### Step 2 — Feed it to Claude

Open this project (`minhagim` in terminal) and send Claude the voice note or a transcript. Claude will:
- Transcribe the audio if needed
- Format the custom and add it to the correct JSON file
- Place audio files in `public/audio/` with a sensible filename

### Step 3 — Review and deploy

```bash
npm run dev          # preview at localhost:3000
git add .
git commit -m "add: [description of what was added]"
git push             # Vercel auto-deploys to eisenmann-minhagim.com
```

---

## Content schema

Every holiday and lifecycle JSON file has this shape:

```ts
type Entry = {
  id: string;               // e.g. "yom-kippur"
  slug: string;             // URL slug, e.g. "yom-kippur"
  category: "holiday" | "lifecycle";
  order: number;            // display order on home page
  name: {
    en: string;
    he: string;
    nl: string;
  };
  description: {
    en: string;
    he: string;
    nl: string;
  };
  customs: Custom[];        // empty array = graceful "no customs yet" state
};

type Custom = {
  id: string;               // unique within the entry, e.g. "kol-nidrei-tune"
  title: string;
  description: string;
  category?: "prayer" | "food" | "ritual" | "song" | "other";
  audio?: AudioRecording[];
};

type AudioRecording = {
  id: string;
  title: string;
  recordedBy: string;       // family member's name
  year?: number;
  file: string;             // filename only — file lives in /public/audio/
  description?: string;
};
```

### Example: adding a custom with audio to Yom Kippur

```json
{
  "id": "yom-kippur",
  "customs": [
    {
      "id": "kol-nidrei-tune",
      "title": "Kol Nidrei tune",
      "description": "The family uses the distinctive Yekke melody for Kol Nidrei, sung slower than the Ashkenazic norm, with a specific pause before the third repetition.",
      "category": "song",
      "audio": [
        {
          "id": "kol-nidrei-1987",
          "title": "Kol Nidrei",
          "recordedBy": "Grandfather Eisenmann",
          "year": 1987,
          "file": "kol-nidrei-1987.m4a"
        }
      ]
    }
  ]
}
```

---

## Languages

The site supports three locales via URL prefix:

| Locale | URL | Notes |
|--------|-----|-------|
| English | `/en/...` | Default, complete |
| Hebrew | `/he/...` | RTL (`dir="rtl"` on `<html>`), complete |
| Dutch | `/nl/...` | Complete |

UI strings are in `messages/{locale}.json`. Content (custom titles/descriptions) is stored per-locale in each JSON file — currently only English is populated. When ready to translate content, fill in the `he` and `nl` fields in each entry's JSON.

The language switcher in the nav swaps the locale prefix while keeping the current page path.

---

## Design

**Family Album** — warm Amsterdam modern.

- **Colors:** Cream `#FAF6EF`, Surface `#F2EBE0`, Ink `#2A1A08`, Orange `#C4481A`, Rule `#D8CBAF`
- **Fonts:** Libre Baskerville (headings, brand, card names) + Inter (body, labels)
- **Key patterns:**
  - Hero: centered, italic orange eyebrow, serif h1, dot-rule divider
  - Section headings: italic serif + horizontal rule (chapter style)
  - Cards: filled entries on cream+border, empty entries on warm surface
  - Detail page: dark ink header band, rounded card, back navigation

---

## Next.js 16 conventions (important)

- **`proxy.ts`** — Next.js 16 renamed `middleware.ts` to `proxy.ts`. The exported function is named `proxy`, not `middleware`. Do not rename or revert this.
- **Async params** — All route params are async: always `const { lang } = await params`, never destructure directly.
- **TypeScript helpers** — Use `PageProps<'/[lang]'>` and `LayoutProps<'/[lang]'>` for typed route params.
- **Docs** — If unsure about any Next.js 16 API, read `node_modules/next/dist/docs/` before writing code.

---

## Development commands

```bash
npm run dev      # dev server at localhost:3000
npm run build    # production build (run this to catch errors before pushing)
git push         # triggers auto-deploy to eisenmann-minhagim.com via Vercel
```
