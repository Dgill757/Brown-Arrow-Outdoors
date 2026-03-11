import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { googleReviews } from '@/lib/googleReviews';
import VideosSection from '@/components/VideosSection';

export const metadata: Metadata = buildMetadata({
  title: 'Testimonials | Broken Arrow Outdoors',
  description: 'Verified Google reviews from Broken Arrow Outdoors customers and bowhunters.',
  path: '/testimonials',
  image: '/images/hero/hero-5.png',
});

export default function TestimonialsPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Real <span className="text-brand-primary">Google</span>.<br />
            Real <span className="text-brand-primary">Reviews</span>.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">From real Broken Arrow Outdoors customers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {googleReviews.map((review) => (
            <article
              key={`${review.reviewer}-${review.date}`}
              className="bg-white/5 border border-white/5 p-7 rounded-xl hover:border-brand-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(review.stars)].map((_, starI) => (
                  <Star key={starI} className="w-4 h-4 text-brand-primary fill-brand-primary" />
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 font-semibold mb-3">
                {review.source} • {review.date}
              </p>
              {review.quote ? (
                <p className="text-[1.02rem] text-white/82 leading-relaxed mb-5">“{review.quote}”</p>
              ) : (
                <p className="text-sm text-white/55 italic mb-5">5-star rating</p>
              )}
              <div className="flex items-center gap-4 border-t border-white/5 pt-5">
                <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center font-black text-brand-primary">
                  {review.reviewer.charAt(0)}
                </div>
                <p className="font-bold uppercase tracking-wider text-sm">{review.reviewer}</p>
              </div>
            </article>
          ))}
        </div>

        <VideosSection className="mt-20" />
      </div>
    </div>
  );
}
