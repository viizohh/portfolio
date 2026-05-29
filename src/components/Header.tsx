'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-8 py-6">
      <nav className="flex items-center justify-between">
        {/* Left: Name/Logo */}
        <Link
          href="/"
          className="text-foreground font-medium text-sm tracking-tight hover:opacity-60 transition-opacity duration-300"
        >
          hunter
        </Link>

        {/* Right: Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
          >
            Index
          </Link>
          <Link
            href="/about"
            className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
          >
            About
          </Link>
          {/* Blog link hidden - see BLOG_MANAGEMENT.md for restoration instructions */}
          {/* <Link
            href="/blog"
            className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
          >
            Blog
          </Link> */}
          <Link
            href="/contact"
            className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
