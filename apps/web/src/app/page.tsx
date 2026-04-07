import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import About from '@/components/home/About'
import WhatToExpect from '@/components/home/WhatToExpect'
import Exhibitions from '@/components/home/Exhibitions'
import AppDownload from '@/components/home/AppDownload'
import BrandsMarquee from '@/components/home/BrandsMarquee'
import BlogPreview from '@/components/home/BlogPreview'
import Newsletter from '@/components/home/Newsletter'
import ShoppingGuide from '@/components/home/ShoppingGuide'
import DarkMarquee from '@/components/home/DarkMarquee'
import Venues from '@/components/home/Venues'
import FAQ from '@/components/home/FAQ'

export default function Home() {
  return (
    <>
      {/* 1. Hero + Category Marquee (inside Hero) */}
      <Hero />
      {/* 2. Stats — "Trusted by Millions" */}
      <Stats />
      {/* 3. About — "Why HOMElove" */}
      <About />
      {/* 4. What to Expect at the Expo */}
      <WhatToExpect />
      {/* 5. Upcoming Home Expo */}
      <Exhibitions />
      {/* 6. Download the HOMElove App */}
      <AppDownload />
      {/* 7. Brands */}
      <BrandsMarquee />
      {/* 8. Home Tips */}
      <BlogPreview />
      {/* 9. Newsletter — dark blue */}
      <Newsletter />
      {/* 10. 3 Important Steps */}
      <ShoppingGuide />
      {/* 11. Dark marquee bar */}
      <DarkMarquee />
      {/* 12. Find an Exhibition Near You — map + venues */}
      <Venues />
      {/* 13. FAQ */}
      <FAQ />
    </>
  )
}
