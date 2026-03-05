'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function ProductViewTracker({
  handle,
  title,
  price,
  currency,
}: {
  handle: string;
  title: string;
  price?: string;
  currency?: string;
}) {
  useEffect(() => {
    trackEvent('product_view', {
      product_handle: handle,
      product_title: title,
      product_price: price,
      currency,
    });
  }, [handle, title, price, currency]);

  return null;
}
