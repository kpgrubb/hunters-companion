import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'

const PASSWORD = 'DREAD'
const KEY = 'hunters-unlocked'

export default function Gate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(KEY) === '1') setUnlocked(true)
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim().toUpperCase() === PASSWORD) {
      sessionStorage.setItem(KEY, '1')
      setUnlocked(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  if (unlocked) return <>{children}</>

  return (
    <div className="grid min-h-full place-items-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm text-center">
        <p className="font-display text-sm tracking-[0.3em] text-blood-bright">ANNO DOMINI 1492</p>
        <h1 className="mt-2 font-display text-4xl text-parchment text-shadow-deep">The Hunters</h1>
        <p className="mt-3 text-sm text-parchment-dim">Speak the word to enter.</p>

        <div className="mt-6">
          <input
            autoFocus
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              setError(false)
            }}
            placeholder="Password"
            aria-label="Password"
            className={`w-full rounded-lg border bg-panel px-4 py-3 text-center tracking-widest text-parchment placeholder:text-iron-light focus:outline-none ${
              error ? 'border-blood-bright' : 'border-border-rune focus:border-gold/50'
            }`}
          />
          {error && <p className="mt-2 text-sm text-blood-bright flicker">The door stays shut.</p>}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-blood py-3 font-display tracking-wide text-parchment transition hover:bg-blood-bright"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
