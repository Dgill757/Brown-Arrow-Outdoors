'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

type MobileKey = 'w320' | 'w375' | 'w390' | 'w414' | 'w430';
type TabletKey = 'w768' | 'w820' | 'w1024';

type SlideConfig = {
  src: string;
  desktopObjectPosition: string;
  mobileObjectPosition: Record<MobileKey, string>;
  tabletObjectPosition: Record<TabletKey, string>;
  overlayBottom: {
    desktop: string;
    mobile: Record<MobileKey, string>;
    tablet: Record<TabletKey, string>;
  };
  cardMaxWidth: {
    mobile: Record<MobileKey, string>;
    tablet: Record<TabletKey, string>;
  };
};

const slides: SlideConfig[] = [
  {
    src: '/images/hero/hero-buck-head.png',
    desktopObjectPosition: 'center 40%',
    mobileObjectPosition: {
      w320: '71% 34%',
      w375: '68% 34%',
      w390: '67% 34%',
      w414: '66% 34%',
      w430: '65% 34%',
    },
    tabletObjectPosition: {
      w768: '63% 41%',
      w820: '61% 41%',
      w1024: '58% 42%',
    },
    overlayBottom: {
      desktop: '5.5%',
      mobile: {
        w320: '2.35rem',
        w375: '2.45rem',
        w390: '2.55rem',
        w414: '2.75rem',
        w430: '2.9rem',
      },
      tablet: {
        w768: '4.2%',
        w820: '4%',
        w1024: '3.7%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.9rem',
        w375: '22.6rem',
        w390: '23rem',
        w414: '23.6rem',
        w430: '24.1rem',
      },
      tablet: {
        w768: '30rem',
        w820: '31rem',
        w1024: '32rem',
      },
    },
  },
  {
    src: '/images/hero/elk-hero.png',
    desktopObjectPosition: 'center 46%',
    mobileObjectPosition: {
      w320: '68% 42%',
      w375: '65% 42%',
      w390: '64% 42%',
      w414: '63% 42%',
      w430: '62% 42%',
    },
    tabletObjectPosition: {
      w768: '61% 45%',
      w820: '59% 45%',
      w1024: '57% 45%',
    },
    overlayBottom: {
      desktop: '5%',
      mobile: {
        w320: '2.35rem',
        w375: '2.5rem',
        w390: '2.6rem',
        w414: '2.8rem',
        w430: '2.95rem',
      },
      tablet: {
        w768: '3.9%',
        w820: '3.75%',
        w1024: '3.45%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.95rem',
        w375: '22.65rem',
        w390: '23.05rem',
        w414: '23.7rem',
        w430: '24.15rem',
      },
      tablet: {
        w768: '30rem',
        w820: '31rem',
        w1024: '32rem',
      },
    },
  },
  {
    src: '/images/hero/hero-sasquatc-head.png',
    desktopObjectPosition: 'center 38%',
    mobileObjectPosition: {
      w320: '65% 37%',
      w375: '63% 37%',
      w390: '62% 37%',
      w414: '61% 37%',
      w430: '60% 37%',
    },
    tabletObjectPosition: {
      w768: '60% 39%',
      w820: '58% 39%',
      w1024: '56% 39%',
    },
    overlayBottom: {
      desktop: '5%',
      mobile: {
        w320: '2.3rem',
        w375: '2.45rem',
        w390: '2.55rem',
        w414: '2.75rem',
        w430: '2.9rem',
      },
      tablet: {
        w768: '3.85%',
        w820: '3.65%',
        w1024: '3.35%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.8rem',
        w375: '22.45rem',
        w390: '22.9rem',
        w414: '23.55rem',
        w430: '24rem',
      },
      tablet: {
        w768: '29.8rem',
        w820: '30.8rem',
        w1024: '31.8rem',
      },
    },
  },
  {
    src: '/images/hero/boar-hero.png',
    desktopObjectPosition: 'center 45%',
    mobileObjectPosition: {
      w320: '68% 43%',
      w375: '65% 43%',
      w390: '64% 43%',
      w414: '63% 43%',
      w430: '62% 43%',
    },
    tabletObjectPosition: {
      w768: '62% 45%',
      w820: '60% 45%',
      w1024: '57% 45%',
    },
    overlayBottom: {
      desktop: '5%',
      mobile: {
        w320: '2.35rem',
        w375: '2.5rem',
        w390: '2.6rem',
        w414: '2.8rem',
        w430: '2.95rem',
      },
      tablet: {
        w768: '3.9%',
        w820: '3.75%',
        w1024: '3.45%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.95rem',
        w375: '22.65rem',
        w390: '23.05rem',
        w414: '23.7rem',
        w430: '24.15rem',
      },
      tablet: {
        w768: '30rem',
        w820: '31rem',
        w1024: '32rem',
      },
    },
  },
  {
    src: '/images/hero/hat-hero.png',
    desktopObjectPosition: 'center 44%',
    mobileObjectPosition: {
      w320: '65% 39%',
      w375: '63% 39%',
      w390: '62% 39%',
      w414: '61% 39%',
      w430: '60% 39%',
    },
    tabletObjectPosition: {
      w768: '61% 42%',
      w820: '59% 42%',
      w1024: '57% 42%',
    },
    overlayBottom: {
      desktop: '4.5%',
      mobile: {
        w320: '2.25rem',
        w375: '2.4rem',
        w390: '2.5rem',
        w414: '2.7rem',
        w430: '2.85rem',
      },
      tablet: {
        w768: '3.4%',
        w820: '3.25%',
        w1024: '3%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.7rem',
        w375: '22.4rem',
        w390: '22.8rem',
        w414: '23.45rem',
        w430: '23.9rem',
      },
      tablet: {
        w768: '29.8rem',
        w820: '30.8rem',
        w1024: '31.8rem',
      },
    },
  },
  {
    src: '/images/hero/sweatshirt-hero.png',
    desktopObjectPosition: 'center 47%',
    mobileObjectPosition: {
      w320: '69% 43%',
      w375: '66% 43%',
      w390: '65% 43%',
      w414: '64% 43%',
      w430: '63% 43%',
    },
    tabletObjectPosition: {
      w768: '62% 47%',
      w820: '60% 47%',
      w1024: '58% 47%',
    },
    overlayBottom: {
      desktop: '4.75%',
      mobile: {
        w320: '2.3rem',
        w375: '2.45rem',
        w390: '2.55rem',
        w414: '2.75rem',
        w430: '2.9rem',
      },
      tablet: {
        w768: '3.45%',
        w820: '3.3%',
        w1024: '3.1%',
      },
    },
    cardMaxWidth: {
      mobile: {
        w320: '21.8rem',
        w375: '22.5rem',
        w390: '22.9rem',
        w414: '23.55rem',
        w430: '24rem',
      },
      tablet: {
        w768: '29.8rem',
        w820: '30.8rem',
        w1024: '31.8rem',
      },
    },
  },
];

