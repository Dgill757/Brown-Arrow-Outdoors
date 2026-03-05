'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Image from 'next/image';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { trackEvent } from '@/lib/analytics';

function TargetMesh() {
  return (
    <group position={[0, -0.2, 0]}>
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <cylinderGeometry args={[1.1, 1.02, 2.05, 64]} />
        <meshStandardMaterial color="#736a5f" metalness={0.78} roughness={0.28} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, -0.35, 0]}>
        <boxGeometry args={[2.3, 0.2, 0.84]} />
        <meshStandardMaterial color="#272727" roughness={0.76} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 2]} intensity={1.25} castShadow />
      <TargetMesh />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#121111" roughness={0.92} />
      </mesh>
      <Environment preset="sunset" />
      <OrbitControls enablePan={false} minDistance={2.5} maxDistance={5.8} minPolarAngle={0.75} maxPolarAngle={1.6} />
    </>
  );
}

export default function InteractiveTargetViewer() {
  const [webglSupported, setWebglSupported] = useState(true);
  const [muted, setMuted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [impactCount, setImpactCount] = useState(0);
  const [showImpactText, setShowImpactText] = useState(false);
  const reduceMotion = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false),
    []
  );
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const supported = !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    setWebglSupported(supported);
  }, []);

  const playImpact = async () => {
    if (!soundEnabled || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = muted;
      await audioRef.current.play();
    } catch {
      // Ignore autoplay restrictions and missing file failures.
    }
  };

  const onKillzoneClick = async () => {
    setImpactCount((count) => count + 1);
    setShowImpactText(true);
    setTimeout(() => setShowImpactText(false), 850);
    trackEvent('target_killzone_click', { component: 'interactive_target_viewer' });
    await playImpact();
  };

  return (
    <section className="container mx-auto px-4">
      <audio ref={audioRef} preload="auto" src="/sfx/arrow-hit.mp3" />
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
        <div className="flex flex-wrap gap-2 items-center justify-between mb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-primary font-bold mb-2">Interactive 3D Viewer</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight">Target Impact Simulator</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                setSoundEnabled(true);
                await playImpact();
              }}
              className="rounded-lg border border-white/20 px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white/10 transition-colors"
            >
              Enable Sound
            </button>
            <button
              type="button"
              onClick={() => setMuted((value) => !value)}
              className="rounded-lg border border-white/20 px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white/10 transition-colors"
            >
              {muted ? 'Unmute' : 'Mute'}
            </button>
          </div>
        </div>

        <div className="relative h-[330px] md:h-[460px] overflow-hidden rounded-xl border border-white/10 bg-black">
          {webglSupported ? (
            <Canvas camera={{ position: [0, 2.2, 3.8], fov: 42 }} dpr={[1, 1.8]} shadows>
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          ) : (
            <Image src="/images/targets/IMG_7546.jpg" alt="Target viewer fallback" fill className="object-cover" />
          )}

          <button
            type="button"
            onClick={onKillzoneClick}
            className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border-2 border-brand-primary/80 bg-brand-primary/20"
            aria-label="Log kill zone impact"
          >
            <span className="sr-only">Kill zone hotspot</span>
          </button>

          {!reduceMotion ? (
            <span
              key={impactCount}
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 h-16 w-16 rounded-full border border-brand-primary/80 animate-ping"
            />
          ) : null}

          {showImpactText ? (
            <p className="absolute left-1/2 top-[58%] -translate-x-1/2 text-xs uppercase tracking-[0.16em] text-brand-primary font-bold">
              Impact Logged
            </p>
          ) : null}
        </div>

        <p className="mt-3 text-[11px] text-white/45 uppercase tracking-[0.16em]">Arrow hit sound path: /public/sfx/arrow-hit.mp3</p>
      </div>
    </section>
  );
}
