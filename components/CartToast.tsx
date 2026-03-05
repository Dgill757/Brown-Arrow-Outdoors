'use client';

export default function CartToast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-[90] bg-black/90 border border-brand-primary/40 text-white px-5 py-3 rounded-lg shadow-xl"
      role="status"
      aria-live="polite"
    >
      <p className="text-sm uppercase tracking-wider font-bold">{message}</p>
    </div>
  );
}
