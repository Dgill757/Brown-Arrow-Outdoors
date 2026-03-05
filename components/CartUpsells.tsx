'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { formatMoney } from '@/lib/money';
import { IMAGE_BLUR_PLACEHOLDER } from '@/lib/image';

type Recommendation = {
  id: number;
  title: string;
  handle: string;
  featured_image?: string;
  images?: Array<{ src: string; alt?: string }>;
  variants?: Array<{ price: string }>;
};

export default function CartUpsells({ productId, excludeHandle }: { productId?: string; excludeHandle?: string }) {
  const [items, setItems] = useState<Recommendation[]>([]);

  useEffect(() => {
    if (!productId) return;
    let isMounted = true;

    fetch(`/api/recommendations?productId=${encodeURIComponent(productId)}&limit=4`)
      .then((res) => res.json())
      .then((payload) => {
        if (!isMounted || !Array.isArray(payload?.products)) return;
        const filtered = payload.products.filter((product: Recommendation) => product.handle !== excludeHandle).slice(0, 3);
        setItems(filtered);
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [productId, excludeHandle]);

  if (!items.length) return null;

  return (
    <div className="mt-6 border-t border-white/10 pt-5">
      <h3 className="text-xs uppercase tracking-[0.18em] text-brand-primary font-bold mb-4">Recommended Add-ons</h3>
      <div className="space-y-3">
        {items.map((item) => {
          const image = item.featured_image || item.images?.[0]?.src;
          const price = item.variants?.[0]?.price;
          return (
            <Link
              key={item.id}
              href={`/products/${item.handle}`}
              className="flex gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-2.5 hover:border-brand-primary/40 transition-colors"
            >
              <div className="relative h-16 w-16 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
                {image ? (
                  <Image
                    src={image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                    loading="lazy"
                    quality={70}
                    placeholder="blur"
                    blurDataURL={IMAGE_BLUR_PLACEHOLDER}
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight line-clamp-2">{item.title}</p>
                {price ? <p className="text-xs text-white/65 mt-1">{formatMoney(price, 'USD')}</p> : null}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
