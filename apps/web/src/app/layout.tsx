import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BackToTop from '@/components/ui/BackToTop'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: 'HOMElove — Malaysia\'s Premier Home & Living Exhibition',
    template: '%s | HOMElove',
  },
  description:
    'Discover upcoming HOMElove home expos across Malaysia. Explore furniture, home appliances, renovation solutions, home essentials, and exclusive expo deals all in one place.',
  keywords: [
    'home expo Malaysia',
    'furniture fair',
    'home appliances',
    'renovation',
    'HOMElove',
    'home exhibition',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <BackToTop />
        <WhatsAppWidget />
      </body>
    </html>
  )
}
