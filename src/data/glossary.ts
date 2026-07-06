import type { Glossary, GlossaryCategory, GlossaryTerm } from '../types'
import data from './glossary.json'

export const glossary = data as unknown as Glossary
export const terms: GlossaryTerm[] = glossary.terms

export const categoryMeta: Record<
  GlossaryCategory,
  { label: string; blurb: string; accent: string }
> = {
  combat: { label: 'Combat', blurb: 'Attacks, defense & tests', accent: 'text-blood-bright' },
  traits: { label: 'Traits', blurb: 'Keyword abilities (p.21)', accent: 'text-gold-bright' },
  equipment: { label: 'Equipment', blurb: 'Weapons, armor & gear', accent: 'text-parchment' },
  terrain: { label: 'Terrain', blurb: 'Board & terrain features', accent: 'text-moss' },
  actions: { label: 'Actions', blurb: 'Actions, cards & activities', accent: 'text-iron-light' },
  general: { label: 'General', blurb: 'Campaign & core terms', accent: 'text-parchment-dim' },
}

export const categoryOrder: GlossaryCategory[] = [
  'combat',
  'traits',
  'actions',
  'equipment',
  'terrain',
  'general',
]

export function countByCategory(): Record<GlossaryCategory, number> {
  const out = {
    combat: 0,
    traits: 0,
    actions: 0,
    equipment: 0,
    terrain: 0,
    general: 0,
  } as Record<GlossaryCategory, number>
  for (const t of terms) out[t.category] = (out[t.category] || 0) + 1
  return out
}
