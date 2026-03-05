'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = {
  title: string;
  body: string;
};

export default function ProductInfoAccordion({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.title} className={cn('bg-white/[0.02]', index !== items.length - 1 && 'border-b border-white/10')}>
            <button
              type="button"
              onClick={() => setOpenIndex((current) => (current === index ? null : index))}
              className="w-full flex items-center justify-between gap-4 p-4 text-left"
            >
              <span className="font-bold uppercase text-sm tracking-wider">{item.title}</span>
              <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
            </button>
            {isOpen ? <div className="px-4 pb-4 text-sm text-white/70 leading-relaxed">{item.body}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
