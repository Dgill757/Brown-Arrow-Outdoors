'use client';

import { AnimatePresence, motion } from 'motion/react';

export default function CartToast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-[90] bg-black/90 border border-brand-primary/40 text-white px-5 py-3 rounded-lg shadow-xl"
          role="status"
          aria-live="polite"
        >
          <p className="text-sm uppercase tracking-wider font-bold">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
