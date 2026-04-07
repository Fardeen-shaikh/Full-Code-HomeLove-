import Link from 'next/link'

const POSTS = [
  {
    title: '10 Modern Kitchen Designs That Will Transform Your Cooking Space',
    category: 'Trends & Ideas',
    date: 'Mar 15, 2026',
    excerpt: 'Explore the latest kitchen design trends from minimalist to industrial styles.',
  },
  {
    title: 'How to Choose the Perfect Sofa for Your Malaysian Living Room',
    category: 'Home Tips',
    date: 'Mar 10, 2026',
    excerpt: 'A complete guide to selecting the right sofa for your space and lifestyle.',
  },
  {
    title: 'Modern Bathroom Interior Design: Achieving Luxury on a Budget',
    category: 'Interior Design',
    date: 'Mar 5, 2026',
    excerpt: 'Transform your bathroom into a spa-like retreat without breaking the bank.',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Blog</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Trends &amp; Ideas</h2>
          <p className="text-gray mt-3">Get inspired for your next home project.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <span className="text-5xl opacity-20">📷</span>
              </div>
              <div className="p-5">
                <span className="text-primary text-xs font-semibold">{post.category}</span>
                <h3 className="font-bold text-dark mt-1 leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray text-sm mt-2 leading-relaxed">{post.excerpt}</p>
                <p className="text-xs text-gray/60 mt-3">{post.date}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/home-tips"
            className="inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-light transition-all hover:-translate-y-0.5"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}
