'use client';

import Link from 'next/link';
import { useCart } from '@/store/cartStore';
import CartLineItem from '@/components/CartLineItem';
import FreeShippingProgress from '@/components/FreeShippingProgress';
import { formatMoney } from '@/lib/money';
import { trackEvent } from '@/lib/analytics';

export default function CartPageView() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-white/65 mb-4">Your cart is currently empty.</p>
        <Link href="/targets" className="inline-block bg-brand-primary px-5 py-2.5 rounded font-bold uppercase tracking-wider">
          Shop Targets
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr,360px] gap-8">
      <div className="space-y-4">
        {cart.lines.edges.map((line: any) => (
          <div key={line.node.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <CartLineItem line={line} onRemove={removeFromCart} onUpdateQuantity={updateQuantity} />
          </div>
        ))}
      </div>

      <aside className="rounded-xl border border-white/10 bg-white/[0.03] p-5 h-fit">
        <FreeShippingProgress subtotalAmount={cart.cost.totalAmount.amount} currencyCode={cart.cost.totalAmount.currencyCode} />
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm uppercase tracking-wider text-white/70">Subtotal</span>
          <span className="font-semibold">{formatMoney(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)}</span>
        </div>
        <p className="text-xs text-white/50 mb-5">Shipping and taxes are calculated at checkout.</p>
        <a
          href={cart.checkoutUrl}
          onClick={() =>
            trackEvent('checkout_start', {
              cart_id: cart.id,
              total_quantity: cart.totalQuantity,
              checkout_url: cart.checkoutUrl,
            })
          }
          className="block w-full text-center bg-brand-primary hover:bg-orange-600 rounded px-5 py-3 font-bold uppercase tracking-wider transition-colors"
        >
          Checkout
        </a>
      </aside>
    </div>
  );
}
