'use client';

import { useRef } from 'react';

export default function ChallengeVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const replay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => undefined);
  };

  return (
    <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-white/20 shadow-2xl relative group bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/targets/IMG_7546.jpg"
      >
        <source src="/images/videos/Broken-Arrow Website-video.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <button
        type="button"
        onClick={replay}
        className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-black/60 border border-white/30 text-white transition-all hover:bg-brand-primary hover:border-brand-primary"
        aria-label="Replay video"
      >
        <span className="block text-xl leading-none">↻</span>
      </button>
    </div>
  );
}
