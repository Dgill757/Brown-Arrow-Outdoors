'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type SlideConfig = {
  src: string;
  desktopObjectPosition: string;
  tabletObjectPosition: string;
  mobileBackdropPosition: string;
  mobileContainPosition: string;
  mobileContainPositionNarrow: string;
  mobileContainPositionWide: string;
  mobileCardMaxWidth: string;
  mobileImageBottomInset: string;
  mobileCardBottom: {
    narrow: string;
    standard: string;
    wide: string;
    landscape: string;
  };
};

const slides: SlideConfig[] = [
  {
    src: '/images/hero/hero-buck-head.png',
    desktopObjectPosition: 'center 40%',
    tabletObjectPosition: '61% 40%',
    mobileBackdropPosition: '63% 36%',
    mobileContainPosition: '58% 34%',
    mobileContainPositionNarrow: '60% 34%',
    mobileContainPositionWide: '56% 34%',
    mobileCardMaxWidth: '29.5rem',
    mobileImageBottomInset: 'clamp(14.8rem, 32svh, 17.2rem)',
    mobileCardBottom: { narrow: '1.05rem', standard: '1.2rem', wide: '1.45rem', landscape: '0.65rem' },
  },
  {
    src: '/images/hero/elk-hero.png',
    desktopObjectPosition: 'center 46%',
    tabletObjectPosition: '59% 45%',
    mobileBackdropPosition: '62% 42%',
    mobileContainPosition: '56% 42%',
    mobileContainPositionNarrow: '58% 42%',
    mobileContainPositionWide: '54% 42%',
    mobileCardMaxWidth: '29.25rem',
    mobileImageBottomInset: 'clamp(14.8rem, 31.5svh, 17rem)',
    mobileCardBottom: { narrow: '1rem', standard: '1.15rem', wide: '1.35rem', landscape: '0.65rem' },
  },
  {
    src: '/images/hero/hero-sasquatc-head.png',
    desktopObjectPosition: 'center 38%',
    tabletObjectPosition: '58% 38%',
    mobileBackdropPosition: '59% 37%',
    mobileContainPosition: '54% 37%',
    mobileContainPositionNarrow: '56% 37%',
    mobileContainPositionWide: '52% 37%',
    mobileCardMaxWidth: '29rem',
    mobileImageBottomInset: 'clamp(14.8rem, 31svh, 16.8rem)',
    mobileCardBottom: { narrow: '1rem', standard: '1.12rem', wide: '1.32rem', landscape: '0.62rem' },
  },
  {
    src: '/images/hero/boar-hero.png',
    desktopObjectPosition: 'center 45%',
    tabletObjectPosition: '60% 45%',
    mobileBackdropPosition: '62% 43%',
    mobileContainPosition: '56% 42%',
    mobileContainPositionNarrow: '58% 42%',
    mobileContainPositionWide: '54% 42%',
    mobileCardMaxWidth: '29.35rem',
    mobileImageBottomInset: 'clamp(14.8rem, 31.5svh, 17rem)',
    mobileCardBottom: { narrow: '1rem', standard: '1.15rem', wide: '1.35rem', landscape: '0.65rem' },
  },
  {
    src: '/images/hero/hat-hero.png',
    desktopObjectPosition: 'center 44%',
    tabletObjectPosition: '59% 42%',
    mobileBackdropPosition: '60% 39%',
    mobileContainPosition: '54% 38%',
    mobileContainPositionNarrow: '56% 38%',
    mobileContainPositionWide: '52% 38%',
    mobileCardMaxWidth: '28.8rem',
    mobileImageBottomInset: 'clamp(14.8rem, 30.8svh, 16.8rem)',
    mobileCardBottom: { narrow: '0.95rem', standard: '1.1rem', wide: '1.3rem', landscape: '0.6rem' },
  },
  {
    src: '/images/hero/sweatshirt-hero.png',
    desktopObjectPosition: 'center 47%',
    tabletObjectPosition: '60% 47%',
    mobileBackdropPosition: '63% 43%',
    mobileContainPosition: '57% 43%',
    mobileContainPositionNarrow: '59% 43%',
    mobileContainPositionWide: '55% 43%',
    mobileCardMaxWidth: '29rem',
    mobileImageBottomInset: 'clamp(14.8rem, 31svh, 16.9rem)',
    mobileCardBottom: { narrow: '0.95rem', standard: '1.1rem', wide: '1.3rem', landscape: '0.62rem' },
  },
];

