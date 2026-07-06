import type { Track } from '../types'

/**
 * Auto-discovered music.
 *
 * Drop audio files (.mp3 / .ogg / .m4a / .wav) into  src/audio/  and they
 * appear in the player automatically — no need to edit this file.
 *
 * Optional: name files with a "NN - Title" or "Title__mood" convention:
 *   "01 - Tavern Rest.mp3"        -> title "Tavern Rest"
 *   "Deep Woods__ambient.mp3"     -> title "Deep Woods", mood "ambient"
 */
const modules = import.meta.glob('../audio/*.{mp3,ogg,m4a,wav,MP3,OGG,M4A,WAV}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function titleCase(s: string): string {
  return s
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function parse(path: string, url: string): Track {
  const file = path.split('/').pop() || path
  const base = file.replace(/\.[^.]+$/, '')
  // strip a leading track number like "01 - " or "01. " or "01_"
  const noNum = base.replace(/^\s*\d{1,3}\s*[-._)]\s*/, '')
  const [namePart, moodPart] = noNum.split('__')
  return {
    id: base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    title: titleCase(namePart) || file,
    src: url,
    mood: moodPart ? titleCase(moodPart) : undefined,
  }
}

export const tracks: Track[] = Object.entries(modules)
  .map(([path, url]) => parse(path, url))
  .sort((a, b) => a.title.localeCompare(b.title))
