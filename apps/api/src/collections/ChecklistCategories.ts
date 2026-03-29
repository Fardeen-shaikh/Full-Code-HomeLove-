import type { CollectionConfig } from 'payload'

export const ChecklistCategories: CollectionConfig = {
  slug: 'checklist-categories',
  admin: {
    useAsTitle: 'room',
    defaultColumns: ['room', 'profile', 'order'],
  },
  fields: [
    { name: 'profile', type: 'relationship', relationTo: 'checklist-profiles', required: true },
    { name: 'room', type: 'text', required: true, admin: { description: 'e.g. Living Room, Bedroom, Kitchen' } },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'order', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
