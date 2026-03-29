import type { CollectionConfig } from 'payload'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
  ],
}
