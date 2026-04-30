'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/api'
import { mediaUrl } from '@/lib/api'
import './blog.css'

const SHARE_ICONS = {
  facebook: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  whatsapp: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.65a8.16 8.16 0 004.77 1.52V6.73a4.85 4.85 0 01-1.84-.04z" />
    </svg>
  ),
  xhs: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 5h18v14H3V5zm2.6 3.4v7.2h1.7v-2.7h.6l1.4 2.7h2L9.6 12.6c.7-.3 1.1-.9 1.1-1.7 0-1.3-.9-2-2.4-2H5.6zm1.7 1.4h1c.6 0 1 .3 1 .8s-.4.8-1 .8h-1V9.8zm5.2-1.4v7.2h4.5v-1.5h-2.9v-1.5h2.4v-1.5h-2.4v-1.2h2.8V8.4h-4.4z" />
    </svg>
  ),
}

const CATEGORIES: Record<string, string> = {
  'home-electronics': 'Home Electronics',
  'interior-design-renovation': 'Interior Design & Renovation',
  'kitchen-appliances': 'Kitchen Appliances',
  'furniture-furnishing': 'Mattress, Sofa, Dining Sets & Soft Furnishing',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function renderRichText(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return content

  // Payload Lexical rich text format
  const root = content as { root?: { children?: unknown[] } }
  if (root?.root?.children) {
    return renderNodes(root.root.children)
  }

  return JSON.stringify(content)
}

function renderNodes(nodes: unknown[]): string {
  return nodes
    .map((node) => {
      const n = node as Record<string, unknown>
      if (n.type === 'paragraph') {
        const children = n.children as unknown[]
        return `<p>${renderNodes(children || [])}</p>`
      }
      if (n.type === 'heading') {
        const tag = n.tag || 'h2'
        const children = n.children as unknown[]
        return `<${tag}>${renderNodes(children || [])}</${tag}>`
      }
      if (n.type === 'list') {
        const tag = n.listType === 'number' ? 'ol' : 'ul'
        const children = n.children as unknown[]
        return `<${tag}>${renderNodes(children || [])}</${tag}>`
      }
      if (n.type === 'listitem') {
        const children = n.children as unknown[]
        return `<li>${renderNodes(children || [])}</li>`
      }
      if (n.type === 'link') {
        const children = n.children as unknown[]
        const fields = n.fields as Record<string, unknown>
        return `<a href="${fields?.url || '#'}" target="_blank" rel="noopener noreferrer">${renderNodes(children || [])}</a>`
      }
      if (n.type === 'text' || n.text !== undefined) {
        let text = String(n.text || '')
        if (n.format) {
          const fmt = n.format as number
          if (fmt & 1) text = `<strong>${text}</strong>`
          if (fmt & 2) text = `<em>${text}</em>`
          if (fmt & 8) text = `<u>${text}</u>`
        }
        return text
      }
      if (n.type === 'linebreak') return '<br />'
      return ''
    })
    .join('')
}

export default function BlogArticle({
  post,
  relatedPosts,
  sidebarPool,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
  sidebarPool?: BlogPost[]
  prevPost?: { title: string; slug: string } | null
  nextPost?: { title: string; slug: string } | null
}) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title
  const [copiedTarget, setCopiedTarget] = useState<string | null>(null)

  function copyShareLink(target: string) {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard.writeText(`${shareTitle} ${shareUrl}`).then(() => {
      setCopiedTarget(target)
      setTimeout(() => setCopiedTarget(null), 1800)
    }).catch(() => {})
  }

  const MORE_POSTS_LIMIT = 5
  const [morePostsCategory, setMorePostsCategory] = useState<string>('')

  // Use sidebarPool if provided, else fallback to relatedPosts
  const pool = sidebarPool && sidebarPool.length > 0 ? sidebarPool : relatedPosts

  const filteredMorePosts = useMemo(() => {
    const src = morePostsCategory
      ? pool.filter((p) => p.category === morePostsCategory)
      : pool
    return src.slice(0, MORE_POSTS_LIMIT)
  }, [pool, morePostsCategory])

  // Only show categories that actually have posts in the pool
  const availableCategories = useMemo(() => {
    const set = new Set(pool.map((p) => p.category))
    return Object.entries(CATEGORIES).filter(([value]) => set.has(value))
  }, [pool])

  return (
    <>
      {/* Hero */}
      <section className="article-hero">
        <div className="article-hero-overlay" />
        <Image
          src={mediaUrl(post.featuredImage) || '/images/blog/kitchen-design.jpg'}
          alt={post.featuredImage?.alt || post.title}
          className="article-hero-bg"
          fill
          sizes="100vw"
          quality={75}
          priority
          style={{ objectFit: 'cover' }}
        />
        <div className="container">
          <div className="article-hero-content">
            <Link href={`/home-tips?category=${post.category}`} className="article-category-link">
              {CATEGORIES[post.category] || post.category}
            </Link>
            <h1>{post.title}</h1>
            <div className="article-meta">
              <time>{formatDate(post.publishedAt)}</time>
              {post.author && (
                <>
                  <span className="meta-dot" />
                  <span>{post.author}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="article-content-section">
        <div className="container">
          <div className="article-layout">
            {/* Main content */}
            <article
              className="article-body"
              dangerouslySetInnerHTML={{ __html: renderRichText(post.content) }}
            />

            {/* Sidebar */}
            <aside className="article-sidebar">
              {/* Share */}
              <div className="sidebar-card">
                <h4>Share</h4>
                <div className="share-icons">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-fb"
                    aria-label="Share on Facebook"
                  >
                    {SHARE_ICONS.facebook}
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-tw"
                    aria-label="Share on X"
                  >
                    {SHARE_ICONS.twitter}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + ' ' + shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-wa"
                    aria-label="Share on WhatsApp"
                  >
                    {SHARE_ICONS.whatsapp}
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn share-li"
                    aria-label="Share on LinkedIn"
                  >
                    {SHARE_ICONS.linkedin}
                  </a>
                  <button
                    type="button"
                    onClick={() => copyShareLink('tiktok')}
                    className="share-btn share-tt"
                    aria-label="Copy link to share on TikTok"
                  >
                    {SHARE_ICONS.tiktok}
                    {copiedTarget === 'tiktok' && <span className="share-tooltip">Link copied!</span>}
                  </button>
                  <button
                    type="button"
                    onClick={() => copyShareLink('xhs')}
                    className="share-btn share-xhs"
                    aria-label="Copy link to share on Xiaohongshu (RedNote)"
                  >
                    {SHARE_ICONS.xhs}
                    {copiedTarget === 'xhs' && <span className="share-tooltip">Link copied!</span>}
                  </button>
                </div>
              </div>

              {/* Visit Next Expo CTA */}
              <div className="sidebar-card sidebar-expo-cta">
                <div className="sidebar-expo-icon" aria-hidden="true">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h4>Visit the Next HOMElove Expo</h4>
                <p>Discover top home deals, trusted brands, and fresh ideas for your home.</p>
                <Link href="/exhibitions" className="sidebar-expo-btn">
                  See Upcoming Events
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>

              {/* More Posts — with category filter */}
              {filteredMorePosts.length > 0 && (
                <div className="sidebar-card">
                  <div className="sidebar-more-head">
                    <h4>More Posts</h4>
                    {availableCategories.length > 1 && (
                      <select
                        className="sidebar-more-filter"
                        value={morePostsCategory}
                        onChange={(e) => setMorePostsCategory(e.target.value)}
                        aria-label="Filter more posts by category"
                      >
                        <option value="">All</option>
                        {availableCategories.map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  <div className="sidebar-posts">
                    {filteredMorePosts.map((rp) => (
                      <Link href={`/home-tips/${rp.slug}`} key={rp.id} className="sidebar-post">
                        <div className="sidebar-post-image">
                          <Image
                            src={mediaUrl(rp.featuredImage) || '/images/blog/kitchen-design.jpg'}
                            alt={rp.featuredImage?.alt || rp.title}
                            width={80}
                            height={60}
                            quality={75}
                            loading="lazy"
                            sizes="80px"
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          />
                        </div>
                        <div className="sidebar-post-info">
                          <span className="sidebar-post-title">{rp.title}</span>
                          <time>{formatDate(rp.publishedAt)}</time>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {morePostsCategory && filteredMorePosts.length === 0 && (
                    <p className="sidebar-more-empty">No posts in this category yet.</p>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="article-related">
          <div className="container">
            <h2 className="article-related-title">You Might Also Like</h2>
            <div className="blog-grid article-related-grid">
              {relatedPosts.slice(0, 3).map((rp) => (
                <Link
                  href={`/home-tips/${rp.slug}`}
                  key={rp.id}
                  className="blog-card"
                >
                  <div className="blog-card-image">
                    <Image
                      src={mediaUrl(rp.featuredImage) || '/images/blog/kitchen-design.jpg'}
                      alt={rp.featuredImage?.alt || rp.title}
                      width={400}
                      height={250}
                      quality={75}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                  <div className="blog-card-body">
                    <h3>{rp.title}</h3>
                    <p>{rp.excerpt}</p>
                    <div className="blog-card-meta">
                      <time>{formatDate(rp.publishedAt)}</time>
                      {rp.author && <span>{rp.author}</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  )
}
