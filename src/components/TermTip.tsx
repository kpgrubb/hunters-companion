import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { resolveTerm } from '../data/terms'
import { categoryMeta } from '../data/glossary'

interface TermTipProps {
  /** A term id or an alias (e.g. "HP", "Parting Leap"). */
  term: string
  children: ReactNode
  className?: string
}

interface Coords {
  top: number
  left: number
  width: number
  maxHeight: number
  above: boolean
}

/**
 * Inline term with a dotted underline. Hovering (desktop) or tapping (touch)
 * reveals a popover with the full glossary definition — sized to the available
 * space and scrollable if it's very long. Falls back to plain text if the term
 * can't be resolved.
 */
export default function TermTip({ term, children, className = '' }: TermTipProps) {
  const entry = resolveTerm(term)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<Coords>({ top: 0, left: 0, width: 340, maxHeight: 400, above: false })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>(0)

  const place = () => {
    const el = triggerRef.current
    if (!el) return
    const margin = 12
    const r = el.getBoundingClientRect()
    const width = Math.min(360, window.innerWidth - margin * 2)
    let left = r.left + r.width / 2 - width / 2
    left = Math.max(margin, Math.min(left, window.innerWidth - width - margin))

    const spaceBelow = window.innerHeight - r.bottom - margin - 8
    const spaceAbove = r.top - margin - 8
    const above = spaceAbove > spaceBelow
    // Fill the roomier side (up to 82% of the viewport) so as much shows as possible.
    const maxHeight = Math.min(Math.max(above ? spaceAbove : spaceBelow, 160), window.innerHeight * 0.82)
    const top = above ? r.top - 8 : r.bottom + 8
    setCoords({ top, left, width, maxHeight, above })
  }

  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || popRef.current?.contains(t)) return
      setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    // Keep the popover attached to the term while the page scrolls / resizes.
    const reposition = (e: Event) => {
      if (popRef.current && e.target instanceof Node && popRef.current.contains(e.target)) return
      place()
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', reposition, true)
    window.addEventListener('resize', reposition)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', reposition, true)
      window.removeEventListener('resize', reposition)
    }
  }, [open])

  if (!entry) return <>{children}</>

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), 160)
  }
  const meta = categoryMeta[entry.category]
  const paragraphs = entry.definition.split('\n\n')

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        onPointerEnter={() => {
          cancelClose()
          setOpen(true)
        }}
        onPointerLeave={scheduleClose}
        aria-expanded={open}
        className={`cursor-help border-b border-dotted border-gold/60 text-inherit underline-offset-2 transition-colors hover:border-gold hover:text-gold-bright focus:outline-none focus-visible:text-gold-bright ${className}`}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            ref={popRef}
            role="tooltip"
            onPointerEnter={cancelClose}
            onPointerLeave={scheduleClose}
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              width: coords.width,
              maxHeight: coords.maxHeight,
              transform: coords.above ? 'translateY(-100%)' : undefined,
            }}
            className="z-[70] flex flex-col overflow-hidden rounded-lg border border-border-rune bg-panel-raised shadow-xl shadow-black/60"
          >
            <div className="flex items-baseline justify-between gap-2 border-b border-border-rune px-3 py-2">
              <span className="font-display text-sm text-gold-bright">{entry.term}</span>
              <span className={`shrink-0 text-[10px] uppercase tracking-wider ${meta.accent}`}>
                {meta.label}
              </span>
            </div>
            <div className="overflow-y-auto px-3 py-2">
              {paragraphs.map((p, i) => (
                <p key={i} className="mt-2 text-[13px] leading-relaxed text-parchment-dim first:mt-0">
                  {p}
                </p>
              ))}
              {entry.inGlossary && (
                <Link
                  to={`/glossary?term=${entry.id}`}
                  onClick={() => setOpen(false)}
                  className="mt-2.5 inline-block text-xs font-display tracking-wide text-gold hover:text-gold-bright"
                >
                  Open in glossary →
                </Link>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}
