import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import '../components/home/wireframe.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ChatWidget from '@/components/chat/ChatWidget'
import BackToTop from '@/components/ui/BackToTop'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: {
    default: "HOMElove — Malaysia's Premier Home & Living Exhibition",
    template: '%s | HOMElove',
  },
  description:
    'Discover upcoming HOMElove home expos across Malaysia. Explore furniture, home appliances, renovation solutions, home essentials, and exclusive expo deals all in one place.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <BackToTop />
      </body>
    </html>
  )
}
