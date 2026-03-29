import type { CollectionConfig } from 'payload'

export const DiscountCoupons: CollectionConfig = {
  slug: 'discount-coupons',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'exhibition', type: 'relationship', relationTo: 'exhibitions', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'code', type: 'text' },
    { name: 'validUntil', type: 'date' },
  ],
}
