import type { Metadata } from 'next'
import ContactPage from '@/components/contact/ContactPage'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the HOMElove team. Reach us via phone, email, or WhatsApp for inquiries about home expos across Malaysia.',
}

export default function Page() {
  return <ContactPage />
}
