import type { Metadata } from 'next'
import './globals.css'
export const metadata: Metadata = { title: '販売者認定講習・試験 申込みフォーム', description: '2026年 販売者認定講習・試験の申込みフォームです' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
          <html lang="ja">
                <body>{children}</body>body>
          </html>html>
        )
}</html>
