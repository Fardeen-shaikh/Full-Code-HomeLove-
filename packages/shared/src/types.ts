import type { ChecklistProfile, MalaysianState } from './constants'

// Exhibition / Event
export interface Exhibition {
  id: string
  title: string
  slug: string
  description: string
  startDate: string
  endDate: string
  venue: string
  state: MalaysianState
  bannerImage: string
  verticalVideo?: string
  floorplanImage?: string
  brandCount?: number
  isUpcoming: boolean
  countdownEnabled: boolean
  programSchedule?: ProgramItem[]
  faq?: FAQItem[]
  createdAt: string
  updatedAt: string
}

export interface ProgramItem {
  time: string
  title: string
  description?: string
}

export interface FAQItem {
  question: string
  answer: string
}

// Crazy Deals
export interface CrazyDeal {
  id: string
  exhibitionId: string
  title: string
  description?: string
  image: string
  originalPrice?: number
  dealPrice?: number
  brand?: string
  order: number
}

// Discount Coupons
export interface DiscountCoupon {
  id: string
  exhibitionId: string
  title: string
  description?: string
  image: string
  code?: string
  validUntil?: string
}

// Blog / Home Tips
export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featuredImage: string
  category: string
  author?: string
  publishedAt: string
  createdAt: string
  updatedAt: string
}

// Home Checklist
export interface ChecklistCategory {
  id: string
  profile: ChecklistProfile
  room: string
  items: ChecklistItem[]
  order: number
}

export interface ChecklistItem {
  id: string
  label: string
  order: number
}

// User Session Data (stored via anonymous cookie)
export interface UserSession {
  sessionId: string
  favourites: string[] // CrazyDeal IDs
  checklistSelections: Record<string, boolean> // ChecklistItem ID -> checked
  checklistProfile?: ChecklistProfile
  createdAt: string
  updatedAt: string
}

// Newsletter Subscriber
export interface Subscriber {
  id: string
  name: string
  phone: string
  email: string
  state: MalaysianState
  source: 'newsletter' | 'event' | 'contact' | 'exhibitor'
  createdAt: string
}

// Contact Form
export interface ContactInquiry {
  name: string
  email: string
  phone: string
  message?: string
}

// Exhibitor Inquiry
export interface ExhibitorInquiry {
  email: string
  phone: string
  exhibitVenue: string
  companyName: string
  productService: string
  additionalInfo?: string
}

// Featured Brand
export interface FeaturedBrand {
  id: string
  name: string
  logo: string
  exhibitionId?: string
  order: number
}

// Promotional Popup
export interface PromotionalPopup {
  id: string
  title: string
  content: string
  image?: string
  ctaText?: string
  ctaLink?: string
  isActive: boolean
}

// SEO
export interface PageSEO {
  metaTitle: string
  metaDescription: string
  ogImage?: string
  canonicalUrl?: string
}

// Hidden Page
export interface HiddenPage {
  id: string
  title: string
  slug: string
  content: string
  isPublished: boolean
  exhibitionId?: string
  type: 'tnc' | 'contest' | 'crazy-deals' | 'share-win' | 'other'
}
