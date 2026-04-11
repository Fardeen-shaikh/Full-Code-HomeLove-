'use client'

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
}

const CATEGORIES: Record<string, string> = {
  'home-tips': 'Home Tips',
  'trends-ideas': 'Trends & Ideas',
  'buying-guide': 'Buying Guide',
  'renovation': 'Renovation',
  'interior-design': 'Interior Design',
  'smart-home': 'Smart Home',
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
  prevPost,
  nextPost,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
  prevPost?: { title: string; slug: string } | null
  nextPost?: { title: string; slug: string } | null
}) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

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
                </div>
              </div>

              {/* More Posts */}
              {relatedPosts.length > 0 && (
                <div className="sidebar-card">
                  <h4>More Posts</h4>
                  <div className="sidebar-posts">
                    {relatedPosts.map((rp) => (
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
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      {(prevPost || nextPost) && (
        <section className="article-prev-next">
          <div className="container">
            <div className="prev-next-grid">
              {prevPost ? (
                <Link href={`/home-tips/${prevPost.slug}`} className="prev-next-card prev">
                  <span className="prev-next-label">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                    Previous Article
                  </span>
                  <span className="prev-next-title">{prevPost.title}</span>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={`/home-tips/${nextPost.slug}`} className="prev-next-card next">
                  <span className="prev-next-label">
                    Next Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                  </span>
                  <span className="prev-next-title">{nextPost.title}</span>
                </Link>
              ) : <div />}
            </div>
          </div>
        </section>
      )}

      {/* Next Event Promo */}
      <section className="article-event-promo">
        <div className="container">
          <h2>Visit the Next HOMElove Expo</h2>
          <p>Discover the latest home products, exclusive deals, and expert advice at our upcoming exhibitions.</p>
          <Link href="/exhibitions" className="btn btn-secondary">
            See Upcoming Events →
          </Link>
        </div>
      </section>
    </>
  )
}
