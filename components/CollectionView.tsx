'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import CollectionHeader from '@/components/CollectionHeader';
import Toggle from '@/components/Toggle';
import { ProductGridSkeleton } from '@/components/Skeletons';
import { COLLECTION_PRODUCTS_QUERY } from '@/lib/shopifyQueries';
import { trackEvent } from '@/lib/analytics';

type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  [key: string]: unknown;
};

type CollectionViewProps = {
  handle: 'targets' | 'branded';
  title: string;
  intro: string;
  initialProducts: Product[];
  initialHasNextPage: boolean;
  initialEndCursor: string | null;
  initialError?: string | null;
};

export default function CollectionView({
  handle,
  title,
  intro,
  initialProducts,
  initialHasNextPage,
  initialEndCursor,
  initialError = null,
}: CollectionViewProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasNextPage, setHasNextPage] = useState(initialHasNextPage);
  const [endCursor, setEndCursor] = useState<string | null>(initialEndCursor);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [hideSoldOut, setHideSoldOut] = useState(false);

  const visibleProducts = useMemo(
    () => (hideSoldOut ? products.filter((product) => product.availableForSale) : products),
    [products, hideSoldOut]
  );

  const loadMore = async () => {
    if (!hasNextPage || isLoadingMore) return;

    setIsLoadingMore(true);
    setError(null);

    try {
      const response = await fetch('/api/shopify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: COLLECTION_PRODUCTS_QUERY,
          variables: { handle, first: 12, after: endCursor },
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to load more products.');
      }
      if (!payload?.data?.collection) {
        throw new Error(`Shopify collection not found: ${handle}`);
      }

      const nextProducts = payload?.data?.collection?.products?.edges?.map((edge: any) => edge.node) || [];
      const nextPageInfo = payload?.data?.collection?.products?.pageInfo;

      setProducts((prev) => [...prev, ...nextProducts]);
      setHasNextPage(Boolean(nextPageInfo?.hasNextPage));
      setEndCursor(nextPageInfo?.endCursor || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load more products.');
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="bg-brand-dark text-white min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <CollectionHeader title={title} intro={intro} />

        <div className="mb-8 flex items-center justify-between gap-4 border border-white/10 rounded-lg p-4 bg-white/[0.03]">
          <Toggle
            checked={hideSoldOut}
            onChange={(checked) => {
              setHideSoldOut(checked);
              trackEvent('collection_filter', { collection: handle, hide_sold_out: checked });
            }}
            label="Hide Sold Out"
          />
          <p className="text-xs uppercase tracking-wider text-white/45">{visibleProducts.length} products</p>
        </div>

        {error && visibleProducts.length === 0 ? (
          <div className="text-center py-20 bg-red-500/10 rounded-xl border border-red-400/25">
            <p className="text-red-300 font-medium">{error}</p>
          </div>
        ) : visibleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/40">No products match your current filters.</p>
          </div>
        )}

        {isLoadingMore && (
          <div className="mt-10">
            <ProductGridSkeleton count={4} />
          </div>
        )}

        {error && (
          <div className="mt-8 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={loadMore}
              className="border border-red-400/40 text-red-300 px-6 py-2 rounded hover:bg-red-400/10 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {hasNextPage && !isLoadingMore && (
          <div className="mt-16 text-center">
            <button
              onClick={loadMore}
              className="inline-block border border-white/20 text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-white/10 transition-colors rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
