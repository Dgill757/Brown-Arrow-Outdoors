'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import UGCStrip from '@/components/UGCStrip';

export default function FieldTestGallerySection() {
  const images = [
    { src: '/images/gallery/DSC09031 (1).jpg', alt: 'Field gallery hero' },
    { src: '/images/gallery/IMG_6631.JPG', alt: 'Field gallery 2' },
    { src: '/images/gallery/IMG_9319.JPG', alt: 'Field gallery 3' },
    { src: '/images/gallery/IMG_7652.JPG', alt: 'Field gallery 4' },
    { src: '/images/targets/IMG_7546.jpg', alt: 'Field gallery 5' },
  ];

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Field Test Gallery</h2>
          <p className="text-white/60">Real reps. Real pressure. Real bowhunters.</p>
        </div>
        <Link
          href="/gallery"
          className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors"
        >
          View Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-80">
        <div className="relative rounded-lg overflow-hidden col-span-2 row-span-2 md:col-span-2 md:row-span-1 h-full">
          <Image src="/images/gallery/DSC09031 (1).jpg" alt="Field gallery hero" fill className="object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="relative rounded-lg overflow-hidden h-full">
          <Image src="/images/gallery/IMG_6631.JPG" alt="Field gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="relative rounded-lg overflow-hidden h-full">
          <Image src="/images/gallery/IMG_9319.JPG" alt="Field gallery 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
        </div>
      </div>
      <div className="mt-8 text-center md:hidden">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors"
        >
          View Gallery <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="mt-10">
        <UGCStrip title="In The Field" images={images} />
      </div>
    </section>
  );
}
