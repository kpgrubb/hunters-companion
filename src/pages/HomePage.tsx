import { Link } from 'react-router-dom'
import { terms } from '../data/glossary'
import { enemies } from '../data/enemies'
import { BookIcon, SwordIcon } from '../components/Icons'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="font-display text-sm tracking-[0.3em] text-blood-bright">ANNO DOMINI 1492</p>
      <h1 className="mt-2 font-display text-4xl text-parchment text-shadow-deep sm:text-5xl">
        The Hunters
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-parchment-dim">
        A tabletop companion for your campaign — search every rule in the compendium, reference
        combat traits and the bestiary, and set the mood with your own atmospheric soundtrack.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          to="/glossary"
          className="rune-card group rounded-xl p-6 text-left transition hover:border-gold/50"
        >
          <BookIcon className="text-gold-bright" size={28} />
          <h2 className="mt-3 font-display text-xl text-parchment">Rules Glossary</h2>
          <p className="mt-1 text-sm text-parchment-dim">
            {terms.length} searchable terms — every rule, trait and keyword in alphabetical order.
          </p>
        </Link>
        <Link
          to="/combat"
          className="rune-card group rounded-xl p-6 text-left transition hover:border-blood/60"
        >
          <SwordIcon className="text-blood-bright" size={28} />
          <h2 className="mt-3 font-display text-xl text-parchment">Combat &amp; Foes</h2>
          <p className="mt-1 text-sm text-parchment-dim">
            Attack types, defense, all combat traits, and the {enemies.length}-strong enemy roster.
          </p>
        </Link>
      </div>

      <p className="mt-10 text-xs italic leading-relaxed text-iron-light">
        Unofficial fan companion. All rules text is sourced from the game’s Rules Compendium and
        belongs to its publisher. For your first game, use the printed <em>How To Play</em> rulebook.
      </p>
    </div>
  )
}
