import { WireframeHomepage } from '@/components/home/WireframeHomepage'
import { getExhibitions, getBlogPosts, mediaUrl } from '@/lib/api'

const CATEGORY_LABELS: Record<string, string> = {
  'home-tips': 'Home Tips',
  'trends-ideas': 'Trends & Ideas',
  'buying-guide': 'Buying Guide',
  'renovation': 'Renovation',
  'interior-design': 'Interior Design',
  'smart-home': 'Smart Home',
}

function formatDateRange(start: string, end: string) {
  const s = new Date(start)
  const e = new Date(end)
  return `${s.getDate()} ${s.toLocaleDateString('en-MY', { month: 'short' })} – ${e.getDate()} ${e.toLocaleDateString('en-MY', { month: 'short' })}`
}

export default async function Home() {
  const [exhibitions, blogPosts] = await Promise.all([
    getExhibitions({ upcoming: true, limit: 3 }).catch(() => ({ docs: [] })),
    getBlogPosts({ limit: 3 }).catch(() => ({ docs: [] })),
  ])

  const events = exhibitions.docs.map((e) => ({
    title: e.title,
    slug: e.slug,
    venue: e.venue,
    state: e.state,
    date: formatDateRange(e.startDate, e.endDate),
    imageUrl: mediaUrl(e.bannerImage) || '',
    days: Math.ceil((new Date(e.endDate).getTime() - new Date(e.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1,
  }))

  const blogs = blogPosts.docs.map((b) => ({
    title: b.title,
    slug: b.slug,
    category: b.category,
    categoryLabel: CATEGORY_LABELS[b.category] || b.category,
    excerpt: b.excerpt,
    imageUrl: mediaUrl(b.featuredImage) || '',
  }))

  return <WireframeHomepage events={events} blogs={blogs} />
}
