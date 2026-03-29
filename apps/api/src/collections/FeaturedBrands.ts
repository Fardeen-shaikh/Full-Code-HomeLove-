import type { CollectionConfig } from 'payload'

export const FeaturedBrands: CollectionConfig = {
  slug: 'featured-brands',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'logo', type: 'upload', relationTo: 'media', required: true },
    { name: 'exhibition', type: 'relationship', relationTo: 'exhibitions' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
