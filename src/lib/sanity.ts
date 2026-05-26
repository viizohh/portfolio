import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Queries
export const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  category,
  coverImage,
  description,
  severity,
  technologies,
  featured,
  publishedAt
}`

export const FEATURED_PORTFOLIO_QUERY = `*[_type == "portfolioItem" && featured == true] | order(publishedAt desc) [0...8] {
  _id,
  title,
  slug,
  category,
  coverImage,
  description,
  severity,
  publishedAt
}`

export const PORTFOLIO_ITEM_QUERY = `*[_type == "portfolioItem" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  coverImage,
  images,
  description,
  content,
  severity,
  cvss,
  cve,
  technologies,
  publishedAt
}`

export const BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  tags,
  publishedAt,
  featured
}`

export const BLOG_POST_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  content,
  tags,
  publishedAt
}`

export const RECENT_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt
}`
