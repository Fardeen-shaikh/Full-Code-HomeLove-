import type { CollectionConfig } from 'payload'

export const ExhibitorInquiries: CollectionConfig = {
  slug: 'exhibitor-inquiries',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'email', 'exhibitVenue', 'createdAt'],
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'exhibitVenue',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      type: 'text',
      required: true,
    },
    {
      name: 'productService',
      type: 'textarea',
      required: true,
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
    },
  ],
}
