import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Discogs Collection Masonry',
  description: 'My record collection in a masonry layout.',
}

export default function MasonryLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <section>{children}</section>
}
