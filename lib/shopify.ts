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
    console.log('Shopify endpoint:', endpoint);
    if (handle) {
      console.log('Collection handle:', handle);
    }
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
    const products = body?.data?.collection?.products?.edges ?? [];
    console.log('Products returned:', products.length);
    if (body?.data?.collection === null) {
      console.log('Shopify collection not found.');
    } else if (products.length > 0) {
      console.log('First product title:', products[0]?.node?.title ?? 'unknown');
    }
  }

  return body.data as T;
}
