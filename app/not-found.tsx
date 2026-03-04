import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-black text-brand-primary opacity-20">404</h1>
      <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter -mt-12 mb-6 relative z-10">
        Target <span className="text-brand-primary">Missed</span>
      </h2>
      <p className="text-xl text-white/60 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-all hover:scale-105 rounded-lg"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Base
      </Link>
    </div>
  );
}
