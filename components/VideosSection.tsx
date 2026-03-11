import Image from 'next/image';
import { galleryVideos } from '@/lib/galleryVideos';

type VideosSectionProps = {
  className?: string;
  title?: string;
};

export default function VideosSection({ className = '', title = 'Videos' }: VideosSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryVideos.map((video) => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl overflow-hidden border border-white/10 bg-white/[0.03] hover:border-brand-primary/50 transition-colors"
          >
            <div className="relative aspect-video">
              <Image
                src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                alt={video.title}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                quality={70}
              />
            </div>
            <div className="p-3">
              <p className="text-sm font-semibold">{video.title}</p>
              <p className="text-xs text-white/55 mt-1">Open on YouTube</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
