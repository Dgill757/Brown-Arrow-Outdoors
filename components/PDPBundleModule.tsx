'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useCart } from '@/store/cartStore';
import { formatMoney } from '@/lib/money';
import { trackEvent } from '@/lib/analytics';

type BundleItem = {
  id: string;
  title: string;
  handle: string;
  image?: string;
  price?: string;
  currencyCode?: string;
  variantId?: string;
};

export default function PDPBundleModule({
  baseProduct,
  accessories,
}: {
  baseProduct: BundleItem;
  accessories: BundleItem[];
}) {
  const { addBundleToCart, isLoading } = useCart();
  const [selectedIds, setSelectedIds] = useState<string[]>(accessories.filter((item) => item.variantId).map((item) => item.id));

  const selectedItems = useMemo(
    () => accessories.filter((item) => selectedIds.includes(item.id) && item.variantId),
    [accessories, selectedIds]
  );

  const total = useMemo(() => {
    const basePrice = Number(baseProduct.price || '0');
    const addOnTotal = selectedItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    return basePrice + addOnTotal;
  }, [baseProduct.price, selectedItems]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((entry) => entry !== id) : [...prev, id]));
  };

  const addBundle = async () => {
    const lines = [
      ...(baseProduct.variantId ? [{ variantId: baseProduct.variantId, quantity: 1 }] : []),
      ...selectedItems.map((item) => ({ variantId: item.variantId!, quantity: 1 })),
    ];

    if (!lines.length) return;
    trackEvent('bundle_add_to_cart', {
      base_handle: baseProduct.handle,
      selected_count: selectedItems.length,
      selected_handles: selectedItems.map((item) => item.handle),
    });
    await addBundleToCart(lines);
  };

  if (!accessories.length) return null;

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-2xl font-black uppercase italic tracking-tight mb-2">Frequently Bought Together</h3>
      <p className="text-white/65 text-sm mb-5">Boost your setup with recommended add-ons and field essentials.</p>

      <div className="space-y-3 mb-5">
        {accessories.map((item) => (
          <label
            key={item.id}
            className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors ${
              selectedIds.includes(item.id) ? 'border-brand-primary/70 bg-brand-primary/10' : 'border-white/10 bg-white/[0.02]'
            }`}
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(item.id)}
              onChange={() => toggle(item.id)}
              className="accent-orange-500"
              disabled={!item.variantId}
            />
            <div className="relative h-14 w-14 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
              {item.image ? <Image src={item.image} alt={item.title} fill className="object-cover" sizes="56px" /> : null}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-tight">{item.title}</p>
              {item.price ? <p className="text-xs text-white/65 mt-1">{formatMoney(item.price, item.currencyCode || 'USD')}</p> : null}
              {!item.variantId ? <p className="text-[11px] text-amber-300 mt-1">View item details to add separately.</p> : null}
            </div>
          </label>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm uppercase tracking-wider text-white/65">Bundle Total</p>
        <p className="text-xl font-bold">{formatMoney(String(total), baseProduct.currencyCode || 'USD')}</p>
      </div>

      <button
        type="button"
        onClick={addBundle}
        disabled={isLoading || !baseProduct.variantId}
        className="w-full bg-brand-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-black uppercase italic tracking-wider transition-colors"
      >
        {isLoading ? 'Adding Bundle...' : 'Add Bundle To Cart'}
      </button>
    </section>
  );
}
