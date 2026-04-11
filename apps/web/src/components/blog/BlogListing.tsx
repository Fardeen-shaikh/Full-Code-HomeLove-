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
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  const currentCategory = searchParams.category || ''
  const currentPage = parseInt(searchParams.page || '1', 10)

  useEffect(() => {
    setLoading(true)
    const url = new URL(`${API_URL}/api/blog-posts`)
    url.searchParams.set('limit', '9')
    url.searchParams.set('page', String(currentPage))
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
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [currentCategory, currentPage])

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
          ) : posts.length === 0 ? (
            <div className="blog-empty">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gray)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <h3>No articles yet</h3>
              <p>Check back soon for home tips, trends, and ideas.</p>
            </div>
          ) : (
            <>
              <div className="blog-grid">
                {posts.map((post) => (
                  <Link href={`/home-tips/${post.slug}`} key={post.id} className="blog-card">
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
                      <span className="blog-card-category">{categoryLabel(post.category)}</span>
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

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="blog-pagination">
                  {currentPage > 1 && (
                    <Link
                      href={`/home-tips?${currentCategory ? `category=${currentCategory}&` : ''}page=${currentPage - 1}`}
                      className="pagination-btn"
                    >
                      ← Previous
                    </Link>
                  )}
                  <span className="pagination-info">
                    Page {currentPage} of {totalPages}
                  </span>
                  {currentPage < totalPages && (
                    <Link
                      href={`/home-tips?${currentCategory ? `category=${currentCategory}&` : ''}page=${currentPage + 1}`}
                      className="pagination-btn"
                    >
                      Next →
                    </Link>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
