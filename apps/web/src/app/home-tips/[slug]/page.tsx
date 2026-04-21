import type { Metadata } from 'next'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/api'
import BlogArticle from '@/components/blog/BlogArticle'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)
  if (!post) return { title: 'Not Found' }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: post.seo?.ogImage
      ? { images: [{ url: post.seo.ogImage.url }] }
      : undefined,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)

  if (!post) notFound()

  const RELATED_TARGET = 3

  // Fetch related posts (same category first, exclude current)
  const sameCategory = await getBlogPosts({ category: post.category, limit: RELATED_TARGET + 1 }).catch(() => ({
    docs: [],
  }))
  let relatedPosts = sameCategory.docs.filter((p) => p.id !== post.id).slice(0, RELATED_TARGET)

  // Top up from any category if the same-category pool is too small
  if (relatedPosts.length < RELATED_TARGET) {
    const fallback = await getBlogPosts({ limit: RELATED_TARGET + 5 }).catch(() => ({ docs: [] }))
    const extras = fallback.docs.filter(
      (p) => p.id !== post.id && !relatedPosts.some((r) => r.id === p.id),
    )
    relatedPosts = [...relatedPosts, ...extras].slice(0, RELATED_TARGET)
  }

  // Fetch all posts to find prev/next
  const allPosts = await getBlogPosts({ limit: 100 }).catch(() => ({ docs: [] }))
  const sortedPosts = allPosts.docs.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const currentIndex = sortedPosts.findIndex((p) => p.id === post.id)
  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null
  const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null

  // Sidebar pool: exclude current, cap for the client-side filter
  const sidebarPool = sortedPosts.filter((p) => p.id !== post.id).slice(0, 30)

  return (
    <BlogArticle
      post={post}
      relatedPosts={relatedPosts}
      sidebarPool={sidebarPool}
      prevPost={prevPost ? { title: prevPost.title, slug: prevPost.slug } : null}
      nextPost={nextPost ? { title: nextPost.title, slug: nextPost.slug } : null}
    />
  )
}
