import type { CollectionConfig } from 'payload'

export const CrazyDeals: CollectionConfig = {
  slug: 'crazy-deals',
  access: { read: () => true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'exhibition', 'dealPrice', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'exhibition', type: 'relationship', relationTo: 'exhibitions', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'originalPrice', type: 'number' },
    { name: 'dealPrice', type: 'number' },
    { name: 'brand', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
