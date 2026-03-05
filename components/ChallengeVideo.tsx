'use client';

import { useEffect, useRef, useState } from 'react';

export default function ChallengeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = muted;
    video.defaultMuted = muted;
    video.volume = muted ? 0 : 1;
  }, [muted]);

  const replay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => undefined);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !muted;
    video.defaultMuted = nextMuted;
    video.muted = nextMuted;
    video.volume = nextMuted ? 0 : 1;
    if (!nextMuted) {
      // Force audible playback after the user gesture across stricter mobile browsers.
      video.currentTime = Math.max(0, video.currentTime);
      video.play().catch(() => undefined);
    }

    setMuted(nextMuted);
  };

  return (
    <div ref={containerRef} className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/20 shadow-2xl relative group bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted={muted}
        loop
        playsInline
        preload="none"
        poster="/images/video-poster.webp"
      >
        {shouldLoadVideo ? (
          <>
            <source src="/videos/BearTargetVibes.mp4" type="video/mp4" />
            <source src="/videos/BearTargetVibes.webm" type="video/webm" />
          </>
        ) : null}
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <button
        type="button"
        onClick={replay}
        className="absolute bottom-4 right-4 h-12 rounded-full bg-black/60 border border-white/30 text-white transition-all hover:bg-brand-primary hover:border-brand-primary px-4"
        aria-label="Replay video"
      >
        <span className="block text-[11px] leading-none font-bold uppercase tracking-wider">Replay</span>
      </button>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-4 right-[6.8rem] h-12 rounded-full bg-black/60 border border-white/30 text-white transition-all hover:bg-brand-primary hover:border-brand-primary px-4"
        aria-label={muted ? 'Unmute video' : 'Mute video'}
      >
        <span className="block text-[11px] leading-none font-bold uppercase tracking-wider">
          {muted ? 'Tap to unmute' : 'Mute'}
        </span>
      </button>
    </div>
  );
}
