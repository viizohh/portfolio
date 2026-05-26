'use client'

import { useState, useEffect } from 'react'

// Color palette from Processing sketch
const PALETTE = [
  '#8AD62B', // lime green
  '#12B88F', // teal
  '#F6C21A', // yellow
  '#F26A9A', // pink
  '#6E42C1', // purple
  '#2F62C9', // blue
  '#F28513', // orange
  '#D8D8D8', // gray
  '#111111', // black
  '#F3E4C2', // cream
]

const DARK = '#050505'
const LIGHT = '#FFFFFF'

// Pool of possible desktop positions (more than we'll use)
const DESKTOP_POSITION_POOL = [
  { x: '8%', y: '14%', size: 90 },
  { x: '90%', y: '14%', size: 90 },
  { x: '12%', y: '38%', size: 70 },
  { x: '86%', y: '38%', size: 70 },
  { x: '6%', y: '68%', size: 100 },
  { x: '92%', y: '68%', size: 100 },
  { x: '22%', y: '84%', size: 55 },
  { x: '78%', y: '84%', size: 55 },

  // Additional positions for variety
  { x: '5%', y: '25%', size: 65 },
  { x: '93%', y: '25%', size: 65 },
  { x: '18%', y: '55%', size: 85 },
  { x: '80%', y: '55%', size: 85 },
  { x: '10%', y: '75%', size: 75 },
  { x: '88%', y: '75%', size: 75 },
  { x: '25%', y: '18%', size: 60 },
  { x: '73%', y: '18%', size: 60 },
  { x: '8%', y: '45%', size: 80 },
  { x: '90%', y: '45%', size: 80 },
  { x: '15%', y: '92%', size: 50 },
  { x: '83%', y: '92%', size: 50 },
]

// Pool of possible mobile positions
const MOBILE_POSITION_POOL = [
  { x: '10%', y: '20%', size: 60 },
  { x: '88%', y: '20%', size: 60 },
  { x: '8%', y: '50%', size: 70 },
  { x: '90%', y: '50%', size: 70 },
  { x: '15%', y: '80%', size: 50 },
  { x: '82%', y: '80%', size: 50 },

  // Additional mobile positions
  { x: '12%', y: '35%', size: 55 },
  { x: '86%', y: '35%', size: 55 },
  { x: '5%', y: '65%', size: 65 },
  { x: '92%', y: '65%', size: 65 },
  { x: '20%', y: '90%', size: 45 },
  { x: '78%', y: '90%', size: 45 },
]

const DESKTOP_ICON_COUNT = 8
const MOBILE_ICON_COUNT = 6

