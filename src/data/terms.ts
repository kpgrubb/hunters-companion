import type { GlossaryTerm, GlossaryCategory } from '../types'
import glossaryData from './glossary.json'

/**
 * Central term index that powers the in-app helper tooltips (TermTip / AutoGloss).
 *
 * It combines the full Rules Compendium glossary with a handful of supplementary
 * entries the compendium doesn't list as their own terms (the four attributes,
 * "Attack value", "dice", etc.) and an alias table so labels like "HP" or phrases
 * like "Parting Leap" resolve to the right definition.
 */

export interface LookupTerm {
  id: string
  term: string
  definition: string
  category: GlossaryCategory
  /** true if it has a full entry on the Glossary page. */
  inGlossary: boolean
}

const glossaryTerms = (glossaryData as { terms: GlossaryTerm[] }).terms

// Concise, rules-grounded entries for things the glossary doesn't define on their own.
const extraTerms: Omit<LookupTerm, 'inGlossary'>[] = [
  {
    id: 'strength',
    term: 'Strength',
    category: 'combat',
    definition:
      'The attribute added to a melee attack’s strength (successes + Strength). Also used for Strength tests and unarmed combat.',
  },
  {
    id: 'agility',
    term: 'Agility',
    category: 'combat',
    definition:
      'The attribute added to a ranged attack’s strength (successes + Agility). Also used for Agility tests and to resist some effects.',
  },
  {
    id: 'perception',
    term: 'Perception',
    category: 'combat',
    definition:
      'The awareness attribute — governs Line of Sight, spotting hidden things, and Perception tests. A hero’s Perception also lowers a Wraith’s defense when attacking it.',
  },
  {
    id: 'knowledge',
    term: 'Knowledge',
    category: 'combat',
    definition:
      'The attribute added to a magic attack’s strength (successes + Knowledge). Powers spells and Knowledge tests.',
  },
  {
    id: 'attack-value',
    term: 'Attack value ("Attack x")',
    category: 'combat',
    definition:
      'The to-hit target. Each attack die that rolls equal to or below x counts as a hit (a success); lower is better. Golden Rule: a 1 always hits, a 6 always misses.',
  },
  {
    id: 'attack-dice',
    term: 'Attack dice',
    category: 'combat',
    definition:
      'How many dice are rolled to hit (listed on the enemy card or weapon). Count the hits, add the attacker’s attribute (Strength / Agility / Knowledge), then subtract the target’s defense — the remainder is the damage dealt.',
  },
  {
    id: 'penalty-attack',
    term: 'Penalty Attack',
    category: 'combat',
    definition:
      'When a hero makes a Parting Leap to disengage, the engaged enemy with the highest Strength may immediately make a free Melee Attack 3 — unless the heroes’ side outnumbers the enemies on that space.',
  },
  {
    id: 'damage',
    term: 'Damage',
    category: 'combat',
    definition:
      'Reduces Health. An enemy reduced to 0 Health is removed from the board; a hero reduced to 0 Health falls unconscious.',
  },
]

const byId = new Map<string, LookupTerm>()
for (const t of glossaryTerms) byId.set(t.id, { ...t, inGlossary: true })
for (const t of extraTerms) if (!byId.has(t.id)) byId.set(t.id, { ...t, inGlossary: false })

/**
 * Alias → term id. Keys are lowercased. Used both for explicit <TermTip term="…">
 * lookups (e.g. the "HP" / "PER" stat labels) and for the AutoGloss prose linker.
 */
