import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { resolveTerm, shortDef } from '../data/terms'
import { categoryMeta } from '../data/glossary'

interface TermTipProps {
  /** A term id or an alias (e.g. "HP", "Parting Leap"). */
  term: string
  children: ReactNode
  className?: string
}

/**
 * Inline term with a dotted underline. Hovering (desktop) or tapping (touch)
 * reveals a small popover with a plain-language definition and a link into the
 * full glossary entry. Falls back to plain text if the term can't be resolved.
 */
export default function TermTip({ term, children, className = '' }: TermTipProps) {
  const entry = resolveTerm(term)
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState<{ top: number; left: number; above: boolean }>({
    top: 0,
    left: 0,
    above: false,
  })
  const triggerRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const closeTimer = useRef<number>(0)

  const place = () => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const W = Math.min(320, window.innerWidth - 24)
    let left = r.left + r.width / 2 - W / 2
    left = Math.max(12, Math.min(left, window.innerWidth - W - 12))
    const above = r.bottom + 200 > window.innerHeight && r.top > 220
    const top = above ? r.top - 8 : r.bottom + 8
    setCoords({ top, left, above })
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
    const onScroll = () => setOpen(false)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', onScroll, true)
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', onScroll, true)
      window.removeEventListener('resize', onScroll)
    }
  }, [open])

  if (!entry) return <>{children}</>

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(false), 140)
  }
  const meta = categoryMeta[entry.category]

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
        className={`cursor-help border-b border-dotted border-gold/60 text-inherit decoration-gold/60 underline-offset-2 transition-colors hover:border-gold hover:text-gold-bright focus:outline-none focus-visible:text-gold-bright ${className}`}
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
              width: Math.min(320, window.innerWidth - 24),
              transform: coords.above ? 'translateY(-100%)' : undefined,
            }}
            className="z-[70] rounded-lg border border-border-rune bg-panel-raised p-3 shadow-xl shadow-black/60"
          >
            <div className="mb-1 flex items-baseline justify-between gap-2">
              <span className="font-display text-sm text-gold-bright">{entry.term}</span>
              <span className={`shrink-0 text-[10px] uppercase tracking-wider ${meta.accent}`}>
                {meta.label}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-parchment-dim">{shortDef(entry)}</p>
            {entry.inGlossary && (
              <Link
                to={`/glossary?term=${entry.id}`}
                onClick={() => setOpen(false)}
                className="mt-2 inline-block text-xs font-display tracking-wide text-gold hover:text-gold-bright"
              >
                Open in glossary →
              </Link>
            )}
          </div>,
          document.body,
        )}
    </>
  )
}
