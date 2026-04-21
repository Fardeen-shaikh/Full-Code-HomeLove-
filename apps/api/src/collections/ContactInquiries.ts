import type { CollectionConfig } from 'payload'
import { verifyRecaptcha } from '../lib/verifyRecaptcha'

export const ContactInquiries: CollectionConfig = {
  slug: 'contact-inquiries',
  access: { read: () => true, create: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (req.user) return data
        const token = (data as Record<string, unknown> | undefined)?.captchaToken as string | undefined
        const result = await verifyRecaptcha(token, 'contact_submit')
        if (!result.ok) {
          req.payload.logger.warn(`[recaptcha] contact_submit rejected: ${result.reason}`)
          throw new Error('CAPTCHA verification failed. Please try again.')
        }
        if (data && typeof data === 'object') {
          delete (data as Record<string, unknown>).captchaToken
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'message', type: 'textarea' },
    {
      name: 'captchaToken',
      type: 'text',
      virtual: true,
      admin: { hidden: true },
    },
  ],
}
