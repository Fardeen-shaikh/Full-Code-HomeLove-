import type { CollectionConfig } from 'payload'

export const HiddenPages: CollectionConfig = {
  slug: 'hidden-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'exhibition', 'isPublished'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Terms & Conditions', value: 'tnc' },
        { label: 'Contest', value: 'contest' },
        { label: 'Crazy Deals Full List', value: 'crazy-deals' },
        { label: 'Share & Win', value: 'share-win' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'exhibition',
      type: 'relationship',
      relationTo: 'exhibitions',
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
      ],
    },
  ],
}
