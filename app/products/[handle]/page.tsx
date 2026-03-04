import { shopifyFetch } from '@/lib/shopify';
import { PRODUCT_BY_HANDLE_QUERY, COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import { notFound } from 'next/navigation';
import { formatMoney } from '@/lib/money';
import AddToCartButton from '@/components/AddToCartButton';
import ProductGrid from '@/components/ProductGrid';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import ImageGallery from '@/components/ImageGallery';

export const dynamic = 'force-dynamic';

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
    
    return {
      title: `${product.title} | Broken Arrow Outdoors`,
      description: product.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160) || 'Broken Arrow Outdoors product',
      alternates: { canonical: `/products/${handle}` },
      openGraph: {
        title: `${product.title} | Broken Arrow Outdoors`,
        description: product.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160) || 'Broken Arrow Outdoors product',
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${product.title} | Broken Arrow Outdoors`,
        description: product.descriptionHtml?.replace(/<[^>]+>/g, '').slice(0, 160) || 'Broken Arrow Outdoors product',
        images: product.featuredImage ? [product.featuredImage.url] : [],
      },
    };
  } catch (error) {
    return { title: 'Broken Arrow Outdoors' };
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  let product;
  let relatedProducts = [];
  let hasFetchError = false;

  try {
    const data = await shopifyFetch<any>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    product = data?.product;

    // Fetch related products (just fetching targets for now as a simple recommendation engine)
    const relatedData = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'targets', first: 4 },
    });
    relatedProducts = relatedData?.collection?.products?.edges
      .map((edge: any) => edge.node)
      .filter((p: any) => p.handle !== handle) // Exclude current product
      .slice(0, 4) || [];

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

  return (
    <div className="bg-brand-dark text-white min-h-screen">
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

            <AddToCartButton product={product} />

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
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-white/10 pt-16">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">
              You Might Also <span className="text-brand-primary">Like</span>
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
}
