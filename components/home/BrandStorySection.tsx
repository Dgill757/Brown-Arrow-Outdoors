import Link from 'next/link';
import Image from 'next/image';

export default function BrandStorySection() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-10">
        <div className="space-y-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-brand-primary font-bold">Brand Story</p>
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight">Firefighter Owned. Texas Made.</h2>
          <p className="text-white/70 leading-relaxed">
            Broken Arrow Outdoors was built for bowhunters who refuse to leave confidence to chance. We design steel target
            systems that simulate the pressure of live moments, so ethical shot execution becomes instinctive when it matters.
          </p>
          <Link
            href="/our-story"
            className="inline-block border border-white/20 text-white px-6 py-3 rounded-lg uppercase font-black italic tracking-wider hover:bg-white/10 transition-colors"
          >
            Read Our Story
          </Link>
        </div>
        <div className="relative h-[300px] md:h-[360px] rounded-xl overflow-hidden border border-white/10">
          <Image src="/images/gallery/About-Us.webp" alt="Broken Arrow Outdoors team" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
