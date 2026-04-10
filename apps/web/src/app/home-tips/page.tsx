import type { Metadata } from 'next'
import BlogListing from '@/components/blog/BlogListing'

export const metadata: Metadata = {
  title: 'Home Tips',
  description:
    'Explore home tips, trends & ideas, buying guides, renovation advice, and more from HOMElove — Malaysia\'s premier home & living exhibition.',
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  return <BlogListing searchParamsPromise={searchParams} />
}
