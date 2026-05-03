import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chaka Journey',
  description: 'Explora talleres únicos con artistas locales',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-screen w-screen flex-col">{children}</div>
}