const AUTO_ADVANCE_MS = 4000;

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
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
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateReducedMotion = () => setPrefersReducedMotion(reducedMotionMedia.matches);
    updateReducedMotion();
    reducedMotionMedia.addEventListener('change', updateReducedMotion);
    return () => reducedMotionMedia.removeEventListener('change', updateReducedMotion);
  }, []);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('orientationchange', updateViewport);
    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('orientationchange', updateViewport);
    };
  }, []);

  const activeSlide = slides[currentIndex];
  const isMobile = viewport.width > 0 && viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1200;
  const isNarrowMobile = isMobile && viewport.width <= 360;
  const isWideMobile = isMobile && viewport.width >= 414;
  const isLandscapePhone = isMobile && viewport.width > viewport.height;
  const isShortViewport = viewport.height > 0 && viewport.height <= 760;

  const heroHeight = useMemo(() => {
    if (!isMobile) return undefined;
    if (isLandscapePhone) return '100dvh';
    if (isShortViewport) return '84svh';
    if (viewport.height >= 900) return '90svh';
    return '88svh';
  }, [isLandscapePhone, isMobile, isShortViewport, viewport.height]);

  const desktopTabletPosition = isTablet ? activeSlide.tabletObjectPosition : activeSlide.desktopObjectPosition;
  const mobileContainPosition = isNarrowMobile
    ? activeSlide.mobileContainPositionNarrow
    : isWideMobile
      ? activeSlide.mobileContainPositionWide
      : activeSlide.mobileContainPosition;

  const mobileCardBottom = isLandscapePhone
    ? activeSlide.mobileCardBottom.landscape
    : isNarrowMobile
      ? activeSlide.mobileCardBottom.narrow
      : isWideMobile
        ? activeSlide.mobileCardBottom.wide
        : activeSlide.mobileCardBottom.standard;

  return (
    <section
      className="relative h-[86svh] md:h-[75svh] lg:h-[85vh] min-h-[34rem] md:min-h-[40rem] lg:min-h-[45rem] max-h-[58rem] w-full overflow-hidden bg-black"
      style={
        isMobile
          ? {
              height: heroHeight,
              minHeight: isNarrowMobile ? '31rem' : '33rem',
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
          {isMobile ? (
            <>
              <Image
                src={activeSlide.src}
                alt="Broken Arrow Outdoors featured hero slide"
                fill
                priority={currentIndex === 0}
                fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
                quality={82}
                sizes="100vw"
                className="object-cover scale-[1.05] blur-[1.5px] brightness-[0.45]"
                style={{ objectPosition: activeSlide.mobileBackdropPosition }}
              />
              <div
                className="absolute inset-x-0 top-0"
                style={{ bottom: activeSlide.mobileImageBottomInset }}
              >
                <Image
                  src={activeSlide.src}
                  alt="Broken Arrow Outdoors featured hero subject"
                  fill
                  quality={82}
                  sizes="100vw"
                  className="object-contain px-[3.5vw]"
                  style={{ objectPosition: mobileContainPosition }}
                />
              </div>
            </>
          ) : (
            <Image
              src={activeSlide.src}
              alt="Broken Arrow Outdoors featured hero slide"
              fill
              priority={currentIndex === 0}
              fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
              quality={82}
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: desktopTabletPosition }}
            />
          )}
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

      <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/24 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15 md:hidden" />

      <div
        className="absolute left-[4%] right-[4%] md:right-auto md:max-w-[620px] lg:max-w-[720px] z-20"
        style={{
          bottom: isMobile
            ? `calc(${mobileCardBottom} + var(--safe-area-bottom))`
            : isShortViewport
              ? '1%'
              : '5%',
        }}
      >
        {isMobile ? (
          <div
            className="mx-auto w-[min(89vw,29rem)] rounded-2xl border border-white/12 bg-black/70 backdrop-blur-md px-3.5 py-3 shadow-[0_18px_48px_rgba(0,0,0,0.45)]"
            style={{ maxWidth: activeSlide.mobileCardMaxWidth }}
          >
            <h1 className="text-[clamp(1.25rem,5vw,1.62rem)] font-black uppercase italic tracking-tight leading-[0.92] text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-1.5 text-[clamp(0.82rem,3.15vw,0.93rem)] leading-[1.2] text-white/86">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="min-h-[2.75rem] bg-brand-primary text-white px-2.5 py-2.5 font-black uppercase italic tracking-wide text-[0.82rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="min-h-[2.75rem] bg-white/10 border border-white/30 text-white px-2.5 py-2.5 font-black uppercase italic tracking-wide text-[0.82rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Gear
              </Link>
            </div>
            <Link
              href="/our-story"
              onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
              className="mt-2 inline-block text-white/86 hover:text-brand-primary transition-colors font-bold uppercase tracking-[0.12em] text-[0.72rem]"
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
          isMobile ? 'bottom-[calc(0.65rem+var(--safe-area-bottom))]' : 'bottom-6'
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
