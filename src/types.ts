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

export interface Enemy {
  id: string
  name: string
  group: EnemyGroup
  count: number
  note: string
}

export interface Track {
  id: string
  title: string
  /** File placed in /public/audio — value is the URL path, e.g. "/audio/tavern.mp3" */
  src: string
  mood?: string
}
