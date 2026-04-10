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

  // Fetch related posts (same category, exclude current)
  const related = await getBlogPosts({ category: post.category, limit: 4 }).catch(() => ({
    docs: [],
  }))
  const relatedPosts = related.docs.filter((p) => p.id !== post.id).slice(0, 3)

  return <BlogArticle post={post} relatedPosts={relatedPosts} />
}
