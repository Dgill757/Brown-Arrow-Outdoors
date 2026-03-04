import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <Link href="/" className="relative w-48 h-16 block transition-opacity hover:opacity-80">
            <Image
              src="/images/logos/Full BAO Logo.png"
              alt="Broken Arrow Outdoors"
              fill
              className="object-contain object-left"
            />
          </Link>
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Steel archery targets built to simulate real hunting pressure.
            Firefighter owned. Texas made. Built for bowhunters.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-brand-primary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/60 hover:text-brand-primary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-white/60 hover:text-brand-primary transition-colors"><Youtube className="w-5 h-5" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-brand-primary">Shop</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link href="/targets" className="hover:text-white transition-colors">Targets</Link></li>
            <li><Link href="/branded" className="hover:text-white transition-colors">Branded Gear</Link></li>
            <li><Link href="/products/black-bear-target" className="hover:text-white transition-colors">Best Seller</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-brand-primary">Company</h4>
          <ul className="space-y-4 text-sm text-white/60">
            <li><Link href="/our-story" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Field Notes</Link></li>
            <li><Link href="/partnerships" className="hover:text-white transition-colors">Partnerships</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold uppercase tracking-wider mb-6 text-sm text-brand-primary">Join the Crew</h4>
          <p className="text-white/60 text-sm mb-4">
            Get drop alerts, training tips, and early access to new gear.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-brand-primary transition-colors"
            />
            <button className="bg-brand-primary text-white px-4 py-2 font-bold uppercase text-sm hover:bg-orange-600 transition-colors">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-xs text-white/40">
        <p>&copy; {new Date().getFullYear()} Broken Arrow Outdoors. All rights reserved.</p>
      </div>
    </footer>
  );
}
