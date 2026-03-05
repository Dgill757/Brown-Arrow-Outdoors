'use client';

import dynamic from 'next/dynamic';

const Target3DViewer = dynamic(() => import('@/components/targets/InteractiveTargetViewer'), {
  ssr: false,
  loading: () => <div className="container mx-auto px-4 h-[420px] bg-white/[0.02] rounded-xl animate-pulse" />,
});

export default function Target3DViewerSlot() {
  return <Target3DViewer />;
}
