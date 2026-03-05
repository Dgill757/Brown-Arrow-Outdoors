'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useCart } from '@/store/cartStore';

const CartDrawer = dynamic(() => import('@/components/CartDrawer'));

export default function LazyCartDrawerMount() {
  const { isOpen } = useCart();
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldMount(true);
    }
  }, [isOpen]);

  if (!shouldMount) {
    return null;
  }

  return <CartDrawer />;
}
