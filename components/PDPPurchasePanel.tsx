'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import VariantSelector from '@/components/VariantSelector';
import QuantitySelector from '@/components/QuantitySelector';
import { useCart } from '@/store/cartStore';
import { formatMoney } from '@/lib/money';
import { DEFAULT_SHIPPING_ESTIMATE, RETURNS_WARRANTY_COPY } from '@/lib/commerceConfig';
import { trackEvent } from '@/lib/analytics';

export default function PDPPurchasePanel({
  product,
  title,
  shippingEstimate,
}: {
  product: any;
  title: string;
  shippingEstimate?: string;
}) {
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);
  const [showSticky, setShowSticky] = useState(false);
  const [trustTracked, setTrustTracked] = useState(false);
  const baseRef = useRef<HTMLDivElement | null>(null);

  const variants = product.variants.edges.map((edge: any) => edge.node);
  const options = useMemo(() => {
    const optionMap = new Map<string, Set<string>>();
    variants.forEach((variant: any) => {
      variant.selectedOptions.forEach((opt: any) => {
        if (!optionMap.has(opt.name)) optionMap.set(opt.name, new Set<string>());
        optionMap.get(opt.name)?.add(opt.value);
      });
    });
    return Array.from(optionMap.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }, [variants]);

  useEffect(() => {
    if (variants.length > 0) {
      const defaultVariant = variants.find((v: any) => v.availableForSale) || variants[0];
      setSelectedOptions(defaultVariant.selectedOptions);
    }
  }, [variants]);

  const selectedVariant = useMemo(() => {
    return variants.find((variant: any) =>
      variant.selectedOptions.every((option: any) => {
        const selected = selectedOptions.find((so) => so.name === option.name);
        return selected && selected.value === option.value;
      })
    );
  }, [variants, selectedOptions]);

  useEffect(() => {
    if (!baseRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSticky(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    observer.observe(baseRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!trustTracked) {
      trackEvent('pdp_trust_stack_view', { product_handle: product.handle });
      setTrustTracked(true);
    }
  }, [product.handle, trustTracked]);

  const onSelect = (name: string, value: string) => {
    setSelectedOptions((prev) => {
      const next = [...prev];
      const index = next.findIndex((entry) => entry.name === name);
      if (index > -1) next[index] = { name, value };
      else next.push({ name, value });
      return next;
    });
  };

  const addMain = async () => {
    if (!selectedVariant) return;
    trackEvent('add_to_cart', {
      product_handle: product.handle,
      product_title: product.title,
      variant_id: selectedVariant.id,
      quantity,
      source: 'pdp_main',
    });
    await addToCart(selectedVariant.id, quantity);
  };

  const addSticky = async () => {
    if (!selectedVariant) return;
    trackEvent('sticky_add_to_cart_click', {
      product_handle: product.handle,
      variant_id: selectedVariant.id,
      quantity,
    });
    await addToCart(selectedVariant.id, quantity);
  };

  const isAvailable = selectedVariant?.availableForSale;
  const price = selectedVariant?.price?.amount;
  const currency = selectedVariant?.price?.currencyCode || 'USD';

  if (!selectedOptions.length && variants.length > 0) return null;

  return (
    <>
      <div ref={baseRef} className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-[11px] uppercase tracking-[0.17em] text-brand-primary font-bold mb-3">Trust Stack</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/75">
            <p>Built in Texas</p>
            <p>11-gauge steel</p>
            <p>Weatherproof finish</p>
            <p>Reliable delivery</p>
            <p>Hunt-ready training</p>
          </div>
          <p className="text-xs text-white/60 mt-4">{shippingEstimate || DEFAULT_SHIPPING_ESTIMATE}</p>
          <p className="text-xs text-white/50 mt-1">{RETURNS_WARRANTY_COPY}</p>
        </div>

        {options && options.length > 0 && options[0].name !== 'Title' ? (
          <VariantSelector options={options} selectedOptions={selectedOptions} onSelect={onSelect} />
        ) : null}

        <div className="space-y-2">
          <label className="block text-sm font-bold uppercase tracking-wider text-white/60">Quantity</label>
          <QuantitySelector quantity={quantity} onChange={setQuantity} />
        </div>

        <button
          type="button"
          onClick={addMain}
          disabled={!isAvailable || isLoading}
          className="w-full py-4 text-lg font-black uppercase italic tracking-wider bg-brand-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : isAvailable ? 'Add To Cart' : 'Sold Out'}
        </button>
      </div>

      {showSticky ? (
        <div className="fixed bottom-0 md:top-[80px] md:bottom-auto left-0 right-0 z-[75] bg-brand-dark/95 backdrop-blur-md border-t md:border-b border-white/10 p-3">
          <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-3">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.14em] text-white/50">Quick Add</p>
              <p className="font-bold truncate">{title}</p>
              {price ? <p className="text-brand-primary text-sm">{formatMoney(price, currency)}</p> : null}
            </div>
            <div className="md:ml-auto flex flex-col sm:flex-row gap-2 sm:items-center">
              {options && options.length > 0 && options[0].name !== 'Title' ? (
                <div className="min-w-[220px]">
                  <VariantSelector options={options} selectedOptions={selectedOptions} onSelect={onSelect} />
                </div>
              ) : null}
              <div className="w-28">
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
              <button
                type="button"
                onClick={addSticky}
                disabled={!isAvailable || isLoading}
                className="bg-brand-primary hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed px-5 py-3 rounded font-black uppercase tracking-wider text-sm"
              >
                {isLoading ? 'Adding...' : 'Add To Cart'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
