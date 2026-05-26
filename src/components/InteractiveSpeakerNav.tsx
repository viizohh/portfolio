'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Color palette
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

function randomColor(): string {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)]
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// Helper function to shorten titles for petals
function getShortenedTitle(item: any): string {
  const title = item.title

  // For vulnerabilities and findings: extract company name before ":"
  if (item.category === 'vulnerability' || item.category === 'finding') {
    if (title.includes(':')) {
      const companyName = title.split(':')[0].trim()
      return companyName.toLowerCase()
    }
    return title.toLowerCase()
  }

  // For work/internship: already simplified to company name only
  if (item.category === 'work' || item.category === 'internship') {
    return title.toLowerCase()
  }

  // For projects: use first 2-3 words
  const words = title.split(' ')
  if (words.length <= 2) return title.toLowerCase()
  return words.slice(0, 2).join(' ').toLowerCase()
}

// Icon generation functions (same as before)
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

function generateSquareSpeaker(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160
  const rectSize = 116 * scale
  const rectStart = center - rectSize / 2
  const cornerRadius = 16 * scale

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${rectStart}" y="${rectStart}" width="${rectSize}" height="${rectSize}"
            rx="${cornerRadius}" fill="${base}" />
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
      <circle cx="${center}" cy="${center}" r="${38 * scale}" fill="${accent}" />
      <circle cx="${center}" cy="${center}" r="${23 * scale}" fill="${DARK}" />
    </svg>
  `
}

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
      <circle cx="${center}" cy="${center}" r="${61 * scale}" fill="${base}" />
      <circle cx="${center}" cy="${center}" r="${37 * scale}" fill="${DARK}" />
      ${[0, 1, 2, 3, 4, 5]
        .map((i) => {
          const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2
          const radius = 54 * scale
          const x = center + Math.cos(angle) * radius
          const y = center + Math.sin(angle) * radius
          return `<circle cx="${x}" cy="${y}" r="${4.5 * scale}" fill="${DARK}" />`
        })
        .join('')}
      ${spokes}
      <circle cx="${center}" cy="${center}" r="${14 * scale}" fill="${accent}" />
    </svg>
  `
}

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
      <rect x="${rectStart}" y="${rectStart}" width="${rectSize}" height="${rectSize}"
            rx="${cornerRadius}" fill="${base}" />
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
      <circle cx="${center}" cy="${center}" r="${37 * scale}" fill="${DARK}" />
      <circle cx="${center}" cy="${center}" r="${26 * scale}" fill="${accent}" />
      ${spokes}
    </svg>
  `
}

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

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface Section {
  id: string
  title: string
  category: string
}

interface SpeakerNavProps {
  sections: Section[]
  onSectionOrderChange: (newOrder: Section[]) => void
  onSpeakerClick: (sectionId: string) => void
  expandedSections: Set<string>
  getItemsByCategory: (category: string) => any[]
}

interface SpeakerData {
  section: Section
  svg: string
  x: string
  y: string
  size: number
}

// Position pools for spreading icons around viewport
const POSITION_POOL = [
  { x: '15%', y: '35%', size: 100 },
  { x: '85%', y: '40%', size: 90 },
  { x: '30%', y: '70%', size: 110 },
  { x: '70%', y: '75%', size: 95 },
  { x: '50%', y: '50%', size: 105 },
]

export default function InteractiveSpeakerNav({
  sections,
  onSectionOrderChange,
  onSpeakerClick,
  expandedSections,
  getItemsByCategory
}: SpeakerNavProps) {
  const iconsRef = useRef<Map<string, string>>(new Map())
  const petalIconsRef = useRef<Map<string, string>>(new Map())
  const initializedRef = useRef(false)
  const [speakers, setSpeakers] = useState<SpeakerData[]>([])
  const [expandedItemIds, setExpandedItemIds] = useState<Set<string>>(new Set())

  // Generate icons and positions once on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      const initialSpeakers = sections.map((section, index) => {
        const svg = generateRandomIcon(POSITION_POOL[index].size)
        const position = POSITION_POOL[index]
        iconsRef.current.set(section.id, svg)
        return {
          section,
          svg,
          x: position.x,
          y: position.y,
          size: position.size,
        }
      })
      setSpeakers(initialSpeakers)
    }
  }, [sections])

  // Generate petal icons for items when expanded
  const getPetalIcon = (itemId: string): string => {
    if (!petalIconsRef.current.has(itemId)) {
      const icon = generateRandomIcon(45)
      petalIconsRef.current.set(itemId, icon)
    }
    return petalIconsRef.current.get(itemId)!
  }

  const handleShuffle = () => {
    const shuffledPositions = shuffleArray([...POSITION_POOL])
    const newSpeakers = speakers.map((speaker, index) => {
      const newSvg = generateRandomIcon(shuffledPositions[index].size)
      iconsRef.current.set(speaker.section.id, newSvg)
      return {
        ...speaker,
        svg: newSvg,
        x: shuffledPositions[index].x,
        y: shuffledPositions[index].y,
        size: shuffledPositions[index].size,
      }
    })
    setSpeakers(newSpeakers)

    // Regenerate petal icons too
    petalIconsRef.current.clear()
  }

  const handleSpeakerClick = (sectionId: string) => {
    onSpeakerClick(sectionId)
  }

  const handleItemClick = (itemId: string) => {
    setExpandedItemIds((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  if (speakers.length === 0) {
    return null
  }

  return (
    <>
      <div className="fixed top-20 left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-sm overflow-auto">
        {/* Speakers scattered around */}
        {speakers.map((speaker) => {
          const isExpanded = expandedSections.has(speaker.section.id)
          const items = getItemsByCategory(speaker.section.category)
          const centralIconRadius = speaker.size / 2

          return (
          <motion.div
            key={speaker.section.id}
            className="absolute"
            style={{
              left: speaker.x,
              top: speaker.y,
              transform: 'translate(-50%, -50%)',
            }}
            layout
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {/* Central speaker icon */}
            <div className="relative">
              <button
                onClick={() => handleSpeakerClick(speaker.section.id)}
                className="flex flex-col items-center gap-2 hover:scale-110 transition-transform relative z-10"
              >
                <div dangerouslySetInnerHTML={{ __html: speaker.svg }} />
                <div className="text-xs font-mono text-foreground">
                  {speaker.section.title.toLowerCase()}
                </div>
              </button>

              {/* Flower expansion */}
              <AnimatePresence>
                {isExpanded && items.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none'
                    }}
                  >
                    {/* Radial lines and items */}
                    {items.map((item, index) => {
                      const angle = (Math.PI * 2 * index) / items.length - Math.PI / 2
                      const distance = 200
                      const petalIconSize = 45 // Icon size in pixels

                      // Calculate line start from edge of central icon
                      const lineStartX = Math.cos(angle) * centralIconRadius
                      const lineStartY = Math.sin(angle) * centralIconRadius

                      // Calculate petal position (center of petal)
                      const x = Math.cos(angle) * distance
                      const y = Math.sin(angle) * distance

                      // Calculate line end point (edge of petal icon, not center)
                      const petalIconRadius = petalIconSize / 2
                      const lineEndX = Math.cos(angle) * (distance - petalIconRadius)
                      const lineEndY = Math.sin(angle) * (distance - petalIconRadius)

                      const isItemExpanded = expandedItemIds.has(item.id)

                      return (
                        <div key={item.id}>
                          {/* Line from edge of center to edge of petal */}
                          <motion.svg
                            className="absolute top-0 left-0 pointer-events-none"
                            style={{
                              width: '100%',
                              height: '100%',
                              overflow: 'visible',
                            }}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            exit={{ pathLength: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.03 }}
                          >
                            <motion.line
                              x1={lineStartX}
                              y1={lineStartY}
                              x2={lineEndX}
                              y2={lineEndY}
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-foreground/30"
                            />
                          </motion.svg>

                          {/* Petal with icon and title - centered on icon */}
                          <motion.div
                            initial={{ scale: 0, opacity: 0, x: lineStartX, y: lineStartY }}
                            animate={{ scale: 1, opacity: 1, x, y }}
                            exit={{ scale: 0, opacity: 0, x: lineStartX, y: lineStartY }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.03,
                              type: 'spring',
                              stiffness: 200,
                              damping: 20
                            }}
                            className="absolute pointer-events-auto"
                            style={{ top: 0, left: 0 }}
                          >
                            <div className="relative" style={{ transform: 'translate(-50%, -50%)' }}>
                              <button
                                onClick={() => handleItemClick(item.id)}
                                className="flex flex-col items-center gap-1 hover:scale-110 transition-transform"
                              >
                                <div
                                  className="transform scale-90"
                                  dangerouslySetInnerHTML={{ __html: getPetalIcon(item.id) }}
                                />
                                <div className="text-xs font-mono text-foreground whitespace-nowrap">
                                  {getShortenedTitle(item)}
                                </div>
                              </button>
                            </div>

                            {/* Expanded item details */}
                            <AnimatePresence>
                              {isItemExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                                  transition={{ duration: 0.2 }}
                                  className="absolute top-full mt-3 w-72 bg-background border border-border rounded-lg p-4 shadow-xl z-50"
                                  style={{
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                  }}
                                >
                                  <Link
                                    href={`/portfolio/${item.slug}`}
                                    className="block group"
                                  >
                                    {item.logo && (
                                      <div className="relative aspect-[3/2] bg-foreground/5 overflow-hidden flex items-center justify-center p-4 mb-3 rounded">
                                        <Image
                                          src={item.logo}
                                          alt={item.title}
                                          width={240}
                                          height={160}
                                          className="object-contain"
                                        />
                                      </div>
                                    )}

                                    <h4 className="text-sm font-medium text-foreground mb-2">
                                      {item.title}
                                    </h4>

                                    <div className="flex items-center gap-2 mb-2 text-xs text-muted font-mono flex-wrap">
                                      {item.severity && (
                                        <span className="uppercase">{item.severity}</span>
                                      )}
                                      {item.cvss && <span>CVSS {item.cvss}</span>}
                                      {item.dateRange ? (
                                        <span>{item.dateRange}</span>
                                      ) : (
                                        item.publishedAt && (
                                          <span>
                                            {new Date(item.publishedAt).getFullYear()}
                                          </span>
                                        )
                                      )}
                                    </div>

                                    {item.description && (
                                      <p className="text-xs text-muted line-clamp-3 leading-relaxed mb-3">
                                        {item.description}
                                      </p>
                                    )}

                                    {item.technologies && item.technologies.length > 0 && (
                                      <div className="flex flex-wrap gap-1">
                                        {item.technologies.slice(0, 4).map((tech) => (
                                          <span
                                            key={tech}
                                            className="text-xs text-muted font-mono bg-foreground/5 px-2 py-1 rounded"
                                          >
                                            {tech}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </Link>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )
      })}

      </div>

      {/* Shuffle button - outside nav container to have independent z-index */}
      <div className="fixed top-24 right-6 z-[60]">
        <button
          onClick={handleShuffle}
          className="text-xs font-mono text-muted hover:text-foreground transition-colors duration-300"
        >
          shuffle
        </button>
      </div>
    </>
  )
}
