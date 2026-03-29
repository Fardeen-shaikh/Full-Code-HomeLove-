import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Exhibitions } from './collections/Exhibitions'
import { CrazyDeals } from './collections/CrazyDeals'
import { DiscountCoupons } from './collections/DiscountCoupons'
import { BlogPosts } from './collections/BlogPosts'
import { FeaturedBrands } from './collections/FeaturedBrands'
import { ChecklistProfiles } from './collections/ChecklistProfiles'
import { ChecklistCategories } from './collections/ChecklistCategories'
import { Subscribers } from './collections/Subscribers'
import { ContactInquiries } from './collections/ContactInquiries'
import { ExhibitorInquiries } from './collections/ExhibitorInquiries'
import { HiddenPages } from './collections/HiddenPages'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { PromotionalPopups } from './collections/PromotionalPopups'
import { Pages } from './collections/Pages'
import { UserSessions } from './collections/UserSessions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Pages,
    Exhibitions,
    CrazyDeals,
    DiscountCoupons,
    BlogPosts,
    FeaturedBrands,
    ChecklistProfiles,
    ChecklistCategories,
    Subscribers,
    ContactInquiries,
    ExhibitorInquiries,
    HiddenPages,
    PromotionalPopups,
    UserSessions,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://localhost:5432/homelove',
    },
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3001',
  cors: [
    'http://localhost:3000', // Next.js dev
  ],
})
