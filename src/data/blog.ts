// Blog entries - one entry per day
export interface BlogEntry {
  id: string
  date: string // YYYY-MM-DD format
  title: string
  content: string
  tags?: string[]
}

export const blogEntries: BlogEntry[] = [
  {
    id: '4',
    date: '2026-05-27',
    title: "first entry",
    content: "hey! welcome to my blog, this is apart from my portfolio just to say what I'm doing during a day or what I'm learning / testing thanks for finding this!\n\nhunter",
  },
{
    id: '3',
    date: '2026-05-27',
    title: "first entry",
    content: "Hey guys, welcome to my blog this is a little easter egg aside from the portfolio I might make the whole thing a password hidden somewhere in the website but this is just to serve a purpose of showing anyone what I'm doing in a given week or day, if I'm learning something or conducting any testing.\n\nthanks for looking :D\n\n-Hunter",
  },
  {
    id: '1',
    date: '2025-01-15',
    title: 'First Blog Entry',
    content: `This is an example blog entry. You can write anything here.

This supports markdown-style formatting and multiple paragraphs.

You can edit this through the admin panel.`,
    tags: ['example', 'first-post'],
  },
  {
    id: '2',
    date: '2025-01-20',
    title: 'Another Entry',
    content: `Another day, another entry. This is how the blog system works.`,
    tags: ['example'],
  },
]

// Helper function to get entries by year-month (e.g., "2025-01")
export function getEntriesByMonth(yearMonth: string): BlogEntry[] {
  return blogEntries.filter(entry => entry.date.startsWith(yearMonth))
}

// Helper function to get entry by exact date
export function getEntryByDate(date: string): BlogEntry | undefined {
  return blogEntries.find(entry => entry.date === date)
}

// Get all unique year-months that have entries
export function getMonthsWithEntries(): string[] {
  const months = new Set(
    blogEntries.map(entry => entry.date.substring(0, 7))
  )
  return Array.from(months).sort().reverse() // Most recent first
}

// Get all days in a month that have entries
export function getDaysWithEntries(yearMonth: string): number[] {
  return blogEntries
    .filter(entry => entry.date.startsWith(yearMonth))
    .map(entry => parseInt(entry.date.split('-')[2]))
    .sort((a, b) => a - b)
}
