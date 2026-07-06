import type { ReactNode } from 'react'

interface IconProps {
  className?: string
  size?: number
}

function svg(path: ReactNode) {
  return ({ className, size = 20 }: IconProps) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  )
}

export const PlayIcon = svg(<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none" />)
export const PauseIcon = svg(
  <>
    <rect x="6" y="4" width="4" height="16" fill="currentColor" stroke="none" />
    <rect x="14" y="4" width="4" height="16" fill="currentColor" stroke="none" />
  </>,
)
export const NextIcon = svg(
  <>
    <polygon points="5 4 15 12 5 20 5 4" fill="currentColor" stroke="none" />
    <rect x="17" y="4" width="2.5" height="16" fill="currentColor" stroke="none" />
  </>,
)
export const PrevIcon = svg(
  <>
    <polygon points="19 4 9 12 19 20 19 4" fill="currentColor" stroke="none" />
    <rect x="4.5" y="4" width="2.5" height="16" fill="currentColor" stroke="none" />
  </>,
)
export const ShuffleIcon = svg(
  <>
    <path d="M16 3h5v5" />
    <path d="M4 20 21 3" />
    <path d="M21 16v5h-5" />
    <path d="M15 15l6 6" />
    <path d="M4 4l5 5" />
  </>,
)
export const RepeatIcon = svg(
  <>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </>,
)
export const VolumeIcon = svg(
  <>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 6a9 9 0 0 1 0 12" />
  </>,
)
export const MuteIcon = svg(
  <>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </>,
)
export const SearchIcon = svg(
  <>
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </>,
)
export const BookIcon = svg(
  <>
    <path d="M4 4h9a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H4z" />
    <path d="M20 4h-4a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H20z" />
  </>,
)
export const SwordIcon = svg(
  <>
    <path d="M14.5 3.5 21 3l-.5 6.5-9 9-6 .5.5-6z" />
    <line x1="13" y1="11" x2="5" y2="19" />
    <line x1="16" y1="16" x2="20" y2="20" />
    <line x1="8" y1="8" x2="4" y2="4" />
  </>,
)
export const MusicIcon = svg(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" fill="currentColor" stroke="none" />
    <circle cx="18" cy="16" r="3" fill="currentColor" stroke="none" />
  </>,
)
export const XIcon = svg(
  <>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </>,
)
