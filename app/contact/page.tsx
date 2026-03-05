import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import ContactForm from '@/components/forms/ContactForm';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us | Broken Arrow Outdoors',
  description: 'Contact Broken Arrow Outdoors for orders, partnerships, media, and dealer inquiries.',
  path: '/contact',
  image: '/images/hero/hero-6.png',
});

export default function ContactPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8">
              Let's <span className="text-brand-primary">Talk</span>
            </h1>
            <p className="text-xl text-white/60 mb-12 leading-relaxed">
              Have a question about an order? Want to become a dealer? Just want to talk bowhunting? Drop us a line.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">Email Us</h3>
                  <p className="text-white/60">support@brokenarrow-outdoors.com</p>
                  <p className="text-white/40 text-sm mt-1">We usually respond within 24 hours.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Phone className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">Call Us</h3>
                  <p className="text-white/60">(555) 123-4567</p>
                  <p className="text-white/40 text-sm mt-1">Mon-Fri, 9am - 5pm CST</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight mb-1">HQ</h3>
                  <p className="text-white/60">Austin, Texas</p>
                  <p className="text-white/40 text-sm mt-1">Made in the USA.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl">
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
