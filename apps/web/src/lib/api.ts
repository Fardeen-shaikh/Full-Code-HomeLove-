const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

interface PaginatedResponse<T> {
  docs: T[]
  totalDocs: number
  totalPages: number
  page: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

interface FetchOptions {
  params?: Record<string, string | number | boolean | undefined>
  revalidate?: number | false
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { params, revalidate = 60 } = options
  const url = new URL(`${API_URL}/api/${endpoint}`)

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value))
      }
    }
  }

  const res = await fetch(url.toString(), {
    next: revalidate === false ? { revalidate: false } : { revalidate },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

async function patchAPI<T>(endpoint: string, id: string, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.errors?.[0]?.message || `API error: ${res.status}`)
  }

  return res.json()
}

async function postAPI<T>(endpoint: string, data: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_URL}/api/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error(error?.errors?.[0]?.message || `API error: ${res.status}`)
  }

  return res.json()
}

// ===== EXHIBITIONS =====

export interface Exhibition {
  id: string
  title: string
  slug: string
  description?: unknown
  startDate: string
  endDate: string
  venue: string
  state: string
  city?: string
  bannerImage: MediaItem
  verticalVideo?: MediaItem
  floorplanImage?: MediaItem
  brandCount?: number
  participatingBrands?: (string | number | FeaturedBrand)[]
  isUpcoming: boolean
  countdownEnabled: boolean
  mapLink?: string
  tncPage?: { id: string; slug: string; title: string } | string | null
  contest?: {
    enabled?: boolean
    title?: string
    description?: string
    image?: MediaItem
    formFields?: unknown
  }
  shareAndWin?: {
    enabled?: boolean
    title?: string
    description?: string
    hiddenPage?: { id: string; slug: string } | string | null
  }
  programSchedule?: { time: string; title: string; description?: string }[]
  programs?: { title: string; image: MediaItem; description?: string }[]
  faq?: { question: string; answer: string }[]
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export async function getExhibitions(params?: {
  state?: string
  upcoming?: boolean
  limit?: number
  page?: number
}) {
  return fetchAPI<PaginatedResponse<Exhibition>>('exhibitions', {
    params: {
      limit: params?.limit || 100,
      page: params?.page,
      sort: 'startDate',
      ...(params?.state ? { 'where[state][equals]': params.state } : {}),
      ...(params?.upcoming !== undefined ? { 'where[isUpcoming][equals]': params.upcoming } : {}),
      depth: 1,
    },
  })
}

export async function getExhibitionBySlug(slug: string) {
  const res = await fetchAPI<PaginatedResponse<Exhibition>>('exhibitions', {
    params: { 'where[slug][equals]': slug, depth: 1, limit: 1 },
    revalidate: 60,
  })
  return res.docs[0] || null
}

// ===== BLOG POSTS =====

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: unknown
  featuredImage: MediaItem
  category: string
  author?: string
  publishedAt: string
  seo?: SEO
  createdAt: string
  updatedAt: string
}

export async function getBlogPosts(params?: {
  category?: string
  limit?: number
  page?: number
}) {
  return fetchAPI<PaginatedResponse<BlogPost>>('blog-posts', {
    params: {
      limit: params?.limit || 12,
      page: params?.page,
      sort: '-publishedAt',
      ...(params?.category ? { 'where[category][equals]': params.category } : {}),
      depth: 1,
    },
  })
}

export async function getBlogPostBySlug(slug: string) {
  const res = await fetchAPI<PaginatedResponse<BlogPost>>('blog-posts', {
    params: { 'where[slug][equals]': slug, depth: 1, limit: 1 },
    revalidate: 60,
  })
  return res.docs[0] || null
}

// ===== CRAZY DEALS =====

export interface CrazyDeal {
  id: string
  title: string
  exhibition: Exhibition | string
  description?: string
  image: MediaItem
  originalPrice?: number
  dealPrice?: number
  brand?: string
  order: number
}

export async function getCrazyDeals(exhibitionId: string) {
  return fetchAPI<PaginatedResponse<CrazyDeal>>('crazy-deals', {
    params: {
      'where[exhibition][equals]': exhibitionId,
      sort: 'order',
      limit: 100,
      depth: 1,
    },
  })
}

// ===== DISCOUNT COUPONS =====

export interface DiscountCoupon {
  id: string
  title: string
  exhibition: Exhibition | string
  description?: string
  image?: MediaItem
  code?: string
  validUntil?: string
}

export async function getDiscountCoupons(exhibitionId: string) {
  return fetchAPI<PaginatedResponse<DiscountCoupon>>('discount-coupons', {
    params: {
      'where[exhibition][equals]': exhibitionId,
      limit: 50,
      depth: 1,
    },
  })
}

// ===== FEATURED BRANDS =====

export interface FeaturedBrand {
  id: string
  name: string
  logo: MediaItem
  website?: string
  order: number
}

// Get all brands (master list) — used on homepage
export async function getFeaturedBrands() {
  return fetchAPI<PaginatedResponse<FeaturedBrand>>('featured-brands', {
    params: {
      sort: 'order',
      limit: 100,
      depth: 1,
    },
  })
}

