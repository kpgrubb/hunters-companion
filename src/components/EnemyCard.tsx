import { useState } from 'react'
import type { Enemy, AttackType } from '../types'
import TermTip from './TermTip'
import AutoGloss from './AutoGloss'

const attackTermId: Record<AttackType, string> = {
  melee: 'melee-attack-enemy',
  ranged: 'ranged-attack-enemy',
  magic: 'magic-attack-enemy',
}

const attackStyle: Record<AttackType, { label: string; dot: string; text: string }> = {
  melee: { label: 'Melee', dot: 'bg-blood-bright', text: 'text-blood-bright' },
  ranged: { label: 'Ranged', dot: 'bg-sky-500', text: 'text-sky-400' },
  magic: { label: 'Magic', dot: 'bg-purple-500', text: 'text-purple-400' },
}

const groupAccent: Record<Enemy['group'], string> = {
  human: 'border-l-iron-light',
  beast: 'border-l-moss',
  supernatural: 'border-l-blood',
  insectoid: 'border-l-gold',
}

function Attr({ label, value, term }: { label: string; value: number | null; term: string }) {
  if (value == null) return null
  return (
    <div className="flex flex-col items-center rounded bg-black/30 px-2 py-1">
      <TermTip term={term} className="text-[10px] uppercase tracking-wider text-parchment-dim">
        {label}
      </TermTip>
      <span className="font-display text-base leading-none text-parchment">{value}</span>
    </div>
  )
}

export default function EnemyCard({ enemy }: { enemy: Enemy }) {
  const [open, setOpen] = useState(false)
  const s = enemy.stats
  const hasAbilities = (enemy.abilities?.length ?? 0) > 0

  return (
    <article className={`rune-card rounded-lg border-l-4 p-4 ${groupAccent[enemy.group]}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-lg leading-tight text-parchment">{enemy.name}</h3>
          <p className="text-xs italic text-parchment-dim">{enemy.note}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="rounded bg-black/40 px-1.5 py-0.5 text-xs font-bold text-gold">
            {enemy.count}×
          </span>
          {enemy.ref && (
            <span className="text-[10px] tracking-wider text-iron-light">{enemy.ref}</span>
          )}
        </div>
      </div>

      {s && (
        <>
          {/* Stats */}
          <div className="mt-3 flex flex-wrap items-stretch gap-1.5">
            <div className="flex flex-col items-center rounded bg-blood/25 px-2 py-1">
              <TermTip term="health" className="text-[10px] uppercase tracking-wider text-parchment-dim">
                HP
              </TermTip>
              <span className="font-display text-base leading-none text-blood-bright">
                {s.health}
              </span>
            </div>
            <Attr label="Per" value={s.perception} term="perception" />
            <Attr label="Str" value={s.strength} term="strength" />
            <Attr label="Agi" value={s.agility} term="agility" />
            <Attr label="Kno" value={s.knowledge} term="knowledge" />
          </div>

          {/* Attacks */}
          {enemy.attacks && enemy.attacks.length > 0 && (
            <div className="mt-2.5 space-y-1">
              {enemy.attacks.map((a, i) => {
                const st = attackStyle[a.type]
                return (
                  <div key={i} className="flex flex-wrap items-center gap-x-2 text-sm">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${st.dot}`} />
                    <TermTip term={attackTermId[a.type]} className={`w-16 shrink-0 font-display ${st.text}`}>
                      {st.label}
                    </TermTip>
                    <span className="text-parchment-dim">
                      <TermTip term="attack-value">Attack</TermTip>{' '}
                      <span className="text-parchment">{a.attackValue}</span> ·{' '}
                      <span className="text-parchment">{a.dice}</span>{' '}
                      <TermTip term="attack-dice">dice</TermTip>
                    </span>
                    {a.note && (
                      <span className="text-xs italic text-iron-light">
                        — <AutoGloss text={a.note} />
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}

      {/* Abilities (collapsible) */}
      {hasAbilities && (
        <div className="mt-3 border-t border-border-rune pt-2">
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex w-full items-center justify-between text-left text-xs font-display uppercase tracking-wider text-gold-bright"
          >
            <span>
              {enemy.abilities!.length} Special{' '}
              {enemy.abilities!.length === 1 ? 'Ability' : 'Abilities'}
            </span>
            <span className="text-parchment-dim">{open ? '−' : '+'}</span>
          </button>
          {open && (
            <dl className="mt-2 space-y-2">
              {enemy.abilities!.map((ab) => (
                <div key={ab.name}>
                  <dt className="text-sm font-semibold text-parchment">
                    {ab.name}
                    {ab.activated && (
                      <span className="ml-1.5 rounded bg-gold/15 px-1 text-[10px] font-normal uppercase tracking-wide text-gold">
                        action card
                      </span>
                    )}
                  </dt>
                  <dd className="text-sm leading-relaxed text-parchment-dim">
                    <AutoGloss text={ab.text} />
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      )}
    </article>
  )
}
