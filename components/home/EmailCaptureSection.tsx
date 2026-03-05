'use client';

import EmailSignup from '@/components/EmailSignup';

export default function EmailCaptureSection() {
  return (
    <section className="container mx-auto px-4 text-center">
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-primary/20 to-brand-dark border border-brand-primary/20 p-12 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
        <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Join The Crew</h2>
        <p className="text-white/70 mb-8 max-w-lg mx-auto">
          Sign up for drop alerts, exclusive discounts, training tips, and event invites.
        </p>
        <EmailSignup />
      </div>
    </section>
  );
}
