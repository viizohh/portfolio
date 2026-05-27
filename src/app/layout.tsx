import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: "Hunter's Portfolio",
  description: 'A curated archive of cybersecurity research, vulnerabilities, projects, and findings',
  keywords: ['cybersecurity', 'pentesting', 'security research', 'vulnerabilities', 'bug bounty'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
