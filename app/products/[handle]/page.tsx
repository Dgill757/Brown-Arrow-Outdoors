import { fetchShopifyRecommendations, shopifyFetch } from '@/lib/shopify';
import { PRODUCT_BY_HANDLE_QUERY, COLLECTION_PRODUCT_HANDLES_QUERY, COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import { notFound } from 'next/navigation';
import { formatMoney } from '@/lib/money';
import ProductGrid from '@/components/ProductGrid';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import ImageGallery from '@/components/ImageGallery';
import ProductInfoAccordion from '@/components/ProductInfoAccordion';
import ProductViewTracker from '@/components/ProductViewTracker';
import Image from 'next/image';
import PDPPurchasePanel from '@/components/PDPPurchasePanel';
import PDPBundleModule from '@/components/PDPBundleModule';
import UGCStrip from '@/components/UGCStrip';
import { CURATED_BUNDLE_HANDLES } from '@/lib/commerceConfig';

export const revalidate = 60;
export const dynamicParams = true;

function sanitizeDescriptionHtml(html: string | null | undefined) {
  if (!html) return '';
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<any>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    const product = data?.product;
    if (!product) return { title: 'Product Not Found' };
    
    const plainDescription = product.descriptionHtml?.replace(/<[^>]+>/g, '').trim() || 'Broken Arrow Outdoors product';
    return {
      title: `${product.title} | Broken Arrow Outdoors`,
      description: plainDescription.slice(0, 160),
      alternates: { canonical: `/products/${handle}` },
      openGraph: {
        title: `${product.title} | Broken Arrow Outdoors`,
        description: plainDescription.slice(0, 160),
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.title} | Broken Arrow Outdoors`,
        description: plainDescription.slice(0, 160),
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  } catch (error) {
    return { title: 'Broken Arrow Outdoors' };
  }
}

export async function generateStaticParams() {
  try {
    const [targets, branded] = await Promise.all([
      shopifyFetch<any>({
        query: COLLECTION_PRODUCT_HANDLES_QUERY,
        variables: { handle: 'targets', first: 50 },
        cacheSeconds: 60,
        tags: ['products-targets'],
      }),
      shopifyFetch<any>({
        query: COLLECTION_PRODUCT_HANDLES_QUERY,
        variables: { handle: 'branded', first: 50 },
        cacheSeconds: 60,
        tags: ['products-branded'],
      }),
    ]);

    const handles = new Set<string>();
    targets?.collection?.products?.edges?.forEach((edge: any) => handles.add(edge.node.handle));
    branded?.collection?.products?.edges?.forEach((edge: any) => handles.add(edge.node.handle));

    return Array.from(handles).map((handle) => ({ handle }));
  } catch {
    return [];
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let product;
  let relatedProducts = [];
  let recommendationProducts = [];
  let bundleProducts: any[] = [];
  let hasFetchError = false;

  try {
    const data = await shopifyFetch<any>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      cacheSeconds: 60,
      tags: [`product-${handle}`],
    });
    product = data?.product;

    if (product?.id) {
      try {
        const reco = await fetchShopifyRecommendations(product.id, 4);
        recommendationProducts = reco
          .map((item) => ({
            id: `gid://shopify/Product/${item.id}`,
            title: item.title,
            handle: item.handle,
            availableForSale: true,
            images: {
              edges: [{ node: { url: item.featured_image || item.images?.[0]?.src, altText: item.title } }],
            },
            priceRange: {
              minVariantPrice: { amount: item.variants?.[0]?.price || '0.00', currencyCode: 'USD' },
            },
          }))
          .filter((item) => item.handle !== handle && item.images.edges[0].node.url)
          .slice(0, 4);
      } catch {
        recommendationProducts = [];
      }
    }

    if (!recommendationProducts.length) {
      const relatedData = await shopifyFetch<any>({
        query: COLLECTION_PRODUCTS_QUERY,
        variables: { handle: 'targets', first: 4 },
        cacheSeconds: 60,
        tags: ['related-products'],
      });
      relatedProducts =
        relatedData?.collection?.products?.edges
          ?.map((edge: any) => edge.node)
          ?.filter((p: any) => p.handle !== handle)
          ?.slice(0, 4) || [];
    }

    bundleProducts = (
      await Promise.all(
        CURATED_BUNDLE_HANDLES.filter((bundleHandle) => bundleHandle !== handle).map(async (bundleHandle) => {
          try {
            const bundleData = await shopifyFetch<any>({
              query: PRODUCT_BY_HANDLE_QUERY,
              variables: { handle: bundleHandle },
              cacheSeconds: 60,
              tags: [`bundle-${bundleHandle}`],
            });
            return bundleData?.product || null;
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);

  } catch (error) {
    console.error('Error fetching product:', error);
    hasFetchError = true;
  }

  if (hasFetchError) {
    return (
      <div className="bg-brand-dark text-white min-h-screen">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-4">Product Unavailable</h1>
          <p className="text-white/60">
            We could not load this product right now. Please try again shortly.
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const { title, descriptionHtml, images, variants, featuredImage } = product;
  const firstVariant = variants.edges[0]?.node;
  const price = firstVariant?.price;
  const recommendationsToRender = recommendationProducts.length ? recommendationProducts : relatedProducts;
  const plainDescription = product.descriptionHtml?.replace(/<[^>]+>/g, '').trim() || '';
  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    image: images?.edges?.map((edge: any) => edge?.node?.url).filter(Boolean),
    description: plainDescription,
    sku: firstVariant?.id,
    brand: { '@type': 'Brand', name: 'Broken Arrow Outdoors' },
    offers: {
      '@type': 'Offer',
      priceCurrency: price?.currencyCode || 'USD',
      price: price?.amount || '0.00',
      availability: product.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://brokenarrowoutdoors.com/products/${handle}`,
    },
    review: {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Broken Arrow Customer' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: 'Built tough and field tested. Exactly what we needed for pressure training.',
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brokenarrowoutdoors.com/' },
      { '@type': 'ListItem', position: 2, name: 'Products', item: 'https://brokenarrowoutdoors.com/targets' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://brokenarrowoutdoors.com/products/${handle}` },
    ],
  };

  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <ProductViewTracker handle={handle} title={title} price={price?.amount} currency={price?.currencyCode} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaProduct) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          <ImageGallery featuredImage={featuredImage} imageEdges={images.edges} title={title} />

          {/* Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">{title}</h1>
              <p className="text-3xl font-mono text-brand-primary font-bold">
                {price ? formatMoney(price.amount, price.currencyCode) : 'Unavailable'}
              </p>
            </div>

            <div className="prose prose-invert prose-sm text-white/70 leading-relaxed border-y border-white/10 py-8">
              <div dangerouslySetInnerHTML={{ __html: sanitizeDescriptionHtml(descriptionHtml) }} />
            </div>

            <PDPPurchasePanel product={product} title={title} />

            <PDPBundleModule
              baseProduct={{
                id: product.id,
                title: product.title,
                handle: product.handle,
                image: featuredImage?.url,
                price: firstVariant?.price?.amount,
                currencyCode: firstVariant?.price?.currencyCode,
                variantId: firstVariant?.id,
              }}
              accessories={
                bundleProducts.length
                  ? bundleProducts.map((bundleProduct) => ({
                      id: bundleProduct.id,
                      title: bundleProduct.title,
                      handle: bundleProduct.handle,
                      image: bundleProduct.featuredImage?.url || bundleProduct.images?.edges?.[0]?.node?.url,
                      price: bundleProduct.variants?.edges?.[0]?.node?.price?.amount,
                      currencyCode: bundleProduct.variants?.edges?.[0]?.node?.price?.currencyCode || 'USD',
                      variantId: bundleProduct.variants?.edges?.[0]?.node?.id,
                    }))
                  : recommendationProducts.slice(0, 2).map((item: any) => ({
                      id: item.id,
                      title: item.title,
                      handle: item.handle,
                      image: item.images?.edges?.[0]?.node?.url,
                      price: item.priceRange?.minVariantPrice?.amount,
                      currencyCode: item.priceRange?.minVariantPrice?.currencyCode || 'USD',
                    }))
              }
            />

            {/* Value Props / Shipping */}
            <div className="grid grid-cols-1 gap-4 pt-8">
              <div className="flex items-start gap-4">
                <Truck className="w-6 h-6 text-brand-primary flex-shrink-0" />
                <div>
                  <h4 className="font-bold uppercase text-sm mb-1">Fast Shipping</h4>
                  <p className="text-xs text-white/60">Orders ship within 24-48 hours from our Texas warehouse.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <RotateCcw className="w-6 h-6 text-brand-primary flex-shrink-0" />
                <div>
                  <h4 className="font-bold uppercase text-sm mb-1">30-Day Returns</h4>
                  <p className="text-xs text-white/60">Unused gear can be returned within 30 days. No questions asked.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-brand-primary flex-shrink-0" />
                <div>
                  <h4 className="font-bold uppercase text-sm mb-1">Lifetime Guarantee</h4>
                  <p className="text-xs text-white/60">We stand behind our steel. If it breaks under normal use, we replace it.</p>
                </div>
              </div>
            </div>

            <ProductInfoAccordion
              items={[
                {
                  title: 'Specifications',
                  body: '11-gauge steel construction, powder-coated finish, field-ready hardware, and target geometry engineered for realistic bowhunting training reps.',
                },
                {
                  title: 'Durability',
                  body: 'Built to withstand repeated impacts in rugged weather conditions. This system is designed for hard seasons, heavy use, and repeatable performance.',
                },
                {
                  title: 'Shipping',
                  body: 'Orders typically ship within 24-48 hours from Texas. Tracking details are sent by email as soon as your package leaves the warehouse.',
                },
                {
                  title: 'Setup Instructions',
                  body: 'Choose a safe shooting lane, verify backstop clearance, and anchor target setup on level ground before use. Follow all local range and safety guidelines.',
                },
              ]}
            />
          </div>
        </div>

        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-3">Steel Durability</h3>
            <p className="text-white/70 leading-relaxed">
              Every Broken Arrow target is built from 11-gauge steel and finished for repeated field abuse. This lets you run
              realistic shot sequences without worrying about premature wear or weak components.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tight mb-3">Replaceable Zone System</h3>
            <p className="text-white/70 leading-relaxed">
              Strike zones are designed for repeatable reps and modular replacement strategy, helping you keep your target setup
              competition-ready and confidence-ready through full seasons.
            </p>
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-black uppercase italic tracking-tight mb-6">Lifestyle Images</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-72 rounded-xl overflow-hidden border border-white/10">
              <Image src="/images/targets/IMG_7100.JPG" alt="Target setup in the field" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden border border-white/10">
              <Image src="/images/gallery/About-Us.webp" alt="Broken Arrow in action" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="relative h-72 rounded-xl overflow-hidden border border-white/10">
              <Image src="/images/targets/IMG_7546.jpg" alt="Field testing steel target" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-black uppercase italic tracking-tight mb-6">Customer Photos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/gallery/IMG_6631.JPG', '/images/gallery/DSC09031 (1).jpg', '/images/gallery/IMG_9319.JPG', '/images/gallery/IMG_7652.JPG'].map((src) => (
              <div key={src} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                <Image src={src} alt="Customer setup photo" fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-black uppercase italic tracking-tight mb-6">Reviews</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { quote: 'The most realistic target system I have trained on. Confidence improved in two weeks.', author: 'Jake M.' },
              { quote: 'Rugged steel, clean feedback, and setup took less than ten minutes.', author: 'Chris T.' },
              { quote: 'Exactly what I wanted for pre-season reps and ethical shot discipline.', author: 'Ryan B.' },
            ].map((review) => (
              <article key={review.author} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-white/75 italic">"{review.quote}"</p>
                <p className="mt-4 text-sm font-bold uppercase tracking-wider text-brand-primary">{review.author}</p>
              </article>
            ))}
          </div>
        </section>

        <UGCStrip
          title="In The Field"
          images={[
            { src: '/images/gallery/IMG_6631.JPG', alt: 'Customer field setup 1' },
            { src: '/images/gallery/DSC09031 (1).jpg', alt: 'Customer field setup 2' },
            { src: '/images/gallery/IMG_9319.JPG', alt: 'Customer field setup 3' },
            { src: '/images/targets/IMG_7546.jpg', alt: 'Customer field setup 4' },
          ]}
        />

        {/* Related Products */}
        {recommendationsToRender.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">
              You May Also <span className="text-brand-primary">Like</span>
            </h2>
            <ProductGrid products={recommendationsToRender} />
          </div>
        )}
      </div>
    </div>
  );
}