// Get brands for a specific exhibition (filtered by participatingBrands IDs)
export async function getExhibitionBrands(brandIds: (string | number)[]): Promise<PaginatedResponse<FeaturedBrand>> {
  if (!brandIds || brandIds.length === 0) {
    return { docs: [], totalDocs: 0, totalPages: 0, page: 1, hasNextPage: false, hasPrevPage: false }
  }
  return fetchAPI<PaginatedResponse<FeaturedBrand>>('featured-brands', {
    params: {
      sort: 'order',
      limit: 100,
      depth: 1,
      'where[id][in]': brandIds.join(','),
    },
  })
}

// ===== CHECKLIST =====

export interface ChecklistProfile {
  id: string
  name: string
  profileSlug: string
  description: string
  topPriorities?: string
  order: number
}

export interface ChecklistCategory {
  id: string
  profile: ChecklistProfile | string
  room: string
  items: { id?: string; label: string; order: number }[]
  order: number
}

export async function getChecklistProfiles() {
  return fetchAPI<PaginatedResponse<ChecklistProfile>>('checklist-profiles', {
    params: { sort: 'order', limit: 10, depth: 0 },
  })
}

export async function getChecklistCategories(profileId: string) {
  return fetchAPI<PaginatedResponse<ChecklistCategory>>('checklist-categories', {
    params: {
      'where[profile][equals]': profileId,
      sort: 'order',
      limit: 50,
      depth: 0,
    },
  })
}

// ===== HIDDEN PAGES =====

export interface HiddenPage {
  id: string
  title: string
  slug: string
  content: unknown
  type: string
  exhibition?: Exhibition | string
  isPublished: boolean
  seo?: { metaTitle?: string; metaDescription?: string }
}

export async function getHiddenPageBySlug(slug: string) {
  const res = await fetchAPI<PaginatedResponse<HiddenPage>>('hidden-pages', {
    params: {
      'where[slug][equals]': slug,
      'where[isPublished][equals]': true,
      depth: 1,
      limit: 1,
    },
    revalidate: 60,
  })
  return res.docs[0] || null
}

// ===== PROMOTIONAL POPUPS =====

export interface PromotionalPopup {
  id: string
  title: string
  content?: unknown
  image?: MediaItem
  ctaText?: string
  ctaLink?: string
  isActive: boolean
}

export async function getActivePopup() {
  const res = await fetchAPI<PaginatedResponse<PromotionalPopup>>('promotional-popups', {
    params: {
      'where[isActive][equals]': true,
      limit: 1,
      depth: 1,
    },
    revalidate: 30,
  })
  return res.docs[0] || null
}

// ===== FORM SUBMISSIONS =====

export async function submitContactInquiry(data: {
  name: string
  email: string
  phone: string
  message?: string
  captchaToken?: string
}) {
  return postAPI<{ doc: { id: string } }>('contact-inquiries', data)
}

export async function submitExhibitorInquiry(data: {
  email: string
  phone: string
  exhibitVenue: string
  companyName: string
  productService: string
  additionalInfo?: string
  captchaToken?: string
}) {
  return postAPI<{ doc: { id: string } }>('exhibitor-inquiries', data)
}

export async function submitSubscriber(data: {
  name: string
  phone: string
  email: string
  state: string
  source?: string
  captchaToken?: string
  captchaAction?: string
}) {
  return postAPI<{ doc: { id: string } }>('subscribers', {
    ...data,
    source: data.source || 'newsletter',
  })
}

// ===== USER SESSIONS =====

export async function createSession(sessionId: string) {
  return postAPI<{ doc: { id: string } }>('user-sessions', { sessionId })
}

export async function updateSession(id: string, data: Record<string, unknown>) {
  return patchAPI<{ doc: { id: string } }>('user-sessions', id, data)
}

export async function getSession(sessionId: string) {
  const res = await fetchAPI<PaginatedResponse<{
    id: string
    sessionId: string
    favourites?: string[]
    checklistSelections?: Record<string, boolean>
    checklistProfile?: string
  }>>('user-sessions', {
    params: { 'where[sessionId][equals]': sessionId, limit: 1 },
    revalidate: false,
  })
  return res.docs[0] || null
}

// ===== HELPERS =====

export function mediaUrl(media: MediaItem | string | null | undefined): string {
  if (!media) return ''
  if (typeof media === 'string') return media
  if (media.url?.startsWith('http')) return media.url
  // In production, Payload media files need the API base URL
  // If the API has NEXT_PUBLIC_SERVER_URL set, media URLs are already absolute
  const baseUrl = typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL || '')
    : (process.env.NEXT_PUBLIC_API_URL || API_URL)
  return `${baseUrl}${media.url}`
}

// ===== SHARED TYPES =====

export interface MediaItem {
  id: string
  alt: string
  url: string
  width?: number
  height?: number
  mimeType?: string
  filename?: string
}

interface SEO {
  metaTitle?: string
  metaDescription?: string
  ogImage?: MediaItem
}
