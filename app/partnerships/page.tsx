import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Mail } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Partnerships & Events | Broken Arrow Outdoors',
  description: 'Upcoming events, dealer opportunities, and sponsorship conversations with Broken Arrow Outdoors.',
  path: '/partnerships',
  image: '/images/hero/hero-5.png',
});

export default function PartnershipsPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="border-b border-white/10 pb-8 mb-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
            Events + <span className="text-brand-primary">Partners</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Meet the crew, test our targets, and join the community.
          </p>
        </div>

        {/* Upcoming Events */}
        <section className="mb-24">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-brand-primary" /> Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Total Archery Challenge - Texas', date: 'April 12-14, 2026', location: 'San Antonio, TX', image: 'https://images.unsplash.com/photo-1511316695145-4992006ffddb?q=80&w=2071&auto=format&fit=crop' },
              { name: 'Western Hunt Expo', date: 'Feb 10-13, 2026', location: 'Salt Lake City, UT', image: 'https://images.unsplash.com/photo-1533577116850-9cc66cad8a9b?q=80&w=2070&auto=format&fit=crop' },
              { name: 'Local 3D Shoot', date: 'May 05, 2026', location: 'Austin, TX', image: 'https://images.unsplash.com/photo-1476984256599-e8c5da225aa0?q=80&w=2070&auto=format&fit=crop' },
            ].map((event, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden group hover:border-brand-primary/50 transition-colors">
                <div className="relative h-48">
                  <Image src={event.image} alt={event.name} fill className="object-cover opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute top-4 right-4 bg-brand-primary text-white text-xs font-bold uppercase px-3 py-1 rounded">
                    Upcoming
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black uppercase italic tracking-tight mb-2">{event.name}</h3>
                  <div className="space-y-2 text-sm text-white/60 font-medium">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-brand-primary" /> {event.date}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-primary" /> {event.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Partner / Dealer */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
            <Users className="w-12 h-12 text-brand-primary mb-6" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Become a Dealer</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Want to carry Broken Arrow targets in your shop or range? We offer competitive dealer pricing and support.
            </p>
            <Link href="/contact" className="inline-block bg-white text-black px-8 py-4 font-black uppercase italic tracking-wider hover:bg-brand-primary hover:text-white transition-colors rounded-lg">
              Inquire Now
            </Link>
          </div>
          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-8 md:p-12">
            <Mail className="w-12 h-12 text-brand-primary mb-6" />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Sponsorships</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              We support those who support the sport. If you're a content creator, competition shooter, or event organizer, let's talk.
            </p>
            <Link href="/contact" className="inline-block bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
