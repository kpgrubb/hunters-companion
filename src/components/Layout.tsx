import { NavLink, Outlet } from 'react-router-dom'
import MusicPlayer from './MusicPlayer'
import { BookIcon, SwordIcon } from './Icons'

const navItems = [
  { to: '/glossary', label: 'Rules Glossary', Icon: BookIcon },
  { to: '/combat', label: 'Combat & Foes', Icon: SwordIcon },
]

export default function Layout() {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-30 border-b border-border-rune bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <NavLink to="/" className="group flex items-baseline gap-2">
            <span className="font-display text-xl text-parchment text-shadow-deep sm:text-2xl">
              THE HUNTERS
            </span>
            <span className="font-display text-sm text-blood-bright">A.D. 1492</span>
          </NavLink>
          <nav className="flex gap-1">
            {navItems.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-display tracking-wide transition ${
                    isActive
                      ? 'bg-blood/25 text-gold-bright'
                      : 'text-parchment-dim hover:bg-white/5 hover:text-parchment'
                  }`
                }
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-40 pt-6">
        <Outlet />
      </main>

      <MusicPlayer />
    </div>
  )
}
