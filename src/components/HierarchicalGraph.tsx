'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

// Reuse icon generation from InteractiveSpeakerNav
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

interface HierarchicalNode {
  id: string
  title: string
  children?: HierarchicalNode[]
  url?: string
  level: number
}

interface HierarchicalGraphProps {
  sections: Array<{ id: string; title: string; category: string }>
  getItemsByCategory: (category: string) => any[]
}

interface Connection {
  id: string
  d: string
}

export default function HierarchicalGraph({
  sections,
  getItemsByCategory
}: HierarchicalGraphProps) {
  const iconsRef = useRef<Map<string, string>>(new Map())
  const iconRefs = useRef<Map<string, HTMLDivElement>>(new Map())
  const containerRef = useRef<HTMLDivElement>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']))
  const [connections, setConnections] = useState<Connection[]>([])
  const [floatingIcons] = useState(() => {
    // Generate 15 floating icons with random positions
    return Array.from({ length: 15 }, (_, i) => ({
      id: `float-${i}`,
      icon: generateRandomIcon(40),
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }))
  })

  // Generate icon for a node (always circle speaker for hierarchy nodes)
  const getNodeIcon = (nodeId: string, size: number): string => {
    if (!iconsRef.current.has(nodeId)) {
      const base = randomColor()
      const accent = randomColor()
      iconsRef.current.set(nodeId, generateCircleSpeaker(size, base, accent))
    }
    return iconsRef.current.get(nodeId)!
  }

  // Build tree structure from sections and items
  const buildTree = (): HierarchicalNode => {
    return {
      id: 'root',
      title: 'portfolio',
      level: 0,
      children: sections.map(section => ({
        id: section.id,
        title: section.title.toLowerCase(),
        level: 1,
        children: getItemsByCategory(section.category).map(item => ({
          id: item.id,
          title: item.title.toLowerCase(),
          url: `/portfolio/${item.slug}`,
          level: 2
        }))
      }))
    }
  }

  const tree = buildTree()

  // Calculate connections after DOM updates
  useEffect(() => {
    const calculateConnections = () => {
      const newConnections: Connection[] = []

      const processNode = (node: HierarchicalNode, depth: number = 0) => {
        if (!expandedNodes.has(node.id) || !node.children) return

        const parentIconEl = iconRefs.current.get(node.id)
        if (!parentIconEl) return

        const parentIconRect = parentIconEl.getBoundingClientRect()
        const containerRect = containerRef.current?.getBoundingClientRect()
        if (!containerRect) return

        // Calculate parent icon position relative to container
        const parentX = parentIconRect.left - containerRect.left
        const parentY = parentIconRect.top - containerRect.top

        node.children.forEach(child => {
          const childIconEl = iconRefs.current.get(child.id)
          if (!childIconEl) return

          const childIconRect = childIconEl.getBoundingClientRect()

          // Calculate child icon position relative to container
          const childX = childIconRect.left - containerRect.left
          const childY = childIconRect.top - containerRect.top

          // Parent bottom center anchor
          const parentBottomX = parentX + parentIconRect.width / 2
          const parentBottomY = parentY + parentIconRect.height

          // Child left center anchor
          const childLeftX = childX
          const childLeftY = childY + childIconRect.height / 2

          // Vertical drop distance
          const drop = Math.min(80, Math.abs(childLeftY - parentBottomY) * 0.35)

          // Path coordinates
          const startX = parentBottomX
          const startY = parentBottomY
          const midY = parentBottomY + drop
          const endX = childLeftX - 8
          const endY = childLeftY

          const d = `M ${startX} ${startY} C ${startX} ${midY}, ${endX - 120} ${endY}, ${endX} ${endY}`

          newConnections.push({
            id: `${node.id}-${child.id}`,
            d
          })

          processNode(child, depth + 1)
        })
      }

      processNode(tree)
      setConnections(newConnections)
    }

    // Delay calculation to ensure DOM is ready
    const timer = setTimeout(calculateConnections, 50)
    return () => clearTimeout(timer)
  }, [expandedNodes, tree])

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  const renderNode = (node: HierarchicalNode, depth: number = 0): JSX.Element => {
    const isExpanded = expandedNodes.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const leftOffset = 50 + depth * 320 // 50px start, 320px per level

    // Icon size based on level
    const iconSize = node.level === 0 ? 60 : node.level === 1 ? 45 : 30

    return (
      <div key={node.id} className="relative">
        <div
          className="flex items-start gap-[18px]"
          style={{ paddingLeft: `${leftOffset}px` }}
        >
          {/* Node icon */}
          {node.url ? (
            <Link href={node.url} className="flex items-center gap-2 group">
              <div
                ref={(el) => {
                  if (el) iconRefs.current.set(node.id, el)
                }}
                className="hover:scale-110 transition-transform flex-shrink-0"
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                dangerouslySetInnerHTML={{ __html: getNodeIcon(node.id, iconSize) }}
              />
              <span
                className="relative z-20 text-xs font-mono text-foreground group-hover:text-foreground/70"
                style={{
                  marginTop: `${iconSize * 0.25}px`,
                  textShadow: '0 0 8px var(--background), 0 0 4px var(--background)'
                }}
              >
                {node.title}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => hasChildren && toggleNode(node.id)}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <div
                ref={(el) => {
                  if (el) iconRefs.current.set(node.id, el)
                }}
                className="flex-shrink-0"
                style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
                dangerouslySetInnerHTML={{ __html: getNodeIcon(node.id, iconSize) }}
              />
              <span
                className="relative z-20 text-xs font-mono text-foreground"
                style={{
                  marginTop: `${iconSize * 0.25}px`,
                  textShadow: '0 0 8px var(--background), 0 0 4px var(--background)'
                }}
              >
                {node.title}
              </span>
              {hasChildren && (
                <span
                  className="relative z-20 text-xs text-muted ml-1"
                  style={{
                    marginTop: `${iconSize * 0.25}px`,
                    textShadow: '0 0 8px var(--background), 0 0 4px var(--background)'
                  }}
                >
                  {isExpanded ? '−' : '+'}
                </span>
              )}
            </button>
          )}
        </div>

        {/* Children */}
        <AnimatePresence>
          {isExpanded && hasChildren && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex flex-col gap-2 mt-2">
                {node.children!.map(child => renderNode(child, depth + 1))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
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

      <div className="fixed top-20 left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-sm overflow-auto">
        <div ref={containerRef} className="p-6 relative z-50">
          {/* Shared SVG overlay for all connections */}
          <svg className="absolute inset-0 z-0 pointer-events-none overflow-visible">
            {connections.map((conn, index) => (
              <motion.path
                key={conn.id}
                d={conn.d}
                stroke="#050505"
                strokeWidth="2"
                fill="none"
                opacity="0.3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              />
            ))}
          </svg>

          {/* Node tree */}
          <div className="relative z-10 flex flex-col gap-3">
            {renderNode(tree)}
          </div>
        </div>
      </div>
    </>
  )
}
