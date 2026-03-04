import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60">First Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="JOHN" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/60">Last Name</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="DOE" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Email Address</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="JOHN@EXAMPLE.COM" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/60">Topic</label>
                <div className="relative">
                  <select className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors appearance-none">
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
                <textarea rows={5} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-primary transition-colors" placeholder="HOW CAN WE HELP?"></textarea>
              </div>

              <button className="w-full bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg shadow-lg shadow-brand-primary/20 mt-4">
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
