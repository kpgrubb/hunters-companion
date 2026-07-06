import { howToPlay } from '../data/howToPlay'
import type { Block } from '../data/howToPlay'
import AutoGloss from '../components/AutoGloss'

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'p':
      return (
        <p className="text-[15px] leading-relaxed text-parchment-dim">
          <AutoGloss text={block.text} />
        </p>
      )
    case 'note':
      return (
        <p className="rounded-md border-l-2 border-gold/50 bg-panel/60 px-4 py-2.5 text-sm italic leading-relaxed text-parchment-dim">
          <AutoGloss text={block.text} />
        </p>
      )
    case 'list':
      return (
        <ul className="space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-2.5 text-[15px] leading-relaxed text-parchment-dim">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blood-bright" />
              <span>
                <AutoGloss text={it} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'steps':
      return (
        <ol className="space-y-2">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-parchment-dim">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-gold/40 font-display text-xs text-gold-bright">
                {i + 1}
              </span>
              <span className="pt-0.5">
                <AutoGloss text={it} />
              </span>
            </li>
          ))}
        </ol>
      )
  }
}

export default function HowToPlayPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-parchment sm:text-3xl">How to Play</h1>
        <p className="mt-1 text-sm text-parchment-dim">
          A quick walk-through of the core rules. Tap any underlined term for its full definition.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-8">
        {/* Table of contents */}
        <nav className="mb-6 lg:sticky lg:top-[76px] lg:mb-0 lg:self-start">
          <ul className="flex flex-wrap gap-1.5 lg:flex-col lg:gap-0.5">
            {howToPlay.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="block rounded px-2.5 py-1 text-sm text-parchment-dim transition hover:bg-white/5 hover:text-gold-bright"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        <div className="space-y-8">
          {howToPlay.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="mb-3 flex items-center gap-3 font-display text-xl text-parchment">
                <span className="text-shadow-deep">{s.title}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-border-rune to-transparent" />
              </h2>
              <div className="space-y-3">
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <p className="mt-10 text-xs italic leading-relaxed text-iron-light">
        Summarised from the game’s Rules Compendium for quick reference. For full detail and your
        first game, use the printed How To Play rulebook.
      </p>
    </div>
  )
}
