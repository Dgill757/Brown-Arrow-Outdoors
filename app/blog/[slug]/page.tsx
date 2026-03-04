import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/blogData';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Field Notes | Broken Arrow Outdoors',
      description: 'Bowhunting training insights and field-proven strategy.',
    };
  }

  const canonicalPath = `/blog/${post.slug}`;
  return {
    title: `${post.title} | Broken Arrow Outdoors`,
    description: post.seoDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${post.title} | Broken Arrow Outdoors`,
      description: post.seoDescription,
      url: canonicalPath,
      type: 'article',
      images: [{ url: post.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Broken Arrow Outdoors`,
      description: post.seoDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="bg-brand-dark text-white min-h-screen pb-24">
      <div className="relative h-[45vh] w-full">
        <Image src={post.image} alt={post.title} fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-black/20" />
        <div className="absolute bottom-0 left-0 w-full p-4">
          <div className="container mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/60 hover:text-brand-primary transition-colors mb-5 font-bold uppercase tracking-wider text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Field Notes
            </Link>
            <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter max-w-4xl leading-[0.95]">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-white/70 font-bold">
              <span className="inline-flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-primary" /> {post.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-primary" /> {post.readTime}
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="w-4 h-4 text-brand-primary" /> Broken Arrow Outdoors
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <article className="lg:col-span-8 space-y-10">
          {post.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight mb-4">{section.heading}</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                {section.paragraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}

          <section className="border-t border-white/10 pt-8">
            <h3 className="text-xl font-black uppercase tracking-wider mb-3">Keep Training</h3>
            <p className="text-white/70 mb-4">
              Continue your progression with purpose-built targets and field-ready gear.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/targets" className="bg-brand-primary text-white px-5 py-3 rounded font-bold uppercase tracking-wider text-sm">
                Shop Targets
              </Link>
              <Link href="/branded" className="border border-white/20 px-5 py-3 rounded font-bold uppercase tracking-wider text-sm hover:bg-white/10 transition-colors">
                Shop Branded Gear
              </Link>
            </div>
          </section>
        </article>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-black uppercase tracking-wider mb-4">Table Of Contents</h3>
            <ul className="space-y-3">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-white/70 hover:text-brand-primary transition-colors"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
