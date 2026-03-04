'use client';

import { cn } from '@/lib/utils';

export default function VariantSelector({ options, selectedOptions, onSelect }: any) {
  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-4">
      {options.map((option: any) => (
        <div key={option.name}>
          <label className="block text-sm font-bold uppercase tracking-wider mb-2 text-white/60">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value: string) => {
              const isSelected = selectedOptions.some(
                (so: any) => so.name === option.name && so.value === value
              );

              return (
                <button
                  key={value}
                  onClick={() => onSelect(option.name, value)}
                  className={cn(
                    'px-4 py-2 border text-sm font-bold uppercase transition-all',
                    isSelected
                      ? 'bg-brand-primary border-brand-primary text-white'
                      : 'bg-transparent border-white/20 text-white hover:border-white/60'
                  )}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
