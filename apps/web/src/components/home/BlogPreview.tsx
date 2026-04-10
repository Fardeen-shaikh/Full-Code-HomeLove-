import Link from 'next/link'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

interface BlogData {
  title: string
  slug: string
  category: string
  excerpt: string
  image: string
}

const CATEGORY_COLORS: Record<string, string> = {
  'home-tips': 'bg-secondary',
  'trends-ideas': 'bg-orange',
  'buying-guide': 'bg-primary',
  'renovation': 'bg-primary',
  'interior-design': 'bg-orange',
  'smart-home': 'bg-secondary',
}

const CATEGORY_LABELS: Record<string, string> = {
  'home-tips': 'Home Tips',
  'trends-ideas': 'Trends & Ideas',
  'buying-guide': 'Buying Guide',
  'renovation': 'Renovation',
  'interior-design': 'Interior Design',
  'smart-home': 'Smart Home',
}

const FALLBACK_FEATURED: BlogData = {
  title: '10 Modern Kitchen Designs That Will Transform Your Cooking Space',
  slug: '#',
  category: 'home-tips',
  excerpt: 'From single bowl to double bowl, undermount to top-mount — everything you need to know about picking the perfect kitchen sink for your cooking style.',
  image: '/images/blog/kitchen-design.jpg',
}

const FALLBACK_SIDE: BlogData[] = [
  { title: 'How to Choose the Perfect Sofa for Your Malaysian Living Room', slug: '#', category: 'buying-guide', excerpt: 'Everything you need to consider before making this long-term investment.', image: '/images/blog/sofa-guide.jpeg' },
  { title: 'Modern Bathroom Interior Design: Achieving Luxury on a Budget', slug: '#', category: 'renovation', excerpt: 'Explore the defining bathroom trends — from freestanding tubs to minimalist fixtures.', image: '/images/blog/bathroom.png' },
]

export default function BlogPreview({ blogs }: { blogs?: BlogData[] }) {
  const FEATURED = blogs && blogs.length > 0 ? blogs[0] : FALLBACK_FEATURED
  const SIDE_POSTS = blogs && blogs.length > 1 ? blogs.slice(1, 3) : FALLBACK_SIDE
  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mb-1.5">Home Tips</h2>
          <p className="text-gray text-[15px]">Expert tips and design ideas for every room in your home.</p>
          <Link
            href="/home-tips"
            className="inline-block mt-4 px-5 py-2.5 border-2 border-primary text-primary rounded-lg text-[13px] font-bold hover:bg-primary hover:text-white transition-all duration-200"
          >
            View All Articles →
          </Link>
        </AnimateOnScroll>

        {/* Magazine layout: 1 big left + 2 small right */}
        <AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Big card — left, spans 2 rows */}
            <Link href={`/home-tips/${FEATURED.slug}`} className="block group lg:row-span-2">
              <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-400 h-full">
                <div className="h-[280px] overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={FEATURED.image}
                    alt={FEATURED.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                  <span className={`absolute top-3 left-3 ${CATEGORY_COLORS[FEATURED.category] || 'bg-primary'} text-white px-3.5 py-1 rounded-md text-[11px] font-bold uppercase`}>
                    {CATEGORY_LABELS[FEATURED.category] || FEATURED.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-[1.2rem] font-bold text-dark mb-2 leading-snug group-hover:text-primary transition-colors duration-300">
                    {FEATURED.title}
                  </h3>
                  <p className="text-[0.85rem] text-[#888] leading-relaxed">{FEATURED.excerpt}</p>
                  <span className="inline-block mt-3 text-[0.82rem] font-bold text-primary">Read More →</span>
                </div>
              </article>
            </Link>

            {/* Two horizontal cards — right, stacked */}
            {SIDE_POSTS.map((post) => (
              <Link key={post.title} href={`/home-tips/${post.slug}`} className="block group">
                <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-400 grid grid-cols-1 sm:grid-cols-[300px_1fr] h-full">
                  {/* Image — left */}
                  <div className="h-[180px] overflow-hidden relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                    <span className={`absolute top-2.5 left-2.5 ${CATEGORY_COLORS[post.category] || 'bg-primary'} text-white px-3 py-1 rounded-[5px] text-[10px] font-bold uppercase`}>
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                  </div>
                  {/* Text — right */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-base font-bold text-dark mb-1.5 leading-snug group-hover:text-primary transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-[0.78rem] text-[#888] leading-relaxed">{post.excerpt}</p>
                    <span className="inline-block mt-2 text-[0.78rem] font-bold text-primary">Read More →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
