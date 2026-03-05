'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const slides = [
  {
    src: '/images/hero/hero-buck-head.png',
    objectPosition: 'center 40%',
    mobileObjectPosition: '54% 42%',
    overlayBottom: { desktop: '5.5%', tablet: '3.5%', mobile: '2.5%' },
  },
  {
    src: '/images/hero/elk-hero.png',
    objectPosition: 'center 46%',
    mobileObjectPosition: '62% 48%',
    overlayBottom: { desktop: '5%', tablet: '3%', mobile: '2%' },
  },
  {
    src: '/images/hero/hero-sasquatc-head.png',
    objectPosition: 'center 38%',
    mobileObjectPosition: '52% 42%',
    overlayBottom: { desktop: '5%', tablet: '3%', mobile: '2%' },
  },
  {
    src: '/images/hero/boar-hero.png',
    objectPosition: 'center 45%',
    mobileObjectPosition: '64% 50%',
    overlayBottom: { desktop: '5%', tablet: '3%', mobile: '2%' },
  },
  {
    src: '/images/hero/hat-hero.png',
    objectPosition: 'center 44%',
    mobileObjectPosition: '64% 44%',
    overlayBottom: { desktop: '4.5%', tablet: '2.75%', mobile: '2%' },
  },
  {
    src: '/images/hero/sweatshirt-hero.png',
    objectPosition: 'center 47%',
    mobileObjectPosition: '70% 50%',
    overlayBottom: { desktop: '4.75%', tablet: '2.75%', mobile: '2%' },
  },
];

const AUTO_ADVANCE_MS = 6000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isShortViewport, setIsShortViewport] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || isPaused || prefersReducedMotion) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, [isHydrated, isPaused, prefersReducedMotion]);

  useEffect(() => {
    const mobileMedia = window.matchMedia('(max-width: 767px)');
    const tabletMedia = window.matchMedia('(min-width: 768px) and (max-width: 1199px)');
    const shortMedia = window.matchMedia('(max-height: 880px)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mobileMedia.matches);
      setIsTablet(tabletMedia.matches);
      setIsShortViewport(shortMedia.matches);
      setPrefersReducedMotion(reducedMotionMedia.matches);
    };
    update();
    mobileMedia.addEventListener('change', update);
    tabletMedia.addEventListener('change', update);
    shortMedia.addEventListener('change', update);
    reducedMotionMedia.addEventListener('change', update);
    return () => {
      mobileMedia.removeEventListener('change', update);
      tabletMedia.removeEventListener('change', update);
      shortMedia.removeEventListener('change', update);
      reducedMotionMedia.removeEventListener('change', update);
    };
  }, []);

  const activeSlide = slides[currentIndex];
  const dynamicBottom = isMobile
    ? activeSlide.overlayBottom.mobile
    : isTablet
    ? activeSlide.overlayBottom.tablet
    : activeSlide.overlayBottom.desktop;

  return (
    <section
      className="relative h-[65vh] md:h-[70vh] lg:h-[85vh] min-h-[520px] md:min-h-[620px] lg:min-h-[720px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Broken Arrow hero carousel"
    >
      {isHydrated ? (
        <div key={currentIndex} className="absolute inset-0 transition-opacity duration-700 ease-out">
          <Image
            src={slides[currentIndex].src}
            alt="Broken Arrow Outdoors featured hero slide"
            fill
            priority={currentIndex === 0}
            fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
            quality={82}
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: isMobile ? activeSlide.mobileObjectPosition : activeSlide.objectPosition,
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0">
          <Image
            src={slides[0].src}
            alt="Broken Arrow Outdoors featured hero slide"
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slides[0].objectPosition }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />

      <div
        className="absolute left-[4%] right-[4%] md:right-auto md:max-w-[620px] lg:max-w-[720px] z-20"
        style={{ bottom: isShortViewport ? '1%' : dynamicBottom }}
      >
        <div className="rounded-2xl border border-white/10 bg-black/62 backdrop-blur-md p-4 sm:p-5 md:p-6 shadow-[0_18px_48px_rgba(0,0,0,0.4)]">
          <h1 className="text-[30px] sm:text-[34px] md:text-[42px] lg:text-[56px] xl:text-[62px] font-black uppercase italic tracking-tighter leading-[0.9] text-white">
            Train Like The <br />
            <span className="text-brand-primary">Moment Matters</span>
          </h1>

          <p className="mt-3 md:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
            Steel archery targets built to simulate real hunting pressure.
          </p>

          {!isShortViewport && (
            <p className="mt-3 text-[10px] sm:text-[11px] md:text-xs text-brand-primary font-bold tracking-[0.2em] uppercase">
              Firefighter Owned. Texas Made. Built for Bowhunters.
            </p>
          )}

          <div className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2.5 md:gap-3">
            <Link
              href="/targets"
              onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
              className="bg-brand-primary text-white px-5 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:-translate-y-0.5 text-sm md:text-base text-center"
            >
              Shop Targets
            </Link>
            <Link
              href="/branded"
              onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
              className="bg-white/10 border border-white/30 text-white px-5 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-white/20 transition-all text-sm md:text-base text-center"
            >
              Shop Gear
            </Link>
            <Link
              href="/our-story"
              onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
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
