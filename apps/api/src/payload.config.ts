import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
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
import { PromotionalPopups } from './collections/PromotionalPopups'
import { UserSessions } from './collections/UserSessions'
import { ChatConversations } from './collections/ChatConversations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
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
    ChatConversations,
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  sharp,
  cors: [
    'http://localhost:3000',
    'https://homelove-web-production.up.railway.app',
    'https://homelove.com.my',
    process.env.NEXT_PUBLIC_SERVER_URL || '',
  ].filter(Boolean),
})
