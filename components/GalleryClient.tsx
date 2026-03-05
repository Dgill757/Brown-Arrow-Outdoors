'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Instagram, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Category = 'Events' | 'Customer Setups' | 'Range' | 'Behind The Scenes';

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: Category;
};

type GalleryVideo = {
  id: string;
  title: string;
  url: string;
};

const categories: Array<'All' | Category> = ['All', 'Events', 'Customer Setups', 'Range', 'Behind The Scenes'];

const galleryImages: GalleryItem[] = [
  { id: 1, src: '/images/gallery/DSC06839.JPG', category: 'Range', alt: 'Target setup on range' },
  { id: 2, src: '/images/gallery/DSC06842.JPG', category: 'Events', alt: 'Event target lineup' },
  { id: 3, src: '/images/gallery/IMG_6631.JPG', category: 'Customer Setups', alt: 'Customer setup in field' },
  { id: 4, src: '/images/gallery/About-Us.webp', category: 'Behind The Scenes', alt: 'Behind the scenes training' },
  { id: 5, src: '/images/gallery/eZy Watermark_11-10-2023_21-16-38.JPG', category: 'Range', alt: 'Bowhunting range practice' },
  { id: 6, src: '/images/gallery/IMG_8229.JPG', category: 'Events', alt: 'Archery event photo' },
  { id: 7, src: '/images/gallery/DSC08963.jpg', category: 'Customer Setups', alt: 'Customer target setup' },
  { id: 8, src: '/images/gallery/IMG_9319.JPG', category: 'Behind The Scenes', alt: 'Production and prep' },
  { id: 9, src: '/images/gallery/DSC09031 (1).jpg', category: 'Range', alt: 'Range session at dusk' },
  { id: 10, src: '/images/gallery/IMG_7652.JPG', category: 'Events', alt: 'Outdoor target event' },
  { id: 11, src: '/images/gallery/IMG_9827 (1).JPG', category: 'Customer Setups', alt: 'Customer field setup detail' },
  { id: 12, src: '/images/gallery/DSC08979.jpg', category: 'Behind The Scenes', alt: 'Team field test prep' },
];

const galleryVideos: GalleryVideo[] = [
  { id: 'KQgMSmBACm4', title: 'Bear Target Vibes Short', url: 'https://www.youtube.com/shorts/KQgMSmBACm4' },
  { id: 'G9UuFkyIcgQ', title: 'Field Test Video', url: 'https://www.youtube.com/watch?v=G9UuFkyIcgQ&t=312s' },
  { id: '4fzunjvso4A', title: 'Training Short', url: 'https://www.youtube.com/shorts/4fzunjvso4A' },
  { id: 's7XvEdQtV6I', title: 'Target Demo', url: 'https://www.youtube.com/watch?v=s7XvEdQtV6I' },
  { id: 'tfKm2_b_0J8', title: 'Range Session', url: 'https://www.youtube.com/watch?v=tfKm2_b_0J8' },
];

export default function GalleryClient() {
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const filteredImages = useMemo(
    () => (activeCategory === 'All' ? galleryImages : galleryImages.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );
  const activeImage = activeIndex !== null ? filteredImages[activeIndex] : null;

  const closeLightbox = () => setActiveIndex(null);
  const prevImage = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex - 1 + filteredImages.length) % filteredImages.length);
  };
  const nextImage = () => {
    if (activeIndex === null) return;
    setActiveIndex((activeIndex + 1) % filteredImages.length);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') prevImage();
      if (event.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, filteredImages.length]);

  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
          In The <span className="text-brand-primary">Field</span>
        </h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto">
          See how the crew trains. Tag us @BrokenArrowOutdoors to be featured.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full border uppercase font-bold tracking-wider text-sm transition-all ${
              activeCategory === cat
                ? 'bg-brand-primary text-white border-brand-primary'
                : 'border-white/10 hover:bg-white/10 text-white/60 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className="relative aspect-square group overflow-hidden rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/45 transition-colors"
            aria-label={`Open ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              loading="lazy"
              quality={78}
            />
          </button>
        ))}
      </div>

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

      <section className="mt-16">
        <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6">Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryVideos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-brand-primary/50 transition-colors"
            >
              <div className="relative aspect-video">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold">{video.title}</p>
                <p className="text-xs text-white/55 mt-1">Open on YouTube</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {activeImage ? (
        <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 rounded-full border border-white/30 p-2 text-white hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Close gallery image"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={prevImage}
            className="absolute left-4 md:left-8 rounded-full border border-white/30 p-2 text-white hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="relative w-full max-w-6xl h-[76vh]">
            <Image src={activeImage.src} alt={activeImage.alt} fill className="object-contain" sizes="100vw" priority />
          </div>
          <button
            type="button"
            onClick={nextImage}
            className="absolute right-4 md:right-8 rounded-full border border-white/30 p-2 text-white hover:text-brand-primary hover:border-brand-primary transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
