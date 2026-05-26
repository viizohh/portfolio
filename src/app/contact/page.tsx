'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SpeakerIconLayer from '@/components/SpeakerIconLayer'

export default function ContactPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Decode email on client side to prevent scraping
    const user = 'wrighthunter112'
    const domain = 'gmail.com'
    setEmail(`${user}@${domain}`)
  }, [])

  return (
    <div className="min-h-screen pt-32 px-8 pb-24 relative">
      {/* Speaker icon decorative layer */}
      <SpeakerIconLayer />

      <div className="max-w-2xl mx-auto z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl font-medium text-foreground mb-10 tracking-tight">
              Contact
            </h1>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <p className="text-foreground leading-relaxed mb-8">
                Available for defensive cybersecurity roles, compliance work, and security
                operations opportunities.
              </p>
            </div>

            {/* Email */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-3 uppercase tracking-wider">
                Email
              </h2>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="text-foreground hover:text-muted transition-colors"
                >
                  {email}
                </a>
              )}
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Social
              </h2>
              <div className="space-y-3">
                <Link
                  href="https://www.linkedin.com/in/hunter-w-1aab24237/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground hover:text-muted transition-colors"
                >
                  LinkedIn →
                </Link>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-3 uppercase tracking-wider">
                Availability
              </h2>
              <p className="text-muted text-sm">
                Currently accepting select projects and collaborations. Response
                time: 24-48 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
