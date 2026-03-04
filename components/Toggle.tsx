'use client';

type ToggleProps = {
  checked: boolean;
  onChange: (nextValue: boolean) => void;
  label: string;
};

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-white/70">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-brand-primary' : 'bg-white/20'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
}
