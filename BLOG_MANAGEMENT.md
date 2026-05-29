# Blog Management Guide

This document explains how to manage blog entries and restore blog visibility on your portfolio website.

## Current Status

**Blog is currently HIDDEN from navigation.** The blog pages and functionality are still present in the codebase, but the navigation link has been commented out in the Header component.

---

## Adding Blog Entries

Blog entries are hardcoded in the `src/data/blog.ts` file. This file exports a `blogEntries` array containing all blog posts.

### Blog Entry Data Structure

Each blog entry is an object with the following fields:

```typescript
interface BlogEntry {
  id: string           // Unique identifier for the entry
  date: string         // Publication date in YYYY-MM-DD format
  title: string        // Blog post title
  content: string      // Blog post content (supports multi-line text)
  tags?: string[]      // Optional array of tag strings
}
```

### Example Blog Entry

Here's a complete example showing all fields:

```typescript
{
  id: '4',
  date: '2026-05-28',
  title: 'My Latest Discovery',
  content: `This is the main content of my blog entry.

You can write multiple paragraphs here.

The content supports basic markdown-style formatting and line breaks.`,
  tags: ['security', 'research', 'testing'],
}
```

### Date Format Requirement

**CRITICAL:** The `date` field MUST follow the `YYYY-MM-DD` format exactly:
- ✅ Correct: `'2026-05-28'`
- ❌ Wrong: `'05-28-2026'`, `'2026/05/28'`, `'May 28, 2026'`

The blog system uses this format to organize entries by month and day.

### Where to Add Entries

**File path:** `src/data/blog.ts`

To add a new blog entry:

1. Open `src/data/blog.ts`
2. Locate the `blogEntries` array (starts around line 10)
3. Add your new entry object to the array
4. Save the file

Example:

```typescript
export const blogEntries: BlogEntry[] = [
  {
    id: '3',
    date: '2026-05-27',
    title: "first entry",
    content: "Hey guys, welcome to my blog...",
  },
  // Add your new entry here:
  {
    id: '4',
    date: '2026-05-28',
    title: 'Your New Post Title',
    content: `Your blog post content here.`,
    tags: ['tag1', 'tag2'],
  },
]
```

**Tips:**
- Use unique sequential IDs ('1', '2', '3', etc.)
- Entries can be in any order in the array - the blog system sorts them by date
- The `tags` field is optional and can be omitted
- Use backticks (\`) for multi-line content

---

## Restoring Blog Visibility

When you're ready to make the blog visible again on your website, follow these steps:

### Step 1: Uncomment the Navigation Link

Open `src/components/Header.tsx` and locate the commented-out blog link (around lines 31-37):

```tsx
{/* Blog link hidden - see BLOG_MANAGEMENT.md for restoration instructions */}
{/* <Link
  href="/blog"
  className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
>
  Blog
</Link> */}
```

**Remove the comment markers** to restore the link:

```tsx
<Link
  href="/blog"
  className="text-foreground hover:text-muted transition-colors duration-300 text-sm"
>
  Blog
</Link>
```

You can also remove the comment line `{/* Blog link hidden - see BLOG_MANAGEMENT.md for restoration instructions */}` above it.

### Step 2: Save and Build

That's it! The blog routes automatically work when the navigation link is restored. No additional changes needed.

The following blog functionality will immediately become available:
- `/blog` - Blog home page (shows current month)
- `/blog/YYYY-MM` - Month view (e.g., `/blog/2026-05`)
- `/blog/YYYY-MM/DD` - Day view (e.g., `/blog/2026-05/28`)
- `/blog/admin` - Admin panel (access via "secret" button on blog home)

### Step 3: Test

Run your development server to verify:

```bash
npm run dev
```

Visit http://localhost:3000 and confirm the Blog link appears in the navigation.

---

## Blog System Architecture

For reference, here's how the blog system is organized:

**Data Layer:**
- `src/data/blog.ts` - Blog entries and helper functions

**Page Routes:**
- `src/app/blog/page.tsx` - Blog home page
- `src/app/blog/[month]/page.tsx` - Month view page
- `src/app/blog/[month]/[day]/page.tsx` - Day view page
- `src/app/blog/admin/page.tsx` - Admin panel

**API Routes:**
- `src/app/api/blog/auth/route.ts` - Authentication
- `src/app/api/blog/create/route.ts` - Entry creation

**Navigation:**
- `src/components/Header.tsx` - Main site navigation (where blog link lives)

All of these files remain intact when the blog is hidden. Only the navigation link is commented out.

---

## Questions?

If you need to modify blog functionality beyond adding entries, refer to the files listed in the architecture section above. The blog system is fully functional and self-contained.
