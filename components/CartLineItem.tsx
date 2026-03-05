'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatMoney } from '@/lib/money';
import { IMAGE_BLUR_PLACEHOLDER } from '@/lib/image';

type CartLineItemProps = {
  line: any;
  onRemove: (lineId: string) => void;
  onUpdateQuantity: (lineId: string, quantity: number) => void;
};

export default function CartLineItem({ line, onRemove, onUpdateQuantity }: CartLineItemProps) {
  const node = line.node;

  return (
    <div className="flex gap-4">
      <div className="relative w-20 h-20 bg-white/5 rounded-md overflow-hidden flex-shrink-0">
        {node.merchandise.image && (
          <Image
            src={node.merchandise.image.url}
            alt={node.merchandise.image.altText || node.merchandise.product.title}
            fill
            className="object-cover"
            loading="lazy"
            quality={70}
            placeholder="blur"
            blurDataURL={IMAGE_BLUR_PLACEHOLDER}
            sizes="80px"
          />
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-sm">{node.merchandise.product.title}</h3>
        <p className="text-xs text-white/60 mb-2">{node.merchandise.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-white/20 rounded-sm">
            <button
              onClick={() => onUpdateQuantity(node.id, node.quantity - 1)}
              className="p-1 hover:bg-white/10 disabled:opacity-50"
              disabled={node.quantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-2 text-xs font-mono">{node.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(node.id, node.quantity + 1)}
              className="p-1 hover:bg-white/10"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <div className="text-right">
            <p className="font-mono text-sm">
              {formatMoney(node.merchandise.price.amount, node.merchandise.price.currencyCode)}
            </p>
            <button
              onClick={() => onRemove(node.id)}
              className="text-[10px] text-red-500 hover:text-red-400 mt-1 flex items-center gap-1 ml-auto"
            >
              <Trash2 className="w-3 h-3" /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
