import type { Metadata } from 'next'
import AboutPage from '@/components/about/AboutPage'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about HOMElove — Malaysia\'s premier home & living exhibition organiser since 2015. Over 141 expos, 6,000+ exhibitors, and 5 million visitors nationwide.',
}

export default function Page() {
  return <AboutPage />
}
