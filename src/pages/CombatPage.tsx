import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { terms } from '../data/glossary'
import { enemies, enemyGroupLabels } from '../data/enemies'
import type { Enemy } from '../types'
import EnemyCard from '../components/EnemyCard'

export default function CombatPage() {
  const combatTerms = useMemo(
    () => terms.filter((t) => t.category === 'combat').sort((a, b) => a.term.localeCompare(b.term)),
    [],
  )
  const traitTerms = useMemo(
    () => terms.filter((t) => t.category === 'traits').sort((a, b) => a.term.localeCompare(b.term)),
    [],
  )

  const groups = useMemo(() => {
    const order: Enemy['group'][] = ['human', 'beast', 'supernatural', 'insectoid']
    return order
      .map((g) => ({ group: g, list: enemies.filter((e) => e.group === g) }))
      .filter((x) => x.list.length)
  }, [])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl text-parchment sm:text-3xl">Combat &amp; Foes</h1>
        <p className="mt-1 text-sm text-parchment-dim">
          Core combat rules, every keyword trait, and the enemy roster.
        </p>
      </div>

      {/* Traits — the quick-reference heart of combat */}
      <section>
        <SectionHeading>Combat Traits</SectionHeading>
        {traitTerms.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {traitTerms.map((t) => (
              <div key={t.id} className="rune-card rounded-lg p-4">
                <h3 className="font-display text-base text-gold-bright">{t.term}</h3>
                <p className="mt-1 text-sm leading-relaxed text-parchment-dim">{t.definition}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Combat rules */}
      <section>
        <SectionHeading>Combat Rules</SectionHeading>
        {combatTerms.length === 0 ? (
          <Empty />
        ) : (
          <div className="grid gap-3">
            {combatTerms.map((t) => (
              <div key={t.id} className="rune-card rounded-lg p-4">
                <h3 className="font-display text-base text-blood-bright">{t.term}</h3>
                {t.definition.split('\n\n').map((p, i) => (
                  <p key={i} className="mt-1.5 text-sm leading-relaxed text-parchment-dim first:mt-0">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bestiary */}
      <section>
        <SectionHeading>Bestiary</SectionHeading>
        <p className="mb-4 rounded-md border border-border-rune bg-panel/60 px-4 py-2.5 text-xs italic leading-relaxed text-parchment-dim">
          All {enemies.length} enemy cards, transcribed from the physical cards. Attack values are the
          “Attack x” to-hit target (each die ≤ x is a hit) plus the number of dice. Attributes read
          left→right as Perception · Strength · Agility · Knowledge. Tap a card to see its special
          abilities.
        </p>
        <div className="space-y-6">
          {groups.map(({ group, list }) => (
            <div key={group}>
              <h3 className="mb-2 font-display text-sm uppercase tracking-widest text-parchment">
                {enemyGroupLabels[group]}
              </h3>
              <div className="grid items-start gap-3 sm:grid-cols-2">
                {list.map((e) => (
                  <EnemyCard key={e.id} enemy={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-3 font-display text-lg tracking-wide text-parchment">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-border-rune" />
      <span className="text-shadow-deep">{children}</span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-border-rune" />
    </h2>
  )
}

function Empty() {
  return (
    <p className="rune-card rounded-lg p-6 text-center text-sm text-parchment-dim">
      No entries in this category yet.
    </p>
  )
}
