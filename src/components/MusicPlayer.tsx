import { useState } from 'react'
import { useAudio } from '../store/audio'
import {
  PlayIcon,
  PauseIcon,
  NextIcon,
  PrevIcon,
  ShuffleIcon,
  RepeatIcon,
  VolumeIcon,
  MuteIcon,
  MusicIcon,
  XIcon,
} from './Icons'

function fmt(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function MusicPlayer() {
  const [open, setOpen] = useState(false)
  const {
    tracks,
    currentIndex,
    isPlaying,
    position,
    duration,
    volume,
    muted,
    shuffle,
    repeat,
    playIndex,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeat,
  } = useAudio()

  const track = currentIndex == null ? null : tracks[currentIndex]
  const hasTracks = tracks.length > 0
  const iconBtn =
    'grid place-items-center rounded-md p-2 text-parchment-dim transition hover:text-gold-bright hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent'

  return (
    <>
      {/* Expandable playlist */}
      {open && (
        <div className="fixed bottom-[76px] right-3 z-40 w-[min(92vw,380px)] max-h-[55vh] overflow-hidden rounded-lg rune-card">
          <div className="flex items-center justify-between border-b border-border-rune px-4 py-2.5">
            <span className="font-display text-sm tracking-wider text-gold-bright">PLAYLIST</span>
            <button onClick={() => setOpen(false)} className={iconBtn} aria-label="Close playlist">
              <XIcon size={16} />
            </button>
          </div>
          <div className="max-h-[calc(55vh-44px)] overflow-y-auto py-1">
            {!hasTracks && (
              <p className="px-4 py-6 text-center text-sm leading-relaxed text-parchment-dim">
                No music yet. Drop audio files into
                <code className="mx-1 rounded bg-black/40 px-1.5 py-0.5 text-gold">src/audio/</code>
                and they’ll appear here.
              </p>
            )}
            {tracks.map((t, i) => {
              const active = i === currentIndex
              return (
                <button
                  key={t.id}
                  onClick={() => playIndex(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition hover:bg-white/5 ${
                    active ? 'bg-blood/20 text-gold-bright' : 'text-parchment'
                  }`}
                >
                  <span className="w-5 shrink-0 text-center text-xs text-parchment-dim">
                    {active && isPlaying ? '♪' : i + 1}
                  </span>
                  <span className="flex-1 truncate">
                    {t.title}
                    {t.mood && (
                      <span className="ml-2 text-xs italic text-parchment-dim">{t.mood}</span>
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Dock */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-rune bg-panel/95 backdrop-blur supports-[backdrop-filter]:bg-panel/80">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-3 py-2.5">
          {/* Now playing */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex min-w-0 flex-1 items-center gap-3 text-left"
            aria-label="Toggle playlist"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border-rune bg-black/40 text-gold">
              <MusicIcon size={18} className={isPlaying ? 'flicker' : ''} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm text-parchment">
                {track ? track.title : hasTracks ? 'Ready to play' : 'No tracks loaded'}
              </span>
              <span className="block truncate text-xs text-parchment-dim">
                {track?.mood ?? (hasTracks ? `${tracks.length} tracks` : 'add files to src/audio/')}
              </span>
            </span>
          </button>

          {/* Transport */}
          <div className="flex items-center gap-0.5">
            <button onClick={toggleShuffle} className={`${iconBtn} ${shuffle ? 'text-gold-bright' : ''}`} title="Shuffle" disabled={!hasTracks}>
              <ShuffleIcon size={17} />
            </button>
            <button onClick={prev} className={iconBtn} title="Previous" disabled={!hasTracks}>
              <PrevIcon size={18} />
            </button>
            <button
              onClick={toggle}
              className="grid h-11 w-11 place-items-center rounded-full bg-blood text-parchment shadow transition hover:bg-blood-bright disabled:opacity-30"
              title={isPlaying ? 'Pause' : 'Play'}
              disabled={!hasTracks}
            >
              {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
            </button>
            <button onClick={() => next(false)} className={iconBtn} title="Next" disabled={!hasTracks}>
              <NextIcon size={18} />
            </button>
            <button
              onClick={cycleRepeat}
              className={`${iconBtn} relative ${repeat !== 'off' ? 'text-gold-bright' : ''}`}
              title={`Repeat: ${repeat}`}
              disabled={!hasTracks}
            >
              <RepeatIcon size={17} />
              {repeat === 'one' && (
                <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold">1</span>
              )}
            </button>
          </div>

          {/* Volume (hidden on small screens) */}
          <div className="hidden items-center gap-2 sm:flex">
            <button onClick={toggleMute} className={iconBtn} title="Mute">
              {muted || volume === 0 ? <MuteIcon size={18} /> : <VolumeIcon size={18} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="h-1 w-20 cursor-pointer accent-blood-bright"
              aria-label="Volume"
            />
          </div>
        </div>

        {/* Seek bar */}
        <div className="flex items-center gap-2 px-3 pb-2">
          <span className="w-9 text-right text-[11px] tabular-nums text-parchment-dim">
            {fmt(position)}
          </span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={position}
            onChange={(e) => seek(parseFloat(e.target.value))}
            className="h-1 flex-1 cursor-pointer accent-blood-bright disabled:opacity-40"
            disabled={!track}
            aria-label="Seek"
          />
          <span className="w-9 text-[11px] tabular-nums text-parchment-dim">{fmt(duration)}</span>
        </div>
      </div>
    </>
  )
}
