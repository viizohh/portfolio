'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { getDaysWithEntries, getEntriesByMonth } from '@/data/blog'

// Reuse same icon generation
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

function generateSquareIcon(size: number, base: string, accent: string): string {
  const center = size / 2
  const squareSize = size * 0.7
  const innerSquare = size * 0.4
  const dotSize = size * 0.08

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${center - squareSize/2}" y="${center - squareSize/2}"
            width="${squareSize}" height="${squareSize}"
            fill="${base}" rx="${squareSize * 0.1}" />
      <rect x="${center - innerSquare/2}" y="${center - innerSquare/2}"
            width="${innerSquare}" height="${innerSquare}"
            fill="${DARK}" rx="${innerSquare * 0.1}" />
      <circle cx="${center - innerSquare/4}" cy="${center - innerSquare/4}" r="${dotSize}" fill="${accent}" />
      <circle cx="${center + innerSquare/4}" cy="${center - innerSquare/4}" r="${dotSize}" fill="${accent}" />
      <circle cx="${center - innerSquare/4}" cy="${center + innerSquare/4}" r="${dotSize}" fill="${accent}" />
      <circle cx="${center + innerSquare/4}" cy="${center + innerSquare/4}" r="${dotSize}" fill="${accent}" />
    </svg>
  `
}

function generateRandomDayIcon(size: number): string {
  const base = randomColor()
  const accent = randomColor()
  return generateSquareIcon(size, base, accent)
}

const MONTH_NAMES = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

// Background month positions (similar to blog main page)
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

export default function MonthPage() {
  const router = useRouter()
  const params = useParams()
  const month = params.month as string // e.g., "2025-01"

  const [year, monthNum] = month.split('-').map(Number)
  const monthName = MONTH_NAMES[monthNum - 1]

  const daysWithEntries = getDaysWithEntries(month)
  const hasEntries = daysWithEntries.length > 0

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

  const handleDayClick = (day: number) => {
    const dayStr = String(day).padStart(2, '0')
    router.push(`/blog/${month}/${month}-${dayStr}`)
  }

  useEffect(() => {
    generateBackgroundMonths()
  }, [])

  return (
    <div className="relative overflow-auto scrollbar-hide" style={{
      width: '100vw',
      height: '100vh',
      WebkitOverflowScrolling: 'touch'
    }}>
      {/* Scrollable content area - forces scroll */}
      <div className="relative" style={{ width: '300vw', height: '300vh' }}>
        {/* Background fixed corner months */}
        <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
          {backgroundMonths.map((m, i) => (
            <div
              key={m.key}
              className="absolute"
              style={{
                left: m.x,
                top: m.y,
                transform: 'translate(-50%, -50%)',
              }}
              dangerouslySetInnerHTML={{ __html: m.svg }}
            />
          ))}
        </div>

        {/* Center: Month icon - fixed to viewport center */}
        <div className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="flex flex-col items-center">
            <div dangerouslySetInnerHTML={{ __html: generateRandomIcon(120) }} />
            <div className="text-sm font-mono text-foreground mt-3">
              {monthName} {year}
            </div>
          </div>
        </div>

        {/* Floating day entries - absolute within scrollable area */}
        {hasEntries ? (
          <div className="absolute z-20 inset-0" style={{ width: '300vw', height: '300vh' }}>
              {daysWithEntries.map((day, index) => {
                // Generate random position around center
                const angle = (Math.random() * Math.PI * 2)
                const minDistance = 200
                const maxDistance = 400
                const distance = minDistance + Math.random() * (maxDistance - minDistance)

                // Convert to percentage from center (50%, 50%)
                const xOffset = Math.cos(angle) * distance
                const yOffset = Math.sin(angle) * distance
                const x = `calc(50% + ${xOffset}px)`
                const y = `calc(50% + ${yOffset}px)`

                return (
                  <motion.div
                    key={day}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20
                    }}
                    className="absolute animate-float"
                    style={{
                      left: x,
                      top: y,
                      transform: 'translate(-50%, -50%)',
                      animationDelay: `${index * 0.2}s`,
                      animationDuration: `${8 + (index % 4)}s`,
                    }}
                  >
                    <button
                      onClick={() => handleDayClick(day)}
                      className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                    >
                      <div dangerouslySetInnerHTML={{ __html: generateRandomDayIcon(50) }} />
                      <div className="text-xs font-mono text-foreground">
                        {day}
                      </div>
                    </button>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <div className="absolute top-full mt-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <p className="text-xs font-mono text-muted">
                no entries for this month
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
