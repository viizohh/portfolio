'use client'

interface MarkdownContentProps {
  content: string
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  // Parse markdown-style content into React elements
  const parseContent = (text: string) => {
    const lines = text.split('\n')
    const elements: JSX.Element[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
      const line = lines[i]

      // Code block (triple backticks)
      if (line.trim().startsWith('```')) {
        const language = line.trim().substring(3).trim()
        const codeLines: string[] = []
        i++

        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i])
          i++
        }

        elements.push(
          <pre
            key={key++}
            className="bg-foreground/5 border border-border p-4 overflow-x-auto text-xs font-mono my-4"
          >
            <code className="text-foreground">{codeLines.join('\n')}</code>
          </pre>
        )
        i++ // Skip closing ```
      }
      // Inline code (single backticks)
      else if (line.includes('`')) {
        const parts = line.split('`')
        const parsed = parts.map((part, idx) => {
          if (idx % 2 === 1) {
            return (
              <code
                key={`${key}-${idx}`}
                className="bg-foreground/5 px-1.5 py-0.5 text-xs font-mono border border-border"
              >
                {part}
              </code>
            )
          }
          return <span key={`${key}-${idx}`}>{part}</span>
        })
        elements.push(
          <div key={key++} className="my-2">
            {parsed}
          </div>
        )
        i++
      }
      // Bold text (**text**)
      else if (line.includes('**')) {
        const parts = line.split('**')
        const parsed = parts.map((part, idx) => {
          if (idx % 2 === 1) {
            return (
              <strong key={`${key}-${idx}`} className="font-semibold">
                {part}
              </strong>
            )
          }
          return <span key={`${key}-${idx}`}>{part}</span>
        })
        elements.push(<div key={key++} className="my-2">{parsed}</div>)
        i++
      }
      // Italic text (*text*)
      else if (line.match(/\*([^*]+)\*/)) {
        const parts = line.split(/(\*[^*]+\*)/)
        const parsed = parts.map((part, idx) => {
          if (part.startsWith('*') && part.endsWith('*')) {
            return (
              <em key={`${key}-${idx}`} className="italic">
                {part.slice(1, -1)}
              </em>
            )
          }
          return <span key={`${key}-${idx}`}>{part}</span>
        })
        elements.push(<div key={key++} className="my-2">{parsed}</div>)
        i++
      }
      // Headers
      else if (line.startsWith('###')) {
        elements.push(
          <h3 key={key++} className="text-lg font-medium mt-6 mb-3">
            {line.substring(3).trim()}
          </h3>
        )
        i++
      } else if (line.startsWith('##')) {
        elements.push(
          <h2 key={key++} className="text-xl font-medium mt-8 mb-4">
            {line.substring(2).trim()}
          </h2>
        )
        i++
      } else if (line.startsWith('#')) {
        elements.push(
          <h1 key={key++} className="text-2xl font-medium mt-10 mb-5">
            {line.substring(1).trim()}
          </h1>
        )
        i++
      }
      // Bullet points
      else if (line.trim().startsWith('-')) {
        const listItems: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('-')) {
          listItems.push(lines[i].trim().substring(1).trim())
          i++
        }
        elements.push(
          <ul key={key++} className="list-disc list-inside my-3 space-y-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="text-foreground">
                {item}
              </li>
            ))}
          </ul>
        )
      }
      // Empty line
      else if (line.trim() === '') {
        elements.push(<div key={key++} className="h-2" />)
        i++
      }
      // Regular paragraph
      else {
        elements.push(
          <p key={key++} className="my-2 text-foreground leading-relaxed">
            {line}
          </p>
        )
        i++
      }
    }

    return elements
  }

  return <div className="space-y-1">{parseContent(content)}</div>
}
