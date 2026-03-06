'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const slides = [
  {
    src: '/images/hero/hero-buck-head.png',
    desktopObjectPosition: 'center 40%',
    tabletObjectPosition: '61% 40%',
    mobileObjectPosition: '63% 35%',
    mobileNarrowObjectPosition: '66% 35%',
    mobileLargeObjectPosition: '61% 35%',
    overlayBottom: { desktop: '5.5%', tablet: '4%', mobile: '7.5svh', mobileNarrow: '6.7svh', mobileLarge: '8svh', mobileLandscape: '4svh' },
    mobileCardMaxWidth: '31rem',
  },
  {
    src: '/images/hero/elk-hero.png',
    desktopObjectPosition: 'center 46%',
    tabletObjectPosition: '59% 45%',
    mobileObjectPosition: '61% 42%',
    mobileNarrowObjectPosition: '64% 42%',
    mobileLargeObjectPosition: '59% 42%',
    overlayBottom: { desktop: '5%', tablet: '3.75%', mobile: '7.4svh', mobileNarrow: '6.6svh', mobileLarge: '7.8svh', mobileLandscape: '4.2svh' },
    mobileCardMaxWidth: '30.5rem',
  },
  {
    src: '/images/hero/hero-sasquatc-head.png',
    desktopObjectPosition: 'center 38%',
    tabletObjectPosition: '58% 38%',
    mobileObjectPosition: '59% 37%',
    mobileNarrowObjectPosition: '62% 37%',
    mobileLargeObjectPosition: '57% 37%',
    overlayBottom: { desktop: '5%', tablet: '3.75%', mobile: '7.1svh', mobileNarrow: '6.4svh', mobileLarge: '7.6svh', mobileLandscape: '3.8svh' },
    mobileCardMaxWidth: '30.25rem',
  },
  {
    src: '/images/hero/boar-hero.png',
    desktopObjectPosition: 'center 45%',
    tabletObjectPosition: '60% 45%',
    mobileObjectPosition: '62% 43%',
    mobileNarrowObjectPosition: '65% 43%',
    mobileLargeObjectPosition: '60% 43%',
    overlayBottom: { desktop: '5%', tablet: '3.75%', mobile: '7.4svh', mobileNarrow: '6.6svh', mobileLarge: '8svh', mobileLandscape: '4.2svh' },
    mobileCardMaxWidth: '30.6rem',
  },
  {
    src: '/images/hero/hat-hero.png',
    desktopObjectPosition: 'center 44%',
    tabletObjectPosition: '59% 42%',
    mobileObjectPosition: '60% 39%',
    mobileNarrowObjectPosition: '62% 39%',
    mobileLargeObjectPosition: '58% 39%',
    overlayBottom: { desktop: '4.5%', tablet: '3.25%', mobile: '7.2svh', mobileNarrow: '6.4svh', mobileLarge: '7.7svh', mobileLandscape: '3.8svh' },
    mobileCardMaxWidth: '29.8rem',
  },
  {
    src: '/images/hero/sweatshirt-hero.png',
    desktopObjectPosition: 'center 47%',
    tabletObjectPosition: '60% 47%',
    mobileObjectPosition: '63% 43%',
    mobileNarrowObjectPosition: '66% 43%',
    mobileLargeObjectPosition: '61% 43%',
    overlayBottom: { desktop: '4.75%', tablet: '3.25%', mobile: '7.2svh', mobileNarrow: '6.4svh', mobileLarge: '7.8svh', mobileLandscape: '3.9svh' },
    mobileCardMaxWidth: '30.2rem',
  },
];

