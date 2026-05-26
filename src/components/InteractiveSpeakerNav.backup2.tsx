'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
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

// Icon generation functions (same as decorative version)
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
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function InteractiveSpeakerNav({
  sections,
  onSectionOrderChange,
  onSpeakerClick,
  expandedSections,
  getItemsByCategory
}: SpeakerNavProps) {
  // Use ref to store icons permanently across all renders
  const iconsRef = useRef<Map<string, string>>(new Map())
  const initializedRef = useRef(false)

  // Initialize speakers state
  const [speakers, setSpeakers] = useState<SpeakerData[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  // Generate icons only once on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true
      const initialSpeakers = sections.map((section) => {
        const svg = generateRandomIcon(100)
        iconsRef.current.set(section.id, svg)
        return {
          section,
          svg,
        }
      })
      setSpeakers(initialSpeakers)
    }
  }, [sections])

  const handleShuffle = () => {
    setIsShuffling(true)
    const shuffledSections = shuffleArray(sections)
    // Clear old icons and generate new ones for shuffle
    iconsRef.current.clear()
    const newSpeakers = shuffledSections.map((section) => {
      const newSvg = generateRandomIcon(100)
      iconsRef.current.set(section.id, newSvg)
      return {
        section,
        svg: newSvg,
      }
    })
    setSpeakers(newSpeakers)
    onSectionOrderChange(shuffledSections)

    // Turn off shuffling after animation completes
    setTimeout(() => setIsShuffling(false), 1200)
  }

  const handleClick = (sectionId: string) => {
    onSpeakerClick(sectionId)
  }

  // Don't render until icons are generated
  if (speakers.length === 0) {
    return null
  }

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 z-20 bg-background/95 backdrop-blur-sm overflow-hidden">
      <LayoutGroup>
        <div className="grid grid-cols-5 gap-6 py-6 px-8 h-full justify-items-center">
          {speakers.map((speaker) => {
            const isExpanded = expandedSections.has(speaker.section.id)
            const items = getItemsByCategory(speaker.section.category)

            const Container = isShuffling ? motion.div : 'div'
            const containerProps = isShuffling
              ? {
                  layout: 'position' as const,
                  transition: { duration: 1.2, ease: 'easeInOut' },
                }
              : {}

            return (
              <Container
                key={speaker.section.id}
                className="flex flex-col items-center"
                {...containerProps}
              >
                <button
                  onClick={() => handleClick(speaker.section.id)}
                  className={`flex flex-col items-center gap-2 hover:scale-110 group ${
                    isExpanded ? 'scale-105' : ''
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: speaker.svg }} />
                  <div className="text-xs font-mono text-foreground">
                    {speaker.section.title.toLowerCase()}
                  </div>
                </button>

                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="archive-section w-64 mt-4 overflow-y-auto overflow-hidden"
                    style={{ maxHeight: 'calc(100vh - 300px)' }}
                  >
                    <div className="mb-4 sticky top-0 bg-background/95 backdrop-blur-sm pb-3 z-10 px-6">
                      <h2 className="text-xs font-medium text-foreground">
                        {speaker.section.title}
                      </h2>
                    </div>

                    <div className="space-y-3 px-6 pb-6">
                      {items.length > 0 ? (
                        items.map((item) => (
                          <Link
                            key={item.id}
                            href={`/portfolio/${item.slug}`}
                            className="archive-card block group"
                          >
                            {item.logo && (
                              <div className="relative aspect-[3/2] bg-foreground/5 overflow-hidden flex items-center justify-center p-4">
                                <Image
                                  src={item.logo}
                                  alt={item.title}
                                  width={200}
                                  height={120}
                                  className="object-contain archive-card-image"
                                />
                              </div>
                            )}

                            <div className="p-3">
                              <div className="flex items-center gap-2 mb-2 text-xs text-muted font-mono">
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

                              <h3 className="text-sm font-medium text-foreground mb-1 line-clamp-2">
                                {item.title}
                              </h3>

                              {item.description && (
                                <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-2">
                                  {item.description}
                                </p>
                              )}

                              {item.technologies && item.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {item.technologies.slice(0, 2).map((tech) => (
                                    <span
                                      key={tech}
                                      className="text-xs text-muted font-mono"
                                    >
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="archive-card p-8 text-center">
                          <p className="text-xs text-muted">No items in this section</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </Container>
            )
          })}
        </div>
      </LayoutGroup>

      <div className="absolute top-6 right-6">
        <button
          onClick={handleShuffle}
          className="text-xs font-mono text-muted hover:text-foreground transition-colors duration-300"
        >
          shuffle
        </button>
      </div>
    </div>
  )
}
