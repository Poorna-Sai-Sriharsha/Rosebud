import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { ToastContainer } from '@/components/ui/Toast';
import { Providers } from './providers';

// ─── Font Loading ─────────────────────────────────────────
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Rose Bud — Premium Home Fragrance & Botanical Lifestyle',
    template: '%s | Rose Bud',
  },
  description:
    'Curated home fragrance, candles, diffusers, and botanical lifestyle products. Quiet luxury meets everyday ritual.',
  keywords: ['home fragrance', 'candles', 'diffusers', 'room sprays', 'botanical', 'luxury', 'Rose Bud'],
  authors: [{ name: 'Rose Bud' }],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  ),
  openGraph: {
    type: 'website',
    siteName: 'Rose Bud',
    title: 'Rose Bud — Premium Home Fragrance',
    description: 'Curated home fragrance, candles, diffusers, and botanical lifestyle products.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Rose Bud' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rose Bud — Premium Home Fragrance',
    description: 'Curated home fragrance, candles, diffusers, and botanical lifestyle products.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
};

// ─── Root Layout ──────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-warm-50 antialiased">
        <Providers>
          <Header />
          <CartDrawer />
          <main className="flex-1 pt-[72px]">{children}</main>
          <Footer />
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
