'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getEntryByDate } from '@/data/blog'
import Link from 'next/link'

// Reuse icon generation
const PALETTE = [
  '#8AD62B', '#12B88F', '#F6C21A', '#F26A9A',
  '#6E42C1', '#2F62C9', '#F28513', '#D8D8D8',
  '#111111', '#F3E4C2',
]

const DARK = '#050505'

function randomColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}

function generateCircleSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${center}" cy="${center}" r="${60 * scale}" fill="${base}" />
      ${[0, 1, 2, 3]
        .map((i) => {
          const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2
          const radius = 52 * scale
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}
      <circle cx="${center}" cy="${center}" r="${36 * scale}" fill="${DARK}" />
      <circle cx="${center}" cy="${center}" r="${22 * scale}" fill="${accent}" />
      <circle cx="${center}" cy="${center}" r="${14 * scale}" fill="${DARK}" />
    </svg>
  `
}

function generateRandomIcon(size: number): string {
  const base = randomColor()
  const accent = randomColor()
  return generateCircleSpeaker(size, base, accent)
}

const MONTH_POSITIONS = [
  { x: '8%', y: '18%', size: 60 },
  { x: '92%', y: '18%', size: 60 },
  { x: '12%', y: '82%', size: 60 },
  { x: '88%', y: '82%', size: 60 },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function EntryPage() {
  const params = useParams()
  const router = useRouter()
  const day = params.day as string // e.g., "2025-01-15"
  const month = params.month as string // e.g., "2025-01"

  const entry = getEntryByDate(day)

  const [backgroundMonths, setBackgroundMonths] = useState<any[]>([])

  const generateBackgroundMonths = () => {
    const shuffledPositions = shuffleArray(MONTH_POSITIONS)
    const months = shuffledPositions.slice(0, 4).map((pos, i) => ({
      svg: generateRandomIcon(pos.size),
      x: pos.x,
      y: pos.y,
      size: pos.size,
      key: `bg-${i}-${Date.now()}`
    }))
    setBackgroundMonths(months)
  }

  useEffect(() => {
    generateBackgroundMonths()
  }, [])

  if (!entry) {
    return (
      <div className="min-h-screen pt-20 relative overflow-hidden">
        {/* Background floating months */}
        <div className="fixed inset-0 z-0 opacity-30">
          {backgroundMonths.map((m, i) => (
            <div
              key={m.key}
              className="absolute animate-float"
              style={{
                left: m.x,
                top: m.y,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${7 + (i % 3)}s`,
              }}
              dangerouslySetInnerHTML={{ __html: m.svg }}
            />
          ))}
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-sm font-mono text-muted mb-4">Entry not found</p>
            <Link
              href={`/blog/${month}`}
              className="text-xs font-mono text-foreground hover:text-muted transition-colors"
            >
              ← back to month
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const date = new Date(entry.date)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen pt-20 pb-24 relative overflow-hidden">
      {/* Background floating months */}
      <div className="fixed inset-0 z-0 opacity-30">
        {backgroundMonths.map((m, i) => (
          <div
            key={m.key}
            className="absolute animate-float"
            style={{
              left: m.x,
              top: m.y,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${7 + (i % 3)}s`,
            }}
            dangerouslySetInnerHTML={{ __html: m.svg }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href={`/blog/${month}`}
          className="text-xs font-mono text-muted hover:text-foreground transition-colors mb-8 inline-block"
        >
          ← back to month
        </Link>

        {/* Entry header */}
        <div className="mb-12">
          <p className="text-xs font-mono text-muted mb-3">{formattedDate}</p>
          <h1 className="text-3xl md:text-4xl font-medium text-foreground mb-6">
            {entry.title}
          </h1>
          {entry.tags && entry.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono text-foreground bg-foreground/5 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Entry content */}
        <div className="prose prose-invert max-w-none">
          <div className="text-foreground leading-relaxed whitespace-pre-wrap">
            {entry.content}
          </div>
        </div>
      </div>
    </div>
  )
}
