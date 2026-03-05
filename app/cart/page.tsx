import type { Metadata } from 'next';
import CartPageView from '@/components/CartPageView';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cart | Broken Arrow Outdoors',
  description: 'Review your cart, unlock free shipping, and checkout securely.',
  path: '/cart',
  image: '/images/hero/buck-hero.png',
});

export default function CartPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight mb-8">Your Cart</h1>
        <CartPageView />
      </div>
    </div>
  );
}
