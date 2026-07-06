export type GlossaryCategory =
  | 'combat'
  | 'traits'
  | 'equipment'
  | 'terrain'
  | 'actions'
  | 'general'

export interface GlossaryTerm {
  id: string
  term: string
  category: GlossaryCategory
  definition: string
}

export interface Glossary {
  meta: { source: string; termCount: number }
  terms: GlossaryTerm[]
}

export type EnemyGroup = 'human' | 'beast' | 'supernatural' | 'insectoid'

export type AttackType = 'melee' | 'ranged' | 'magic'

/** Attributes as printed on the enemy card. null = the icon is absent on the card. */
export interface EnemyStats {
  health: number
  perception: number | null
  strength: number | null
  agility: number | null
  knowledge: number | null
}

export interface EnemyAttack {
  type: AttackType
  /** "Attack x" — the to-hit target; each die ≤ x is a hit (lower is better). */
  attackValue: number
  /** Number of attack dice rolled. */
  dice: number
  note?: string
}

export interface EnemyAbility {
  name: string
  text: string
  /** True if the ability only triggers when named on a drawn enemy Action Card. */
  activated?: boolean
}

export interface Enemy {
  id: string
  name: string
  group: EnemyGroup
  count: number
  note: string
  /** Enemy Action Card reference range printed under the name, e.g. "A18-20". */
  ref?: string
  stats?: EnemyStats
  attacks?: EnemyAttack[]
  abilities?: EnemyAbility[]
}

export interface Track {
  id: string
  title: string
  /** File placed in /public/audio — value is the URL path, e.g. "/audio/tavern.mp3" */
  src: string
  mood?: string
}
