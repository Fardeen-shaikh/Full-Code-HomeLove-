import type { Metadata } from 'next'
import ExhibitPage from '@/components/exhibit/ExhibitPage'

export const metadata: Metadata = {
  title: 'Exhibit With Us',
  description:
    'Showcase your products at HOMElove Home Expo — Malaysia\'s premier home & living exhibition. Reach thousands of high-intent home shoppers across Malaysia.',
}

export default function Page() {
  return <ExhibitPage />
}
