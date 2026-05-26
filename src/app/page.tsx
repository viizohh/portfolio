'use client'

import { portfolioItems } from '@/data/portfolio'
import InteractiveSpeakerNav from '@/components/InteractiveSpeakerNav'
import { useState } from 'react'

// Archive sections
const INITIAL_SECTIONS = [
  { id: '001', title: 'Projects', category: 'project' },
  { id: '002', title: 'Internships', category: 'internship' },
  { id: '003', title: 'Work Opportunities', category: 'work' },
  { id: '004', title: 'Vulnerabilities & Findings', category: 'vulnerability' },
  { id: '005', title: 'Research / Writeups', category: 'finding' },
]

export default function HomePage() {
  const [sections, setSections] = useState(INITIAL_SECTIONS)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  // Group items by category
  const getItemsByCategory = (category: string) => {
    return portfolioItems.filter(item => item.category === category)
  }

  const handleSectionOrderChange = (newOrder: typeof INITIAL_SECTIONS) => {
    setSections(newOrder)
  }

  const handleSpeakerClick = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  return (
    <div className="h-screen overflow-hidden relative">
      {/* Interactive speaker navigation with sections */}
      <InteractiveSpeakerNav
        sections={sections}
        onSectionOrderChange={handleSectionOrderChange}
        onSpeakerClick={handleSpeakerClick}
        expandedSections={expandedSections}
        getItemsByCategory={getItemsByCategory}
      />
    </div>
  )
}
