import type { CollectionConfig } from 'payload'

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'state', 'source', 'createdAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'state',
      type: 'select',
      required: true,
      options: [
        'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
        'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
        'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
      ],
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Event Page', value: 'event' },
        { label: 'Contact Form', value: 'contact' },
        { label: 'Exhibitor Inquiry', value: 'exhibitor' },
      ],
      defaultValue: 'newsletter',
    },
  ],
}
