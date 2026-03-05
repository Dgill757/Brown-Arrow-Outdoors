'use client';

import { useCart } from '@/store/cartStore';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatMoney } from '@/lib/money';
import { useEffect, useRef } from 'react';
import CartLineItem from '@/components/CartLineItem';
import CartToast from '@/components/CartToast';
import CartUpsells from '@/components/CartUpsells';
import { trackEvent } from '@/lib/analytics';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateQuantity, removeFromCart, toastMessage, lastAddedProductId, lastAddedProductHandle } =
    useCart();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeCart();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, closeCart]);

  return (
    <>
      <CartToast message={toastMessage} />
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCart}
              className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-dark border-l border-white/10 z-[70] shadow-2xl flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Shopping cart"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-black uppercase italic tracking-wider">Your Cart</h2>
                <button
                  ref={closeButtonRef}
                  onClick={closeCart}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {!cart || cart.lines.edges.length === 0 ? (
                  <div className="text-center py-12 opacity-50">
                    <p className="text-lg">Your cart is empty.</p>
                    <button onClick={closeCart} className="mt-4 text-brand-primary font-bold hover:underline">
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <>
                    {cart.lines.edges.map((line: any) => (
                      <CartLineItem
                        key={line.node.id}
                        line={line}
                        onRemove={removeFromCart}
                        onUpdateQuantity={updateQuantity}
                      />
                    ))}
                    <CartUpsells productId={lastAddedProductId || undefined} excludeHandle={lastAddedProductHandle || undefined} />
                  </>
                )}
              </div>

              {cart && cart.lines.edges.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="uppercase font-bold text-sm">Subtotal</span>
                    <span className="font-mono text-lg font-bold">
                      {formatMoney(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 mb-6 text-center">Shipping & taxes calculated at checkout.</p>
                  <a
                    href={cart.checkoutUrl}
                    onClick={() =>
                      trackEvent('checkout_start', {
                        cart_id: cart.id,
                        total_quantity: cart.totalQuantity,
                        checkout_url: cart.checkoutUrl,
                      })
                    }
                    className="block w-full bg-brand-primary hover:bg-orange-600 text-white font-black uppercase italic tracking-wider text-center py-4 rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Checkout
                  </a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
