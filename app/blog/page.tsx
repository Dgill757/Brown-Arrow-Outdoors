import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/blogData';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Field Notes | Broken Arrow Outdoors',
  description: 'Bowhunting training, shot placement discipline, and field-tested gear education from the Broken Arrow crew.',
  path: '/blog',
  image: '/images/hero/hero-6.png',
});

export default function BlogPage() {
  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="border-b border-white/10 pb-8 mb-16">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-4">
            Field <span className="text-brand-primary">Notes</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Practical bowhunting articles focused on confidence, ethics, and real pressure execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white/5 rounded-xl overflow-hidden border border-white/5 hover:border-brand-primary/50 transition-all hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase tracking-wider text-brand-primary border border-brand-primary/20">
                  {post.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-xs text-white/40 mb-4 uppercase tracking-wider font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-3 group-hover:text-brand-primary transition-colors leading-none">
                  {post.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
