import type { Metadata } from 'next';
import { Star } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Testimonials | Broken Arrow Outdoors',
  description: 'Real bowhunters share how Broken Arrow targets improved confidence, discipline, and shot execution.',
  path: '/testimonials',
  image: '/images/hero/hero-5.png',
});

const testimonials = [
  { quote: "Best targets I've ever shot. The feedback is instant and the durability is unmatched.", author: 'Mike T.', role: 'Bowhunter', location: 'Montana' },
  { quote: 'Finally a target that simulates real hunting scenarios. My confidence has skyrocketed.', author: 'Sarah J.', role: 'Competition Shooter', location: 'Texas' },
  { quote: "Built like a tank. I've put thousands of arrows into mine and it's still going strong.", author: 'David R.', role: 'Firefighter', location: 'Colorado' },
  { quote: "The vital zone cutouts changed the way I practice. I'm no longer just shooting at a block, I'm picking a spot.", author: 'James L.', role: 'Hunter', location: 'Idaho' },
  { quote: 'Worth every penny. I used to go through multiple foam targets per year. My Broken Arrow steel is still running strong.', author: 'Chris M.', role: 'Archery Coach', location: 'Ohio' },
  { quote: 'The portable stand system is genius. I take it to the lease every weekend.', author: 'Ryan K.', role: 'Hunter', location: 'Texas' },
  { quote: 'Customer service is top notch. You can tell these guys actually hunt.', author: 'Amanda B.', role: 'Bowhunter', location: 'Wisconsin' },
  { quote: "If you're serious about ethical kills, you need to train on these targets.", author: 'Tom W.', role: 'Guide', location: 'New Mexico' },
];

export default function TestimonialsPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 border-b border-white/10 pb-12">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-6">
            Real <span className="text-brand-primary">Shooters</span>.<br />
            Real <span className="text-brand-primary">Results</span>.
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">Built by hunters. Proven in the field.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/5 p-8 rounded-xl hover:border-brand-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starI) => (
                  <Star key={starI} className="w-4 h-4 text-brand-primary fill-brand-primary" />
                ))}
              </div>
              <p className="text-lg text-white/80 italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center font-black text-brand-primary">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold uppercase tracking-wider text-sm">{testimonial.author}</p>
                  <p className="text-white/40 text-xs uppercase tracking-widest">
                    {testimonial.role} | {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
