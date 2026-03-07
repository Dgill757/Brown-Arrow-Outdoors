'use client';

import { useCart } from '@/store/cartStore';
import { ShoppingBag, Menu, X, Search, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/targets', label: 'Targets' },
  { href: '/branded', label: 'Branded Gear' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/partnerships', label: 'Partnerships & Events' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const { openCart, cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const totalQuantity = cart?.totalQuantity || 0;

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 border-b border-white/10 transition-all duration-300 pt-[var(--safe-area-top)]',
          isScrolled ? 'bg-brand-dark/96 backdrop-blur-xl shadow-xl' : 'bg-brand-dark/90 backdrop-blur-md'
        )}
      >
        <div className="container mx-auto px-3 sm:px-4">
          <div className="grid min-h-[66px] grid-cols-[78px_minmax(0,1fr)_78px] items-center sm:min-h-[68px] sm:grid-cols-[88px_minmax(0,1fr)_88px] lg:hidden">
            <button
              className="justify-self-start text-white hover:text-brand-primary transition-colors p-1"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-[1.625rem] h-[1.625rem] sm:w-[1.875rem] sm:h-[1.875rem]" />
            </button>

            <Link href="/" className="relative mx-auto h-8.5 sm:h-9.5 w-[clamp(9.3rem,40vw,12.2rem)]">
              <Image
                src="/images/logos/Broken-Arrow-full-logo.png"
                alt="Broken Arrow Outdoors"
                fill
                className="object-contain"
                sizes="(max-width: 430px) 172px, (max-width: 767px) 196px, 256px"
              />
            </Link>

            <div className="justify-self-end flex items-center justify-end gap-2 sm:gap-2.5">
              <button className="text-white hover:text-brand-primary transition-colors p-1" aria-label="Search">
                <Search className="w-[1.375rem] h-[1.375rem] sm:w-[1.625rem] sm:h-[1.625rem]" />
              </button>

              <button
                onClick={openCart}
                className="relative group flex items-center p-1"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-[1.375rem] h-[1.375rem] sm:w-[1.625rem] sm:h-[1.625rem] text-white group-hover:text-brand-primary transition-colors" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-brand-dark">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>

          <div className="hidden lg:flex items-center min-h-[76px] justify-between">
            <Link href="/" className="relative w-60 h-14 xl:w-64 xl:h-16 transition-transform hover:scale-105 flex items-center">
              <Image
                src="/images/logos/Broken-Arrow-full-logo.png"
                alt="Broken Arrow Outdoors"
                fill
                className="object-contain"
                sizes="(max-width: 1400px) 224px, 256px"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8 uppercase font-bold text-sm tracking-wider">
              {navLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'hover:text-brand-primary transition-colors relative group py-2',
                    pathname === link.href ? 'text-brand-primary' : 'text-white'
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100',
                      pathname === link.href ? 'scale-x-100' : ''
                    )}
                  />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <div className="hidden lg:flex items-center gap-3">
                <a href="https://www.instagram.com/brokenarrow.outdoors/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors" aria-label="Broken Arrow Outdoors Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61553849879488" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors" aria-label="Broken Arrow Outdoors Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <div className="hidden lg:flex items-center gap-6 uppercase font-bold text-xs tracking-wider text-white/70">
                {navLinks.slice(4).map((link) => (
                  <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>

              <button className="text-white hover:text-brand-primary transition-colors" aria-label="Search">
                <Search className="w-6 h-6" />
              </button>

              <button
                onClick={openCart}
                className="relative group flex items-center gap-2"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6 text-white group-hover:text-brand-primary transition-colors" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-brand-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border border-brand-dark">
                      {totalQuantity}
                    </span>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-brand-dark/98 backdrop-blur-xl flex flex-col pt-[var(--safe-area-top)] pb-[var(--safe-area-bottom)]">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="relative w-44 h-12">
                 <Image
                  src="/images/logos/Broken-Arrow-full-logo.png"
                  alt="Broken Arrow Outdoors"
                  fill
                  className="object-contain"
                  sizes="160px"
                />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-brand-primary transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link 
                    href={link.href} 
                    className={cn(
                      "text-3xl font-black uppercase italic tracking-tight hover:text-brand-primary transition-colors block py-2 border-b border-white/5",
                      pathname === link.href ? "text-brand-primary" : "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
            
            <div className="p-6 border-t border-white/10 bg-black/20">
              <p className="text-white/40 text-sm text-center uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex items-center justify-center gap-4">
                <a href="https://www.instagram.com/brokenarrow.outdoors/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors" aria-label="Broken Arrow Outdoors Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61553849879488" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-brand-primary transition-colors" aria-label="Broken Arrow Outdoors Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
        </div>
      )}
    </>
  );
}
