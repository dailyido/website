import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daily I Do | Wedding Planning Made Simple',
  description: 'Plan your perfect wedding day with Daily I Do. The modern wedding planning app that keeps everything organized.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💍</text></svg>",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fdfcfb] text-[#1a1a1a]">
        {children}
      </body>
    </html>
  )
}
