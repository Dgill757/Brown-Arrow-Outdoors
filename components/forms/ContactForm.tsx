'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [website, setWebsite] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = `${String(formData.get('firstName') || '').trim()} ${String(formData.get('lastName') || '').trim()}`.trim();
    const email = String(formData.get('email') || '').trim();
    const topic = String(formData.get('topic') || '').trim();
    const message = String(formData.get('message') || '').trim();
    setStatus('loading');

    try {
      const response = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          page: '/contact',
          website,
        }),
      });
      if (!response.ok) {
        throw new Error('contact request failed');
      }
      setStatus('success');
      event.currentTarget.reset();
      setWebsite('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/60">First Name</label>
          <input name="firstName" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="JOHN" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-white/60">Last Name</label>
          <input name="lastName" type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="DOE" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email Address</label>
        <input name="email" type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="JOHN@EXAMPLE.COM" required />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Topic</label>
        <div className="relative">
          <select name="topic" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors appearance-none">
            <option>Order Inquiry</option>
            <option>Partnerships & Events</option>
            <option>Dealer / Retail</option>
            <option>Media</option>
            <option>Other</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-white/60">Message</label>
        <textarea name="message" rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="HOW CAN WE HELP?" required></textarea>
      </div>

      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <button className="w-full bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg shadow-lg shadow-brand-primary/20 mt-4">
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
      {status === 'success' ? <p className="text-xs text-brand-primary">Message sent. We will follow up shortly.</p> : null}
      {status === 'error' ? <p className="text-xs text-red-300">Unable to send right now. Please try again.</p> : null}
    </form>
  );
}

