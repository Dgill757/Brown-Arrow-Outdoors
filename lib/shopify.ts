import { getShopifyEnv } from '@/lib/env';
import { RECOMMENDED_PRODUCTS_BY_QUERY } from '@/lib/shopifyQueries';
import { normalizeShopifyImage } from '@/lib/normalizeShopifyImage';

function normalizeShopifyPayload<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => normalizeShopifyPayload(entry)) as T;
  }
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const normalized: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(record)) {
      if (typeof entry === 'string' && key.toLowerCase() === 'url') {
        normalized[key] = normalizeShopifyImage(entry);
      } else {
        normalized[key] = normalizeShopifyPayload(entry);
      }
    }
    return normalized as T;
  }
  return value;
}

export async function shopifyFetch<T>({
  query,
  variables,
  cacheSeconds = 60,
  tags = ['shopify'],
}: {
  query: string;
  variables?: Record<string, unknown>;
  cacheSeconds?: number;
  tags?: string[];
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
    ...(cacheSeconds > 0
      ? { next: { revalidate: cacheSeconds, tags } }
      : { cache: 'no-store' as const }),
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

  return normalizeShopifyPayload(body.data as T);
}

export async function fetchShopifyRecommendations(productGid: string, limit: number = 4) {
  const { domain } = getShopifyEnv();
  const numericProductId = productGid.split('/').pop();
  if (!numericProductId) return [];

  const url = `https://${domain}/recommendations/products.json?product_id=${numericProductId}&limit=${limit}&intent=related`;
  const result = await fetch(url, {
    next: { revalidate: 60, tags: [`shopify-reco-${numericProductId}`] },
  });

  if (!result.ok) {
    throw new Error(`Shopify recommendations request failed with status ${result.status}`);
  }

  const body = await result.json();
  const handles = (body?.products ?? [])
    .map((product: any) => product?.handle)
    .filter((handle: string | undefined): handle is string => Boolean(handle))
    .slice(0, limit);

  if (!handles.length) return [];

  const query = handles.map((handle: string) => `handle:${handle}`).join(' OR ');
  const data = await shopifyFetch<any>({
    query: RECOMMENDED_PRODUCTS_BY_QUERY,
    variables: { query, first: handles.length },
    cacheSeconds: 60,
    tags: [`shopify-reco-products-${numericProductId}`],
  });

  const products = data?.products?.edges?.map((edge: any) => edge.node) ?? [];
  const order = new Map<string, number>(handles.map((handle: string, index: number) => [handle, index]));
  return products.sort((a: any, b: any) => (order.get(a.handle) ?? 999) - (order.get(b.handle) ?? 999));
}
