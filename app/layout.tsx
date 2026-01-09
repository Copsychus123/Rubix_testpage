import type { Metadata } from 'next'
import './globals.css'

const metadataBase = process.env.VERCEL_URL
  ? new URL(`https://${process.env.VERCEL_URL}`)
  : new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')

const siteTitle = '智慧長照 Rubix AI｜長輩每日關懷日報'
const siteDescription =
  'Rubix 智慧長照 AI 以日常互動生成長輩每日情緒與對話日報，搭配沉默/孤獨、用藥與安全異常提醒，讓家人遠距也能掌握狀態變化；免安裝、快速上手，降低照護焦慮，讓陪伴更安心。'

export const metadata: Metadata = {
  metadataBase,
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'zh_TW',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  )
}
