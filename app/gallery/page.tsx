import { Metadata } from 'next';
import Script from 'next/script';
import { buildMetadata } from '@/lib/seo';
import GalleryClient from '@/components/GalleryClient';

export const metadata: Metadata = buildMetadata({
  title: 'Gallery | Broken Arrow Outdoors',
  description: 'See Broken Arrow targets in the field, at events, and in real customer range setups.',
  path: '/gallery',
  image: '/images/hero/buck-hero.png',
});

export default function GalleryPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      <div className="container mx-auto px-4 py-12">
        <GalleryClient />
      </div>
    </div>
  );
}
