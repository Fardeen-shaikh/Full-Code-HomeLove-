import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import About from '@/components/home/About'
import WhatToExpect from '@/components/home/WhatToExpect'
import Exhibitions from '@/components/home/Exhibitions'
import AppDownload from '@/components/home/AppDownload'
import BrandsMarquee from '@/components/home/BrandsMarquee'
import BlogPreview from '@/components/home/BlogPreview'
import ShoppingGuide from '@/components/home/ShoppingGuide'
import Venues from '@/components/home/Venues'
import FAQ from '@/components/home/FAQ'
import Newsletter from '@/components/home/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <WhatToExpect />
      <Exhibitions />
      <AppDownload />
      <BrandsMarquee />
      <BlogPreview />
      <ShoppingGuide />
      <Venues />
      <FAQ />
      <Newsletter />
    </>
  )
}