// Mobile/Desktop autoplay interval: 4000ms
const AUTO_ADVANCE_MS = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const [isLargeMobile, setIsLargeMobile] = useState(false);
  const [isLandscapePhone, setIsLandscapePhone] = useState(false);
  const [isShortViewport, setIsShortViewport] = useState(false);
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
    const narrowMobileMedia = window.matchMedia('(max-width: 360px)');
    const largeMobileMedia = window.matchMedia('(min-width: 428px) and (max-width: 767px)');
    const landscapePhoneMedia = window.matchMedia('(max-width: 932px) and (max-height: 500px)');
    const shortMedia = window.matchMedia('(max-height: 880px)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setIsMobile(mobileMedia.matches);
      setIsTablet(tabletMedia.matches);
      setIsNarrowMobile(narrowMobileMedia.matches);
      setIsLargeMobile(largeMobileMedia.matches);
      setIsLandscapePhone(landscapePhoneMedia.matches);
      setIsShortViewport(shortMedia.matches);
      setPrefersReducedMotion(reducedMotionMedia.matches);
    };
    update();
    mobileMedia.addEventListener('change', update);
    tabletMedia.addEventListener('change', update);
    narrowMobileMedia.addEventListener('change', update);
    largeMobileMedia.addEventListener('change', update);
    landscapePhoneMedia.addEventListener('change', update);
    shortMedia.addEventListener('change', update);
    reducedMotionMedia.addEventListener('change', update);
    return () => {
      mobileMedia.removeEventListener('change', update);
      tabletMedia.removeEventListener('change', update);
      narrowMobileMedia.removeEventListener('change', update);
      largeMobileMedia.removeEventListener('change', update);
      landscapePhoneMedia.removeEventListener('change', update);
      shortMedia.removeEventListener('change', update);
      reducedMotionMedia.removeEventListener('change', update);
    };
  }, []);

  const activeSlide = slides[currentIndex];
  const dynamicBottom = isMobile
    ? isLandscapePhone
      ? activeSlide.overlayBottom.mobileLandscape
      : isNarrowMobile
      ? activeSlide.overlayBottom.mobileNarrow
      : isLargeMobile
      ? activeSlide.overlayBottom.mobileLarge
      : activeSlide.overlayBottom.mobile
    : isTablet
      ? activeSlide.overlayBottom.tablet
      : activeSlide.overlayBottom.desktop;

  const imageObjectPosition = isMobile
    ? isNarrowMobile
      ? activeSlide.mobileNarrowObjectPosition
      : isLargeMobile
      ? activeSlide.mobileLargeObjectPosition
      : activeSlide.mobileObjectPosition
    : isTablet
      ? activeSlide.tabletObjectPosition
      : activeSlide.desktopObjectPosition;

  return (
    <section
      className="relative h-[88svh] md:h-[76svh] lg:h-[85vh] min-h-[34rem] md:min-h-[40rem] lg:min-h-[45rem] max-h-[58rem] w-full overflow-hidden bg-black"
      style={
        isMobile
          ? {
              height: isLandscapePhone ? '100dvh' : isShortViewport ? '90svh' : '88svh',
              minHeight: isNarrowMobile ? '32rem' : '34rem',
            }
          : undefined
      }
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
            style={{ objectPosition: imageObjectPosition }}
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
            style={{ objectPosition: slides[0].desktopObjectPosition }}
          />
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-black/18 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/36 via-transparent to-black/18 md:hidden" />

      <div
        className="absolute left-[4%] right-[4%] md:right-auto md:max-w-[620px] lg:max-w-[720px] z-20"
        style={{
          bottom: isMobile
            ? `calc(${dynamicBottom} + var(--safe-area-bottom))`
            : isShortViewport
            ? '1%'
            : dynamicBottom,
        }}
      >
        {isMobile ? (
          <div
            className="mx-auto w-[min(90vw,30.5rem)] rounded-2xl border border-white/12 bg-black/64 backdrop-blur-md px-3.5 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
            style={{ maxWidth: activeSlide.mobileCardMaxWidth }}
          >
            <h1 className="text-[clamp(1.3rem,5.15vw,1.7rem)] font-black uppercase italic tracking-tight leading-[0.92] text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-1.5 text-[clamp(0.84rem,3.3vw,0.95rem)] leading-[1.2] text-white/86">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="min-h-[2.75rem] bg-brand-primary text-white px-2.5 py-2.5 font-black uppercase italic tracking-wide text-[0.84rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="min-h-[2.75rem] bg-white/10 border border-white/30 text-white px-2.5 py-2.5 font-black uppercase italic tracking-wide text-[0.84rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Gear
              </Link>
            </div>
            <Link
              href="/our-story"
              onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
              className="mt-2 inline-block text-white/88 hover:text-brand-primary transition-colors font-bold uppercase tracking-[0.13em] text-[0.74rem]"
            >
              Our Story
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/12 bg-black/60 backdrop-blur-md p-4 sm:p-5 md:p-6 shadow-[0_18px_48px_rgba(0,0,0,0.45)]">
            <h1 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[56px] xl:text-[62px] font-black uppercase italic tracking-tighter leading-[0.92] text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-2.5 md:mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-2xl">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            {!isShortViewport && (
              <p className="mt-3 text-[10px] sm:text-[11px] md:text-xs text-brand-primary font-bold tracking-[0.2em] uppercase">
                Firefighter Owned. Texas Made. Built for Bowhunters.
              </p>
            )}

            <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2.5 md:gap-3">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="bg-brand-primary text-white px-4 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:-translate-y-0.5 text-sm md:text-base text-center sm:min-w-[170px]"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="bg-white/10 border border-white/30 text-white px-4 md:px-7 py-2.5 md:py-3 font-black uppercase italic tracking-wider hover:bg-white/20 transition-all text-sm md:text-base text-center sm:min-w-[170px]"
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
        )}
      </div>

      <div
        className={`absolute left-0 right-0 z-30 flex justify-center gap-2 ${
          isMobile ? 'bottom-[calc(0.7rem+var(--safe-area-bottom))]' : 'bottom-6'
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
