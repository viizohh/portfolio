import { NextRequest, NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.Github_Token
const GITHUB_OWNER = process.env.GITHUB_OWNER || process.env.Github_Owner || ''
const GITHUB_REPO = process.env.GITHUB_REPO || process.env.Github_Repo || 'portfolio'
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

    // Find the blogEntries array - use more robust matching
    // Look for the array start, then find the matching closing bracket
    const startPattern = 'export const blogEntries: BlogEntry[] = ['
    const startIndex = currentContent.indexOf(startPattern)
    if (startIndex === -1) {
      throw new Error('Could not find blogEntries array')
    }

    // Find the closing bracket by counting brackets
    let bracketCount = 0
    let endIndex = startIndex + startPattern.length
    for (let i = endIndex; i < currentContent.length; i++) {
      if (currentContent[i] === '[') bracketCount++
      if (currentContent[i] === ']') {
        if (bracketCount === 0) {
          endIndex = i
          break
        }
        bracketCount--
      }
    }

    // Extract existing entries
    const existingEntries = currentContent.substring(startIndex + startPattern.length, endIndex).trim()

    // Build new content
    const beforeArray = currentContent.substring(0, startIndex + startPattern.length)
    const afterArray = currentContent.substring(endIndex)
    const newContent = `${beforeArray}\n${newEntryCode}\n${existingEntries ? existingEntries + '\n' : ''}${afterArray}`

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
