'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { src: '/images/hero/buck-hero.png', objectPosition: 'center 42%', mobileObjectPosition: '62% 46%' },
  { src: '/images/hero/elk-hero.png', objectPosition: 'center 46%', mobileObjectPosition: '62% 48%' },
  { src: '/images/hero/sasquatch-hero.png', objectPosition: 'center 48%', mobileObjectPosition: '66% 52%' },
  { src: '/images/hero/boar-hero.png', objectPosition: 'center 45%', mobileObjectPosition: '64% 50%' },
  { src: '/images/hero/hat-hero.png', objectPosition: 'center 44%', mobileObjectPosition: '64% 44%' },
  { src: '/images/hero/sweatshirt-hero.png', objectPosition: 'center 47%', mobileObjectPosition: '70% 50%' },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <section
      className="relative h-[65vh] md:h-[70vh] lg:h-[85vh] min-h-[520px] md:min-h-[620px] lg:min-h-[720px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Broken Arrow hero carousel"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.025 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.9, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentIndex].src}
            alt="Broken Arrow Outdoors featured hero slide"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: isMobile
                ? slides[currentIndex].mobileObjectPosition
                : slides[currentIndex].objectPosition,
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      <div className="absolute left-[4%] right-[4%] md:right-auto md:max-w-[640px] lg:max-w-[760px] z-20 bottom-[2.5%] md:bottom-[4%] lg:bottom-[6%] [@media(max-height:900px)]:bottom-[1.5%] [@media(max-height:780px)]:bottom-[1%]">
        <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-4 sm:p-5 md:p-6 lg:p-7 shadow-[0_18px_48px_rgba(0,0,0,0.4)]">
          <h1 className="text-[30px] sm:text-[34px] md:text-[42px] lg:text-[56px] xl:text-[62px] font-black uppercase italic tracking-tighter leading-[0.9] text-white">
            Train Like The <br />
            <span className="text-brand-primary">Moment Matters</span>
          </h1>

          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
            Steel archery targets built to simulate real hunting pressure.
          </p>

          <p className="mt-3 text-[10px] sm:text-[11px] md:text-xs text-brand-primary font-bold tracking-[0.2em] uppercase">
            Firefighter Owned. Texas Made. Built for Bowhunters.
          </p>

          <div className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 md:gap-3">
            <Link
              href="/targets"
              className="bg-brand-primary text-white px-5 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:-translate-y-0.5 text-sm md:text-base text-center"
            >
              Shop Targets
            </Link>
            <Link
              href="/branded"
              className="bg-white/10 border border-white/30 text-white px-5 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-white/20 transition-all text-sm md:text-base text-center"
            >
              Shop Gear
            </Link>
            <Link
              href="/our-story"
              className="text-white/85 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-xs md:text-sm"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? 'w-10 bg-brand-primary' : 'w-5 bg-white/40 hover:bg-white/65'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={() => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/35 border border-white/25 text-white/80 hover:text-brand-primary hover:border-brand-primary/60 transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/35 border border-white/25 text-white/80 hover:text-brand-primary hover:border-brand-primary/60 transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight size={26} />
      </button>
    </section>
  );
}
