'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { portfolioItems } from '@/data/portfolio'

interface PortfolioItemPageProps {
  params: {
    slug: string
  }
}

export default function PortfolioItemPage({ params }: PortfolioItemPageProps) {
  const item = portfolioItems.find(p => p.slug === params.slug)

  if (!item) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-8">
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
              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {item.content}
              </div>
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
  )
}
