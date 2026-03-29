import type { CollectionConfig } from 'payload'

export const PromotionalPopups: CollectionConfig = {
  slug: 'promotional-popups',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'ctaText', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'isActive', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
