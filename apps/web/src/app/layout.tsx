import type { Metadata } from 'next'
import './globals.css'
import '../components/home/wireframe.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingButtons from '@/components/ui/FloatingButtons'
import ChatWidget from '@/components/chat/ChatWidget'

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
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingButtons />
        <ChatWidget />
      </body>
    </html>
  )
}
