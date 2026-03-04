import type { Metadata } from 'next';
import { shopifyFetch } from '@/lib/shopify';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import CollectionView from '@/components/CollectionView';
import { buildMetadata } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = buildMetadata({
  title: 'Steel Archery Targets Built for Real Hunting Pressure | Broken Arrow Outdoors',
  description:
    'Train for buck fever and build ethical shot confidence with steel archery targets engineered for realistic pressure training.',
  path: '/targets',
  image: '/images/hero/hero-2.png',
});

export default async function TargetsPage() {
  let products = [];
  let hasNextPage = false;
  let endCursor: string | null = null;
  let initialError: string | null = null;
  try {
    const data = await shopifyFetch<any>({
      query: COLLECTION_PRODUCTS_QUERY,
      variables: { handle: 'targets', first: 12 },
    });
    if (!data?.collection) {
      initialError = 'Shopify collection not found: targets';
    } else {
      products = data.collection.products?.edges?.map((edge: any) => edge.node) || [];
      hasNextPage = Boolean(data.collection.products?.pageInfo?.hasNextPage);
      endCursor = data.collection.products?.pageInfo?.endCursor || null;
    }
  } catch (error) {
    console.error('Error fetching targets:', error);
    initialError = 'Unable to load targets from Shopify right now.';
  }

  return (
    <CollectionView
      handle="targets"
      title="Steel Archery Targets Built for Real Hunting Pressure"
      intro="Train for buck fever. Build confidence. Make every shot count with 11-gauge steel archery targets designed for hunting pressure simulation and ethical shot placement."
      initialProducts={products}
      initialHasNextPage={hasNextPage}
      initialEndCursor={endCursor}
      initialError={initialError}
    />
  );
}
