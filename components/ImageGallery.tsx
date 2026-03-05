'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { IMAGE_BLUR_PLACEHOLDER } from '@/lib/image';
import { normalizeShopifyImage } from '@/lib/normalizeShopifyImage';

type ImageNode = {
  url: string;
  altText?: string | null;
};

type ImageGalleryProps = {
  featuredImage?: ImageNode | null;
  imageEdges: Array<{ node: ImageNode }>;
  title: string;
};

export default function ImageGallery({ featuredImage, imageEdges, title }: ImageGalleryProps) {
  const gallery = useMemo(() => {
    const imageList = imageEdges
      .map((edge) => edge.node)
      .filter((img) => img?.url)
      .map((img) => ({ ...img, url: normalizeShopifyImage(img.url) }));
    if (featuredImage?.url) {
      const normalizedFeatured = { ...featuredImage, url: normalizeShopifyImage(featuredImage.url) };
      if (!imageList.some((img) => img.url === normalizedFeatured.url)) {
        return [normalizedFeatured, ...imageList];
      }
      return imageList;
    }
    return imageList.length > 0 ? imageList : [];
  }, [featuredImage, imageEdges]);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = gallery[activeIndex];

  if (!active) {
    return <div className="aspect-square bg-white/5 rounded-lg border border-white/10" />;
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square bg-white/5 rounded-lg overflow-hidden border border-white/10">
        <Image
          src={active.url}
          alt={active.altText || title}
          fill
          className="object-cover"
          quality={85}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR_PLACEHOLDER}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {gallery.slice(0, 12).map((image, idx) => (
          <button
            type="button"
            key={`${image.url}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className={`relative aspect-square rounded-sm overflow-hidden border ${
              idx === activeIndex ? 'border-brand-primary' : 'border-white/10 hover:border-white/30'
            } transition-colors`}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={image.url}
              alt={image.altText || title}
              fill
              className="object-cover"
              quality={75}
              loading="lazy"
              placeholder="blur"
              blurDataURL={IMAGE_BLUR_PLACEHOLDER}
              sizes="(max-width: 768px) 25vw, 8vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
