import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_OWNER = 'viizohh'
const GITHUB_REPO = 'portfolio'
const FILE_PATH = 'src/data/blog.ts'

interface BlogEntry {
  id: string
  date: string
  title: string
  content: string
  tags?: string[]
}

export async function POST(request: NextRequest) {
  try {
    const newEntry: BlogEntry = await request.json()

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: 'GitHub token not configured' },
        { status: 500 }
      )
    }

    // 1. Get current file content
    const getFileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    )

    if (!getFileResponse.ok) {
      throw new Error('Failed to fetch current file')
    }

    const fileData = await getFileResponse.json()
    const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8')
    const sha = fileData.sha

    // 2. Parse and add new entry
    const newEntryCode = `  {
    id: '${newEntry.id}',
    date: '${newEntry.date}',
    title: ${JSON.stringify(newEntry.title)},
    content: ${JSON.stringify(newEntry.content)},${newEntry.tags && newEntry.tags.length > 0 ? `\n    tags: ${JSON.stringify(newEntry.tags)},` : ''}
  },`

    // Find the blogEntries array and add new entry
    const arrayMatch = currentContent.match(/export const blogEntries: BlogEntry\[\] = \[([\s\S]*?)\]/)
    if (!arrayMatch) {
      throw new Error('Could not find blogEntries array')
    }

    const existingEntries = arrayMatch[1].trim()
    const newContent = currentContent.replace(
      /export const blogEntries: BlogEntry\[\] = \[([\s\S]*?)\]/,
      `export const blogEntries: BlogEntry[] = [\n${existingEntries ? existingEntries + '\n' : ''}${newEntryCode}\n]`
    )

    // 3. Commit to GitHub
    const commitResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add blog entry: ${newEntry.title}`,
          content: Buffer.from(newContent).toString('base64'),
          sha,
        }),
      }
    )

    if (!commitResponse.ok) {
      const error = await commitResponse.json()
      throw new Error(`GitHub commit failed: ${JSON.stringify(error)}`)
    }

    return NextResponse.json({ success: true, entry: newEntry })
  } catch (error) {
    console.error('Error creating blog entry:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
