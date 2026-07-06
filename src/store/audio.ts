import { create } from 'zustand'
import { Howl } from 'howler'
import { tracks as allTracks } from '../data/tracks'
import type { Track } from '../types'

type RepeatMode = 'off' | 'all' | 'one'

interface AudioState {
  tracks: Track[]
  currentIndex: number | null
  isPlaying: boolean
  volume: number
  muted: boolean
  shuffle: boolean
  repeat: RepeatMode
  position: number
  duration: number

  current: () => Track | null
  playIndex: (i: number) => void
  toggle: () => void
  next: (auto?: boolean) => void
  prev: () => void
  seek: (t: number) => void
  setVolume: (v: number) => void
  toggleMute: () => void
  toggleShuffle: () => void
  cycleRepeat: () => void
  _tick: () => void
}

let howl: Howl | null = null
let raf = 0

function stopRaf() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}

export const useAudio = create<AudioState>((set, get) => {
  function load(index: number, autoplay: boolean) {
    const track = get().tracks[index]
    if (!track) return
    if (howl) {
      howl.stop()
      howl.unload()
      howl = null
    }
    stopRaf()
    howl = new Howl({
      src: [track.src],
      html5: true,
      volume: get().muted ? 0 : get().volume,
      onplay: () => {
        set({ isPlaying: true, duration: howl?.duration() || 0 })
        get()._tick()
      },
      onpause: () => set({ isPlaying: false }),
      onstop: () => set({ isPlaying: false, position: 0 }),
      onend: () => {
        const { repeat } = get()
        if (repeat === 'one') {
          howl?.seek(0)
          howl?.play()
        } else {
          get().next(true)
        }
      },
      onload: () => set({ duration: howl?.duration() || 0 }),
    })
    set({ currentIndex: index, position: 0 })
    if (autoplay) howl.play()
  }

  return {
    tracks: allTracks,
    currentIndex: null,
    isPlaying: false,
    volume: 0.7,
    muted: false,
    shuffle: false,
    repeat: 'all',
    position: 0,
    duration: 0,

    current: () => {
      const { tracks, currentIndex } = get()
      return currentIndex == null ? null : tracks[currentIndex] ?? null
    },

    playIndex: (i) => {
      if (i === get().currentIndex && howl) {
        get().toggle()
        return
      }
      load(i, true)
    },

    toggle: () => {
      if (!howl) {
        if (get().tracks.length) load(get().currentIndex ?? 0, true)
        return
      }
      if (get().isPlaying) howl.pause()
      else howl.play()
    },

    next: (auto = false) => {
      const { tracks, currentIndex, shuffle, repeat } = get()
      if (!tracks.length) return
      let i: number
      if (shuffle) {
        if (tracks.length === 1) i = 0
        else {
          do {
            i = Math.floor(Math.random() * tracks.length)
          } while (i === currentIndex)
        }
      } else {
        i = (currentIndex ?? -1) + 1
        if (i >= tracks.length) {
          if (auto && repeat === 'off') {
            set({ isPlaying: false })
            stopRaf()
            return
          }
          i = 0
        }
      }
      load(i, true)
    },

    prev: () => {
      const { tracks, currentIndex, position } = get()
      if (!tracks.length) return
      // restart current track if more than 3s in
      if (position > 3 && howl) {
        howl.seek(0)
        set({ position: 0 })
        return
      }
      let i = (currentIndex ?? 0) - 1
      if (i < 0) i = tracks.length - 1
      load(i, true)
    },

    seek: (t) => {
      if (howl) {
        howl.seek(t)
        set({ position: t })
      }
    },

    setVolume: (v) => {
      set({ volume: v, muted: false })
      howl?.volume(v)
    },

    toggleMute: () => {
      const muted = !get().muted
      set({ muted })
      howl?.volume(muted ? 0 : get().volume)
    },

    toggleShuffle: () => set({ shuffle: !get().shuffle }),

    cycleRepeat: () => {
      const order: RepeatMode[] = ['off', 'all', 'one']
      const next = order[(order.indexOf(get().repeat) + 1) % order.length]
      set({ repeat: next })
    },

    _tick: () => {
      stopRaf()
      const step = () => {
        if (howl && get().isPlaying) {
          set({ position: (howl.seek() as number) || 0 })
          raf = requestAnimationFrame(step)
        }
      }
      raf = requestAnimationFrame(step)
    },
  }
})