const AUTO_ADVANCE_MS = 4000;

const getMobileKey = (width: number): MobileKey => {
  if (width <= 320) return 'w320';
  if (width <= 375) return 'w375';
  if (width <= 390) return 'w390';
  if (width <= 414) return 'w414';
  return 'w430';
};

const getTabletKey = (width: number): TabletKey => {
  if (width <= 768) return 'w768';
  if (width <= 820) return 'w820';
  return 'w1024';
};

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(390);
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
    const shortMedia = window.matchMedia('(max-height: 880px)');
    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setIsMobile(mobileMedia.matches);
      setIsTablet(tabletMedia.matches);
      setViewportWidth(window.innerWidth);
      setIsShortViewport(shortMedia.matches);
      setPrefersReducedMotion(reducedMotionMedia.matches);
    };

    update();
    mobileMedia.addEventListener('change', update);
    tabletMedia.addEventListener('change', update);
    shortMedia.addEventListener('change', update);
    reducedMotionMedia.addEventListener('change', update);
    window.addEventListener('resize', update);

    return () => {
      mobileMedia.removeEventListener('change', update);
      tabletMedia.removeEventListener('change', update);
      shortMedia.removeEventListener('change', update);
      reducedMotionMedia.removeEventListener('change', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const activeSlide = slides[currentIndex];
  const mobileKey = getMobileKey(viewportWidth);
  const tabletKey = getTabletKey(viewportWidth);

  const imageObjectPosition = isMobile
    ? activeSlide.mobileObjectPosition[mobileKey]
    : isTablet
    ? activeSlide.tabletObjectPosition[tabletKey]
    : activeSlide.desktopObjectPosition;

  const dynamicBottom = isMobile
    ? activeSlide.overlayBottom.mobile[mobileKey]
    : isTablet
    ? activeSlide.overlayBottom.tablet[tabletKey]
    : activeSlide.overlayBottom.desktop;

  const mobileCardMaxWidth = activeSlide.cardMaxWidth.mobile[mobileKey];
  const tabletCardMaxWidth = activeSlide.cardMaxWidth.tablet[tabletKey];

  const mobileHeroHeight = useMemo(() => {
    if (!isMobile) return undefined;
    if (mobileKey === 'w320') return '84svh';
    if (mobileKey === 'w375') return isShortViewport ? '84.5svh' : '85svh';
    if (mobileKey === 'w390') return isShortViewport ? '85svh' : '85.5svh';
    if (mobileKey === 'w414') return isShortViewport ? '85.5svh' : '86svh';
    return isShortViewport ? '86svh' : '87svh';
  }, [isMobile, isShortViewport, mobileKey]);

  return (
    <section
      className="relative h-[86svh] md:h-[76svh] lg:h-[85vh] min-h-[33rem] md:min-h-[40rem] lg:min-h-[45rem] max-h-[58rem] w-full overflow-hidden bg-black"
      style={
        isMobile
          ? {
              height: mobileHeroHeight,
              minHeight: mobileKey === 'w320' ? '31.5rem' : '33rem',
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
        className="absolute left-[4%] right-[4%] md:right-auto z-20"
        style={{
          maxWidth: isMobile ? mobileCardMaxWidth : isTablet ? tabletCardMaxWidth : '44rem',
          bottom: isMobile ? `calc(${dynamicBottom} + var(--safe-area-bottom))` : isShortViewport ? '1%' : dynamicBottom,
        }}
      >
        {isMobile ? (
          <div className="mx-auto w-[min(86vw,24rem)] rounded-[1.25rem] border border-white/12 bg-black/66 backdrop-blur-md px-3 py-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.42)]">
            <h1 className="text-[clamp(1.18rem,4.55vw,1.45rem)] font-black uppercase italic tracking-tight leading-[0.94] text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-1 text-[clamp(0.76rem,2.95vw,0.86rem)] leading-[1.2] text-white/84">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="min-h-[2.55rem] bg-brand-primary text-white px-2 py-2 font-black uppercase italic tracking-wide text-[0.78rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="min-h-[2.55rem] bg-white/10 border border-white/30 text-white px-2 py-2 font-black uppercase italic tracking-wide text-[0.78rem] text-center rounded-[2px] flex items-center justify-center"
              >
                Shop Gear
              </Link>
            </div>
            <Link
              href="/our-story"
              onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
              className="mt-1.5 inline-block text-white/84 hover:text-brand-primary transition-colors font-bold uppercase tracking-[0.14em] text-[0.69rem]"
            >
              Our Story
            </Link>
          </div>
        ) : isTablet ? (
          <div className="rounded-2xl border border-white/12 bg-black/62 backdrop-blur-md p-4 md:p-5 shadow-[0_18px_42px_rgba(0,0,0,0.44)]">
            <h1 className="text-[34px] md:text-[40px] font-black uppercase italic tracking-tighter leading-[0.92] text-white">
              Train Like The <br />
              <span className="text-brand-primary">Moment Matters</span>
            </h1>

            <p className="mt-2.5 text-base md:text-lg text-white/90 max-w-2xl">
              Steel archery targets built to simulate real hunting pressure.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2.5 md:gap-3">
              <Link
                href="/targets"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_targets', location: 'hero' })}
                className="bg-brand-primary text-white px-5 py-2.5 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all text-sm md:text-base text-center min-w-[160px]"
              >
                Shop Targets
              </Link>
              <Link
                href="/branded"
                onClick={() => trackEvent('hero_cta_click', { cta: 'shop_gear', location: 'hero' })}
                className="bg-white/10 border border-white/30 text-white px-5 py-2.5 font-black uppercase italic tracking-wider hover:bg-white/20 transition-all text-sm md:text-base text-center min-w-[160px]"
              >
                Shop Gear
              </Link>
              <Link
                href="/our-story"
                onClick={() => trackEvent('hero_cta_click', { cta: 'our_story', location: 'hero' })}
                className="text-white/85 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-xs"
              >
                Our Story
              </Link>
            </div>
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
          isMobile ? 'bottom-[calc(0.62rem+var(--safe-area-bottom))]' : 'bottom-6'
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
