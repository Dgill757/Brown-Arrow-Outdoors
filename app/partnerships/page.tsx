import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users, Mail, ExternalLink, Trophy } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Partnerships & Events | Broken Arrow Outdoors',
  description: 'Upcoming events, dealer opportunities, and sponsorship conversations with Broken Arrow Outdoors.',
  path: '/partnerships',
  image: '/images/hero/hero-5.png',
});

export default function PartnershipsPage() {
  const events = [
    {
      name: 'Total Archery Challenge 2026 Event Series',
      date: '2026 Season Calendar',
      location: 'Multiple US venues',
      source: 'Total Archery Challenge',
      href: 'https://totalarcherychallenge.com/pages/events',
    },
    {
      name: 'USA Archery National Events Calendar',
      date: '2026 Indoor + Outdoor',
      location: 'Nationwide',
      source: 'USA Archery',
      href: 'https://www.usarchery.org/news/usa-archery-unveils-2026-calendar-for-indoor-and-outdoor-events',
    },
    {
      name: 'NFAA Outdoor National Target Championships',
      date: 'August 22-23, 2026',
      location: 'Yankton, South Dakota',
      source: 'NFAA',
      href: 'https://nfaausa.com/events/national-tournaments/nfaa-outdoor-national-target-championships-2026',
    },
    {
      name: 'IBO National Triple Crown + World',
      date: 'June-September 2026',
      location: 'Multiple US venues',
      source: 'IBO',
      href: 'https://iboarchery.com/schedule',
    },
    {
      name: 'ATA Show 2026 (New Format)',
      date: 'January 7-11, 2026',
      location: 'Indiana Convention Center, Indianapolis',
      source: 'Bowhunter Magazine',
      href: 'https://www.bowhunter.com/editorial/2026-ata-show-new-format/523795',
    },
    {
      name: 'Lancaster Archery Academy Tournaments',
      date: 'Live tournament calendar',
      location: 'Lancaster, Pennsylvania',
      source: 'Lancaster Archery Academy',
      href: 'https://www.lancasterarcheryacademy.com/events/tournaments',
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <a
                key={event.name}
                href={event.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 border border-white/10 rounded-xl p-6 group hover:border-brand-primary/50 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-brand-primary font-bold">
                    <Trophy className="w-4 h-4" /> {event.source}
                  </span>
                  <ExternalLink className="w-4 h-4 text-white/45 group-hover:text-brand-primary transition-colors" />
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight mb-3 group-hover:text-brand-primary transition-colors">
                  {event.name}
                </h3>
                <div className="space-y-2 text-sm text-white/60 font-medium">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary" /> {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary" /> {event.location}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-24 grid grid-cols-1 xl:grid-cols-[1.4fr,1fr] gap-8">
          <div className="bg-gradient-to-br from-white/10 to-white/[0.03] border border-white/15 rounded-2xl p-8 lg:p-10">
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-primary font-bold mb-4">Partner Spotlight</p>
            <h2 className="text-3xl lg:text-5xl font-black uppercase italic tracking-tight mb-4">Total Archery Challenge</h2>
            <p className="text-white/70 leading-relaxed mb-8 max-w-3xl">
              We are actively building event partnerships that put Broken Arrow products in front of serious bowhunters.
              Total Archery Challenge is one of the top experiential archery circuits in the country, and a natural fit
              for our pressure-based target system.
            </p>
            <a
              href="https://totalarcherychallenge.com/pages/events"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg"
            >
              View TAC Events <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8 flex items-center justify-center">
            <Image
              src="/images/partners/total-archery-challenge-logo.svg"
              alt="Total Archery Challenge"
              width={420}
              height={96}
              className="w-full max-w-[420px] h-auto"
              sizes="(max-width: 768px) 80vw, 420px"
            />
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
