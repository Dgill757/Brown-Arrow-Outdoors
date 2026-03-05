'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Suspense, useMemo, useRef, useState } from 'react';

function SteelTarget({ highlightKillZone }: { highlightKillZone: boolean }) {
  const steelColor = '#7A746A';
  const zoneColor = highlightKillZone ? '#F97316' : '#D6C60A';

  return (
    <group position={[0, -0.3, 0]}>
      <mesh castShadow receiveShadow position={[0, 1, 0]}>
        <cylinderGeometry args={[1.15, 1.05, 2.1, 64]} />
        <meshStandardMaterial color={steelColor} metalness={0.75} roughness={0.3} />
      </mesh>

      <mesh castShadow position={[0, 1.2, 1.07]}>
        <ringGeometry args={[0.24, 0.45, 48]} />
        <meshStandardMaterial color={zoneColor} metalness={0.2} roughness={0.55} />
      </mesh>

      <mesh castShadow position={[0, 1.2, 1.09]}>
        <circleGeometry args={[0.16, 48]} />
        <meshStandardMaterial color="#151515" metalness={0.1} roughness={0.8} />
      </mesh>

      <mesh receiveShadow position={[0, -0.35, 0]}>
        <boxGeometry args={[2.2, 0.2, 0.8]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Scene({ highlightKillZone }: { highlightKillZone: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} castShadow />
      <SteelTarget highlightKillZone={highlightKillZone} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#111010" roughness={0.9} />
      </mesh>
      <Environment preset="sunset" />
      <OrbitControls enablePan={false} minDistance={2.6} maxDistance={5.8} minPolarAngle={0.8} maxPolarAngle={1.6} />
    </>
  );
}

export default function Target3DViewer() {
  const [highlightKillZone, setHighlightKillZone] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dpr = useMemo(() => [1, 1.75] as [number, number], []);

  const playHitSound = async () => {
    if (!soundEnabled || !audioRef.current) return;
    try {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = isMuted;
      await audioRef.current.play();
    } catch {
      // Ignore blocked playback errors.
    }
  };

  return (
    <section className="container mx-auto px-4">
      <audio ref={audioRef} preload="auto" src="/audio/arrow-hit.mp3" />
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-6">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-primary font-bold mb-2">Interactive 3D Viewer</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tight">Inspect Target Geometry</h2>
            <p className="text-white/65 mt-3 max-w-2xl">
              Rotate, zoom, and inspect strike zone placement before you buy. This models field training geometry and kill-zone focus.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={async () => {
                setSoundEnabled(true);
                await playHitSound();
              }}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white/10 transition-colors"
            >
              Enable Sound
            </button>
            <button
              type="button"
              onClick={() => setIsMuted((v) => !v)}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-xs uppercase tracking-wider font-bold hover:bg-white/10 transition-colors"
            >
              {isMuted ? 'Unmute' : 'Mute'}
            </button>
            <button
              type="button"
              onClick={async () => {
                setHighlightKillZone((value) => !value);
                await playHitSound();
              }}
              className="inline-flex items-center justify-center rounded-lg border border-white/20 px-5 py-2.5 text-sm uppercase tracking-wider font-bold hover:bg-white/10 transition-colors"
            >
              {highlightKillZone ? 'Hide Kill Zone Highlight' : 'Highlight Kill Zone'}
            </button>
          </div>
        </div>
        <div
          className="relative h-[340px] md:h-[460px] overflow-hidden rounded-xl border border-white/10 bg-black"
          onPointerDown={() => {
            void playHitSound();
          }}
        >
          <Canvas camera={{ position: [0, 2.2, 3.8], fov: 42 }} dpr={dpr} shadows>
            <Suspense fallback={null}>
              <Scene highlightKillZone={highlightKillZone} />
            </Suspense>
          </Canvas>
        </div>
        <p className="mt-3 text-[11px] text-white/45 uppercase tracking-[0.16em]">Arrow hit audio path: /public/audio/arrow-hit.mp3</p>
      </div>
    </section>
  );
}
