import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Assistant } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/store/cartStore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnalyticsScripts from '@/components/AnalyticsScripts';
import LazyCartDrawerMount from '@/components/LazyCartDrawerMount';
import { getBaseUrl, toAbsoluteUrl } from '@/lib/site';

const assistant = Assistant({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: 'Broken Arrow Outdoors | Train Like The Moment Matters',
  description: 'Premium steel archery targets built to simulate real hunting pressure. Firefighter owned. Texas made.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Broken Arrow Outdoors | Train Like The Moment Matters',
    description: 'Premium steel archery targets built to simulate real hunting pressure. Firefighter owned. Texas made.',
    type: 'website',
    url: '/',
    images: [{ url: toAbsoluteUrl('/images/hero/hero-buck-head.png') }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Broken Arrow Outdoors | Train Like The Moment Matters',
    description: 'Premium steel archery targets built to simulate real hunting pressure. Firefighter owned. Texas made.',
    images: [toAbsoluteUrl('/images/hero/hero-buck-head.png')],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${assistant.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-brand-dark text-white antialiased selection:bg-brand-primary selection:text-white">
        <AnalyticsScripts />
        <CartProvider>
          <Header />
          <LazyCartDrawerMount />
          <main className="min-h-screen pt-[calc(70px+var(--safe-area-top))] lg:pt-[92px]">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
