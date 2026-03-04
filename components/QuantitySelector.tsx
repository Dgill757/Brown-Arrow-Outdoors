'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({ quantity, onChange }: { quantity: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center border border-white/20 w-fit">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className="p-3 hover:bg-white/10 transition-colors"
        disabled={quantity <= 1}
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 font-mono text-lg">{quantity}</span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="p-3 hover:bg-white/10 transition-colors"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
