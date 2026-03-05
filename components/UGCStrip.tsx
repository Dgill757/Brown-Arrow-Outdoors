'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export default function UGCStrip({
  title = 'In The Field',
  images,
}: {
  title?: string;
  images: Array<{ src: string; alt: string }>;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (index: number) => {
    setActiveIndex(index);
    trackEvent('ugc_open_lightbox', { title, index });
  };

  const close = () => setActiveIndex(null);
  const next = () => setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % images.length));
  const prev = () => setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + images.length) % images.length));

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-end justify-between mb-6">
        <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tight">{title}</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => open(index)}
            className="relative h-40 w-40 md:h-48 md:w-48 flex-shrink-0 overflow-hidden rounded-xl border border-white/10"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 160px, 192px"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {activeIndex !== null ? (
        <div className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <button onClick={close} className="absolute top-4 right-4 text-white/80 hover:text-white" aria-label="Close lightbox">
            <X className="w-8 h-8" />
          </button>
          <button onClick={prev} className="absolute left-4 text-white/70 hover:text-white" aria-label="Previous image">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <div className="relative h-[75vh] w-full max-w-5xl">
            <Image src={images[activeIndex].src} alt={images[activeIndex].alt} fill className="object-contain" sizes="100vw" />
          </div>
          <button onClick={next} className="absolute right-4 text-white/70 hover:text-white" aria-label="Next image">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      ) : null}
    </section>
  );
}
