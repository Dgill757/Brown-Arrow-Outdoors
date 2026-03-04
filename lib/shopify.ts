import { getShopifyEnv } from '@/lib/env';

export async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  const { domain, apiVersion, storefrontPublicToken } = getShopifyEnv();
  const debug = process.env.SHOPIFY_DEBUG === 'true';

  const endpoint = `https://${domain}/api/${apiVersion}/graphql.json`;
  const handle = typeof variables?.handle === 'string' ? variables.handle : undefined;

  if (debug) {
    console.info(
      `[Shopify Debug] endpoint=${endpoint} handle=${handle || 'n/a'} queryType=${
        query.includes('collection(') ? 'collection' : query.includes('product(') ? 'product' : 'other'
      }`
    );
  }

  const result = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontPublicToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  if (!result.ok) {
    throw new Error(`Shopify request failed with status ${result.status}`);
  }

  const body = await result.json();
  if (body?.errors?.length) {
    throw new Error(body.errors[0]?.message || 'Unknown Shopify GraphQL error');
  }

  if (debug && body?.data?.collection !== undefined) {
    const firstProductTitle = body?.data?.collection?.products?.edges?.[0]?.node?.title || 'none';
    console.info(
      `[Shopify Debug] handle=${handle || 'n/a'} collectionNull=${body.data.collection === null} firstProduct="${firstProductTitle}"`
    );
  }

  return body.data as T;
}
