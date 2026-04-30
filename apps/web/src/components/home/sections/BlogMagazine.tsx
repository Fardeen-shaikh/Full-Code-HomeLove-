'use client'

import { useEffect, useRef, useState } from 'react'

export interface BlogPost {
  title: string
  slug: string
  category: string
  categoryLabel: string
  excerpt: string
  imageUrl: string
}

const DEFAULT_BLOGS: BlogPost[] = [
  {
    title: '10 Modern Kitchen Designs That Will Transform Your Cooking Space',
    slug: '#', category: 'home-tips', categoryLabel: 'Kitchen',
    excerpt: 'From single bowl to double bowl, undermount to top-mount — everything you need to know about picking the perfect kitchen sink.',
    imageUrl: 'https://www.homelove.com.my/sites/default/files/styles/slide_type_a/public/node/trend-idea/image/2025-02/1.jpg',
  },
  {
    title: 'How to Choose the Perfect Sofa for Your Malaysian Living Room',
    slug: '#', category: 'buying-guide', categoryLabel: 'Furniture',
    excerpt: 'Everything you need to consider before making this long-term investment in your home.',
    imageUrl: 'https://www.homelove.com.my/sites/default/files/styles/slide_type_a/public/node/trend-idea/image/2022-02/sofa%2012.jpeg',
  },
  {
    title: 'Modern Bathroom Interior Design: Achieving Luxury on a Budget',
    slug: '#', category: 'renovation', categoryLabel: 'Bathroom',
    excerpt: 'Explore the defining bathroom trends — from freestanding tubs to minimalist fixtures.',
    imageUrl: 'bathroom.png',
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  'home-tips': 'var(--secondary)',
  'trends-ideas': 'var(--orange)',
  'buying-guide': 'var(--orange)',
  'renovation': 'var(--primary)',
  'interior-design': 'var(--orange)',
  'smart-home': 'var(--secondary)',
}

function optimizedImg(src: string, width: number, quality = 75): string {
  if (!src || src.startsWith('data:')) return src
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
}

function FeaturedBlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="blog-card" style={{ gridRow: '1 / 3', borderRadius: 16, overflow: 'hidden' }}>
      <a href={`/home-tips/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div style={{ height: 280, overflow: 'hidden', position: 'relative' }}>
          <img
            src={optimizedImg(post.imageUrl, 750)}
            alt={post.categoryLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
            decoding="async"
            width={600}
            height={280}
          />
          <span
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: CATEGORY_COLORS[post.category] || 'var(--secondary)',
              color: 'white',
              padding: '5px 14px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {post.categoryLabel}
          </span>
        </div>
        <div className="blog-content" style={{ padding: 20 }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{post.title}</h3>
          <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.6 }}>{post.excerpt}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: 12,
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--primary)',
              textDecoration: 'none',
            }}
          >
            Read More →
          </span>
        </div>
      </a>
    </div>
  )
}

function SideBlogCard({ post }: { post: BlogPost }) {
  return (
    <div
      className="blog-card"
      style={{ display: 'grid', gridTemplateColumns: '300px 1fr', borderRadius: 16, overflow: 'hidden' }}
    >
      <a
        href={`/home-tips/${post.slug}`}
        style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}
      >
        <div style={{ overflow: 'hidden', position: 'relative', height: 180 }}>
          <img
            src={optimizedImg(post.imageUrl, 384)}
            alt={post.categoryLabel}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            loading="lazy"
            decoding="async"
            width={300}
            height={180}
          />
          <span
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: CATEGORY_COLORS[post.category] || 'var(--primary)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: 5,
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            {post.categoryLabel}
          </span>
        </div>
        <div
          className="blog-content"
          style={{ padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{post.title}</h3>
          <p style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.5 }}>{post.excerpt}</p>
          <span
            style={{
              display: 'inline-block',
              marginTop: 8,
              fontSize: '0.78rem',
              fontWeight: 700,
              color: 'var(--primary)',
              textDecoration: 'none',
            }}
          >
            Read More →
          </span>
        </div>
      </a>
    </div>
  )
}

export function BlogMagazine({ blogs }: { blogs?: BlogPost[] }) {
  const data = blogs && blogs.length > 0 ? blogs : DEFAULT_BLOGS
  const featured = data[0]
  const side = data.slice(1, 3)

  const gridRef = useRef<HTMLDivElement>(null)
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const handler = () => {
      const firstCard = grid.querySelector<HTMLElement>('.blog-card')
      if (!firstCard) return
      const cardWidth = firstCard.offsetWidth + 16
      setActiveDot(Math.round(grid.scrollLeft / cardWidth))
    }
    grid.addEventListener('scroll', handler, { passive: true })
    return () => grid.removeEventListener('scroll', handler)
  }, [])

  return (
    <section className="section blog">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 className="animate-on-scroll" style={{ marginBottom: 6 }}>Home Tips</h2>
          <p className="animate-on-scroll" style={{ color: 'var(--gray)', fontSize: 15 }}>
            Expert tips and design ideas for every room in your home.
          </p>
          <a
            href="/home-tips"
            style={{
              display: 'inline-block',
              marginTop: 16,
              padding: '10px 22px',
              border: '2px solid var(--primary)',
              color: 'var(--primary)',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 700,
              transition: 'all 0.2s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.background = 'var(--primary)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseOut={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--primary)'
            }}
          >
            View All Articles →
          </a>
        </div>
        <div
          ref={gridRef}
          className="animate-on-scroll blog-magazine"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          {featured && <FeaturedBlogCard post={featured} />}
          {side.map((post, i) => (
            <SideBlogCard key={i} post={post} />
          ))}
        </div>
        <span className="swipe-hint blog-swipe-hint">Swipe to see more</span>
        <div
          className="blog-dots"
          style={{ display: 'none', justifyContent: 'center', gap: 8, marginTop: 12 }}
        >
          {data.slice(0, 3).map((_, i) => (
            <span
              key={i}
              style={{
                width: 24,
                height: 4,
                borderRadius: 2,
                background: i === activeDot ? 'var(--primary)' : '#d1d5db',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
