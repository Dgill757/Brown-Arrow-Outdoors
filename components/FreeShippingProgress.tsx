'use client';

import { useEffect, useRef } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/commerceConfig';
import { formatMoney } from '@/lib/money';
import { trackEvent } from '@/lib/analytics';

export default function FreeShippingProgress({
  subtotalAmount,
  currencyCode = 'USD',
}: {
  subtotalAmount: string;
  currencyCode?: string;
}) {
  const subtotal = Number(subtotalAmount || '0');
  const progress = Math.max(0, Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const qualified = remaining <= 0;
  const didTrack = useRef(false);

  useEffect(() => {
    if (qualified && !didTrack.current) {
      trackEvent('free_shipping_threshold_reached', {
        threshold: FREE_SHIPPING_THRESHOLD,
        subtotal,
        currency: currencyCode,
      });
      didTrack.current = true;
    }
  }, [qualified, subtotal, currencyCode]);

  return (
    <div className="mb-5 rounded-lg border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs uppercase tracking-[0.14em] text-white/70 mb-2">
        {qualified
          ? 'You unlocked free shipping'
          : `Add ${formatMoney(String(remaining), currencyCode)} for free shipping`}
      </p>
      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-brand-primary transition-all duration-500"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
