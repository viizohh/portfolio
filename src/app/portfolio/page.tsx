import Link from 'next/link'
import Image from 'next/image'
import { client, PORTFOLIO_QUERY, urlFor } from '@/lib/sanity'

async function getPortfolioItems() {
  try {
    return await client.fetch(PORTFOLIO_QUERY)
  } catch (error) {
    console.error('Error fetching portfolio:', error)
    return []
  }
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems()

  const categories = ['all', 'vulnerability', 'project', 'finding', 'work']

  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground font-mono mb-4">
          PORTFOLIO
        </h1>
        <p className="text-xl text-muted font-mono mb-12">
          Vulnerabilities, projects, and security research
        </p>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <Link
                key={item._id}
                href={`/portfolio/${item.slug.current}`}
                className="card group overflow-hidden hover:border-foreground/30 transition"
              >
                <div className="p-6">
                  <div className="relative aspect-video mb-4 bg-foreground/5 rounded overflow-hidden">
                    {item.coverImage && (
                      <Image
                        src={urlFor(item.coverImage).width(600).url()}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition duration-300"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-mono text-foreground">
                      {item.category}
                    </span>
                    {item.severity && (
                      <span className="text-xs font-mono text-muted">
                        {item.severity.toUpperCase()}
                      </span>
                    )}
                    {item.technologies?.slice(0, 2).map((tech: string) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-mono text-foreground mb-2 group-hover:opacity-60 transition">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-xs text-muted font-mono mt-4">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <p className="text-muted font-mono mb-4">
              No portfolio items yet.
            </p>
            <p className="text-muted font-mono text-sm">
              Add content via{' '}
              <Link href="/studio" className="text-foreground hover:opacity-60">
                Sanity Studio
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
