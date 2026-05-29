'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { portfolioItems } from '@/data/portfolio'
import MarkdownContent from '@/components/MarkdownContent'

// Icon generation utilities
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

function generateSquareIcon(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${center - 50 * scale}" y="${center - 50 * scale}" width="${100 * scale}" height="${100 * scale}" fill="${base}" rx="${8 * scale}" />
      <rect x="${center - 30 * scale}" y="${center - 30 * scale}" width="${60 * scale}" height="${60 * scale}" fill="${DARK}" rx="${4 * scale}" />
      <rect x="${center - 20 * scale}" y="${center - 20 * scale}" width="${40 * scale}" height="${40 * scale}" fill="${accent}" rx="${2 * scale}" />
    </svg>
  `
}

function generateTriangleIcon(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  const points = `${center},${center - 50 * scale} ${center + 50 * scale},${center + 40 * scale} ${center - 50 * scale},${center + 40 * scale}`

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <polygon points="${points}" fill="${base}" />
      <circle cx="${center}" cy="${center}" r="${20 * scale}" fill="${DARK}" />
      <circle cx="${center}" cy="${center}" r="${12 * scale}" fill="${accent}" />
    </svg>
  `
}

function generateDiamondIcon(size: number, base: string, accent: string): string {
  const center = size / 2
  const scale = size / 160

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${center - 35 * scale}" y="${center - 35 * scale}" width="${70 * scale}" height="${70 * scale}" fill="${base}" transform="rotate(45 ${center} ${center})" />
      <rect x="${center - 20 * scale}" y="${center - 20 * scale}" width="${40 * scale}" height="${40 * scale}" fill="${DARK}" transform="rotate(45 ${center} ${center})" />
      <rect x="${center - 12 * scale}" y="${center - 12 * scale}" width="${24 * scale}" height="${24 * scale}" fill="${accent}" transform="rotate(45 ${center} ${center})" />
    </svg>
  `
}

function generateRandomIcon(size: number): string {
  const base = randomColor()
  const accent = randomColor()
  const generators = [
    () => generateCircleSpeaker(size, base, accent),
    () => generateSquareIcon(size, base, accent),
    () => generateTriangleIcon(size, base, accent),
    () => generateDiamondIcon(size, base, accent)
  ]
  const randomGenerator = generators[Math.floor(Math.random() * generators.length)]
  return randomGenerator()
}

interface PortfolioItemPageProps {
  params: {
    slug: string
  }
}

export default function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const item = portfolioItems.find(p => p.slug === params.slug)

  // Generate floating icons
  const [floatingIcons] = useState(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: `float-${i}`,
      icon: generateRandomIcon(40),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }))
  })

  if (!item) {
    notFound()
  }

  return (
    <>
      {/* Floating background icons - fixed to viewport */}
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[45] overflow-hidden pointer-events-none">
        {floatingIcons.map((item) => (
          <motion.div
            key={item.id}
            className="absolute opacity-10"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            animate={{
              y: [0, -80, -40, -100, 0],
              x: [0, 40, -20, 30, 0],
              rotate: [0, 15, -10, 20, 0],
              scale: [1, 1.1, 0.9, 1.05, 1],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              delay: item.delay,
              ease: "easeInOut"
            }}
            dangerouslySetInnerHTML={{ __html: item.icon }}
          />
        ))}
      </div>

      <div className="min-h-screen pt-32 pb-24 px-8 relative z-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            ← Back to Index
          </Link>

          {/* Logo/Image */}
          {item.logo && (
            <div className="relative aspect-[3/1] bg-foreground/5 overflow-hidden flex items-center justify-center p-8 mb-8 border border-border">
              <Image
                src={item.logo}
                alt={item.title}
                width={400}
                height={200}
                className="object-contain"
              />
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-medium text-foreground mb-4 tracking-tight">
              {item.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-mono mb-4">
              <span className="uppercase">{item.category}</span>
              {item.severity && (
                <span className="uppercase px-2 py-1 bg-foreground/5 border border-border">
                  {item.severity} {item.cvss && `(${item.cvss})`}
                </span>
              )}
              <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Technologies */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-foreground mb-3 uppercase tracking-wider">
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 bg-foreground/5 text-muted border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {item.content && (
            <div className="prose prose-sm max-w-none">
              <MarkdownContent content={item.content} />
            </div>
          )}

          {/* Back link at bottom */}
          <div className="mt-12">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted hover:text-foreground transition-colors"
            >
              ← Back to Index
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </>
  )
}
