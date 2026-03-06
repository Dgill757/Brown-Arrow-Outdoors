'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type Slide = {
  src: string;
  desktopObjectPosition: string;
  mobileObjectPosition: string;
  tabletObjectPosition: string;
};

const slides: Slide[] = [
  {
    src: '/images/hero/hero-buck-head.png',
    desktopObjectPosition: '75% center',
    mobileObjectPosition: '70% 28%',
    tabletObjectPosition: '73% center',
  },
  {
    src: '/images/hero/hero-sasquatc-head.png',
    desktopObjectPosition: '85% center',
    mobileObjectPosition: '75% 38%',
    tabletObjectPosition: '81% center',
  },
  {
    src: '/images/hero/boar-hero.png',
    desktopObjectPosition: '70% center',
    mobileObjectPosition: '65% 48%',
    tabletObjectPosition: '67% center',
  },
  {
    src: '/images/hero/hat-hero.png',
    desktopObjectPosition: 'center center',
    mobileObjectPosition: '50% 38%',
    tabletObjectPosition: 'center center',
  },
  {
    src: '/images/hero/sweatshirt-hero.png',
    desktopObjectPosition: '65% center',
    mobileObjectPosition: '62% 42%',
    tabletObjectPosition: '64% center',
  },
  {
    src: '/images/hero/elk-hero.png',
    desktopObjectPosition: '75% 60%',
    mobileObjectPosition: '72% 42%',
    tabletObjectPosition: '74% 55%',
  },
];

const AUTO_ADVANCE_MS = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

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
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobile(mobileMedia.matches);
      setIsTablet(tabletMedia.matches);
      setPrefersReducedMotion(reducedMotionMedia.matches);
    };

    update();
    mobileMedia.addEventListener('change', update);
    tabletMedia.addEventListener('change', update);
    reducedMotionMedia.addEventListener('change', update);

    return () => {
      mobileMedia.removeEventListener('change', update);
      tabletMedia.removeEventListener('change', update);
      reducedMotionMedia.removeEventListener('change', update);
    };
  }, []);

  const activeSlide = slides[currentIndex];

  const imageObjectPosition = isMobile
    ? activeSlide.mobileObjectPosition
    : isTablet
    ? activeSlide.tabletObjectPosition
    : activeSlide.desktopObjectPosition;

  const overlayBottom = isMobile ? '1rem' : isTablet ? '1.4rem' : '5.5%';
  const overlayMaxWidth = isMobile ? '23.5rem' : isTablet ? '27rem' : '44rem';

  return (
    <section
      className="relative min-h-[560px] h-[62vh] md:h-[78vh] lg:h-auto lg:aspect-[1.5] max-h-[960px] w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current;
        const delta = touchStartX.current - touchEndX;
        if (Math.abs(delta) > 42) {
          if (delta > 0) {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
          } else {
            setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
          }
        }
        touchStartX.current = null;
      }}
      aria-label="Broken Arrow hero carousel"
    >
      <div className="absolute inset-0 overflow-visible">
        {isHydrated ? (
          <div key={currentIndex} className="absolute inset-0 transition-opacity duration-700 ease-out">
            <Image
              src={activeSlide.src}
              alt="Broken Arrow Outdoors featured hero slide"
              fill
              priority={currentIndex === 0}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              quality={82}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: imageObjectPosition }}
            />
          </div>
        ) : (
          <Image
            src={slides[0].src}
            alt="Broken Arrow Outdoors featured hero slide"
            fill
            priority
            fetchPriority="high"
            quality={82}
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: slides[0].desktopObjectPosition }}
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/38 via-transparent to-black/14 md:hidden" />

      <div className="relative z-10 h-full pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 z-10 pointer-events-auto px-[4%]"
          style={{
            paddingBottom: `calc(${overlayBottom} + var(--safe-area-bottom))`,
          }}
        >
          <div
            className="rounded-[1.2rem] border border-white/12 bg-black/66 backdrop-blur-md px-3 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)]"
            style={{ maxWidth: overlayMaxWidth }}
          >
            <h1 className="pr-4 md:pr-0 max-w-[90%] md:max-w-[60%] text-[clamp(1.2rem,4.45vw,1.52rem)] md:text-[2.2rem] lg:text-[3.1rem] xl:text-[3.7rem] font-black uppercase italic leading-tight tracking-tight text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-1.5 text-[clamp(0.78rem,2.9vw,0.9rem)] md:text-base text-white/86 max-w-[90%] md:max-w-[62%]">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            <p className="mt-1.5 text-[10px] md:text-xs text-brand-primary font-bold tracking-[0.2em] uppercase">
              Firefighter Owned. Texas Made. Built for Bowhunters.
            </p>

            <div className="mt-2.5 grid grid-cols-2 md:flex gap-1.5 md:gap-3">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="min-h-[2.65rem] md:min-h-[2.9rem] bg-brand-primary text-white px-2.5 py-2 font-black uppercase italic tracking-wide text-[0.78rem] md:text-sm text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="min-h-[2.65rem] md:min-h-[2.9rem] bg-white/10 border border-white/30 text-white px-2.5 py-2 font-black uppercase italic tracking-wide text-[0.78rem] md:text-sm text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Gear
              </Link>
              <Link
                href="/our-story"
                onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
                className="md:ml-1 text-white/84 hover:text-brand-primary transition-colors font-bold uppercase tracking-[0.14em] text-[0.69rem] md:text-xs self-center"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 right-0 z-30 flex justify-center gap-2 ${
          isMobile ? 'bottom-[calc(0.6rem+var(--safe-area-bottom))]' : 'bottom-6'
        }`}
      >
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/35 border border-white/25 text-white/80 hover:text-brand-primary hover:border-brand-primary/60 transition-colors hidden lg:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={26} />
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/35 border border-white/25 text-white/80 hover:text-brand-primary hover:border-brand-primary/60 transition-colors hidden lg:block"
        aria-label="Next slide"
      >
        <ChevronRight size={26} />
      </button>
    </section>
  );
}
