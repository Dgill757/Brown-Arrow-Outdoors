import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import ProductGrid from '@/components/ProductGrid';
import ChallengeVideo from '@/components/ChallengeVideo';
import HeroCarousel from '@/components/HeroCarousel';
import { ArrowRight, Shield, Target, Truck, Zap } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = buildMetadata({
  title: 'Broken Arrow Outdoors | Train Like The Moment Matters',
  description: 'Steel archery targets and field-ready gear designed to build confidence under hunting pressure.',
  path: '/',
  image: '/images/hero/buck-hero.png',
});

export default async function Home() {
  // Fetch featured products (targets)
  let featuredTargets = [];
  try {
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'targets', first: 4 },
    });
    featuredTargets = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching featured targets:', error);
  }

  // Fetch featured gear (branded)
  let featuredGear = [];
  try {
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'branded', first: 4 },
    });
    featuredGear = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  } catch (error) {
    console.error('Error fetching featured gear:', error);
  }

  const featuredTargetCards = [
    '/images/targets/IMG_7546.jpg',
    '/images/targets/eZy Watermark_15-08-2024_09-59-43-9870 (1).JPG',
    '/images/targets/DSC08979.jpg',
    '/images/targets/c07e911a-2f17-4d85-87c6-1edb65cc8a93 (1).png',
  ];

  const featuredApparelCards = [
    '/images/apparel/IMG_9326.JPG',
    '/images/apparel/IMG_0495 (1).jpg',
    '/images/apparel/bao-camo-hat.png',
    '/images/apparel/IMG_0495 (1).jpg',
  ];

  return (
    <div className="flex flex-col gap-24 pb-24 bg-brand-dark text-white">
      {/* 1. Hero Carousel */}
      <HeroCarousel />

      {/* 2. Category Split */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/targets" className="group relative h-[400px] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <Image
              src="/images/targets/IMG_7100.JPG"
              alt="Shop Targets"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-brand-primary transition-colors">
                Shop Targets
              </h3>
              <p className="text-white/80 font-medium flex items-center gap-2">
                View Collection <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
          <Link href="/branded" className="group relative h-[400px] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            <Image
              src="/images/apparel/IMG_9326.JPG"
              alt="Shop Gear"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2 text-white group-hover:text-brand-primary transition-colors">
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
        <div className="text-center mb-16">
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

      {/* 4. Featured Targets */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Featured Targets</h2>
            <p className="text-white/60">Best sellers from the shop.</p>
          </div>
          <Link href="/targets" className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {featuredTargets.length > 0 ? (
          <ProductGrid products={featuredTargets} />
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/40">No products found. Please configure your Shopify connection.</p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredTargetCards.map((image, index) => (
            <Link
              key={image}
              href={featuredTargets[index]?.handle ? `/products/${featuredTargets[index].handle}` : '/targets'}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-brand-primary/25"
            >
              <Image
                src={image}
                alt="Featured target"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </Link>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden">
          <Link href="/targets" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Featured Gear */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">Branded Gear</h2>
            <p className="text-white/60">Rep the crew in the field.</p>
          </div>
          <Link href="/branded" className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {featuredGear.length > 0 ? (
          <ProductGrid products={featuredGear} />
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-lg border border-white/10">
            <p className="text-white/40">No gear found. Check back soon.</p>
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredApparelCards.map((image, index) => (
            <Link
              key={`${image}-${index}`}
              href={featuredGear[index]?.handle ? `/products/${featuredGear[index].handle}` : '/branded'}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 hover:border-brand-primary/50 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-brand-primary/25"
            >
              <Image
                src={image}
                alt="Featured branded gear"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link href="/branded" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 6. The Challenge */}
      <section className="relative py-32 bg-white/5 border-y border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
           <Image 
              src="/images/targets/tmpralfzf0k.webp"
              alt="Background"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-brand-dark/80" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-8">
            Feel The <span className="text-brand-primary">Pressure</span> <br/>Before It Counts
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Practice with pressure and precision. Build confidence. Train like it's real.
            <br/>"You don't rise to the occasion, you fall to the level of your training."
          </p>
          <ChallengeVideo />
        </div>
      </section>

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

      {/* 8. Gallery Preview */}
      <section className="container mx-auto px-4">
         <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-2">In The Field</h2>
            <p className="text-white/60">See our targets in action.</p>
          </div>
          <Link href="/gallery" className="hidden md:flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-96 md:h-80">
          <div className="relative rounded-lg overflow-hidden col-span-2 row-span-2 md:col-span-2 md:row-span-1 h-full">
             <Image src="/images/gallery/DSC09031 (1).jpg" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative rounded-lg overflow-hidden h-full">
             <Image src="/images/gallery/IMG_6631.JPG" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="relative rounded-lg overflow-hidden h-full">
             <Image src="/images/gallery/IMG_9319.JPG" alt="Gallery 3" fill className="object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link href="/gallery" className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-wider hover:text-white transition-colors">
            View Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 9. Email Capture */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-primary/20 to-brand-dark border border-brand-primary/20 p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent" />
          <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Join The Crew</h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto">
            Sign up for drop alerts, exclusive discounts, training tips, and event invites.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="YOUR EMAIL ADDRESS" 
              className="flex-1 bg-black/50 border border-white/10 px-6 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-brand-primary transition-colors rounded-lg"
            />
            <button className="bg-brand-primary text-white px-8 py-4 font-black uppercase italic tracking-wider hover:bg-orange-600 transition-colors rounded-lg shadow-lg shadow-brand-primary/20">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
