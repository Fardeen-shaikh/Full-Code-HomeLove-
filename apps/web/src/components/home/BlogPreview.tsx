import Link from 'next/link'
import Image from 'next/image'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

const POSTS = [
  {
    title: '10 Modern Kitchen Designs That Will Transform Your Cooking Space',
    category: 'Trends & Ideas',
    date: 'Mar 15, 2026',
    excerpt: 'Explore the latest kitchen design trends from minimalist to industrial styles.',
    image: '/images/blog/kitchen-design.jpg',
  },
  {
    title: 'How to Choose the Perfect Sofa for Your Malaysian Living Room',
    category: 'Home Tips',
    date: 'Mar 10, 2026',
    excerpt: 'A complete guide to selecting the right sofa for your space and lifestyle.',
    image: '/images/blog/sofa-guide.jpeg',
  },
  {
    title: 'Modern Bathroom Interior Design: Achieving Luxury on a Budget',
    category: 'Interior Design',
    date: 'Mar 5, 2026',
    excerpt: 'Transform your bathroom into a spa-like retreat without breaking the bank.',
    image: '/images/blog/bathroom.png',
  },
]

export default function BlogPreview() {
  return (
    <section className="py-20 bg-gray-light">
      <div className="max-w-7xl mx-auto px-4">
        <AnimateOnScroll className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Blog</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-2">Home Tips</h2>
          <p className="text-gray mt-3">Expert tips and design ideas for every room in your home.</p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <AnimateOnScroll key={post.title} delay={i * 0.15}>
              <article className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:-translate-y-2.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.12)] transition-all duration-400 group h-full">
                <div className="h-[200px] relative overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  />
                </div>
                <div className="p-5">
                  <span className="text-primary text-xs font-semibold">{post.category}</span>
                  <h3 className="font-bold text-dark mt-1 leading-snug group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray text-sm mt-2 leading-relaxed">{post.excerpt}</p>
                  <p className="text-xs text-gray/60 mt-3">{post.date}</p>
                </div>
              </article>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-10">
          <Link
            href="/home-tips"
            className="inline-block bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary-light transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(1,75,152,0.3)]"
          >
            View All Articles
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  )
}
