'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { BlogPost } from '@/lib/api'
import { mediaUrl } from '@/lib/api'
import './blog.css'

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Home Tips', value: 'home-tips' },
  { label: 'Trends & Ideas', value: 'trends-ideas' },
  { label: 'Buying Guide', value: 'buying-guide' },
  { label: 'Renovation', value: 'renovation' },
  { label: 'Interior Design', value: 'interior-design' },
  { label: 'Smart Home', value: 'smart-home' },
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
    </>
  )
}
