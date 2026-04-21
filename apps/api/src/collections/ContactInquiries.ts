import type { CollectionConfig } from 'payload'

async function verifyRecaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    })
    const data = (await res.json()) as { success?: boolean }
    return Boolean(data.success)
  } catch {
    return false
  }
}

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
        const ok = await verifyRecaptcha(token)
        if (!ok) {
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
