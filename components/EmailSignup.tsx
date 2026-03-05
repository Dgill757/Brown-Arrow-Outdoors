'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus('error');
      return;
    }

    trackEvent('email_capture_submit', {
      email_domain: email.split('@')[1],
      provider: 'klaviyo_placeholder',
    });

    // Klaviyo-ready placeholder.
    // Replace with API call to your Klaviyo list endpoint.
    setStatus('success');
    setEmail('');
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        placeholder="YOUR EMAIL ADDRESS"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status !== 'idle') setStatus('idle');
        }}
        className="flex-1 bg-black/50 border border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary transition-colors rounded-lg"
        required
      />
      <button className="bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg shadow-lg shadow-brand-primary/20">
        Subscribe
      </button>
      {status === 'error' ? <p className="basis-full text-xs text-red-300">Enter a valid email address.</p> : null}
      {status === 'success' ? (
        <p className="basis-full text-xs text-brand-primary">You&apos;re in. Expect drop alerts and field updates.</p>
      ) : null}
    </form>
  );
}
