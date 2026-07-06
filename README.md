# The Hunters A.D. 1492 — Companion

An unofficial fan companion app for the cooperative campaign board game **The Hunters A.D. 1492**.

- 🔎 **Searchable rules glossary** — all 103 terms from the Rules Compendium, filterable by category (combat, traits, actions, equipment, terrain, general).
- ⚔️ **Combat & Foes reference** — every keyword trait, the core combat rules, and the full enemy roster grouped by type.
- 🎵 **Embedded music player** — drop your own atmospheric tracks in and set the mood at the table.
- 📲 **Installable PWA** — works fully offline once loaded.

## Tech

React + TypeScript + Vite 8 · Tailwind CSS v4 (PostCSS) · Zustand · React Router (hash) · Howler.js

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## Adding music 🎵

Drop audio files (`.mp3` / `.ogg` / `.m4a` / `.wav`) into **`src/audio/`**. They are
auto-discovered — no code changes needed. Optional naming niceties:

- `01 - Tavern Rest.mp3` → track number stripped, titled **Tavern Rest**
- `Deep Woods__ambient.mp3` → title **Deep Woods**, mood tag **ambient**

The dev server hot-reloads; for a production/offline build re-run `npm run build`.

## Installing as an app (offline)

Build and serve (`npm run build` then `npm run preview`, or host `dist/`), then use the
browser's **Install** action. The service worker caches the app shell and assets, so it
works without a connection during game night.

## Data & scope notes

- Glossary text is extracted from the game's official **Rules Compendium (EN)** and belongs
  to its publisher. This is a fan tool — for a first game, use the printed *How To Play* rulebook.
- The compendium lists enemy miniatures but **not** their stat lines (attributes/defenses are
  printed on the physical enemy cards). The Bestiary therefore shows the roster + flavor; add a
  `stats` field in `src/data/enemies.ts` if you transcribe the cards.
- Glossary data lives in `src/data/glossary.json` — edit freely.

## Project layout

```
src/
  data/        glossary.json (rules), glossary.ts, enemies.ts, tracks.ts
  audio/       ← put your music here (auto-discovered)
  store/       audio.ts (Zustand + Howler player state)
  components/  Layout, MusicPlayer, Icons
  pages/       HomePage, GlossaryPage, CombatPage
public/        manifest.webmanifest, sw.js, icon.svg
```
