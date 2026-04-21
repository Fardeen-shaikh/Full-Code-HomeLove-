import type { CollectionConfig } from 'payload'
import { verifyRecaptcha } from '../lib/verifyRecaptcha'

const MALAYSIAN_STATES = [
  'Johor', 'Kedah', 'Kelantan', 'Kuala Lumpur', 'Labuan', 'Melaka',
  'Negeri Sembilan', 'Pahang', 'Penang', 'Perak', 'Perlis', 'Putrajaya',
  'Sabah', 'Sarawak', 'Selangor', 'Terengganu',
]

const SOURCE_TO_ACTION: Record<string, string> = {
  newsletter: 'newsletter_signup',
  event: 'event_subscribe',
  contact: 'contact_submit',
  exhibitor: 'exhibitor_inquiry',
  deal: 'deal_reveal',
}

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  access: { read: () => true, create: () => true },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'state', 'source', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (req.user) return data
        const record = data as Record<string, unknown> | undefined
        const token = record?.captchaToken as string | undefined
        const action = (record?.captchaAction as string | undefined)
          ?? SOURCE_TO_ACTION[(record?.source as string) ?? 'newsletter']
          ?? 'newsletter_signup'
        const result = await verifyRecaptcha(token, action)
        if (!result.ok) {
          req.payload.logger.warn(`[recaptcha] ${action} rejected: ${result.reason}`)
          throw new Error('CAPTCHA verification failed. Please try again.')
        }
        if (record) {
          delete record.captchaToken
          delete record.captchaAction
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'state', type: 'select', required: true, options: MALAYSIAN_STATES },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'newsletter',
      options: [
        { label: 'Newsletter', value: 'newsletter' },
        { label: 'Event Page', value: 'event' },
        { label: 'Contact Form', value: 'contact' },
        { label: 'Exhibitor Inquiry', value: 'exhibitor' },
      ],
    },
    { name: 'captchaToken', type: 'text', virtual: true, admin: { hidden: true } },
    { name: 'captchaAction', type: 'text', virtual: true, admin: { hidden: true } },
  ],
}
