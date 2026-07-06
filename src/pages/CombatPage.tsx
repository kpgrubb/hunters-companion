import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { terms } from '../data/glossary'
import { enemies, enemyGroupLabels } from '../data/enemies'
import type { Enemy } from '../types'

const groupAccent: Record<Enemy['group'], string> = {
  human: 'border-l-iron-light',
  beast: 'border-l-moss',
  supernatural: 'border-l-blood',
  insectoid: 'border-l-gold',
}

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
          The Rules Compendium lists the enemy miniatures but not their stat lines — attributes and
          defenses live on the physical enemy cards. Counts below are the miniatures included in the
          box.
        </p>
        <div className="space-y-6">
          {groups.map(({ group, list }) => (
            <div key={group}>
              <h3 className="mb-2 font-display text-sm uppercase tracking-widest text-parchment">
                {enemyGroupLabels[group]}
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {list.map((e) => (
                  <div
                    key={e.id}
                    className={`rune-card flex items-start gap-3 rounded-lg border-l-4 p-3 ${groupAccent[e.group]}`}
                  >
                    <span className="mt-0.5 grid h-7 min-w-7 shrink-0 place-items-center rounded bg-black/40 px-1.5 text-xs font-bold text-gold">
                      {e.count}×
                    </span>
                    <div>
                      <p className="font-display text-[15px] text-parchment">{e.name}</p>
                      <p className="text-xs leading-relaxed text-parchment-dim">{e.note}</p>
                    </div>
                  </div>
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
