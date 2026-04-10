import type { Metadata } from 'next'
import { getExhibitionBySlug, getCrazyDeals, getDiscountCoupons, getFeaturedBrands } from '@/lib/api'
import ExhibitionDetail from '@/components/exhibitions/ExhibitionDetail'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const exhibition = await getExhibitionBySlug(slug).catch(() => null)
  if (!exhibition) return { title: 'Not Found' }

  return {
    title: exhibition.seo?.metaTitle || exhibition.title,
    description: exhibition.seo?.metaDescription || `Visit ${exhibition.title} at ${exhibition.venue}, ${exhibition.state}`,
    openGraph: exhibition.seo?.ogImage
      ? { images: [{ url: exhibition.seo.ogImage.url }] }
      : exhibition.bannerImage
        ? { images: [{ url: exhibition.bannerImage.url }] }
        : undefined,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const exhibition = await getExhibitionBySlug(slug).catch(() => null)

  if (!exhibition) notFound()

  const [crazyDeals, coupons, brands] = await Promise.all([
    getCrazyDeals(exhibition.id).catch(() => ({ docs: [] })),
    getDiscountCoupons(exhibition.id).catch(() => ({ docs: [] })),
    getFeaturedBrands(exhibition.id).catch(() => ({ docs: [] })),
  ])

  return (
    <ExhibitionDetail
      exhibition={exhibition}
      crazyDeals={crazyDeals.docs}
      coupons={coupons.docs}
      brands={brands.docs}
    />
  )
}
