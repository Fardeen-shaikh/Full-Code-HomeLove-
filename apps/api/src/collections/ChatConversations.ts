import type { CollectionConfig } from 'payload'

export const ChatConversations: CollectionConfig = {
  slug: 'chat-conversations',
  access: { read: () => true, create: () => true, update: () => true },
  admin: {
    useAsTitle: 'sessionId',
    defaultColumns: ['sessionId', 'leadName', 'leadEmail', 'createdAt'],
  },
  fields: [
    { name: 'sessionId', type: 'text', required: true, admin: { readOnly: true } },
    {
      name: 'messages',
      type: 'json',
      required: true,
      admin: { description: 'Array of {role, content, timestamp}' },
    },
    // Lead capture fields
    { name: 'leadName', type: 'text', admin: { description: 'Captured visitor name' } },
    { name: 'leadEmail', type: 'email', admin: { description: 'Captured visitor email' } },
    { name: 'leadPhone', type: 'text', admin: { description: 'Captured visitor phone' } },
    { name: 'leadCaptured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'topic',
      type: 'select',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Exhibition Info', value: 'exhibition' },
        { label: 'Exhibitor Inquiry', value: 'exhibitor' },
        { label: 'Home Tips', value: 'home-tips' },
        { label: 'Checklist Help', value: 'checklist' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
}
