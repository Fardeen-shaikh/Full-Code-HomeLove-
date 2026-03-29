export const SITE_NAME = 'HOMElove'
export const SITE_TAGLINE = "Malaysia's Premier Home & Living Exhibition"
export const SITE_DOMAIN = 'homelove.com.my'

export const CONTACT = {
  email: 'info@homelove.com.my',
  phone: '+603-7620 2672',
  whatsapp: '+6010-232 3620',
  whatsappLink: 'https://wa.me/60102323620',
} as const

export const ORGANISER = {
  name: 'Empire Asia Events Marketing Sdn. Bhd.',
  registrationNo: '1102402-K',
} as const

export const SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  tiktok: '',
  xhs: '',
  rednote: '',
  youtube: '',
} as const

export const MALAYSIAN_STATES = [
  'Johor',
  'Kedah',
  'Kelantan',
  'Kuala Lumpur',
  'Labuan',
  'Melaka',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Putrajaya',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
] as const

export type MalaysianState = (typeof MALAYSIAN_STATES)[number]

export const CHECKLIST_PROFILES = ['first-home', 'home-renovation', 'rental-airbnb'] as const
export type ChecklistProfile = (typeof CHECKLIST_PROFILES)[number]
