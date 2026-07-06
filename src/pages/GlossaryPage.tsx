import { useMemo, useState } from 'react'
import { terms, categoryMeta, categoryOrder, countByCategory } from '../data/glossary'
import type { GlossaryCategory } from '../types'
import { SearchIcon, XIcon } from '../components/Icons'

type Filter = 'all' | GlossaryCategory

function highlight(text: string, q: string) {
  if (!q) return text
  const idx = text.toLowerCase().indexOf(q.toLowerCase())
  if (idx === -1) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-gold/30 text-gold-bright">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

export default function GlossaryPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const counts = useMemo(countByCategory, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return terms
      .filter((t) => (filter === 'all' ? true : t.category === filter))
      .filter((t) =>
        !q ? true : t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q),
      )
      .sort((a, b) => a.term.localeCompare(b.term))
  }, [query, filter])

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-parchment sm:text-3xl">Rules Glossary</h1>
        <p className="mt-1 text-sm text-parchment-dim">
          {terms.length} terms from the Rules Compendium, in alphabetical order.
        </p>
      </div>

      {/* Search */}
      <div className="sticky top-[68px] z-20 -mx-4 mb-4 bg-ink/85 px-4 py-3 backdrop-blur sm:top-[60px]">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-parchment-dim"
            size={18}
          />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rules, traits, keywords…"
            className="w-full rounded-lg border border-border-rune bg-panel py-2.5 pl-10 pr-10 text-parchment placeholder:text-iron-light focus:border-gold/50 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-parchment-dim hover:text-parchment"
              aria-label="Clear search"
            >
              <XIcon size={16} />
            </button>
          )}
        </div>

        {/* Category filter chips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')} label="All" count={terms.length} />
          {categoryOrder.map((c) => (
            <Chip
              key={c}
              active={filter === c}
              onClick={() => setFilter(c)}
              label={categoryMeta[c].label}
              count={counts[c]}
            />
          ))}
        </div>
      </div>

      {/* Results */}
      <p className="mb-3 text-xs uppercase tracking-wider text-iron-light">
        {results.length} {results.length === 1 ? 'entry' : 'entries'}
      </p>

      {results.length === 0 ? (
        <div className="rune-card rounded-lg p-8 text-center text-parchment-dim">
          No terms match “{query}”.
        </div>
      ) : (
        <div className="grid gap-3">
          {results.map((t) => {
            const meta = categoryMeta[t.category]
            return (
              <article key={t.id} className="rune-card rounded-lg p-4">
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <h2 className="font-display text-lg text-parchment">
                    {highlight(t.term, query)}
                  </h2>
                  <span className={`shrink-0 text-xs uppercase tracking-wider ${meta.accent}`}>
                    {meta.label}
                  </span>
                </div>
                {t.definition.split('\n\n').map((p, i) => (
                  <p key={i} className="mt-1.5 text-[15px] leading-relaxed text-parchment-dim first:mt-0">
                    {highlight(p, query)}
                  </p>
                ))}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Chip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  label: string
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-display tracking-wide transition ${
        active
          ? 'border-gold/60 bg-gold/15 text-gold-bright'
          : 'border-border-rune text-parchment-dim hover:border-iron-light hover:text-parchment'
      }`}
    >
      {label} <span className="opacity-60">{count}</span>
    </button>
  )
}
