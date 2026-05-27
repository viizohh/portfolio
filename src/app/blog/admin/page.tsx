'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { blogEntries } from '@/data/blog'

const ADMIN_PASSWORD = 'password1'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Form state
  const [date, setDate] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('blog_admin_auth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('blog_admin_auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Incorrect password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('blog_admin_auth')
    setIsAuthenticated(false)
    setPassword('')
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      const newEntry = {
        id: String(blogEntries.length + 1),
        date,
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      }

      const response = await fetch('/api/blog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEntry),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create entry')
      }

      setSubmitMessage('✓ Entry created successfully! Refreshing...')

      // Clear form
      setDate('')
      setTitle('')
      setContent('')
      setTags('')

      // Redirect to the new entry after 2 seconds
      setTimeout(() => {
        router.push(`/blog/${newEntry.date.substring(0, 7)}/${newEntry.date}`)
      }, 2000)
    } catch (error) {
      setSubmitMessage(`✗ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Set default date to today
  useEffect(() => {
    if (isAuthenticated && !date) {
      const today = new Date().toISOString().split('T')[0]
      setDate(today)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-foreground mb-2">Blog Admin</h1>
            <p className="text-xs font-mono text-muted">Password required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 bg-foreground/5 border border-border text-foreground font-mono text-sm rounded focus:outline-none focus:border-foreground/50 transition-colors"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs font-mono text-red-500">{error}</p>
            )}

            <button
              type="submit"
              className="w-full px-4 py-3 bg-foreground text-background font-mono text-sm rounded hover:opacity-80 transition-opacity"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => router.push('/blog')}
              className="w-full px-4 py-3 border border-border text-foreground font-mono text-xs rounded hover:bg-foreground/5 transition-colors"
            >
              ← Back to Blog
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-medium text-foreground mb-2">Blog Admin</h1>
            <p className="text-xs font-mono text-muted">Create new entry</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs font-mono text-muted hover:text-foreground transition-colors"
          >
            logout
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block text-xs font-mono text-muted mb-2">
              Date (YYYY-MM-DD)
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 bg-foreground/5 border border-border text-foreground font-mono text-sm rounded focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-mono text-muted mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Entry title"
              className="w-full px-4 py-3 bg-foreground/5 border border-border text-foreground font-mono text-sm rounded focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-xs font-mono text-muted mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={12}
              placeholder="Write your entry here..."
              className="w-full px-4 py-3 bg-foreground/5 border border-border text-foreground font-mono text-sm rounded focus:outline-none focus:border-foreground/50 transition-colors resize-vertical"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono text-muted mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              className="w-full px-4 py-3 bg-foreground/5 border border-border text-foreground font-mono text-sm rounded focus:outline-none focus:border-foreground/50 transition-colors"
            />
          </div>

          {/* Submit message */}
          {submitMessage && (
            <div className={`p-4 rounded border ${submitMessage.startsWith('✓') ? 'bg-green-500/10 border-green-500/30 text-green-600' : 'bg-red-500/10 border-red-500/30 text-red-600'}`}>
              <p className="text-xs font-mono">{submitMessage}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-3 bg-foreground text-background font-mono text-sm rounded hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Entry'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/blog')}
              className="px-4 py-3 border border-border text-foreground font-mono text-sm rounded hover:bg-foreground/5 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Note */}
        <div className="mt-12 p-4 bg-foreground/5 border border-border rounded">
          <p className="text-xs font-mono text-muted">
            Note: Entries are automatically committed to GitHub and deployed via Vercel.
            Changes may take 2-3 minutes to appear on the live site.
          </p>
        </div>
      </div>
    </div>
  )
}
