import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import ProductGrid from '@/components/ProductGrid';
import HeroCarousel from '@/components/HeroCarousel';
import BrandStorySection from '@/components/home/BrandStorySection';
import { ArrowRight, Shield, Target, Truck, Zap } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { pickFeaturedProducts } from '@/lib/featuredProducts';

const HeroVideoSection = dynamic(() => import('@/components/home/HeroVideoSection'), {
  loading: () => <div className="h-[520px] bg-white/[0.02] border-y border-white/10 animate-pulse" />,
});
const FieldTestGallerySection = dynamic(() => import('@/components/home/FieldTestGallerySection'), {
  loading: () => <div className="container mx-auto px-4 h-[360px] bg-white/[0.02] rounded-xl animate-pulse" />,
});
const EmailCaptureSection = dynamic(() => import('@/components/home/EmailCaptureSection'), {
  loading: () => <div className="container mx-auto px-4 h-[240px] bg-white/[0.02] rounded-xl animate-pulse" />,
});

export const revalidate = 60;
export const metadata: Metadata = buildMetadata({
  title: 'Broken Arrow Outdoors | Train Like The Moment Matters',
  description: 'Steel archery targets and field-ready gear designed to build confidence under hunting pressure.',
  path: '/',
  image: '/images/hero/buck-hero.png',
});

export default async function Home() {
  const shopifyEnvReady = Boolean(
    process.env.SHOPIFY_DOMAIN && process.env.SHOPIFY_API_VERSION && process.env.STOREFRONT_PUBLIC_TOKEN
  );

  // Fetch featured products (targets)
  let featuredTargets = [];
  try {
    if (!shopifyEnvReady) throw new Error('Shopify environment variables are missing.');
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'targets', first: 12 },
      cacheSeconds: 60,
      tags: ['home-targets'],
    });
    featuredTargets = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching featured targets:', error);
  }

  // Fetch featured gear (branded)
  let featuredGear = [];
  try {
    if (!shopifyEnvReady) throw new Error('Shopify environment variables are missing.');
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'branded', first: 12 },
      cacheSeconds: 60,
      tags: ['home-branded'],
    });
    featuredGear = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching featured gear:', error);
  }

  const uniqueFeaturedTargetProducts = pickFeaturedProducts(featuredTargets, 4);
  const uniqueFeaturedGearProducts = pickFeaturedProducts(featuredGear, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 md:pb-24 bg-brand-dark text-white">
      {!shopifyEnvReady ? (
        <div className="container mx-auto px-4 pt-6">
          <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 p-4 text-amber-200 text-sm">
            Shopify storefront is not configured yet. Add `SHOPIFY_DOMAIN`, `SHOPIFY_API_VERSION`, and `STOREFRONT_PUBLIC_TOKEN`
            in environment variables to enable live catalog products.
          </div>
        </div>
      ) : null}
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Category Split */}
      <section className="container mx-auto px-4 -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <Link href="/targets" className="group relative h-[clamp(17rem,56vw,25rem)] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <Image
              src="/images/hero/shop-targets-image.png"
              alt="Shop Targets"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-8">
              <h3 className="text-[clamp(1.8rem,8vw,2.5rem)] font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-brand-primary transition-colors">
                Shop Targets
              </h3>
              <p className="text-white/80 font-medium flex items-center gap-2">
                View Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
          <Link href="/branded" className="group relative h-[clamp(17rem,56vw,25rem)] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <Image
              src="/images/apparel/602d96ae-cf8b-492a-8bf8-2bfafca9a5d8.png"
              alt="Shop Gear"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5 sm:p-6 md:p-8">
              <h3 className="text-[clamp(1.8rem,8vw,2.5rem)] font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-brand-primary transition-colors">
                Shop Gear
              </h3>
              <p className="text-white/80 font-medium flex items-center gap-2">
                View Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Why Broken Arrow */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Why <span className="text-brand-primary">Broken Arrow?</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            We don't cut corners. We cut steel. Here's what sets our targets apart.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 p-8 border border-white/5 hover:border-brand-primary/30 transition-colors group rounded-xl">
            <Target className="w-10 h-10 text-brand-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black uppercase italic mb-3">Real Pressure</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Simulate the adrenaline of drawing on live game. Small kill zones build confidence.
            </p>
          </div>
          <div className="bg-white/5 p-8 border border-white/5 hover:border-brand-primary/30 transition-colors group rounded-xl">
            <Shield className="w-10 h-10 text-brand-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black uppercase italic mb-3">11-Gauge Steel</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Premium 11-gauge steel withstands thousands of shots and provides instant feedback.
            </p>
          </div>
          <div className="bg-white/5 p-8 border border-white/5 hover:border-brand-primary/30 transition-colors group rounded-xl">
            <Zap className="w-10 h-10 text-brand-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black uppercase italic mb-3">Industrial Finish</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Coated to resist rust and weather, so you can leave them up all season long.
            </p>
          </div>
          <div className="bg-white/5 p-8 border border-white/5 hover:border-brand-primary/30 transition-colors group rounded-xl">
            <Truck className="w-10 h-10 text-brand-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black uppercase italic mb-3">Portable Setup</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Easy to transport. From the backyard to the lease, take your training anywhere.
            </p>
          </div>
        </div>
      </section>

      <BrandStorySection />

      {/* 4. Featured Targets */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">Featured Targets</h2>
            <p className="text-white/60">Best sellers from the shop.</p>
          </div>
          <Link href="/targets" className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {uniqueFeaturedTargetProducts.length > 0 ? (
          <ProductGrid products={uniqueFeaturedTargetProducts} />
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/40">No products found. Please configure your Shopify connection.</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/targets" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Featured Gear */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8 md:mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-2">Branded Gear</h2>
            <p className="text-white/60">Rep the crew in the field.</p>
          </div>
          <Link href="/branded" className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {uniqueFeaturedGearProducts.length > 0 ? (
          <ProductGrid products={uniqueFeaturedGearProducts} />
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/40">No gear found. Check back soon.</p>
          </div>
        )}

        <div className="mt-12 text-center md:hidden">
          <Link href="/branded" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. Hero Video */}
      <HeroVideoSection />

      {/* 7. Testimonials Preview */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Real <span className="text-brand-primary">Results</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: "Best targets I've ever shot. The feedback is instant and the durability is unmatched.", author: "Mike T.", role: "Bowhunter" },
            { quote: "Finally a target that simulates real hunting scenarios. My confidence has skyrocketed.", author: "Sarah J.", role: "Competition Shooter" },
            { quote: "Built like a tank. I've put thousands of arrows into mine and it's still going strong.", author: "David R.", role: "Firefighter" },
          ].map((testimonial, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-xl border border-white/5 relative">
              <div className="text-brand-primary text-6xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-white/80 italic mb-6 relative z-10 leading-relaxed">
                {testimonial.quote}
              </p>
              <div>
                <p className="font-bold uppercase tracking-wider text-white">{testimonial.author}</p>
                <p className="text-brand-primary text-xs uppercase tracking-widest">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/testimonials" className="inline-flex items-center gap-2 text-white hover:text-brand-primary transition-colors font-bold uppercase tracking-wider">
            Read More Reviews <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 8. Field Test Gallery */}
      <FieldTestGallerySection />

      {/* 9. Email Capture */}
      <EmailCaptureSection />
    </div>
  );
}
