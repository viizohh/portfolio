'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import SpeakerIconLayer from '@/components/SpeakerIconLayer'

export default function AboutPage() {
  const [email, setEmail] = useState('')

  useEffect(() => {
    // Decode email on client side to prevent scraping
    const user = 'wrighthunter112'
    const domain = 'gmail.com'
    setEmail(`${user}@${domain}`)
  }, [])

  return (
    <div className="min-h-screen pt-20 relative">
      {/* Speaker icon decorative layer */}
      <SpeakerIconLayer />

      <div className="flex h-screen">
        {/* Left: Image */}
        <motion.div
          className="w-1/2 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="sticky top-20 h-[calc(100vh-5rem)] flex items-center justify-center p-16">
            <div className="relative w-full h-full z-10 bg-background">
              <Image
                src="/images/portrait.png"
                alt="Hunter Wright"
                fill
                className="object-cover border border-border"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          className="w-1/2 px-16 py-32 relative z-10"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-lg space-y-12">
            {/* Intro */}
            <div>
              <h1 className="text-4xl font-medium text-foreground mb-10 tracking-tight">
                Hi, I'm Hunter
              </h1>
              <p className="text-foreground leading-relaxed mb-3">
                I'm a cybersecurity analyst and application security researcher specializing in
                defensive security operations, threat detection, and vulnerability management.
              </p>
              <p className="text-foreground leading-relaxed">
                Computer Science student at Virginia Commonwealth University (Graduated May 2026).
                Currently serving as Application Security Lead Analyst at Silknode.
              </p>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Background
              </h2>
              <p className="text-muted leading-relaxed text-sm mb-3">
                Six consecutive summers as Software & Cyber Engineering Intern at Lockheed Martin,
                developing System Security Plans under NIST RMF, validating 300+ DISA STIG findings,
                and conducting security assessments to strengthen defensive posture.
              </p>
              <p className="text-muted leading-relaxed text-sm">
                Focused on blue team operations including threat detection engineering, security
                monitoring, and vulnerability remediation. Published detection rules to SigmaHQ
                for ransomware campaign identification and published security research advancing
                defensive security practices.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Expertise
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Threat Detection',
                  'SIEM & Monitoring',
                  'Nessus',
                  'Burp Suite Pro',
                  'NIST RMF',
                  'DISA STIG',
                  'MITRE ATT&CK',
                  'Sigma Detection Rules',
                  'Python Automation',
                  'API Security',
                  'Web AppSec',
                  'Vulnerability Management',
                ].map((skill) => (
                  <div key={skill} className="text-sm text-muted">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Certifications
              </h2>
              <div className="space-y-2 text-sm text-muted">
                <div>• Security+ — CompTIA (Completed)</div>
                <div>• CCNA — Cisco Certified Network Associate (In Progress)</div>
                <div>• CySA+ — CompTIA Cybersecurity Analyst (In Progress)</div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Experience
              </h2>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-foreground font-medium">Silknode</div>
                  <div className="text-muted">App Security Lead Analyst (Aug 2025-Present)</div>
                  <div className="text-muted text-xs">Security monitoring and threat detection for 15,000+ users</div>
                </div>
                <div>
                  <div className="text-foreground font-medium">Lockheed Martin</div>
                  <div className="text-muted">Cyber Engineering Intern (June 2020-2025)</div>
                  <div className="text-muted text-xs">Security operations, compliance validation, threat assessment</div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-sm font-medium text-foreground mb-4 uppercase tracking-wider">
                Connect
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-4">
                Available for security consulting and vulnerability research opportunities.
              </p>
              <div className="space-y-2">
                {email && (
                  <Link
                    href={`mailto:${email}`}
                    className="text-sm text-foreground hover:text-muted transition-colors duration-300"
                  >
                    {email}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
