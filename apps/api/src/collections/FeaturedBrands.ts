import type { CollectionConfig } from 'payload'

export const FeaturedBrands: CollectionConfig = {
  slug: 'featured-brands',
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    description: 'Master list of brands. Link them to exhibitions via the Exhibition page.',
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'website', type: 'text', admin: { description: 'Optional brand website URL' } },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
