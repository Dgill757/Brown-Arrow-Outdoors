'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  '/images/hero/hero-1.png',
  '/images/hero/hero-2.png',
  '/images/hero/hero-3.png',
  '/images/hero/hero-4.png',
  '/images/hero/hero-5.png',
  '/images/hero/hero-6.png',
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, prefersReducedMotion]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative h-screen w-full overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={images[currentIndex]}
            alt="Broken Arrow Outdoors Hero"
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-brand-dark z-10" />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
        <div className="max-w-5xl space-y-8">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.85] text-white drop-shadow-2xl"
          >
            Train Like The <br/>
            <span className="text-brand-primary">Moment Matters</span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-3xl text-white/90 font-medium max-w-3xl mx-auto drop-shadow-lg"
          >
            Steel archery targets built to simulate real hunting pressure.
          </motion.p>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-sm md:text-base text-brand-primary font-bold tracking-widest uppercase"
          >
            Firefighter Owned. Texas Made. Built for Bowhunters.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <Link 
              href="/targets" 
              className="bg-brand-primary text-white px-10 py-5 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:scale-105 shadow-lg shadow-brand-primary/20 text-lg clip-path-slant"
            >
              Shop Targets
            </Link>
            <Link 
              href="/branded" 
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-5 font-black uppercase italic tracking-wider hover:bg-white/20 transition-all hover:scale-105 text-lg"
            >
              Shop Gear
            </Link>
            <Link
              href="/our-story"
              className="text-white/90 hover:text-brand-primary transition-colors font-bold uppercase tracking-widest text-sm self-center"
            >
              Our Story
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-4">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-12 h-1 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'bg-brand-primary' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors hidden md:block"
        aria-label="Previous slide"
      >
        <ChevronLeft size={48} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-white/50 hover:text-white transition-colors hidden md:block"
        aria-label="Next slide"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
}
