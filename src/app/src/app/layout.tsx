import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Cyborg Converter AI - Transform Twitter Profiles into Cyborgs',
  description: 'Transform any Twitter profile picture into stunning cyborg art using AI. Choose from futuristic, cyberpunk, terminator, and alien tech styles.',
  keywords: ['AI', 'image transformation', 'cyborg', 'Twitter', 'profile picture', 'stable diffusion', 'cyberpunk'],
  authors: [{ name: 'Cyborg Converter AI' }],
  creator: 'Cyborg Converter AI',
  publisher: 'Cyborg Converter AI',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cyborg-converter-ai.vercel.app',
    siteName: 'Cyborg Converter AI',
    title: 'Cyborg Converter AI - AI-Powered Profile Transformations',
    description: 'Transform Twitter profiles into stunning cyborg art with AI',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cyborgconverter',
    creator: '@cyborgconverter',
    title: 'Cyborg Converter AI',
    description: 'Transform Twitter profiles into stunning cyborg art with AI',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}>
        <div className="fixed inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
