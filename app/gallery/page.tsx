import { Metadata } from 'next';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Gallery | Broken Arrow Outdoors',
  description: 'See Broken Arrow targets in the field, at events, and in real customer range setups.',
  path: '/gallery',
  image: '/images/hero/hero-4.png',
});

// Placeholder data for gallery images
const galleryImages = [
  { id: 1, src: '/images/gallery/DSC06839.JPG', category: 'Range' },
  { id: 2, src: '/images/gallery/DSC06842.JPG', category: 'Events' },
  { id: 3, src: '/images/gallery/IMG_6631.JPG', category: 'Customer Setups' },
  { id: 4, src: '/images/gallery/IMG_8117.JPG', category: 'Behind The Scenes' },
  { id: 5, src: '/images/gallery/eZy Watermark_11-10-2023_21-16-38.JPG', category: 'Range' },
  { id: 6, src: '/images/gallery/IMG_8229.JPG', category: 'Events' },
  { id: 7, src: '/images/gallery/DSC08963.jpg', category: 'Customer Setups' },
  { id: 8, src: '/images/gallery/IMG_9319.JPG', category: 'Behind The Scenes' },
  { id: 9, src: '/images/gallery/DSC09031 (1).jpg', category: 'Range' },
  { id: 10, src: '/images/gallery/IMG_7652.JPG', category: 'Events' },
  { id: 11, src: '/images/gallery/IMG_9827 (1).JPG', category: 'Customer Setups' },
  { id: 12, src: '/images/gallery/About-Us.webp', category: 'Behind The Scenes' },
];

const categories = ['All', 'Events', 'Customer Setups', 'Range', 'Behind The Scenes'];

export default function GalleryPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <script src="https://static.elfsight.com/platform/platform.js" async />
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
            In The <span className="text-brand-primary">Field</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            See how the crew trains. Tag us @BrokenArrowOutdoors to be featured.
          </p>
        </div>

        {/* Filters (Visual only for now, could be interactive with client component) */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat, i) => (
            <button 
              key={cat}
              className={`px-6 py-2 rounded-full border border-white/10 uppercase font-bold tracking-wider text-sm transition-all ${i === 0 ? 'bg-brand-primary text-white border-brand-primary' : 'hover:bg-white/10 text-white/60 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div key={img.id} className="relative aspect-square group overflow-hidden rounded-lg bg-white/5">
              <Image
                src={img.src}
                alt={`Gallery image ${img.category}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-brand-primary font-black uppercase italic tracking-wider border border-brand-primary px-4 py-2">
                  {img.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-24">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/10 border border-white/20 px-8 py-4 rounded-full hover:bg-white/20 transition-all group"
          >
            <Instagram className="w-6 h-6 group-hover:text-brand-primary transition-colors" />
            <span className="font-bold uppercase tracking-wider">Follow on Instagram</span>
          </a>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-2">
          <div className="elfsight-app-ed3d5f48-8c27-4cb9-bff9-d9c762b0d759" data-elfsight-app-lazy />
        </div>
      </div>
    </div>
  );
}
