import type { CollectionConfig } from 'payload'

export const ChecklistProfiles: CollectionConfig = {
  slug: 'checklist-profiles',
  access: { read: () => true },
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'profileSlug',
      type: 'select',
      required: true,
      options: [
        { label: 'First Home', value: 'first-home' },
        { label: 'Home Renovation', value: 'home-renovation' },
        { label: 'Rental / Airbnb Setup', value: 'rental-airbnb' },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'topPriorities', type: 'text', admin: { description: 'Comma-separated top priority items' } },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
