import type { CollectionConfig } from 'payload'

const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
]

export const Exhibitions: CollectionConfig = {
  slug: 'exhibitions',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'state', 'startDate', 'endDate', 'isUpcoming'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { position: 'sidebar' } },
    { name: 'description', type: 'richText' },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'venue', type: 'text', required: true },
    {
      name: 'state',
      type: 'select',
      required: true,
      options: MALAYSIAN_STATES,
    },
    { name: 'bannerImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'verticalVideo', type: 'upload', relationTo: 'media' },
    { name: 'floorplanImage', type: 'upload', relationTo: 'media' },
    { name: 'brandCount', type: 'number' },
    { name: 'isUpcoming', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'countdownEnabled', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'mapLink', type: 'text', admin: { description: 'Google Maps link to venue' } },
    {
      name: 'programSchedule',
      type: 'array',
      fields: [
        { name: 'time', type: 'text', required: true },
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
