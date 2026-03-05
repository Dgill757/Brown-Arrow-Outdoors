import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Target, Hammer } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Our Story | Broken Arrow Outdoors',
  description:
    'Firefighter owned. Texas made. Built for bowhunters. Learn why Broken Arrow targets are engineered for pressure training.',
  path: '/our-story',
  image: '/images/hero/hero-3.png',
});

export default function OurStoryPage() {
  return (
    <div className="bg-brand-dark text-white">
      {/* Hero Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/targets/tmpralfzf0k.webp"
            alt="Bowhunter silhouette"
            fill
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-dark z-10" />
        </div>
        <div className="container mx-auto px-4 relative z-20 text-center">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Built For <span className="text-brand-primary">Bowhunters</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto font-medium leading-relaxed">
            We don't just build targets. We build confidence.
          </p>
        </div>
      </section>

      {/* The Mission */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">
              The <span className="text-brand-primary">Mission</span>
            </h2>
            <div className="space-y-6 text-lg text-white/70 leading-relaxed">
              <p>
                <strong className="text-white">Train with pressure. Hunt with confidence.</strong> That's the core of everything we do.
              </p>
              <p>
                Broken Arrow Outdoors was born out of frustration. Foam targets are great for muscle memory, but they don't simulate the adrenaline dump of a real encounter. We wanted to create a training system that puts pressure on the shooter *before* they step into the woods.
              </p>
              <p>
                When you draw back on a Broken Arrow target, the small kill zone and realistic steel feedback force you to focus. You have to pick a spot. You have to execute. Just like in the field.
              </p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/gallery/About-Us.webp"
              alt="Archery practice"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Brand Truths */}
      <section className="bg-white/5 border-y border-white/10 py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Firefighter Owned</h3>
              <p className="text-white/60">
                We know about performing under pressure. We bring that same discipline and attention to detail to every target we build.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Hammer className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Texas Made</h3>
              <p className="text-white/60">
                Designed, cut, and finished right here in the Lone Star State. We take pride in American craftsmanship.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tight">Built for Bowhunters</h3>
              <p className="text-white/60">
                Every shape, every angle, every detail is designed to make you a more lethal and ethical hunter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6">
            Why <span className="text-brand-primary">Steel?</span>
          </h2>
          <p className="text-xl text-white/70">
            It's not just about durability. It's about feedback.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-black/40 p-8 rounded-xl border border-white/10">
            <h4 className="text-xl font-bold uppercase mb-4 text-brand-primary">Instant Feedback</h4>
            <p className="text-white/60">
              Hear the ring. Know you hit. No need to walk downrange to check every arrow. The audible feedback reinforces good shots instantly.
            </p>
          </div>
          <div className="bg-black/40 p-8 rounded-xl border border-white/10">
            <h4 className="text-xl font-bold uppercase mb-4 text-brand-primary">Vital Zone Focus</h4>
            <p className="text-white/60">
              Our targets feature cutouts and shapes that mimic the vitals of game animals. Aim small, miss small.
            </p>
          </div>
          <div className="bg-black/40 p-8 rounded-xl border border-white/10">
            <h4 className="text-xl font-bold uppercase mb-4 text-brand-primary">Weatherproof</h4>
            <p className="text-white/60">
              Leave them out. Rain, snow, or Texas heat. Our industrial finish protects the steel so you can train year-round.
            </p>
          </div>
          <div className="bg-black/40 p-8 rounded-xl border border-white/10">
            <h4 className="text-xl font-bold uppercase mb-4 text-brand-primary">Broadhead Tuned</h4>
            <p className="text-white/60">
              Designed to handle fixed blades and mechanicals. (Always check specific target ratings for broadhead use).
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-primary text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-6 text-black">
                Our Values
              </h2>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-brand-primary">1</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-black">Craftsmanship</h4>
                    <p className="text-black/70 font-medium">We don't ship it unless we'd shoot it ourselves.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-brand-primary">2</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-black">Durability</h4>
                    <p className="text-black/70 font-medium">Gear that lasts a lifetime, not just a season.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-brand-primary">3</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-black">Ethics</h4>
                    <p className="text-black/70 font-medium">We owe it to the animal to make a clean, ethical kill.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="font-bold text-brand-primary">4</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-black uppercase text-black">Community</h4>
                    <p className="text-black/70 font-medium">Supporting fellow hunters and first responders.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl border-4 border-black/10">
               <Image
                src="/images/apparel/IMG_9321.JPG"
                alt="Community"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8">
            Ready To <span className="text-brand-primary">Train?</span>
          </h2>
          <Link 
            href="/targets" 
            className="inline-block bg-brand-primary text-white px-12 py-5 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:scale-105 shadow-lg shadow-brand-primary/20 text-xl"
          >
            Shop Targets
          </Link>
        </div>
      </section>
    </div>
  );
}
