import type { CollectionConfig } from 'payload'
import { verifyRecaptcha } from '../lib/verifyRecaptcha'

export const ExhibitorInquiries: CollectionConfig = {
  slug: 'exhibitor-inquiries',
  access: { read: () => true, create: () => true },
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'email', 'exhibitVenue', 'createdAt'],
  },
  hooks: {
    beforeValidate: [
      async ({ data, operation, req }) => {
        if (operation !== 'create') return data
        if (req.user) return data
        const token = (data as Record<string, unknown> | undefined)?.captchaToken as string | undefined
        const result = await verifyRecaptcha(token, 'exhibitor_inquiry')
        if (!result.ok) {
          req.payload.logger.warn(`[recaptcha] exhibitor_inquiry rejected: ${result.reason}`)
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
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'exhibitVenue', type: 'text', required: true },
    { name: 'companyName', type: 'text', required: true },
    { name: 'productService', type: 'textarea', required: true },
    { name: 'additionalInfo', type: 'textarea' },
    {
      name: 'captchaToken',
      type: 'text',
      virtual: true,
      admin: { hidden: true },
    },
  ],
}