const ALIASES: Record<string, string> = {
  // stat labels
  hp: 'health',
  health: 'health',
  unconscious: 'health',
  per: 'perception',
  perception: 'perception',
  str: 'strength',
  strength: 'strength',
  agi: 'agility',
  agility: 'agility',
  kno: 'knowledge',
  knowledge: 'knowledge',
  // attacks
  melee: 'melee-attack-enemy',
  'melee attack': 'melee-attack-enemy',
  ranged: 'ranged-attack-enemy',
  'ranged attack': 'ranged-attack-enemy',
  magic: 'magic-attack-enemy',
  'magic attack': 'magic-attack-enemy',
  spell: 'magic-attack-hero',
  spells: 'magic-attack-hero',
  attack: 'attack-value',
  dice: 'attack-dice',
  die: 'attack-dice',
  // movement & positioning
  move: 'move-hero',
  'parting leap': 'parting-leaps-enemies',
  'parting leaps': 'parting-leaps-enemies',
  'penalty attack': 'penalty-attack',
  engaged: 'engagement',
  engagement: 'engagement',
  'line of sight': 'line-of-sight',
  los: 'line-of-sight',
  cover: 'cover',
  'vantage point': 'vantage-point',
  'difficult terrain': 'difficult-terrain',
  // actions
  action: 'action',
  'action card': 'action-card',
  'action cards': 'action-card',
  'basic action': 'basic-action',
  'free action': 'free-action',
  interact: 'interact',
  reaction: 'reaction',
  reactions: 'reaction',
  round: 'round',
  'golden rule': 'golden-rule',
  // traits
  stun: 'stun',
  mighty: 'mighty',
  immobilize: 'immobilize',
  pierce: 'pierce',
  push: 'push',
  burn: 'burn',
  poison: 'poison',
  area: 'area',
  light: 'light',
  reload: 'reload',
  // equipment & defense
  helmet: 'helmet',
  armor: 'armor',
  shield: 'shield',
  weapon: 'weapon',
  rune: 'runes',
  runes: 'runes',
  defense: 'defense',
  'defense token': 'defense-tokens',
  'defense tokens': 'defense-tokens',
  // misc
  damage: 'damage',
  morale: 'morale',
  ally: 'ally',
  allies: 'ally',
  wagon: 'wagon',
  settlement: 'settlement',
  resources: 'resources',
  experience: 'hero-development',
  'experience points': 'hero-development',
}

export function resolveTerm(key: string): LookupTerm | null {
  const k = key.trim().toLowerCase()
  if (byId.has(key)) return byId.get(key)!
  const id = ALIASES[k]
  if (id && byId.has(id)) return byId.get(id)!
  return byId.get(k) ?? null
}

/** First paragraph of a definition, trimmed to a tooltip-friendly length. */
export function shortDef(t: LookupTerm, max = 260): string {
  const first = t.definition.split('\n\n')[0].trim()
  if (first.length <= max) return first
  const cut = first.slice(0, max)
  const lastStop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '))
  return (lastStop > max * 0.5 ? cut.slice(0, lastStop + 1) : cut.trimEnd()) + ' …'
}

/**
 * Phrases the AutoGloss linker will detect in prose. Curated to avoid noisy or
 * ambiguous matches (bare stat abbreviations like "per"/"str" are intentionally
 * excluded — those are only used as explicit labels).
 */
const AUTO_GLOSS_KEYS = [
  'melee attack',
  'ranged attack',
  'magic attack',
  'parting leap',
  'parting leaps',
  'penalty attack',
  'action card',
  'action cards',
  'basic action',
  'free action',
  'golden rule',
  'line of sight',
  'difficult terrain',
  'vantage point',
  'defense tokens',
  'defense token',
  'experience points',
  'engagement',
  'engaged',
  'interact',
  'reaction',
  'reactions',
  'move',
  'cover',
  'stun',
  'mighty',
  'immobilize',
  'pierce',
  'push',
  'burn',
  'poison',
  'reload',
  'helmet',
  'armor',
  'shield',
  'weapon',
  'runes',
  'defense',
  'damage',
  'morale',
  'spell',
  'spells',
  'ally',
  'allies',
  'wagon',
  'resources',
  'unconscious',
  'strength',
  'agility',
  'perception',
  'knowledge',
]

/** Phrases sorted longest-first so multi-word matches win over their substrings. */
export const autoGlossPhrases = [...AUTO_GLOSS_KEYS].sort((a, b) => b.length - a.length)

export function phraseToId(phrase: string): string | null {
  return ALIASES[phrase.toLowerCase()] ?? null
}
