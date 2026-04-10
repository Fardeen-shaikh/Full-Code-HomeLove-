import type { CollectionConfig } from 'payload'

export const UserSessions: CollectionConfig = {
  slug: 'user-sessions',
  access: { read: () => true, create: () => true, update: () => true },
  admin: {
    defaultColumns: ['sessionId', 'checklistProfile', 'createdAt', 'updatedAt'],
  },
  fields: [
    { name: 'sessionId', type: 'text', required: true, unique: true, admin: { readOnly: true } },
    { name: 'favourites', type: 'json', admin: { description: 'Array of CrazyDeal IDs' } },
    { name: 'checklistSelections', type: 'json', admin: { description: 'Checklist item ID -> checked state' } },
    {
      name: 'checklistProfile',
      type: 'select',
      options: [
        { label: 'First Home', value: 'first-home' },
        { label: 'Home Renovation', value: 'home-renovation' },
        { label: 'Rental / Airbnb Setup', value: 'rental-airbnb' },
      ],
    },
  ],
}