// Shuffle array helper
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function randomColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate circle speaker icon
function generateCircleSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160 // original cell size was 160

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base circle -->
      <circle cx="${center}" cy="${center}" r="${60 * scale}" fill="${base}" />

      <!-- Screw dots (4 around circle) -->
      ${[0, 1, 2, 3]
        .map((i) => {
          const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2
          const radius = 52 * scale
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}

      <!-- Dark ring -->
      <circle cx="${center}" cy="${center}" r="${36 * scale}" fill="${DARK}" />

      <!-- Accent ring -->
      <circle cx="${center}" cy="${center}" r="${22 * scale}" fill="${accent}" />

      <!-- Center dark circle -->
      <circle cx="${center}" cy="${center}" r="${14 * scale}" fill="${DARK}" />
    </svg>
  `
}

// Generate square speaker icon
function generateSquareSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  const rectSize = 116 * scale
  const rectStart = center - rectSize / 2
  const cornerRadius = 16 * scale

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base rounded square -->
      <rect x="${rectStart}" y="${rectStart}" width="${rectSize}" height="${rectSize}"
            rx="${cornerRadius}" fill="${base}" />

      <!-- Corner screws -->
      ${[
        [-45, -45],
        [45, -45],
        [-45, 45],
        [45, 45],
      ]
        .map(([dx, dy]) => {
          const x = center + dx * scale
          const y = center + dy * scale
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}

      <!-- Accent circle -->
      <circle cx="${center}" cy="${center}" r="${38 * scale}" fill="${accent}" />

      <!-- Dark center circle -->
      <circle cx="${center}" cy="${center}" r="${23 * scale}" fill="${DARK}" />
    </svg>
  `
}

// Generate star speaker icon
function generateStarSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  const arms = randomInt(5, 8)

  const spokes = Array.from({ length: arms }, (_, i) => {
    const angle = (Math.PI * 2 * i) / arms
    const x2 = center + Math.cos(angle) * 45 * scale
    const y2 = center + Math.sin(angle) * 45 * scale
    return `<line x1="${center}" y1="${center}" x2="${x2}" y2="${y2}"
                  stroke="${accent}" stroke-width="${9 * scale}" stroke-linecap="round" />`
  }).join('')

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base circle -->
      <circle cx="${center}" cy="${center}" r="${61 * scale}" fill="${base}" />

      <!-- Dark ring -->
      <circle cx="${center}" cy="${center}" r="${37 * scale}" fill="${DARK}" />

      <!-- Screw dots (6 around circle) -->
      ${[0, 1, 2, 3, 4, 5]
        .map((i) => {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
          const radius = 54 * scale
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}

      <!-- Spoke lines -->
      ${spokes}

      <!-- Center accent circle -->
      <circle cx="${center}" cy="${center}" r="${14 * scale}" fill="${accent}" />
    </svg>
  `
}

// Generate grid speaker icon
function generateGridSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  const isCircle = Math.random() < 0.5
  const gridSize = randomInt(4, 7)
  const spacing = 14 * scale

  const baseShape = isCircle
    ? `<circle cx="${center}" cy="${center}" r="${61 * scale}" fill="${base}" />`
    : `<rect x="${center - 58 * scale}" y="${center - 58 * scale}"
             width="${116 * scale}" height="${116 * scale}"
             rx="${16 * scale}" fill="${base}" />`

  const screws = isCircle
    ? [0, 1, 2, 3]
        .map((i) => {
          const angle = (Math.PI * 2 * i) / 4 - Math.PI / 2
          const radius = 52 * scale
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')
    : [
        [-45, -45],
        [45, -45],
        [-45, 45],
        [45, 45],
      ]
        .map(([dx, dy]) => {
          const x = center + dx * scale
          const y = center + dy * scale
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')

  const dots = Array.from({ length: gridSize * gridSize }, (_, i) => {
    const x = i % gridSize
    const y = Math.floor(i / gridSize)
    const px = center + (x - (gridSize - 1) / 2) * spacing
    const py = center + (y - (gridSize - 1) / 2) * spacing
    return `<circle cx="${px}" cy="${py}" r="${4 * scale}" fill="${accent}" />`
  }).join('')

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      ${baseShape}
      ${screws}
      ${dots}
    </svg>
  `
}

// Generate mixed speaker icon
function generateMixedSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  const rectSize = 116 * scale
  const rectStart = center - rectSize / 2
  const cornerRadius = 20 * scale

  const arms = randomInt(3, 7)

  const spokes = Array.from({ length: arms }, (_, i) => {
    const angle = (Math.PI * 2 * i) / arms
    const x1 = center + Math.cos(angle) * 16 * scale
    const y1 = center + Math.sin(angle) * 16 * scale
    const x2 = center + Math.cos(angle) * 43 * scale
    const y2 = center + Math.sin(angle) * 43 * scale
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
                  stroke="${LIGHT}" stroke-width="${7 * scale}" stroke-linecap="round" />`
  }).join('')

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <!-- Base rounded square -->
      <rect x="${rectStart}" y="${rectStart}" width="${rectSize}" height="${rectSize}"
            rx="${cornerRadius}" fill="${base}" />

      <!-- Corner screws -->
      ${[
        [-45, -45],
        [45, -45],
        [-45, 45],
        [45, 45],
      ]
        .map(([dx, dy]) => {
          const x = center + dx * scale
          const y = center + dy * scale
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}

      <!-- Dark circle -->
      <circle cx="${center}" cy="${center}" r="${37 * scale}" fill="${DARK}" />

      <!-- Accent circle -->
      <circle cx="${center}" cy="${center}" r="${26 * scale}" fill="${accent}" />

      <!-- Spoke lines -->
      ${spokes}
    </svg>
  `
}

// Main icon generator
function generateRandomIcon(size: number): string {
  const base = randomColor()
  const accent = randomColor()
  const type = Math.floor(Math.random() * 5)

  switch (type) {
    case 0:
      return generateCircleSpeaker(size, base, accent)
    case 1:
      return generateSquareSpeaker(size, base, accent)
    case 2:
      return generateStarSpeaker(size, base, accent)
    case 3:
      return generateGridSpeaker(size, base, accent)
    case 4:
      return generateMixedSpeaker(size, base, accent)
    default:
      return generateCircleSpeaker(size, base, accent)
  }
}

interface IconData {
  svg: string
  x: string
  y: string
  size: number
}

export default function SpeakerIconLayer() {
  const [icons, setIcons] = useState<IconData[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const generateIcons = () => {
    // Shuffle positions and pick the first N
    const positionPool = isMobile ? MOBILE_POSITION_POOL : DESKTOP_POSITION_POOL
    const iconCount = isMobile ? MOBILE_ICON_COUNT : DESKTOP_ICON_COUNT
    const shuffledPositions = shuffleArray(positionPool).slice(0, iconCount)

    const newIcons = shuffledPositions.map((slot) => ({
      svg: generateRandomIcon(slot.size),
      x: slot.x,
      y: slot.y,
      size: slot.size,
    }))
    setIcons(newIcons)
  }

  const handleManualShuffle = () => {
    generateIcons()
    // Reset the auto-shuffle timer by updating a key
    setAutoShuffleKey(prev => prev + 1)
  }

  // State to trigger auto-shuffle timer reset
  const [autoShuffleKey, setAutoShuffleKey] = useState(0)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Generate initial icons
    generateIcons()

    return () => window.removeEventListener('resize', checkMobile)
  }, [isMobile])

  // Auto-shuffle effect
  useEffect(() => {
    // Generate a fresh random interval between 5-7 seconds each time
    const randomInterval = 5000 + Math.floor(Math.random() * 2000)

    const timer = setTimeout(() => {
      generateIcons()
      setAutoShuffleKey(prev => prev + 1)
    }, randomInterval)

    return () => clearTimeout(timer)
  }, [autoShuffleKey, isMobile])

  return (
    <>
      {/* Icon layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {icons.map((icon, index) => (
          <div
            key={index}
            className="absolute transition-all duration-700 ease-in-out"
            style={{
              left: icon.x,
              top: icon.y,
              transform: 'translate(-50%, -50%)',
              width: `${icon.size}px`,
              height: `${icon.size}px`,
            }}
            dangerouslySetInnerHTML={{ __html: icon.svg }}
          />
        ))}
      </div>

      {/* Shuffle button */}
      <button
        onClick={handleManualShuffle}
        className="fixed bottom-6 right-6 z-50 px-4 py-2 bg-foreground text-background text-xs font-medium rounded hover:opacity-80 transition-opacity duration-300 pointer-events-auto"
      >
        Shuffle Icons
      </button>
    </>
  )
}
