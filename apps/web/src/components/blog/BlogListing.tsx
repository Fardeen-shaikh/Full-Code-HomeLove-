'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/api'
import { mediaUrl } from '@/lib/api'
import './blog.css'

const CAT_ICONS = {
  all: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  homeTips: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10c0-1 .5-2 1.5-3L10 3.5a3 3 0 014 0L18.5 7c1 1 1.5 2 1.5 3v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" /><path d="M9 14h6" /><path d="M12 11v6" />
    </svg>
  ),
  trends: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 17 9 11 13 15 21 7" /><polyline points="15 7 21 7 21 13" />
    </svg>
  ),
  buying: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
    </svg>
  ),
  renovation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  interior: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18h18" /><path d="M5 18v-6a2 2 0 012-2h10a2 2 0 012 2v6" /><path d="M8 10V7a2 2 0 012-2h4a2 2 0 012 2v3" /><line x1="4" y1="21" x2="4" y2="18" /><line x1="20" y1="21" x2="20" y2="18" />
    </svg>
  ),
  smart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2.5" /><line x1="12" y1="18" x2="12" y2="18.01" />
    </svg>
  ),
}

const CATEGORIES = [
  { label: 'All', value: '', icon: CAT_ICONS.all },
  { label: 'Home Tips', value: 'home-tips', icon: CAT_ICONS.homeTips },
  { label: 'Trends & Ideas', value: 'trends-ideas', icon: CAT_ICONS.trends },
  { label: 'Buying Guide', value: 'buying-guide', icon: CAT_ICONS.buying },
  { label: 'Renovation', value: 'renovation', icon: CAT_ICONS.renovation },
  { label: 'Interior Design', value: 'interior-design', icon: CAT_ICONS.interior },
  { label: 'Smart Home', value: 'smart-home', icon: CAT_ICONS.smart },
]

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function BlogListing({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ category?: string; page?: string }>
}) {
  const searchParams = use(searchParamsPromise)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalDocs, setTotalDocs] = useState(0)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const currentCategory = searchParams.category || ''
  const q = searchQuery.trim().toLowerCase()
  const isSearching = q.length > 0
  const PAGE_SIZE = 6

  const visiblePosts = isSearching
    ? posts.filter(
        (p) => p.title?.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q),
      )
    : posts

  const matchCount = visiblePosts.length
  const hasMore = page < totalPages

  useEffect(() => {
    setLoading(true)
    setPage(1)
    const url = new URL(`${API_URL}/api/blog-posts`)
    url.searchParams.set('limit', String(PAGE_SIZE))
    url.searchParams.set('page', '1')
    url.searchParams.set('sort', '-publishedAt')
    url.searchParams.set('depth', '1')
    if (currentCategory) {
      url.searchParams.set('where[category][equals]', currentCategory)
    }

    fetch(url.toString())
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.docs || [])
        setTotalPages(data.totalPages || 1)
        setTotalDocs(data.totalDocs || 0)
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [currentCategory])

  async function loadMore() {
    if (loadingMore || !hasMore) return
    setLoadingMore(true)
    const nextPage = page + 1
    const url = new URL(`${API_URL}/api/blog-posts`)
    url.searchParams.set('limit', String(PAGE_SIZE))
    url.searchParams.set('page', String(nextPage))
    url.searchParams.set('sort', '-publishedAt')
    url.searchParams.set('depth', '1')
    if (currentCategory) {
      url.searchParams.set('where[category][equals]', currentCategory)
    }
    try {
      const res = await fetch(url.toString())
      const data = await res.json()
      setPosts((prev) => [...prev, ...(data.docs || [])])
      setPage(nextPage)
    } catch {
      // Silent fail — user can retry
    } finally {
      setLoadingMore(false)
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-MY', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  function categoryLabel(value: string) {
    return CATEGORIES.find((c) => c.value === value)?.label || value
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="blog-hero">
        <div className="blog-hero-overlay" />
        <div className="container">
          <div className="blog-hero-content">
            <h1>Home Tips</h1>
            <p>Ideas, guides, and inspiration for your home</p>
          </div>
        </div>
      </section>

      {/* Search Bar — desktop only */}
      <section className="blog-search">
        <div className="container">
          <div className="blog-search-wrap">
            <svg className="blog-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            <input
              type="search"
              placeholder="Search articles by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button
                type="button"
                className="blog-search-clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          {isSearching && (
            <p className="blog-search-status">
              {matchCount > 0
                ? `${matchCount} result${matchCount === 1 ? '' : 's'} for "${searchQuery}"`
                : `No results for "${searchQuery}"`}
            </p>
          )}
        </div>
      </section>

      {/* Category Filter */}
      <section className="blog-filter">
        <div className="container">
          <div className="filter-bar">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={cat.value ? `/home-tips?category=${cat.value}` : '/home-tips'}
                className={`filter-chip${currentCategory === cat.value ? ' active' : ''}`}
              >
                <span className="filter-chip-icon" aria-hidden="true">{cat.icon}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="blog-grid-section">
        <div className="container">
          {loading ? (
            <div className="blog-loading">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="blog-card-skeleton">
                  <div className="skeleton-image" />
                  <div className="skeleton-content">
                    <div className="skeleton-line wide" />
                    <div className="skeleton-line" />
                    <div className="skeleton-line short" />
                  </div>
                </div>
              ))}
            </div>
          ) : visiblePosts.length === 0 ? (
            <div className="blog-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3>{isSearching ? 'No matching articles' : 'No articles yet'}</h3>
              <p>
                {isSearching
                  ? `We couldn't find any articles matching "${searchQuery}". Try a different keyword or browse by category.`
                  : 'Check back soon for home tips, trends, and ideas.'}
              </p>
              {isSearching && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSearchQuery('')}
                  style={{ marginTop: '16px' }}
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {visiblePosts.map((post, i) => (
                  <Link
                    href={`/home-tips/${post.slug}`}
                    key={post.id}
                    className="blog-card blog-card-reveal"
                    style={{ animationDelay: `${(i % PAGE_SIZE) * 70}ms` }}
                  >
                    <div className="blog-card-image">
                      <Image
                        src={mediaUrl(post.featuredImage) || '/images/blog/kitchen-design.jpg'}
                        alt={post.featuredImage?.alt || post.title}
                        width={400}
                        height={250}
                        quality={75}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="blog-card-body">
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="blog-card-meta">
                        <time>{formatDate(post.publishedAt)}</time>
                        {post.author && <span>{post.author}</span>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Load More */}
              {!isSearching && hasMore && (
                <div className="blog-load-more-wrap">
                  <button
                    type="button"
                    onClick={loadMore}
                    disabled={loadingMore}
                    className="blog-load-more-btn"
                  >
                    {loadingMore ? (
                      <>
                        <span className="blog-load-spinner" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Articles
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="blog-load-more-count">
                    Showing {posts.length} of {totalDocs} articles
                  </p>
                </div>
              )}
              {!isSearching && !hasMore && posts.length > PAGE_SIZE && (
                <p className="blog-load-more-done">You&apos;ve reached the end — {totalDocs} articles</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
