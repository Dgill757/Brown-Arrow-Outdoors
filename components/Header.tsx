'use client';

import { useCart } from '@/store/cartStore';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/targets', label: 'Targets' },
  { href: '/branded', label: 'Branded Gear' },
  { href: '/our-story', label: 'Our Story' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/partnerships', label: 'Partnerships & Events' },
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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent',
          isScrolled ? 'bg-brand-dark/95 backdrop-blur-md border-white/10 py-2 shadow-xl' : 'bg-transparent py-4'
        )}
      >
        <div className="container mx-auto px-4 flex items-center min-h-[72px] justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white hover:text-brand-primary transition-colors"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" />
          </button>

          {/* Logo */}
          <Link href="/" className="relative w-48 h-14 lg:w-64 lg:h-16 transition-transform hover:scale-105 flex items-center">
            <Image
              src="/images/logos/full-bao-logo.png"
              alt="Broken Arrow Outdoors"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 uppercase font-bold text-sm tracking-wider">
            {navLinks.slice(0, 4).map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "hover:text-brand-primary transition-colors relative group py-2",
                  pathname === link.href ? "text-brand-primary" : "text-white"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
                  pathname === link.href ? "scale-x-100" : ""
                )} />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-6">
             {/* Hidden on mobile, visible on desktop */}
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
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-brand-dark/98 backdrop-blur-xl flex flex-col"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="relative w-40 h-12">
                 <Image
                  src="/images/logos/full-bao-logo.png"
                  alt="Broken Arrow Outdoors"
                  fill
                  className="object-contain"
                />
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white hover:text-brand-primary transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link 
                    href={link.href} 
                    className={cn(
                      "text-3xl font-black uppercase italic tracking-tight hover:text-brand-primary transition-colors block py-2 border-b border-white/5",
                      pathname === link.href ? "text-brand-primary" : "text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            <div className="p-6 border-t border-white/10 bg-black/20">
              <p className="text-white/40 text-sm text-center uppercase tracking-widest mb-4">Follow Us</p>
              {/* Social icons could go here */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
