'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost, Exhibition } from '@/lib/api'
import { mediaUrl, getExhibitions } from '@/lib/api'
import '../exhibitions/exhibitions.css'
import './blog.css'

function formatMonth(date: string) {
  return new Date(date).toLocaleDateString('en-MY', { month: 'short' }).toUpperCase()
}
function formatDay(date: string) {
  return new Date(date).getDate()
}
function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  const month = s.toLocaleDateString('en-MY', { month: 'short' })
  const year = s.getFullYear()
  return `${s.getDate()} – ${e.getDate()} ${month} ${year}`
}
function daysUntil(date: string) {
  const diff = new Date(date).getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
function isLive(start: string, end: string) {
  const now = Date.now()
  const endOfDay = new Date(end)
  endOfDay.setHours(23, 59, 59, 999)
  const startOfDay = new Date(start)
  startOfDay.setHours(0, 0, 0, 0)
  return startOfDay.getTime() <= now && endOfDay.getTime() >= now
}

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Home Tips', value: 'home-tips' },
  { label: 'Trends & Ideas', value: 'trends-ideas' },
  { label: 'Buying Guide', value: 'buying-guide' },
  { label: 'Renovation', value: 'renovation' },
  { label: 'Interior Design', value: 'interior-design' },
  { label: 'Smart Home', value: 'smart-home' },
]

const FALLBACK_SUGGESTIONS = [
  "Search articles…",
  "Try 'home tips'",
  "Try 'renovation'",
  "Try 'interior design'",
  "Try 'smart home'",
]

// Pull short keyword phrases from real titles so any suggestion is guaranteed to match
function buildSuggestionsFromTitles(titles: string[]): string[] {
  const stopwords = new Set([
    'the', 'a', 'an', 'and', 'or', 'of', 'for', 'to', 'in', 'on', 'with',
    'your', 'you', 'at', 'is', 'how', 'why', 'what', 'when', 'best', 'top',
    'guide', 'tips', '5', '7', '10', '2026', '2025',
  ])
  const phrases = new Set<string>()
  for (const t of titles) {
    if (!t) continue
    const words = t.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean)
    const kept = words.filter((w) => w.length > 2 && !stopwords.has(w))
    for (let i = 0; i < kept.length - 1 && phrases.size < 6; i++) {
      phrases.add(`${kept[i]} ${kept[i + 1]}`)
    }
    if (phrases.size >= 6) break
  }
  return phrases.size > 0
    ? Array.from(phrases).map((p) => `Try '${p}'`)
    : FALLBACK_SUGGESTIONS
}

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
  const [suggestionIdx, setSuggestionIdx] = useState(0)
  const [searchFocused, setSearchFocused] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Exhibition[]>([])

  const currentCategory = searchParams.category || ''
  const q = searchQuery.trim().toLowerCase()
  const isSearching = q.length > 0
  const PAGE_SIZE = 6

  const suggestions = buildSuggestionsFromTitles(posts.map((p) => p.title || ''))

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

  useEffect(() => {
    if (searchFocused || searchQuery.length > 0) return
    const id = setInterval(() => {
      setSuggestionIdx((i) => (i + 1) % suggestions.length)
    }, 2800)
    return () => clearInterval(id)
  }, [searchFocused, searchQuery, suggestions.length])

  useEffect(() => {
    getExhibitions({ upcoming: true, limit: 3 })
      .then((res) => setUpcomingEvents(res.docs || []))
      .catch(() => setUpcomingEvents([]))
  }, [])

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
              placeholder={suggestions[suggestionIdx % suggestions.length]}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
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
                {cat.label}
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

      {/* Checkout Upcoming Expos — appears after all blogs are revealed */}
      {!isSearching && !loading && !hasMore && posts.length > 0 && upcomingEvents.length > 0 && (
        <section className="blog-upcoming">
          <div className="container">
            <div className="blog-upcoming-header">
              <h2>Checkout Upcoming Expos</h2>
              <p>Bring your ideas to life — visit a HOMElove expo near you and see everything in one place</p>
            </div>
            <div className="exh-grid">
              {upcomingEvents.map((exh) => (
                <Link href={`/exhibitions/${exh.slug}`} key={exh.id} className="exh-card upcoming">
                  <div className="exh-card-image">
                    <Image
                      src={mediaUrl(exh.bannerImage) || '/images/events/event-kuching.png'}
                      alt={exh.bannerImage?.alt || exh.title}
                      width={640}
                      height={360}
                      sizes="(max-width: 768px) 100vw, 400px"
                      quality={75}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="exh-card-status-bar">
                    {isLive(exh.startDate, exh.endDate) ? (
                      <div className="exh-status-live">
                        <span className="live-dot" />LIVE NOW
                      </div>
                    ) : (
                      <div className="exh-status-countdown">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {daysUntil(exh.startDate)} days to go
                      </div>
                    )}
                    <span className="exh-status-state">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {exh.state}
                    </span>
                  </div>
                  <div className="exh-card-body">
                    <div className="exh-card-date-strip">
                      <div className="date-block">
                        <span className="date-month">{formatMonth(exh.startDate)}</span>
                        <span className="date-day">{formatDay(exh.startDate)}</span>
                      </div>
                      <div className="date-details">
                        <div className="exh-card-dates">{formatDateRange(exh.startDate, exh.endDate)}</div>
                        <div className="exh-card-location">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                          </svg>
                          {exh.state}
                        </div>
                      </div>
                    </div>
                    <h3>{exh.title}</h3>
                    <p className="exh-card-venue">{exh.venue}</p>
                    <div className="exh-card-footer">
                      {exh.brandCount && <span className="exh-brands-count">{exh.brandCount}+ brands</span>}
                      <span className="exh-card-cta">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="blog-upcoming-cta">
              <Link href="/exhibitions" className="btn btn-secondary">See All Exhibitions →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
