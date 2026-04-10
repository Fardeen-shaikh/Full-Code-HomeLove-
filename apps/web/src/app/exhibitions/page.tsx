import type { Metadata } from 'next'
import ExhibitionListing from '@/components/exhibitions/ExhibitionListing'

export const metadata: Metadata = {
  title: 'Exhibitions',
  description:
    'Find upcoming HOMElove home expos across Malaysia. Browse exhibitions by location, explore event details, and plan your visit.',
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>
}) {
  return <ExhibitionListing searchParamsPromise={searchParams} />
}
