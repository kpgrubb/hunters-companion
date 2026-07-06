import type { ReactNode } from 'react'
import TermTip from './TermTip'
import { autoGlossPhrases, phraseToId } from '../data/terms'

function escape(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

// One shared, case-insensitive matcher for every glossary phrase, longest-first.
const RE = new RegExp(`\\b(${autoGlossPhrases.map(escape).join('|')})\\b`, 'gi')

interface AutoGlossProps {
  text: string
  /** Don't link this term id (e.g. a glossary entry linking to itself). */
  excludeId?: string
  /** Link each distinct term at most once (default) to keep prose readable. */
  onceEach?: boolean
}

/**
 * Renders `text`, wrapping recognised rules terms in a <TermTip>. By default each
 * distinct term is linked only on its first occurrence within the block.
 */
export default function AutoGloss({ text, excludeId, onceEach = true }: AutoGlossProps) {
  const out: ReactNode[] = []
  const used = new Set<string>()
  let last = 0
  let m: RegExpExecArray | null
  RE.lastIndex = 0

  while ((m = RE.exec(text)) !== null) {
    const matched = m[0]
    const id = phraseToId(matched)
    const skip = !id || id === excludeId || (onceEach && used.has(id))

    if (!skip) {
      if (m.index > last) out.push(text.slice(last, m.index))
      out.push(
        <TermTip key={`${id}-${m.index}`} term={id!}>
          {matched}
        </TermTip>,
      )
      used.add(id!)
      last = m.index + matched.length
    }
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}
