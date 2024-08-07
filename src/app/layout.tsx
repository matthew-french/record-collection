import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'

import '@radix-ui/themes/styles.css'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discogs Collection',
  description: 'A nextjs app for browsing my discogs collections',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme appearance="dark">{children}</Theme>
      </body>
    </html>
  )
}
