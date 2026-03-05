import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import CollectionView from '@/components/CollectionView';
import { buildMetadata } from '@/lib/seo';

export const revalidate = 60;

export const metadata: Metadata = buildMetadata({
  title: 'Broken Arrow Branded Gear | Broken Arrow Outdoors',
  description:
    'Field-tested hats, shirts, and hoodies built for long days and hard seasons. Premium archery apparel and outdoors gear.',
  path: '/branded',
  image: '/images/hero/hero-4.png',
});

export default async function BrandedPage() {
  let products = [];
  let hasNextPage = false;
  let endCursor: string | null = null;
  let initialError: string | null = null;
  try {
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'branded', first: 12 },
      cacheSeconds: 60,
      tags: ['collection-branded'],
    });
    if (!data?.collection) {
      initialError = 'Shopify collection not found: branded';
    } else {
      products = data.collection.products?.edges?.map((edge: any) => edge.node) || [];
      hasNextPage = Boolean(data.collection.products?.pageInfo?.hasNextPage);
      endCursor = data.collection.products?.pageInfo?.endCursor || null;
    }
  } catch (error) {
    console.error('Error fetching branded gear:', error);
    initialError = 'Unable to load branded gear from Shopify right now.';
  }

  return (
    <CollectionView
      handle="branded"
      title="Broken Arrow Branded Gear"
      intro="Field-tested hats, shirts, and hoodies built for long days and hard seasons. Rep the crew with premium hunting apparel and outdoors gear."
      initialProducts={products}
      initialHasNextPage={hasNextPage}
      initialEndCursor={endCursor}
      initialError={initialError}
    />
  );
}
