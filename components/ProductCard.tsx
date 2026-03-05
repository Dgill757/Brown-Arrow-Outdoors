import Link from 'next/link';
import Image from 'next/image';
import { formatMoney } from '@/lib/money';
import { IMAGE_BLUR_PLACEHOLDER } from '@/lib/image';

type ProductCardProps = {
  product: any;
  priority?: boolean;
};

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { handle, title, priceRange, featuredImage, availableForSale, images } = product;
  const price = priceRange.minVariantPrice;
  const resolvedImage =
    featuredImage || images?.edges?.[0]?.node || null;

  return (
    <Link href={`/products/${handle}`} className="group block relative">
      <div className="relative aspect-square overflow-hidden bg-white/5 rounded-sm border border-white/5 transition-all duration-300 group-hover:border-brand-primary/50">
        {!availableForSale && (
          <div className="absolute top-2 right-2 z-10 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-1 tracking-wider">
            Sold Out
          </div>
        )}
        {resolvedImage ? (
          <Image
            src={resolvedImage.url}
            alt={resolvedImage.altText || title}
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading={priority ? 'eager' : 'lazy'}
            quality={80}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_PLACEHOLDER}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/20">No Image</div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent hidden lg:flex items-end justify-center">
          <span className="text-brand-primary font-bold uppercase text-sm tracking-wider flex items-center gap-2">
            View Details <span className="text-lg">-&gt;</span>
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-bold text-lg leading-tight group-hover:text-brand-primary transition-colors">{title}</h3>
        <p className="text-white/60 font-mono text-sm">{formatMoney(price.amount, price.currencyCode)}</p>
      </div>
    </Link>
  );
}
