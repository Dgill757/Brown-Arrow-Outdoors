'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const slides = [
  { src: '/images/hero/hero-buck-head.png', objectPos: '50% 20%' },
  { src: '/images/hero/hero-sasquatc-head.png' },
  { src: '/images/hero/boar-hero.png' },
  { src: '/images/hero/hat-hero.png' },
  { src: '/images/hero/sweatshirt-hero.png' },
  { src: '/images/hero/elk-hero.png' },
];

const AUTO_ADVANCE_MS = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPrefersReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section
      /*
       * Height formula: clamp(420px, min(85vh, 66.67vw), 900px)
       *
       * 66.67vw = width × (2/3) — the natural height of a 3:2 image at full width.
       * min(85vh, 66.67vw) picks the smaller of the two, so on short monitors
       * (laptops) the hero stays in-viewport while on wide monitors it matches the
       * image's native ratio.
       * clamp(420px … 900px) keeps mobile usable and prevents runaway height on
       * ultra-wide displays.
       *
       * Combined with object-contain + object-top the full image is always
       * visible: the image pins to the top and any remaining space (letterbox bar)
       * falls below it, where the CTA overlay sits.
       */
      className="relative w-full overflow-hidden bg-black"
      style={{ height: 'clamp(420px, min(85vh, 66.67vw), 900px)' }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = touchStartX.current - (e.changedTouches[0]?.clientX ?? touchStartX.current);
        if (Math.abs(delta) > 42) {
          setCurrentIndex((prev) =>
            delta > 0 ? (prev + 1) % slides.length : (prev - 1 + slides.length) % slides.length
          );
        }
        touchStartX.current = null;
      }}
      aria-label="Broken Arrow hero carousel"
    >
      {/* ── Image layer ────────────────────────────────────── */}
      <div className="absolute inset-0">
        {isHydrated ? (
          <div
            key={currentIndex}
            className="absolute inset-0 animate-fadeIn"
          >
            <Image
              src={slides[currentIndex].src}
              alt="Broken Arrow Outdoors featured hero slide"
              fill
              priority={currentIndex === 0}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              quality={82}
              sizes="100vw"
              className="object-contain object-top lg:object-cover lg:object-center"
              style={slides[currentIndex].objectPos ? { objectPosition: slides[currentIndex].objectPos } : undefined}
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
            className="object-contain object-top lg:object-cover lg:object-center"
            style={slides[0].objectPos ? { objectPosition: slides[0].objectPos } : undefined}
          />
        )}
      </div>

      {/* ── Gradient overlays ──────────────────────────────── */}
      {/* Bottom gradient: makes CTA readable and blends letterbox bar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
      {/* Left gradient: CTA readability on wide screens */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

      {/* ── CTA overlay ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 z-10 px-[4%]"
        style={{ paddingBottom: 'calc(1.5rem + var(--safe-area-bottom))' }}
      >
        <div className="rounded-[1.2rem] border border-white/12 bg-black/66 backdrop-blur-md px-3 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.45)] w-[clamp(18rem,90vw,22rem)] md:w-[30rem] lg:w-[40rem]">
          <h1 className="text-[clamp(1.1rem,3.5vw,3rem)] font-black uppercase italic leading-tight tracking-tight text-white">
            Train Like The <br />
            <span className="text-brand-primary">Moment Matters</span>
          </h1>

          <p className="mt-1 text-[clamp(0.7rem,1.8vw,0.88rem)] text-white/86 max-w-[90%] md:max-w-[62%]">
            Steel archery targets built to simulate real hunting pressure.
          </p>

          <p className="mt-1 text-[9px] md:text-xs text-brand-primary font-bold tracking-[0.2em] uppercase">
            Firefighter Owned. Texas Made. Built for Bowhunters.
          </p>

          <div className="mt-2 grid grid-cols-2 md:flex gap-1.5 md:gap-3">
            <Link
              href="/targets"
              onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
              className="min-h-[2.3rem] md:min-h-[2.7rem] bg-brand-primary text-white px-2 py-1.5 font-black uppercase italic tracking-wide text-[0.72rem] md:text-sm text-center rounded-[2px] flex items-center justify-center"
            >
              Shop Targets
            </Link>
            <Link
              href="/branded"
              onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
              className="min-h-[2.3rem] md:min-h-[2.7rem] bg-white/10 border border-white/30 text-white px-2 py-1.5 font-black uppercase italic tracking-wide text-[0.72rem] md:text-sm text-center rounded-[2px] flex items-center justify-center"
            >
              Shop Gear
            </Link>
            <Link
              href="/our-story"
              onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
              className="md:ml-1 text-white/84 hover:text-brand-primary transition-colors font-bold uppercase tracking-[0.14em] text-[0.65rem] md:text-xs self-center"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>

      {/* ── Slide dots ─────────────────────────────────────── */}
      <div
        className="absolute left-0 right-0 z-30 flex justify-center gap-2"
        style={{ bottom: 'calc(0.5rem + var(--safe-area-bottom))' }}
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

      {/* ── Nav arrows (desktop only) ──────────────────────── */}
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
