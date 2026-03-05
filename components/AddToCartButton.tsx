'use client';

import { useState, useMemo, useEffect } from 'react';
import { useCart } from '@/store/cartStore';
import VariantSelector from './VariantSelector';
import QuantitySelector from './QuantitySelector';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { DEFAULT_SHIPPING_ESTIMATE } from '@/lib/commerceConfig';

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  
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

  // Initialize selected options with the first available variant's options
  const [selectedOptions, setSelectedOptions] = useState<any[]>([]);

  useEffect(() => {
    if (variants.length > 0) {
      // Find the first available variant, or just the first one
      const defaultVariant = variants.find((v: any) => v.availableForSale) || variants[0];
      setSelectedOptions(defaultVariant.selectedOptions);
    }
  }, [variants]);

  // Find the variant that matches the selected options
  const selectedVariant = useMemo(() => {
    return variants.find((variant: any) => {
      return variant.selectedOptions.every((option: any) => {
        const selected = selectedOptions.find((so) => so.name === option.name);
        return selected && selected.value === option.value;
      });
    });
  }, [variants, selectedOptions]);

  const handleOptionSelect = (name: string, value: string) => {
    setSelectedOptions((prev) => {
      const newOptions = [...prev];
      const index = newOptions.findIndex((o) => o.name === name);
      if (index > -1) {
        newOptions[index] = { name, value };
      } else {
        newOptions.push({ name, value });
      }
      return newOptions;
    });
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    trackEvent('add_to_cart', {
      product_handle: product.handle,
      product_title: product.title,
      variant_id: selectedVariant.id,
      quantity,
    });
    await addToCart(selectedVariant.id, quantity);
  };

  const isAvailable = selectedVariant?.availableForSale;

  if (!selectedOptions.length && variants.length > 0) return null; // Wait for hydration

  return (
    <div className="space-y-6">
      {options && options.length > 0 && options[0].name !== 'Title' && (
        <VariantSelector 
          options={options} 
          selectedOptions={selectedOptions} 
          onSelect={handleOptionSelect} 
        />
      )}

      <div className="space-y-2">
        <label className="block text-sm font-bold uppercase tracking-wider text-white/60">
          Quantity
        </label>
        <QuantitySelector quantity={quantity} onChange={setQuantity} />
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!isAvailable || isLoading}
        className={cn(
          'w-full py-4 text-lg font-black uppercase italic tracking-wider transition-all',
          !isAvailable
            ? 'bg-gray-600 cursor-not-allowed opacity-50'
            : 'bg-brand-primary hover:bg-orange-600 hover:scale-[1.01] active:scale-[0.99] text-white'
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" /> Adding...
          </span>
        ) : !isAvailable ? (
          selectedVariant ? 'Sold Out' : 'Unavailable'
        ) : (
          'Add To Cart'
        )}
      </button>
      
      <p className="text-xs text-white/40 text-center uppercase tracking-widest">{DEFAULT_SHIPPING_ESTIMATE}</p>
    </div>
  );
}

