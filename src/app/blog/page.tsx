'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Reuse icon generation from SpeakerIconLayer
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

interface MonthData {
  year: number
  month: number
  label: string
  slug: string
  svg: string
  x: string
  y: string
  size: number
}

const MONTH_NAMES = [
  'jan', 'feb', 'mar', 'apr', 'may', 'jun',
  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'
]

// Position pool for floating months
const MONTH_POSITIONS = [
  { x: '12%', y: '20%', size: 80 },
  { x: '25%', y: '35%', size: 75 },
  { x: '38%', y: '25%', size: 85 },
  { x: '50%', y: '45%', size: 70 },
  { x: '62%', y: '30%', size: 80 },
  { x: '75%', y: '40%', size: 75 },
  { x: '15%', y: '60%', size: 85 },
  { x: '28%', y: '70%', size: 70 },
  { x: '45%', y: '65%', size: 80 },
  { x: '60%', y: '75%', size: 75 },
  { x: '80%', y: '65%', size: 85 },
  { x: '88%', y: '25%', size: 70 },
]

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function BlogPage() {
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  const [months, setMonths] = useState<MonthData[]>([])

  const generateMonths = () => {
    const monthData: MonthData[] = []
    for (let i = 0; i < 12; i++) {
      const month = i + 1
      const label = MONTH_NAMES[i]
      const slug = `${currentYear}-${String(month).padStart(2, '0')}`
      const position = MONTH_POSITIONS[i]

      monthData.push({
        year: currentYear,
        month,
        label,
        slug,
        svg: generateRandomIcon(position.size),
        x: position.x,
        y: position.y,
        size: position.size,
      })
    }

    setMonths(monthData)
  }

  const handleMonthClick = (slug: string) => {
    router.push(`/blog/${slug}`)
  }

  const handleAdminClick = () => {
    router.push(`/blog/admin`)
  }

  useEffect(() => {
    generateMonths()
  }, [])

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Floating month speakers */}
      <div className="fixed inset-0 z-10">
        {months.map((month, i) => (
          <button
            key={month.slug}
            onClick={() => handleMonthClick(month.slug)}
            className="absolute hover:scale-110 flex flex-col items-center gap-2 group animate-float"
            style={{
              left: month.x,
              top: month.y,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${8 + (i % 4)}s`,
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: month.svg }} />
            <div className="text-xs font-mono text-foreground">
              {month.label}
            </div>
          </button>
        ))}
      </div>

      {/* Admin speaker icon - bottom right */}
      <button
        onClick={handleAdminClick}
        className="fixed bottom-24 right-6 z-50 flex flex-col items-center gap-2 hover:scale-110 transition-transform group"
      >
        <div
          dangerouslySetInnerHTML={{
            __html: generateRandomIcon(60)
          }}
        />
        <div className="text-xs font-mono text-muted group-hover:text-foreground transition-colors">
          secret
        </div>
      </button>
    </div>
  )
}
